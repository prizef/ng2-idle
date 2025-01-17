(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ng-idle/core', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ng-idle'] = global['ng-idle'] || {}, global['ng-idle'].core = {}), global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /*
     * Represents a base class for types that provide expiry detection for the Idle service.
     */
    var IdleExpiry = /** @class */ (function () {
        function IdleExpiry() {
            this.idValue = new Date();
            this.idlingValue = false;
        }
        /*
         * Gets or sets a unique ID for the window
         * @param id - The id.
         * @return The current id.
         */
        IdleExpiry.prototype.id = function (value) {
            if (value !== void 0) {
                if (!value) {
                    throw new Error('A value must be specified for the ID.');
                }
                this.idValue = value;
            }
            return this.idValue;
        };
        /*
         * Gets or sets the idling value.
         * @param value - The value to set.
         * @return The idling value.
         */
        IdleExpiry.prototype.idling = function (value) {
            if (value !== void 0) {
                this.idlingValue = value;
            }
            return this.idlingValue;
        };
        /*
         * Returns the current Date.
         * @return The current Date.
         */
        IdleExpiry.prototype.now = function () {
            /* istanbul ignore next */
            return new Date();
        };
        /*
         * Returns whether or not it is expired.
         * @return True if expired; otherwise, false.
         */
        IdleExpiry.prototype.isExpired = function () {
            var expiry = this.last();
            return expiry != null && expiry <= this.now();
        };
        return IdleExpiry;
    }());

    /*
     * A class for managing an interrupt from an interrupt source.
     */
    var Interrupt = /** @class */ (function () {
        function Interrupt(source) {
            this.source = source;
        }
        /*
         * Subscribes to the interrupt using the specified function.
         * @param fn - The subscription function.
         */
        Interrupt.prototype.subscribe = function (fn) {
            this.sub = this.source.onInterrupt.subscribe(fn);
        };
        /*
         * Unsubscribes the interrupt.
         */
        Interrupt.prototype.unsubscribe = function () {
            this.sub.unsubscribe();
            this.sub = null;
        };
        /*
         * Keeps the subscription but resumes interrupt events.
         */
        Interrupt.prototype.resume = function () {
            this.source.attach();
        };
        /*
         * Keeps the subscription but pauses interrupt events.
         */
        Interrupt.prototype.pause = function () {
            this.source.detach();
        };
        return Interrupt;
    }());

    var KeepaliveSvc = /** @class */ (function () {
        function KeepaliveSvc() {
        }
        return KeepaliveSvc;
    }());

    /*
     * Represents an alternative storage for browser that doesn't support localstorage. (i.e. Safari in
     * private mode)
     * @implements Storage
     */
    var AlternativeStorage = /** @class */ (function () {
        function AlternativeStorage() {
            this.storageMap = {};
        }
        Object.defineProperty(AlternativeStorage.prototype, "length", {
            /*
             * Returns an integer representing the number of data items stored in the storageMap object.
             */
            get: function () {
                return Object.keys(this.storageMap).length;
            },
            enumerable: false,
            configurable: true
        });
        /*
         * Remove all keys out of the storage.
         */
        AlternativeStorage.prototype.clear = function () {
            this.storageMap = {};
        };
        /*
         * Return the key's value
         *
         * @param key - name of the key to retrieve the value of.
         * @return The key's value
         */
        AlternativeStorage.prototype.getItem = function (key) {
            if (typeof this.storageMap[key] !== 'undefined') {
                return this.storageMap[key];
            }
            return null;
        };
        /*
         * Return the nth key in the storage
         *
         * @param index - the number of the key you want to get the name of.
         * @return The name of the key.
         */
        AlternativeStorage.prototype.key = function (index) {
            return Object.keys(this.storageMap)[index] || null;
        };
        /*
         * Remove a key from the storage.
         *
         * @param key - the name of the key you want to remove.
         */
        AlternativeStorage.prototype.removeItem = function (key) {
            this.storageMap[key] = undefined;
        };
        /*
         * Add a key to the storage, or update a key's value if it already exists.
         *
         * @param key - the name of the key.
         * @param value - the value you want to give to the key.
         */
        AlternativeStorage.prototype.setItem = function (key, value) {
            this.storageMap[key] = value;
        };
        return AlternativeStorage;
    }());

    /*
     * Represents a localStorage store.
     */
    var LocalStorage = /** @class */ (function () {
        function LocalStorage() {
            this.storage = this.getStorage();
        }
        /*
         * Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
         * throw QuotaExceededError. We're going to detect this and just silently drop any calls to
         * setItem
         * to avoid the entire page breaking, without having to do a check at each usage of Storage.
         */
        LocalStorage.prototype.getStorage = function () {
            try {
                var storage = localStorage;
                storage.setItem('ng2IdleStorage', '');
                storage.removeItem('ng2IdleStorage');
                return storage;
            }
            catch (err) {
                return new AlternativeStorage();
            }
        };
        /*
         * Gets an item in the storage.
         *
         * @param value - The value to get.
         * @return The current value.
         */
        LocalStorage.prototype.getItem = function (key) {
            return this.storage.getItem('ng2Idle.' + key);
        };
        /*
         * Removes an item in the storage.
         *
         * @param value - The value to remove.
         */
        LocalStorage.prototype.removeItem = function (key) {
            this.storage.removeItem('ng2Idle.' + key);
        };
        /*
         * Sets an item in the storage.
         *
         * @param key - The key to set the value.
         * @param value - The value to set to the key.
         */
        LocalStorage.prototype.setItem = function (key, data) {
            this.storage.setItem('ng2Idle.' + key, data);
        };
        /*
         * Represents the storage, commonly use for testing purposes.
         *
         * @param key - The key to set the value.
         * @param value - The value to set to the key.
         */
        LocalStorage.prototype._wrapped = function () {
            return this.storage;
        };
        return LocalStorage;
    }());
    LocalStorage.decorators = [
        { type: core.Injectable }
    ];
    LocalStorage.ctorParameters = function () { return []; };

    /*
     * Represents a localStorage store of expiry values.
     * @extends IdleExpiry
     */
    var LocalStorageExpiry = /** @class */ (function (_super) {
        __extends(LocalStorageExpiry, _super);
        function LocalStorageExpiry(localStorage) {
            var _this = _super.call(this) || this;
            _this.localStorage = localStorage;
            _this.idleName = 'main';
            return _this;
        }
        /*
         * Gets or sets the last expiry date in localStorage.
         * If localStorage doesn't work correctly (i.e. Safari in private mode), we store the expiry value in memory.
         * @param value - The expiry value to set; omit to only return the value.
         * @return The current expiry value.
         */
        LocalStorageExpiry.prototype.last = function (value) {
            if (value !== void 0) {
                this.setExpiry(value);
            }
            return this.getExpiry();
        };
        LocalStorageExpiry.prototype.idling = function (value) {
            if (value !== void 0) {
                this.setIdling(value);
            }
            return this.getIdling();
        };
        /*
         * Gets the idle name.
         * @return The name of the idle.
         */
        LocalStorageExpiry.prototype.getIdleName = function () {
            return this.idleName;
        };
        /*
         * Sets the idle name.
         * @param The name of the idle.
         */
        LocalStorageExpiry.prototype.setIdleName = function (key) {
            if (key) {
                this.idleName = key;
            }
        };
        LocalStorageExpiry.prototype.getExpiry = function () {
            var expiry = this.localStorage.getItem(this.idleName + '.expiry');
            if (expiry) {
                return new Date(parseInt(expiry, 10));
            }
            else {
                return null;
            }
        };
        LocalStorageExpiry.prototype.setExpiry = function (value) {
            if (value) {
                this.localStorage.setItem(this.idleName + '.expiry', value.getTime().toString());
            }
            else {
                this.localStorage.removeItem(this.idleName + '.expiry');
            }
        };
        LocalStorageExpiry.prototype.getIdling = function () {
            var idling = this.localStorage.getItem(this.idleName + '.idling');
            if (idling) {
                return idling === 'true';
            }
            else {
                return false;
            }
        };
        LocalStorageExpiry.prototype.setIdling = function (value) {
            if (value) {
                this.localStorage.setItem(this.idleName + '.idling', value.toString());
            }
            else {
                this.localStorage.setItem(this.idleName + '.idling', 'false');
            }
        };
        return LocalStorageExpiry;
    }(IdleExpiry));
    LocalStorageExpiry.decorators = [
        { type: core.Injectable }
    ];
    LocalStorageExpiry.ctorParameters = function () { return [
        { type: LocalStorage }
    ]; };

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
    })(exports.AutoResume || (exports.AutoResume = {}));
    /**
     * A service for detecting and responding to user idleness.
     */
    var Idle = /** @class */ (function () {
        function Idle(expiry, zone, keepaliveSvc) {
            this.expiry = expiry;
            this.zone = zone;
            this.idle = 20 * 60; // in seconds
            this.timeoutVal = 30; // in seconds
            this.autoResume = exports.AutoResume.idle;
            this.interrupts = new Array();
            this.running = false;
            this.keepaliveEnabled = false;
            this.onIdleStart = new core.EventEmitter();
            this.onIdleEnd = new core.EventEmitter();
            this.onTimeoutWarning = new core.EventEmitter();
            this.onTimeout = new core.EventEmitter();
            this.onInterrupt = new core.EventEmitter();
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
        Idle.prototype.setIdleName = function (key) {
            if (this.expiry instanceof LocalStorageExpiry) {
                this.expiry.setIdleName(key);
            }
            else {
                throw new Error('Cannot set expiry key name because no LocalStorageExpiry has been provided.');
            }
        };
        /*
         * Returns whether or not keepalive integration is enabled.
         * @return True if integration is enabled; otherwise, false.
         */
        Idle.prototype.getKeepaliveEnabled = function () {
            return this.keepaliveEnabled;
        };
        /*
         * Sets and returns whether or not keepalive integration is enabled.
         * @param True if the integration is enabled; otherwise, false.
         * @return The current value.
         */
        Idle.prototype.setKeepaliveEnabled = function (value) {
            if (!this.keepaliveSvc) {
                throw new Error('Cannot enable keepalive integration because no KeepaliveSvc has been provided.');
            }
            return (this.keepaliveEnabled = value);
        };
        /*
         * Returns the current timeout value.
         * @return The timeout value in seconds.
         */
        Idle.prototype.getTimeout = function () {
            return this.timeoutVal;
        };
        /*
         * Sets the timeout value.
         * @param seconds - The timeout value in seconds. 0 or false to disable timeout feature.
         * @return The current value. If disabled, the value will be 0.
         */
        Idle.prototype.setTimeout = function (seconds) {
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
        };
        /*
         * Returns the current idle value.
         * @return The idle value in seconds.
         */
        Idle.prototype.getIdle = function () {
            return this.idle;
        };
        /*
         * Sets the idle value.
         * @param seconds - The idle value in seconds.
         * @return The idle value in seconds.
         */
        Idle.prototype.setIdle = function (seconds) {
            if (seconds <= 0) {
                throw new Error("'seconds' must be greater zero");
            }
            return (this.idle = seconds);
        };
        /*
         * Returns the current autoresume value.
         * @return The current value.
         */
        Idle.prototype.getAutoResume = function () {
            return this.autoResume;
        };
        Idle.prototype.setAutoResume = function (value) {
            return (this.autoResume = value);
        };
        /*
         * Sets interrupts from the specified sources.
         * @param sources - Interrupt sources.
         * @return The resulting interrupts.
         */
        Idle.prototype.setInterrupts = function (sources) {
            var e_1, _a;
            this.clearInterrupts();
            var self = this;
            try {
                for (var sources_1 = __values(sources), sources_1_1 = sources_1.next(); !sources_1_1.done; sources_1_1 = sources_1.next()) {
                    var source = sources_1_1.value;
                    var sub = new Interrupt(source);
                    sub.subscribe(function (args) {
                        self.interrupt(args.force, args.innerArgs);
                    });
                    this.interrupts.push(sub);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (sources_1_1 && !sources_1_1.done && (_a = sources_1.return)) _a.call(sources_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this.interrupts;
        };
        /*
         * Returns the current interrupts.
         * @return The current interrupts.
         */
        Idle.prototype.getInterrupts = function () {
            return this.interrupts;
        };
        /*
         * Pauses, unsubscribes, and clears the current interrupt subscriptions.
         */
        Idle.prototype.clearInterrupts = function () {
            var e_2, _a;
            try {
                for (var _b = __values(this.interrupts), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var sub = _c.value;
                    sub.pause();
                    sub.unsubscribe();
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.interrupts.length = 0;
        };
        /*
         * Returns whether or not the service is running i.e. watching for idleness.
         * @return True if service is watching; otherwise, false.
         */
        Idle.prototype.isRunning = function () {
            return this.running;
        };
        /*
         * Returns whether or not the user is considered idle.
         * @return True if the user is in the idle state; otherwise, false.
         */
        Idle.prototype.isIdling = function () {
            return this.idling;
        };
        /*
         * Starts watching for inactivity.
         */
        Idle.prototype.watch = function (skipExpiry) {
            var _this = this;
            this.safeClearInterval('idleHandle');
            this.safeClearInterval('timeoutHandle');
            var timeout = !this.timeoutVal ? 0 : this.timeoutVal;
            if (!skipExpiry) {
                var value = new Date(this.expiry.now().getTime() + (this.idle + timeout) * 1000);
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
            var watchFn = function () {
                _this.zone.run(function () {
                    var diff = _this.getExpiryDiff(timeout);
                    if (diff > 0) {
                        _this.safeClearInterval('idleHandle');
                        _this.setIdleIntervalOutsideOfZone(watchFn, 1000);
                    }
                    else {
                        _this.toggleState();
                    }
                });
            };
            this.setIdleIntervalOutsideOfZone(watchFn, 1000);
        };
        /*
         * Allows protractor tests to call waitForAngular without hanging
         */
        Idle.prototype.setIdleIntervalOutsideOfZone = function (watchFn, frequency) {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.idleHandle = setInterval(watchFn, frequency);
            });
        };
        /*
         * Stops watching for inactivity.
         */
        Idle.prototype.stop = function () {
            this.stopKeepalive();
            this.toggleInterrupts(false);
            this.safeClearInterval('idleHandle');
            this.safeClearInterval('timeoutHandle');
            this.setIdling(false);
            this.running = false;
            this.expiry.last(null);
        };
        /*
         * Forces a timeout event and state.
         */
        Idle.prototype.timeout = function () {
            this.stopKeepalive();
            this.toggleInterrupts(false);
            this.safeClearInterval('idleHandle');
            this.safeClearInterval('timeoutHandle');
            this.setIdling(true);
            this.running = false;
            this.countdown = 0;
            this.onTimeout.emit(null);
        };
        /*
         * Signals that user activity has occurred.
         * @param force - Forces watch to be called, unless they are timed out.
         * @param eventArgs - Optional source event arguments.
         */
        Idle.prototype.interrupt = function (force, eventArgs) {
            if (!this.running) {
                return;
            }
            if (this.timeoutVal && this.expiry.isExpired()) {
                this.timeout();
                return;
            }
            this.onInterrupt.emit(eventArgs);
            if (force === true ||
                this.autoResume === exports.AutoResume.idle ||
                (this.autoResume === exports.AutoResume.notIdle && !this.expiry.idling())) {
                this.watch(force);
            }
        };
        Idle.prototype.setIdling = function (value) {
            this.idling = value;
            this.expiry.idling(value);
        };
        Idle.prototype.toggleState = function () {
            var _this = this;
            this.setIdling(!this.idling);
            if (this.idling) {
                this.onIdleStart.emit(null);
                this.stopKeepalive();
                if (this.timeoutVal > 0) {
                    this.countdown = this.timeoutVal;
                    this.doCountdown();
                    this.setTimoutIntervalOutsideZone(function () {
                        _this.doCountdownInZone();
                    }, 1000);
                }
            }
            else {
                this.toggleInterrupts(true);
                this.onIdleEnd.emit(null);
                this.startKeepalive();
            }
            this.safeClearInterval('idleHandle');
        };
        Idle.prototype.setTimoutIntervalOutsideZone = function (intervalFn, frequency) {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.timeoutHandle = setInterval(function () {
                    intervalFn();
                }, frequency);
            });
        };
        Idle.prototype.toggleInterrupts = function (resume) {
            var e_3, _a;
            try {
                for (var _b = __values(this.interrupts), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var interrupt = _c.value;
                    if (resume) {
                        interrupt.resume();
                    }
                    else {
                        interrupt.pause();
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        Idle.prototype.getExpiryDiff = function (timeout) {
            var now = this.expiry.now();
            var last = this.expiry.last() || now;
            return last.getTime() - now.getTime() - timeout * 1000;
        };
        Idle.prototype.doCountdownInZone = function () {
            var _this = this;
            this.zone.run(function () {
                _this.doCountdown();
            });
        };
        Idle.prototype.doCountdown = function () {
            var diff = this.getExpiryDiff(this.timeoutVal);
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
            var countdownMs = ((this.timeoutVal - 1) * 1000) + diff;
            this.countdown = Math.round(countdownMs / 1000);
        };
        Idle.prototype.safeClearInterval = function (handleName) {
            var handle = this[handleName];
            if (handle !== null && typeof handle !== 'undefined') {
                clearInterval(this[handleName]);
                this[handleName] = null;
            }
        };
        Idle.prototype.startKeepalive = function () {
            if (!this.keepaliveSvc || !this.keepaliveEnabled) {
                return;
            }
            if (this.running) {
                this.keepaliveSvc.ping();
            }
            this.keepaliveSvc.start();
        };
        Idle.prototype.stopKeepalive = function () {
            if (!this.keepaliveSvc || !this.keepaliveEnabled) {
                return;
            }
            this.keepaliveSvc.stop();
        };
        /*
         * Called by Angular when destroying the instance.
         */
        Idle.prototype.ngOnDestroy = function () {
            this.stop();
            this.clearInterrupts();
        };
        return Idle;
    }());
    Idle.decorators = [
        { type: core.Injectable }
    ];
    Idle.ctorParameters = function () { return [
        { type: IdleExpiry },
        { type: core.NgZone },
        { type: KeepaliveSvc, decorators: [{ type: core.Optional }] }
    ]; };

    /*
     * A class for expressing arguments to interrupt events.
     */
    var InterruptArgs = /** @class */ (function () {
        function InterruptArgs(source, innerArgs, force) {
            if (force === void 0) { force = false; }
            this.source = source;
            this.innerArgs = innerArgs;
            this.force = force;
        }
        return InterruptArgs;
    }());

    /*
     * A base for classes that act as a source for interrupts.
     */
    var InterruptSource = /** @class */ (function () {
        function InterruptSource(attachFn, detachFn) {
            this.attachFn = attachFn;
            this.detachFn = detachFn;
            this.isAttached = false;
            this.onInterrupt = new core.EventEmitter();
        }
        /*
         * Attaches to the specified events on the specified source.
         */
        InterruptSource.prototype.attach = function () {
            var _this = this;
            // If the current zone is the 'angular' zone (a.k.a. NgZone) then re-enter this method in its parent zone
            // The parent zone is usually the '<root>' zone but it can also be 'long-stack-trace-zone' in debug mode
            // In tests, the current zone is typically a 'ProxyZone' created by async/fakeAsync (from @angular/core/testing)
            if (Zone.current.get('isAngularZone') === true) {
                Zone.current.parent.run(function () { return _this.attach(); });
                return;
            }
            if (!this.isAttached && this.attachFn) {
                this.attachFn(this);
            }
            this.isAttached = true;
        };
        /*
         * Detaches from the specified events on the specified source.
         */
        InterruptSource.prototype.detach = function () {
            if (this.isAttached && this.detachFn) {
                this.detachFn(this);
            }
            this.isAttached = false;
        };
        return InterruptSource;
    }());

    var defaultThrottleDelay = 500;
    /*
     * An interrupt source on an EventTarget object, such as a Window or HTMLElement.
     */
    var EventTargetInterruptSource = /** @class */ (function (_super) {
        __extends(EventTargetInterruptSource, _super);
        function EventTargetInterruptSource(target, events, options) {
            var _this = _super.call(this, null, null) || this;
            _this.target = target;
            _this.events = events;
            _this.eventSubscription = new rxjs.Subscription();
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
            _this.throttleDelay = options.throttleDelay;
            _this.passive = !!options.passive;
            var opts = _this.passive ? { passive: true } : null;
            var fromEvents = events
                .split(' ')
                .map(function (eventName) { return rxjs.fromEvent(target, eventName, opts); });
            _this.eventSrc = rxjs.merge.apply(void 0, __spread(fromEvents));
            _this.eventSrc = _this.eventSrc.pipe(operators.filter(function (innerArgs) { return !_this.filterEvent(innerArgs); }));
            if (_this.throttleDelay > 0) {
                _this.eventSrc = _this.eventSrc.pipe(operators.throttleTime(_this.throttleDelay));
            }
            var handler = function (innerArgs) { return _this.onInterrupt.emit(new InterruptArgs(_this, innerArgs)); };
            _this.attachFn = function () { return (_this.eventSubscription = _this.eventSrc.subscribe(handler)); };
            _this.detachFn = function () { return _this.eventSubscription.unsubscribe(); };
            return _this;
        }
        /*
         * Checks to see if the event should be filtered. Always returns false unless overriden.
         * @param event - The original event object.
         * @return True if the event should be filtered (don't cause an interrupt); otherwise, false.
         */
        EventTargetInterruptSource.prototype.filterEvent = function (event) {
            return false;
        };
        Object.defineProperty(EventTargetInterruptSource.prototype, "options", {
            /**
             * Returns the current options being used.
             * @return The current option values.
             */
            get: function () {
                return { throttleDelay: this.throttleDelay, passive: this.passive };
            },
            enumerable: false,
            configurable: true
        });
        return EventTargetInterruptSource;
    }(InterruptSource));

    /*
     * An interrupt source that uses events on the document element (html tag).
     */
    var DocumentInterruptSource = /** @class */ (function (_super) {
        __extends(DocumentInterruptSource, _super);
        function DocumentInterruptSource(events, options) {
            return _super.call(this, document.documentElement, events, options) || this;
        }
        /*
         * Checks to see if the event should be filtered.
         * @param event - The original event object.
         * @return True if the event should be filtered (don't cause an interrupt); otherwise, false.
         */
        DocumentInterruptSource.prototype.filterEvent = function (event) {
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
        };
        return DocumentInterruptSource;
    }(EventTargetInterruptSource));

    /*
     * An interrupt source on the Window object.
     */
    var WindowInterruptSource = /** @class */ (function (_super) {
        __extends(WindowInterruptSource, _super);
        function WindowInterruptSource(events, options) {
            return _super.call(this, window, events, options) || this;
        }
        return WindowInterruptSource;
    }(EventTargetInterruptSource));

    /*
     * An interrupt source on the storage event of Window.
     */
    var StorageInterruptSource = /** @class */ (function (_super) {
        __extends(StorageInterruptSource, _super);
        function StorageInterruptSource(throttleDelay) {
            if (throttleDelay === void 0) { throttleDelay = 500; }
            return _super.call(this, 'storage', throttleDelay) || this;
        }
        /*
         * Checks to see if the event should be filtered.
         * @param event - The original event object.
         * @return True if the event should be filtered (don't cause an interrupt); otherwise, false.
         */
        StorageInterruptSource.prototype.filterEvent = function (event) {
            if (event.key &&
                event.key.indexOf('ng2Idle.') >= 0 &&
                event.key.indexOf('.expiry') >= 0) {
                return false;
            }
            return true;
        };
        return StorageInterruptSource;
    }(WindowInterruptSource));

    /*
     * Represents a simple in-memory store of expiry values.
     * @extends IdleExpiry
     */
    var SimpleExpiry = /** @class */ (function (_super) {
        __extends(SimpleExpiry, _super);
        function SimpleExpiry() {
            var _this = _super.call(this) || this;
            _this.lastValue = null;
            return _this;
        }
        /*
         * Gets or sets the last expiry date.
         * @param value - The expiry value to set; omit to only return the value.
         * @return The current expiry value.
         */
        SimpleExpiry.prototype.last = function (value) {
            if (value !== void 0) {
                this.lastValue = value;
            }
            return this.lastValue;
        };
        return SimpleExpiry;
    }(IdleExpiry));

    var NgIdleModule = /** @class */ (function () {
        function NgIdleModule() {
        }
        NgIdleModule.forRoot = function () {
            return {
                ngModule: NgIdleModule,
                providers: [
                    LocalStorageExpiry,
                    { provide: IdleExpiry, useExisting: LocalStorageExpiry },
                    Idle
                ]
            };
        };
        return NgIdleModule;
    }());
    NgIdleModule.decorators = [
        { type: core.NgModule, args: [{
                    providers: [LocalStorage]
                },] }
    ];

    function createDefaultInterruptSources(options) {
        return [
            new DocumentInterruptSource('mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll', options),
            new StorageInterruptSource()
        ];
    }
    var DEFAULT_INTERRUPTSOURCES = createDefaultInterruptSources();

    /*
     * Public API Surface of core
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DEFAULT_INTERRUPTSOURCES = DEFAULT_INTERRUPTSOURCES;
    exports.DocumentInterruptSource = DocumentInterruptSource;
    exports.EventTargetInterruptSource = EventTargetInterruptSource;
    exports.Idle = Idle;
    exports.IdleExpiry = IdleExpiry;
    exports.InterruptArgs = InterruptArgs;
    exports.InterruptSource = InterruptSource;
    exports.KeepaliveSvc = KeepaliveSvc;
    exports.LocalStorage = LocalStorage;
    exports.LocalStorageExpiry = LocalStorageExpiry;
    exports.NgIdleModule = NgIdleModule;
    exports.SimpleExpiry = SimpleExpiry;
    exports.StorageInterruptSource = StorageInterruptSource;
    exports.WindowInterruptSource = WindowInterruptSource;
    exports.createDefaultInterruptSources = createDefaultInterruptSources;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-idle-core.umd.js.map
