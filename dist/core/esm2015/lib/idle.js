import { EventEmitter, Injectable, NgZone, Optional } from '@angular/core';
import { IdleExpiry } from './idleexpiry';
import { Interrupt } from './interrupt';
import { KeepaliveSvc } from './keepalivesvc';
import { LocalStorageExpiry } from './localstorageexpiry';
/*
 * Indicates the desired auto resume behavior.
 */
export var AutoResume;
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
export class Idle {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2xpYi9pZGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFFTixRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRDs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLFVBYVg7QUFiRCxXQUFZLFVBQVU7SUFDcEI7O09BRUc7SUFDSCxtREFBUSxDQUFBO0lBQ1I7O09BRUc7SUFDSCwyQ0FBSSxDQUFBO0lBQ0o7O09BRUc7SUFDSCxpREFBTyxDQUFBO0FBQ1QsQ0FBQyxFQWJXLFVBQVUsS0FBVixVQUFVLFFBYXJCO0FBRUQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sSUFBSTtJQXFCZixZQUNVLE1BQWtCLEVBQ2xCLElBQVksRUFDUixZQUEyQjtRQUYvQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLFNBQUksR0FBSixJQUFJLENBQVE7UUF0QmQsU0FBSSxHQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFhO1FBQ3JDLGVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFhO1FBQzlCLGVBQVUsR0FBZSxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ3pDLGVBQVUsR0FBcUIsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMzQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBS2hCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUcxQixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxD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QUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNoRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7O1lBL1pGLFVBQVU7OztZQTVCRixVQUFVO1lBTGpCLE1BQU07WUFTQyxZQUFZLHVCQWlEaEIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdGFibGUsXHJcbiAgTmdab25lLFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWRsZUV4cGlyeSB9IGZyb20gJy4vaWRsZWV4cGlyeSc7XHJcbmltcG9ydCB7IEludGVycnVwdCB9IGZyb20gJy4vaW50ZXJydXB0JztcclxuaW1wb3J0IHsgSW50ZXJydXB0QXJncyB9IGZyb20gJy4vaW50ZXJydXB0YXJncyc7XHJcbmltcG9ydCB7IEludGVycnVwdFNvdXJjZSB9IGZyb20gJy4vaW50ZXJydXB0c291cmNlJztcclxuaW1wb3J0IHsgS2VlcGFsaXZlU3ZjIH0gZnJvbSAnLi9rZWVwYWxpdmVzdmMnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VFeHBpcnkgfSBmcm9tICcuL2xvY2Fsc3RvcmFnZWV4cGlyeSc7XHJcblxyXG4vKlxyXG4gKiBJbmRpY2F0ZXMgdGhlIGRlc2lyZWQgYXV0byByZXN1bWUgYmVoYXZpb3IuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBBdXRvUmVzdW1lIHtcclxuICAvKlxyXG4gICAqIEF1dG8gcmVzdW1lIGZ1bmN0aW9uYWxpdHkgd2lsbCBiZSBkaXNhYmxlZC5cclxuICAgKi9cclxuICBkaXNhYmxlZCxcclxuICAvKlxyXG4gICAqIENhbiByZXN1bWUgYXV0b21hdGljYWxseSBldmVuIGlmIHRoZXkgYXJlIGlkbGUuXHJcbiAgICovXHJcbiAgaWRsZSxcclxuICAvKlxyXG4gICAqIENhbiBvbmx5IHJlc3VtZSBhdXRvbWF0aWNhbGx5IGlmIHRoZXkgYXJlIG5vdCB5ZXQgaWRsZS5cclxuICAgKi9cclxuICBub3RJZGxlXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHNlcnZpY2UgZm9yIGRldGVjdGluZyBhbmQgcmVzcG9uZGluZyB0byB1c2VyIGlkbGVuZXNzLlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSWRsZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBpZGxlOiBudW1iZXIgPSAyMCAqIDYwOyAvLyBpbiBzZWNvbmRzXHJcbiAgcHJpdmF0ZSB0aW1lb3V0VmFsID0gMzA7IC8vIGluIHNlY29uZHNcclxuICBwcml2YXRlIGF1dG9SZXN1bWU6IEF1dG9SZXN1bWUgPSBBdXRvUmVzdW1lLmlkbGU7XHJcbiAgcHJpdmF0ZSBpbnRlcnJ1cHRzOiBBcnJheTxJbnRlcnJ1cHQ+ID0gbmV3IEFycmF5KCk7XHJcbiAgcHJpdmF0ZSBydW5uaW5nID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBpZGxpbmc6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBpZGxlSGFuZGxlOiBhbnk7XHJcbiAgcHJpdmF0ZSB0aW1lb3V0SGFuZGxlOiBhbnk7XHJcbiAgcHJpdmF0ZSBjb3VudGRvd246IG51bWJlcjtcclxuICBwcml2YXRlIGtlZXBhbGl2ZUVuYWJsZWQgPSBmYWxzZTtcclxuICBwcml2YXRlIGtlZXBhbGl2ZVN2YzogS2VlcGFsaXZlU3ZjO1xyXG5cclxuICBwdWJsaWMgb25JZGxlU3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHB1YmxpYyBvbklkbGVFbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHB1YmxpYyBvblRpbWVvdXRXYXJuaW5nOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG4gIHB1YmxpYyBvblRpbWVvdXQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcbiAgcHVibGljIG9uSW50ZXJydXB0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgW2tleTogc3RyaW5nXTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXhwaXJ5OiBJZGxlRXhwaXJ5LFxyXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXHJcbiAgICBAT3B0aW9uYWwoKSBrZWVwYWxpdmVTdmM/OiBLZWVwYWxpdmVTdmNcclxuICApIHtcclxuICAgIGlmIChrZWVwYWxpdmVTdmMpIHtcclxuICAgICAgdGhpcy5rZWVwYWxpdmVTdmMgPSBrZWVwYWxpdmVTdmM7XHJcbiAgICAgIHRoaXMua2VlcGFsaXZlRW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldElkbGluZyhmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFNldHMgdGhlIGlkbGUgbmFtZSBmb3IgbG9jYWxTdG9yYWdlLlxyXG4gICAqIEltcG9ydGFudCB0byBzZXQgaWYgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIElkbGUgd2l0aCBMb2NhbFN0b3JhZ2VFeHBpcnlcclxuICAgKiBAcGFyYW0gVGhlIG5hbWUgb2YgdGhlIGlkbGUuXHJcbiAgICovXHJcbiAgc2V0SWRsZU5hbWUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmV4cGlyeSBpbnN0YW5jZW9mIExvY2FsU3RvcmFnZUV4cGlyeSkge1xyXG4gICAgICB0aGlzLmV4cGlyeS5zZXRJZGxlTmFtZShrZXkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICdDYW5ub3Qgc2V0IGV4cGlyeSBrZXkgbmFtZSBiZWNhdXNlIG5vIExvY2FsU3RvcmFnZUV4cGlyeSBoYXMgYmVlbiBwcm92aWRlZC4nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3Qga2VlcGFsaXZlIGludGVncmF0aW9uIGlzIGVuYWJsZWQuXHJcbiAgICogQHJldHVybiBUcnVlIGlmIGludGVncmF0aW9uIGlzIGVuYWJsZWQ7IG90aGVyd2lzZSwgZmFsc2UuXHJcbiAgICovXHJcbiAgZ2V0S2VlcGFsaXZlRW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmtlZXBhbGl2ZUVuYWJsZWQ7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFNldHMgYW5kIHJldHVybnMgd2hldGhlciBvciBub3Qga2VlcGFsaXZlIGludGVncmF0aW9uIGlzIGVuYWJsZWQuXHJcbiAgICogQHBhcmFtIFRydWUgaWYgdGhlIGludGVncmF0aW9uIGlzIGVuYWJsZWQ7IG90aGVyd2lzZSwgZmFsc2UuXHJcbiAgICogQHJldHVybiBUaGUgY3VycmVudCB2YWx1ZS5cclxuICAgKi9cclxuICBzZXRLZWVwYWxpdmVFbmFibGVkKHZhbHVlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMua2VlcGFsaXZlU3ZjKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAnQ2Fubm90IGVuYWJsZSBrZWVwYWxpdmUgaW50ZWdyYXRpb24gYmVjYXVzZSBubyBLZWVwYWxpdmVTdmMgaGFzIGJlZW4gcHJvdmlkZWQuJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAodGhpcy5rZWVwYWxpdmVFbmFibGVkID0gdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHRpbWVvdXQgdmFsdWUuXHJcbiAgICogQHJldHVybiBUaGUgdGltZW91dCB2YWx1ZSBpbiBzZWNvbmRzLlxyXG4gICAqL1xyXG4gIGdldFRpbWVvdXQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnRpbWVvdXRWYWw7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFNldHMgdGhlIHRpbWVvdXQgdmFsdWUuXHJcbiAgICogQHBhcmFtIHNlY29uZHMgLSBUaGUgdGltZW91dCB2YWx1ZSBpbiBzZWNvbmRzLiAwIG9yIGZhbHNlIHRvIGRpc2FibGUgdGltZW91dCBmZWF0dXJlLlxyXG4gICAqIEByZXR1cm4gVGhlIGN1cnJlbnQgdmFsdWUuIElmIGRpc2FibGVkLCB0aGUgdmFsdWUgd2lsbCBiZSAwLlxyXG4gICAqL1xyXG4gIHNldFRpbWVvdXQoc2Vjb25kczogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XHJcbiAgICBpZiAoc2Vjb25kcyA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy50aW1lb3V0VmFsID0gMDtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlY29uZHMgPT09ICdudW1iZXInICYmIHNlY29uZHMgPj0gMCkge1xyXG4gICAgICB0aGlzLnRpbWVvdXRWYWwgPSBzZWNvbmRzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ3NlY29uZHMnIGNhbiBvbmx5IGJlICdmYWxzZScgb3IgYSBwb3NpdGl2ZSBudW1iZXIuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnRpbWVvdXRWYWw7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgaWRsZSB2YWx1ZS5cclxuICAgKiBAcmV0dXJuIFRoZSBpZGxlIHZhbHVlIGluIHNlY29uZHMuXHJcbiAgICovXHJcbiAgZ2V0SWRsZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuaWRsZTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogU2V0cyB0aGUgaWRsZSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gc2Vjb25kcyAtIFRoZSBpZGxlIHZhbHVlIGluIHNlY29uZHMuXHJcbiAgICogQHJldHVybiBUaGUgaWRsZSB2YWx1ZSBpbiBzZWNvbmRzLlxyXG4gICAqL1xyXG4gIHNldElkbGUoc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmIChzZWNvbmRzIDw9IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ3NlY29uZHMnIG11c3QgYmUgZ3JlYXRlciB6ZXJvXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAodGhpcy5pZGxlID0gc2Vjb25kcyk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgYXV0b3Jlc3VtZSB2YWx1ZS5cclxuICAgKiBAcmV0dXJuIFRoZSBjdXJyZW50IHZhbHVlLlxyXG4gICAqL1xyXG4gIGdldEF1dG9SZXN1bWUoKTogQXV0b1Jlc3VtZSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdXRvUmVzdW1lO1xyXG4gIH1cclxuXHJcbiAgc2V0QXV0b1Jlc3VtZSh2YWx1ZTogQXV0b1Jlc3VtZSk6IEF1dG9SZXN1bWUge1xyXG4gICAgcmV0dXJuICh0aGlzLmF1dG9SZXN1bWUgPSB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFNldHMgaW50ZXJydXB0cyBmcm9tIHRoZSBzcGVjaWZpZWQgc291cmNlcy5cclxuICAgKiBAcGFyYW0gc291cmNlcyAtIEludGVycnVwdCBzb3VyY2VzLlxyXG4gICAqIEByZXR1cm4gVGhlIHJlc3VsdGluZyBpbnRlcnJ1cHRzLlxyXG4gICAqL1xyXG4gIHNldEludGVycnVwdHMoc291cmNlczogQXJyYXk8SW50ZXJydXB0U291cmNlPik6IEFycmF5PEludGVycnVwdD4ge1xyXG4gICAgdGhpcy5jbGVhckludGVycnVwdHMoKTtcclxuXHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XHJcbiAgICAgIGNvbnN0IHN1YiA9IG5ldyBJbnRlcnJ1cHQoc291cmNlKTtcclxuICAgICAgc3ViLnN1YnNjcmliZSgoYXJnczogSW50ZXJydXB0QXJncykgPT4ge1xyXG4gICAgICAgIHNlbGYuaW50ZXJydXB0KGFyZ3MuZm9yY2UsIGFyZ3MuaW5uZXJBcmdzKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLmludGVycnVwdHMucHVzaChzdWIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmludGVycnVwdHM7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgaW50ZXJydXB0cy5cclxuICAgKiBAcmV0dXJuIFRoZSBjdXJyZW50IGludGVycnVwdHMuXHJcbiAgICovXHJcbiAgZ2V0SW50ZXJydXB0cygpOiBBcnJheTxJbnRlcnJ1cHQ+IHtcclxuICAgIHJldHVybiB0aGlzLmludGVycnVwdHM7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFBhdXNlcywgdW5zdWJzY3JpYmVzLCBhbmQgY2xlYXJzIHRoZSBjdXJyZW50IGludGVycnVwdCBzdWJzY3JpcHRpb25zLlxyXG4gICAqL1xyXG4gIGNsZWFySW50ZXJydXB0cygpOiB2b2lkIHtcclxuICAgIGZvciAoY29uc3Qgc3ViIG9mIHRoaXMuaW50ZXJydXB0cykge1xyXG4gICAgICBzdWIucGF1c2UoKTtcclxuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbnRlcnJ1cHRzLmxlbmd0aCA9IDA7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNlcnZpY2UgaXMgcnVubmluZyBpLmUuIHdhdGNoaW5nIGZvciBpZGxlbmVzcy5cclxuICAgKiBAcmV0dXJuIFRydWUgaWYgc2VydmljZSBpcyB3YXRjaGluZzsgb3RoZXJ3aXNlLCBmYWxzZS5cclxuICAgKi9cclxuICBpc1J1bm5pbmcoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ydW5uaW5nO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB1c2VyIGlzIGNvbnNpZGVyZWQgaWRsZS5cclxuICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIHVzZXIgaXMgaW4gdGhlIGlkbGUgc3RhdGU7IG90aGVyd2lzZSwgZmFsc2UuXHJcbiAgICovXHJcbiAgaXNJZGxpbmcoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5pZGxpbmc7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFN0YXJ0cyB3YXRjaGluZyBmb3IgaW5hY3Rpdml0eS5cclxuICAgKi9cclxuICB3YXRjaChza2lwRXhwaXJ5PzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5zYWZlQ2xlYXJJbnRlcnZhbCgnaWRsZUhhbmRsZScpO1xyXG4gICAgdGhpcy5zYWZlQ2xlYXJJbnRlcnZhbCgndGltZW91dEhhbmRsZScpO1xyXG5cclxuICAgIGNvbnN0IHRpbWVvdXQgPSAhdGhpcy50aW1lb3V0VmFsID8gMCA6IHRoaXMudGltZW91dFZhbDtcclxuICAgIGlmICghc2tpcEV4cGlyeSkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IG5ldyBEYXRlKFxyXG4gICAgICAgIHRoaXMuZXhwaXJ5Lm5vdygpLmdldFRpbWUoKSArICh0aGlzLmlkbGUgKyB0aW1lb3V0KSAqIDEwMDBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5leHBpcnkubGFzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaWRsaW5nKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlU3RhdGUoKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XHJcbiAgICAgIHRoaXMuc3RhcnRLZWVwYWxpdmUoKTtcclxuICAgICAgdGhpcy50b2dnbGVJbnRlcnJ1cHRzKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgY29uc3Qgd2F0Y2hGbiA9ICgpID0+IHtcclxuICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMuZ2V0RXhwaXJ5RGlmZih0aW1lb3V0KTtcclxuICAgICAgICBpZiAoZGlmZiA+IDApIHtcclxuICAgICAgICAgIHRoaXMuc2FmZUNsZWFySW50ZXJ2YWwoJ2lkbGVIYW5kbGUnKTtcclxuICAgICAgICAgIHRoaXMuc2V0SWRsZUludGVydmFsT3V0c2lkZU9mWm9uZSh3YXRjaEZuLCAxMDAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2V0SWRsZUludGVydmFsT3V0c2lkZU9mWm9uZSh3YXRjaEZuLCAxMDAwKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogQWxsb3dzIHByb3RyYWN0b3IgdGVzdHMgdG8gY2FsbCB3YWl0Rm9yQW5ndWxhciB3aXRob3V0IGhhbmdpbmdcclxuICAgKi9cclxuICBzZXRJZGxlSW50ZXJ2YWxPdXRzaWRlT2Zab25lKHdhdGNoRm46ICgpID0+IHZvaWQsIGZyZXF1ZW5jeTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLmlkbGVIYW5kbGUgPSBzZXRJbnRlcnZhbCh3YXRjaEZuLCBmcmVxdWVuY3kpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFN0b3BzIHdhdGNoaW5nIGZvciBpbmFjdGl2aXR5LlxyXG4gICAqL1xyXG4gIHN0b3AoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0b3BLZWVwYWxpdmUoKTtcclxuXHJcbiAgICB0aGlzLnRvZ2dsZUludGVycnVwdHMoZmFsc2UpO1xyXG5cclxuICAgIHRoaXMuc2FmZUNsZWFySW50ZXJ2YWwoJ2lkbGVIYW5kbGUnKTtcclxuICAgIHRoaXMuc2FmZUNsZWFySW50ZXJ2YWwoJ3RpbWVvdXRIYW5kbGUnKTtcclxuXHJcbiAgICB0aGlzLnNldElkbGluZyhmYWxzZSk7XHJcbiAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmV4cGlyeS5sYXN0KG51bGwpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBGb3JjZXMgYSB0aW1lb3V0IGV2ZW50IGFuZCBzdGF0ZS5cclxuICAgKi9cclxuICB0aW1lb3V0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdG9wS2VlcGFsaXZlKCk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVJbnRlcnJ1cHRzKGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLnNhZmVDbGVhckludGVydmFsKCdpZGxlSGFuZGxlJyk7XHJcbiAgICB0aGlzLnNhZmVDbGVhckludGVydmFsKCd0aW1lb3V0SGFuZGxlJyk7XHJcblxyXG4gICAgdGhpcy5zZXRJZGxpbmcodHJ1ZSk7XHJcbiAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuY291bnRkb3duID0gMDtcclxuXHJcbiAgICB0aGlzLm9uVGltZW91dC5lbWl0KG51bGwpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBTaWduYWxzIHRoYXQgdXNlciBhY3Rpdml0eSBoYXMgb2NjdXJyZWQuXHJcbiAgICogQHBhcmFtIGZvcmNlIC0gRm9yY2VzIHdhdGNoIHRvIGJlIGNhbGxlZCwgdW5sZXNzIHRoZXkgYXJlIHRpbWVkIG91dC5cclxuICAgKiBAcGFyYW0gZXZlbnRBcmdzIC0gT3B0aW9uYWwgc291cmNlIGV2ZW50IGFyZ3VtZW50cy5cclxuICAgKi9cclxuICBpbnRlcnJ1cHQoZm9yY2U/OiBib29sZWFuLCBldmVudEFyZ3M/OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50aW1lb3V0VmFsICYmIHRoaXMuZXhwaXJ5LmlzRXhwaXJlZCgpKSB7XHJcbiAgICAgIHRoaXMudGltZW91dCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uSW50ZXJydXB0LmVtaXQoZXZlbnRBcmdzKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGZvcmNlID09PSB0cnVlIHx8XHJcbiAgICAgIHRoaXMuYXV0b1Jlc3VtZSA9PT0gQXV0b1Jlc3VtZS5pZGxlIHx8XHJcbiAgICAgICh0aGlzLmF1dG9SZXN1bWUgPT09IEF1dG9SZXN1bWUubm90SWRsZSAmJiAhdGhpcy5leHBpcnkuaWRsaW5nKCkpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy53YXRjaChmb3JjZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldElkbGluZyh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5pZGxpbmcgPSB2YWx1ZTtcclxuICAgIHRoaXMuZXhwaXJ5LmlkbGluZyh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZVN0YXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXRJZGxpbmcoIXRoaXMuaWRsaW5nKTtcclxuXHJcbiAgICBpZiAodGhpcy5pZGxpbmcpIHtcclxuICAgICAgdGhpcy5vbklkbGVTdGFydC5lbWl0KG51bGwpO1xyXG4gICAgICB0aGlzLnN0b3BLZWVwYWxpdmUoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnRpbWVvdXRWYWwgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5jb3VudGRvd24gPSB0aGlzLnRpbWVvdXRWYWw7XHJcbiAgICAgICAgdGhpcy5kb0NvdW50ZG93bigpO1xyXG4gICAgICAgIHRoaXMuc2V0VGltb3V0SW50ZXJ2YWxPdXRzaWRlWm9uZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmRvQ291bnRkb3duSW5ab25lKCk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlSW50ZXJydXB0cyh0cnVlKTtcclxuICAgICAgdGhpcy5vbklkbGVFbmQuZW1pdChudWxsKTtcclxuICAgICAgdGhpcy5zdGFydEtlZXBhbGl2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2FmZUNsZWFySW50ZXJ2YWwoJ2lkbGVIYW5kbGUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0VGltb3V0SW50ZXJ2YWxPdXRzaWRlWm9uZShcclxuICAgIGludGVydmFsRm46ICgpID0+IHZvaWQsXHJcbiAgICBmcmVxdWVuY3k6IG51bWJlclxyXG4gICkge1xyXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy50aW1lb3V0SGFuZGxlID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIGludGVydmFsRm4oKTtcclxuICAgICAgfSwgZnJlcXVlbmN5KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVJbnRlcnJ1cHRzKHJlc3VtZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgZm9yIChjb25zdCBpbnRlcnJ1cHQgb2YgdGhpcy5pbnRlcnJ1cHRzKSB7XHJcbiAgICAgIGlmIChyZXN1bWUpIHtcclxuICAgICAgICBpbnRlcnJ1cHQucmVzdW1lKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW50ZXJydXB0LnBhdXNlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RXhwaXJ5RGlmZih0aW1lb3V0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3Qgbm93OiBEYXRlID0gdGhpcy5leHBpcnkubm93KCk7XHJcbiAgICBjb25zdCBsYXN0OiBEYXRlID0gdGhpcy5leHBpcnkubGFzdCgpIHx8IG5vdztcclxuICAgIHJldHVybiBsYXN0LmdldFRpbWUoKSAtIG5vdy5nZXRUaW1lKCkgLSB0aW1lb3V0ICogMTAwMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZG9Db3VudGRvd25JblpvbmUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5kb0NvdW50ZG93bigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRvQ291bnRkb3duKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGlmZiA9IHRoaXMuZ2V0RXhwaXJ5RGlmZih0aGlzLnRpbWVvdXRWYWwpO1xyXG4gICAgaWYgKGRpZmYgPiAwKSB7XHJcbiAgICAgIHRoaXMuc2FmZUNsZWFySW50ZXJ2YWwoJ3RpbWVvdXRIYW5kbGUnKTtcclxuICAgICAgdGhpcy5pbnRlcnJ1cHQodHJ1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuaWRsaW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb3VudGRvd24gPD0gMCkge1xyXG4gICAgICB0aGlzLnRpbWVvdXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub25UaW1lb3V0V2FybmluZy5lbWl0KHRoaXMuY291bnRkb3duKTtcclxuXHJcbiAgICBjb25zdCBjb3VudGRvd25NcyA9ICgodGhpcy50aW1lb3V0VmFsIC0gMSkgKiAxMDAwKSArIGRpZmY7XHJcbiAgICB0aGlzLmNvdW50ZG93biA9IE1hdGgucm91bmQoY291bnRkb3duTXMgLyAxMDAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2FmZUNsZWFySW50ZXJ2YWwoaGFuZGxlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBoYW5kbGUgPSB0aGlzW2hhbmRsZU5hbWVdO1xyXG4gICAgaWYgKGhhbmRsZSAhPT0gbnVsbCAmJiB0eXBlb2YgaGFuZGxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXNbaGFuZGxlTmFtZV0pO1xyXG4gICAgICB0aGlzW2hhbmRsZU5hbWVdID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhcnRLZWVwYWxpdmUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMua2VlcGFsaXZlU3ZjIHx8ICF0aGlzLmtlZXBhbGl2ZUVuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcclxuICAgICAgdGhpcy5rZWVwYWxpdmVTdmMucGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMua2VlcGFsaXZlU3ZjLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0b3BLZWVwYWxpdmUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMua2VlcGFsaXZlU3ZjIHx8ICF0aGlzLmtlZXBhbGl2ZUVuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMua2VlcGFsaXZlU3ZjLnN0b3AoKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogQ2FsbGVkIGJ5IEFuZ3VsYXIgd2hlbiBkZXN0cm95aW5nIHRoZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgdGhpcy5jbGVhckludGVycnVwdHMoKTtcclxuICB9XHJcbn1cclxuIl19