import { Injectable, EventEmitter, NgZone, Optional, NgModule } from '@angular/core';
import { Subscription, fromEvent, merge } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';

/*
 * Represents a base class for types that provide expiry detection for the Idle service.
 */
class IdleExpiry {
    constructor() {
        this.idValue = new Date();
        this.idlingValue = false;
    }
    /*
     * Gets or sets a unique ID for the window
     * @param id - The id.
     * @return The current id.
     */
    id(value) {
        if (value !== void 0) {
            if (!value) {
                throw new Error('A value must be specified for the ID.');
            }
            this.idValue = value;
        }
        return this.idValue;
    }
    /*
     * Gets or sets the idling value.
     * @param value - The value to set.
     * @return The idling value.
     */
    idling(value) {
        if (value !== void 0) {
            this.idlingValue = value;
        }
        return this.idlingValue;
    }
    /*
     * Returns the current Date.
     * @return The current Date.
     */
    now() {
        /* istanbul ignore next */
        return new Date();
    }
    /*
     * Returns whether or not it is expired.
     * @return True if expired; otherwise, false.
     */
    isExpired() {
        const expiry = this.last();
        return expiry != null && expiry <= this.now();
    }
}

/*
 * A class for managing an interrupt from an interrupt source.
 */
class Interrupt {
    constructor(source) {
        this.source = source;
    }
    /*
     * Subscribes to the interrupt using the specified function.
     * @param fn - The subscription function.
     */
    subscribe(fn) {
        this.sub = this.source.onInterrupt.subscribe(fn);
    }
    /*
     * Unsubscribes the interrupt.
     */
    unsubscribe() {
        this.sub.unsubscribe();
        this.sub = null;
    }
    /*
     * Keeps the subscription but resumes interrupt events.
     */
    resume() {
        this.source.attach();
    }
    /*
     * Keeps the subscription but pauses interrupt events.
     */
    pause() {
        this.source.detach();
    }
}

class KeepaliveSvc {
}

/*
 * Represents an alternative storage for browser that doesn't support localstorage. (i.e. Safari in
 * private mode)
 * @implements Storage
 */
class AlternativeStorage {
    constructor() {
        this.storageMap = {};
    }
    /*
     * Returns an integer representing the number of data items stored in the storageMap object.
     */
    get length() {
        return Object.keys(this.storageMap).length;
    }
    /*
     * Remove all keys out of the storage.
     */
    clear() {
        this.storageMap = {};
    }
    /*
     * Return the key's value
     *
     * @param key - name of the key to retrieve the value of.
     * @return The key's value
     */
    getItem(key) {
        if (typeof this.storageMap[key] !== 'undefined') {
            return this.storageMap[key];
        }
        return null;
    }
    /*
     * Return the nth key in the storage
     *
     * @param index - the number of the key you want to get the name of.
     * @return The name of the key.
     */
    key(index) {
        return Object.keys(this.storageMap)[index] || null;
    }
    /*
     * Remove a key from the storage.
     *
     * @param key - the name of the key you want to remove.
     */
    removeItem(key) {
        this.storageMap[key] = undefined;
    }
    /*
     * Add a key to the storage, or update a key's value if it already exists.
     *
     * @param key - the name of the key.
     * @param value - the value you want to give to the key.
     */
    setItem(key, value) {
        this.storageMap[key] = value;
    }
}

/*
 * Represents a localStorage store.
 */
class LocalStorage {
    constructor() {
        this.storage = this.getStorage();
    }
    /*
     * Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
     * throw QuotaExceededError. We're going to detect this and just silently drop any calls to
     * setItem
     * to avoid the entire page breaking, without having to do a check at each usage of Storage.
     */
    getStorage() {
        try {
            const storage = localStorage;
            storage.setItem('ng2IdleStorage', '');
            storage.removeItem('ng2IdleStorage');
            return storage;
        }
        catch (err) {
            return new AlternativeStorage();
        }
    }
    /*
     * Gets an item in the storage.
     *
     * @param value - The value to get.
     * @return The current value.
     */
    getItem(key) {
        return this.storage.getItem('ng2Idle.' + key);
    }
    /*
     * Removes an item in the storage.
     *
     * @param value - The value to remove.
     */
    removeItem(key) {
        this.storage.removeItem('ng2Idle.' + key);
    }
    /*
     * Sets an item in the storage.
     *
     * @param key - The key to set the value.
     * @param value - The value to set to the key.
     */
    setItem(key, data) {
        this.storage.setItem('ng2Idle.' + key, data);
    }
    /*
     * Represents the storage, commonly use for testing purposes.
     *
     * @param key - The key to set the value.
     * @param value - The value to set to the key.
     */
    _wrapped() {
        return this.storage;
    }
}
LocalStorage.decorators = [
    { type: Injectable }
];
LocalStorage.ctorParameters = () => [];

/*
 * Represents a localStorage store of expiry values.
 * @extends IdleExpiry
 */
class LocalStorageExpiry extends IdleExpiry {
    constructor(localStorage) {
        super();
        this.localStorage = localStorage;
        this.idleName = 'main';
    }
    /*
     * Gets or sets the last expiry date in localStorage.
     * If localStorage doesn't work correctly (i.e. Safari in private mode), we store the expiry value in memory.
     * @param value - The expiry value to set; omit to only return the value.
     * @return The current expiry value.
     */
    last(value) {
        if (value !== void 0) {
            this.setExpiry(value);
        }
        return this.getExpiry();
    }
    idling(value) {
        if (value !== void 0) {
            this.setIdling(value);
        }
        return this.getIdling();
    }
    /*
     * Gets the idle name.
     * @return The name of the idle.
     */
    getIdleName() {
        return this.idleName;
    }
    /*
     * Sets the idle name.
     * @param The name of the idle.
     */
    setIdleName(key) {
        if (key) {
            this.idleName = key;
        }
    }
    getExpiry() {
        const expiry = this.localStorage.getItem(this.idleName + '.expiry');
        if (expiry) {
            return new Date(parseInt(expiry, 10));
        }
        else {
            return null;
        }
    }
    setExpiry(value) {
        if (value) {
            this.localStorage.setItem(this.idleName + '.expiry', value.getTime().toString());
        }
        else {
            this.localStorage.removeItem(this.idleName + '.expiry');
        }
    }
    getIdling() {
        const idling = this.localStorage.getItem(this.idleName + '.idling');
        if (idling) {
            return idling === 'true';
        }
        else {
            return false;
        }
    }
    setIdling(value) {
        if (value) {
            this.localStorage.setItem(this.idleName + '.idling', value.toString());
        }
        else {
            this.localStorage.setItem(this.idleName + '.idling', 'false');
        }
    }
}
LocalStorageExpiry.decorators = [
    { type: Injectable }
];
LocalStorageExpiry.ctorParameters = () => [
    { type: LocalStorage }
];

/*
 * Indicates the desired auto resume behavior.
 */
var AutoResume;
(function (AutoResume) {
    /*
     * Auto resume functionality will be disabled.
     */
    AutoResume[AutoResume["disabled"] = 0] = "disabled";
    /*
     * Can resume automatically even if they are idle.
     */
    AutoResume[AutoResume["idle"] = 1] = "idle";
    /*
     * Can only resume automatically if they are not yet idle.
     */
    AutoResume[AutoResume["notIdle"] = 2] = "notIdle";
})(AutoResume || (AutoResume = {}));
/**
 * A service for detecting and responding to user idleness.
 */
class Idle {
    constructor(expiry, zone, keepaliveSvc) {
        this.expiry = expiry;
        this.zone = zone;
        this.idle = 20 * 60; // in seconds
        this.timeoutVal = 30; // in seconds
        this.autoResume = AutoResume.idle;
        this.interrupts = new Array();
        this.running = false;
        this.keepaliveEnabled = false;
        this.onIdleStart = new EventEmitter();
        this.onIdleEnd = new EventEmitter();
        this.onTimeoutWarning = new EventEmitter();
        this.onTimeout = new EventEmitter();
        this.onInterrupt = new EventEmitter();
        if (keepaliveSvc) {
            this.keepaliveSvc = keepaliveSvc;
            this.keepaliveEnabled = true;
        }
        this.setIdling(false);
    }
    /*
     * Sets the idle name for localStorage.
     * Important to set if multiple instances of Idle with LocalStorageExpiry
     * @param The name of the idle.
     */
    setIdleName(key) {
        if (this.expiry instanceof LocalStorageExpiry) {
            this.expiry.setIdleName(key);
        }
        else {
            throw new Error('Cannot set expiry key name because no LocalStorageExpiry has been provided.');
        }
    }
    /*
     * Returns whether or not keepalive integration is enabled.
     * @return True if integration is enabled; otherwise, false.
     */
    getKeepaliveEnabled() {
        return this.keepaliveEnabled;
    }
    /*
     * Sets and returns whether or not keepalive integration is enabled.
     * @param True if the integration is enabled; otherwise, false.
     * @return The current value.
     */
    setKeepaliveEnabled(value) {
        if (!this.keepaliveSvc) {
            throw new Error('Cannot enable keepalive integration because no KeepaliveSvc has been provided.');
        }
        return (this.keepaliveEnabled = value);
    }
    /*
     * Returns the current timeout value.
     * @return The timeout value in seconds.
     */
    getTimeout() {
        return this.timeoutVal;
    }
    /*
     * Sets the timeout value.
     * @param seconds - The timeout value in seconds. 0 or false to disable timeout feature.
     * @return The current value. If disabled, the value will be 0.
     */
    setTimeout(seconds) {
        if (seconds === false) {
            this.timeoutVal = 0;
        }
        else if (typeof seconds === 'number' && seconds >= 0) {
            this.timeoutVal = seconds;
        }
        else {
            throw new Error("'seconds' can only be 'false' or a positive number.");
        }
        return this.timeoutVal;
    }
    /*
     * Returns the current idle value.
     * @return The idle value in seconds.
     */
    getIdle() {
        return this.idle;
    }
    /*
     * Sets the idle value.
     * @param seconds - The idle value in seconds.
     * @return The idle value in seconds.
     */
    setIdle(seconds) {
        if (seconds <= 0) {
            throw new Error("'seconds' must be greater zero");
        }
        return (this.idle = seconds);
    }
    /*
     * Returns the current autoresume value.
     * @return The current value.
     */
    getAutoResume() {
        return this.autoResume;
    }
    setAutoResume(value) {
        return (this.autoResume = value);
    }
    /*
     * Sets interrupts from the specified sources.
     * @param sources - Interrupt sources.
     * @return The resulting interrupts.
     */
    setInterrupts(sources) {
        this.clearInterrupts();
        const self = this;
        for (const source of sources) {
            const sub = new Interrupt(source);
            sub.subscribe((args) => {
                self.interrupt(args.force, args.innerArgs);
            });
            this.interrupts.push(sub);
        }
        return this.interrupts;
    }
    /*
     * Returns the current interrupts.
     * @return The current interrupts.
     */
    getInterrupts() {
        return this.interrupts;
    }
    /*
     * Pauses, unsubscribes, and clears the current interrupt subscriptions.
     */
    clearInterrupts() {
        for (const sub of this.interrupts) {
            sub.pause();
            sub.unsubscribe();
        }
        this.interrupts.length = 0;
    }
    /*
     * Returns whether or not the service is running i.e. watching for idleness.
     * @return True if service is watching; otherwise, false.
     */
    isRunning() {
        return this.running;
    }
    /*
     * Returns whether or not the user is considered idle.
     * @return True if the user is in the idle state; otherwise, false.
     */
    isIdling() {
        return this.idling;
    }
    /*
     * Starts watching for inactivity.
     */
    watch(skipExpiry) {
        this.safeClearInterval('idleHandle');
        this.safeClearInterval('timeoutHandle');
        const timeout = !this.timeoutVal ? 0 : this.timeoutVal;
        if (!skipExpiry) {
            const value = new Date(this.expiry.now().getTime() + (this.idle + timeout) * 1000);
            this.expiry.last(value);
        }
        if (this.idling) {
            this.toggleState();
        }
        if (!this.running) {
            this.startKeepalive();
            this.toggleInterrupts(true);
        }
        this.running = true;
        const watchFn = () => {
            this.zone.run(() => {
                const diff = this.getExpiryDiff(timeout);
                if (diff > 0) {
                    this.safeClearInterval('idleHandle');
                    this.setIdleIntervalOutsideOfZone(watchFn, 1000);
                }
                else {
                    this.toggleState();
                }
            });
        };
        this.setIdleIntervalOutsideOfZone(watchFn, 1000);
    }
    /*
     * Allows protractor tests to call waitForAngular without hanging
     */
    setIdleIntervalOutsideOfZone(watchFn, frequency) {
        this.zone.runOutsideAngular(() => {
            this.idleHandle = setInterval(watchFn, frequency);
        });
    }
    /*
     * Stops watching for inactivity.
     */
    stop() {
        this.stopKeepalive();
        this.toggleInterrupts(false);
        this.safeClearInterval('idleHandle');
        this.safeClearInterval('timeoutHandle');
        this.setIdling(false);
        this.running = false;
        this.expiry.last(null);
    }
    /*
     * Forces a timeout event and state.
     */
    timeout() {
        this.stopKeepalive();
        this.toggleInterrupts(false);
        this.safeClearInterval('idleHandle');
        this.safeClearInterval('timeoutHandle');
        this.setIdling(true);
        this.running = false;
        this.countdown = 0;
        this.onTimeout.emit(null);
    }
    /*
     * Signals that user activity has occurred.
     * @param force - Forces watch to be called, unless they are timed out.
     * @param eventArgs - Optional source event arguments.
     */
    interrupt(force, eventArgs) {
        if (!this.running) {
            return;
        }
        if (this.timeoutVal && this.expiry.isExpired()) {
            this.timeout();
            return;
        }
        this.onInterrupt.emit(eventArgs);
        if (force === true ||
            this.autoResume === AutoResume.idle ||
            (this.autoResume === AutoResume.notIdle && !this.expiry.idling())) {
            this.watch(force);
        }
    }
    setIdling(value) {
        this.idling = value;
        this.expiry.idling(value);
    }
    toggleState() {
        this.setIdling(!this.idling);
        if (this.idling) {
            this.onIdleStart.emit(null);
            this.stopKeepalive();
            if (this.timeoutVal > 0) {
                this.countdown = this.timeoutVal;
                this.doCountdown();
                this.setTimoutIntervalOutsideZone(() => {
                    this.doCountdownInZone();
                }, 1000);
            }
        }
        else {
            this.toggleInterrupts(true);
            this.onIdleEnd.emit(null);
            this.startKeepalive();
        }
        this.safeClearInterval('idleHandle');
    }
    setTimoutIntervalOutsideZone(intervalFn, frequency) {
        this.zone.runOutsideAngular(() => {
            this.timeoutHandle = setInterval(() => {
                intervalFn();
            }, frequency);
        });
    }
    toggleInterrupts(resume) {
        for (const interrupt of this.interrupts) {
            if (resume) {
                interrupt.resume();
            }
            else {
                interrupt.pause();
            }
        }
    }
    getExpiryDiff(timeout) {
        const now = this.expiry.now();
        const last = this.expiry.last() || now;
        return last.getTime() - now.getTime() - timeout * 1000;
    }
    doCountdownInZone() {
        this.zone.run(() => {
            this.doCountdown();
        });
    }
    doCountdown() {
        const diff = this.getExpiryDiff(this.timeoutVal);
        if (diff > 0) {
            this.safeClearInterval('timeoutHandle');
            this.interrupt(true);
            return;
        }
        if (!this.idling) {
            return;
        }
        if (this.countdown <= 0) {
            this.timeout();
            return;
        }
        this.onTimeoutWarning.emit(this.countdown);
        const countdownMs = ((this.timeoutVal - 1) * 1000) + diff;
        this.countdown = Math.round(countdownMs / 1000);
    }
    safeClearInterval(handleName) {
        const handle = this[handleName];
        if (handle !== null && typeof handle !== 'undefined') {
            clearInterval(this[handleName]);
            this[handleName] = null;
        }
    }
    startKeepalive() {
        if (!this.keepaliveSvc || !this.keepaliveEnabled) {
            return;
        }
        if (this.running) {
            this.keepaliveSvc.ping();
        }
        this.keepaliveSvc.start();
    }
    stopKeepalive() {
        if (!this.keepaliveSvc || !this.keepaliveEnabled) {
            return;
        }
        this.keepaliveSvc.stop();
    }
    /*
     * Called by Angular when destroying the instance.
     */
    ngOnDestroy() {
        this.stop();
        this.clearInterrupts();
    }
}
Idle.decorators = [
    { type: Injectable }
];
Idle.ctorParameters = () => [
    { type: IdleExpiry },
    { type: NgZone },
    { type: KeepaliveSvc, decorators: [{ type: Optional }] }
];

/*
 * A class for expressing arguments to interrupt events.
 */
class InterruptArgs {
    constructor(source, innerArgs, force = false) {
        this.source = source;
        this.innerArgs = innerArgs;
        this.force = force;
    }
}

/*
 * A base for classes that act as a source for interrupts.
 */
class InterruptSource {
    constructor(attachFn, detachFn) {
        this.attachFn = attachFn;
        this.detachFn = detachFn;
        this.isAttached = false;
        this.onInterrupt = new EventEmitter();
    }
    /*
     * Attaches to the specified events on the specified source.
     */
    attach() {
        // If the current zone is the 'angular' zone (a.k.a. NgZone) then re-enter this method in its parent zone
        // The parent zone is usually the '<root>' zone but it can also be 'long-stack-trace-zone' in debug mode
        // In tests, the current zone is typically a 'ProxyZone' created by async/fakeAsync (from @angular/core/testing)
        if (Zone.current.get('isAngularZone') === true) {
            Zone.current.parent.run(() => this.attach());
            return;
        }
        if (!this.isAttached && this.attachFn) {
            this.attachFn(this);
        }
        this.isAttached = true;
    }
    /*
     * Detaches from the specified events on the specified source.
     */
    detach() {
        if (this.isAttached && this.detachFn) {
            this.detachFn(this);
        }
        this.isAttached = false;
    }
}

const defaultThrottleDelay = 500;
/*
 * An interrupt source on an EventTarget object, such as a Window or HTMLElement.
 */
class EventTargetInterruptSource extends InterruptSource {
    constructor(target, events, options) {
        super(null, null);
        this.target = target;
        this.events = events;
        this.eventSubscription = new Subscription();
        if (typeof options === 'number') {
            options = { throttleDelay: options, passive: false };
        }
        options = options || {
            throttleDelay: defaultThrottleDelay,
            passive: false
        };
        if (options.throttleDelay === undefined || options.throttleDelay === null) {
            options.throttleDelay = defaultThrottleDelay;
        }
        this.throttleDelay = options.throttleDelay;
        this.passive = !!options.passive;
        const opts = this.passive ? { passive: true } : null;
        const fromEvents = events
            .split(' ')
            .map(eventName => fromEvent(target, eventName, opts));
        this.eventSrc = merge(...fromEvents);
        this.eventSrc = this.eventSrc.pipe(filter(innerArgs => !this.filterEvent(innerArgs)));
        if (this.throttleDelay > 0) {
            this.eventSrc = this.eventSrc.pipe(throttleTime(this.throttleDelay));
        }
        const handler = (innerArgs) => this.onInterrupt.emit(new InterruptArgs(this, innerArgs));
        this.attachFn = () => (this.eventSubscription = this.eventSrc.subscribe(handler));
        this.detachFn = () => this.eventSubscription.unsubscribe();
    }
    /*
     * Checks to see if the event should be filtered. Always returns false unless overriden.
     * @param event - The original event object.
     * @return True if the event should be filtered (don't cause an interrupt); otherwise, false.
     */
    filterEvent(event) {
        return false;
    }
    /**
     * Returns the current options being used.
     * @return The current option values.
     */
    get options() {
        return { throttleDelay: this.throttleDelay, passive: this.passive };
    }
}

/*
 * An interrupt source that uses events on the document element (html tag).
 */
class DocumentInterruptSource extends EventTargetInterruptSource {
    constructor(events, options) {
        super(document.documentElement, events, options);
    }
    /*
     * Checks to see if the event should be filtered.
     * @param event - The original event object.
     * @return True if the event should be filtered (don't cause an interrupt); otherwise, false.
     */
    filterEvent(event) {
        // some browser bad input hacks
        if (event.type === 'mousemove' &&
            // fix for Chrome destop notifications
            ((event.originalEvent &&
                event.originalEvent.movementX === 0 &&
                event.originalEvent.movementY === 0) ||
                // fix for webkit fake mousemove
                ((event.movementX !== void 0 && !event.movementX) || !event.movementY))) {
            return true;
        }
        return false;
    }
}

/*
 * An interrupt source on the Window object.
 */
class WindowInterruptSource extends EventTargetInterruptSource {
    constructor(events, options) {
        super(window, events, options);
    }
}

/*
 * An interrupt source on the storage event of Window.
 */
class StorageInterruptSource extends WindowInterruptSource {
    constructor(throttleDelay = 500) {
        super('storage', throttleDelay);
    }
    /*
     * Checks to see if the event should be filtered.
     * @param event - The original event object.
     * @return True if the event should be filtered (don't cause an interrupt); otherwise, false.
     */
    filterEvent(event) {
        if (event.key &&
            event.key.indexOf('ng2Idle.') >= 0 &&
            event.key.indexOf('.expiry') >= 0) {
            return false;
        }
        return true;
    }
}

/*
 * Represents a simple in-memory store of expiry values.
 * @extends IdleExpiry
 */
class SimpleExpiry extends IdleExpiry {
    constructor() {
        super();
        this.lastValue = null;
    }
    /*
     * Gets or sets the last expiry date.
     * @param value - The expiry value to set; omit to only return the value.
     * @return The current expiry value.
     */
    last(value) {
        if (value !== void 0) {
            this.lastValue = value;
        }
        return this.lastValue;
    }
}

class NgIdleModule {
    static forRoot() {
        return {
            ngModule: NgIdleModule,
            providers: [
                LocalStorageExpiry,
                { provide: IdleExpiry, useExisting: LocalStorageExpiry },
                Idle
            ]
        };
    }
}
NgIdleModule.decorators = [
    { type: NgModule, args: [{
                providers: [LocalStorage]
            },] }
];

function createDefaultInterruptSources(options) {
    return [
        new DocumentInterruptSource('mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll', options),
        new StorageInterruptSource()
    ];
}
const DEFAULT_INTERRUPTSOURCES = createDefaultInterruptSources();

/*
 * Public API Surface of core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AutoResume, DEFAULT_INTERRUPTSOURCES, DocumentInterruptSource, EventTargetInterruptSource, Idle, IdleExpiry, InterruptArgs, InterruptSource, KeepaliveSvc, LocalStorage, LocalStorageExpiry, NgIdleModule, SimpleExpiry, StorageInterruptSource, WindowInterruptSource, createDefaultInterruptSources };
//# sourceMappingURL=ng-idle-core.js.map
