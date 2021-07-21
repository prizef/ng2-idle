import { EventEmitter, Injectable, NgZone, NgModule } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { KeepaliveSvc, NgIdleModule } from '@ng-idle/core';

/**
 * An example of an injectable service.
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common/http';
import * as ɵngcc2 from '@ng-idle/core';
class Keepalive extends KeepaliveSvc {
    /*
     * Initializes a new instance of Keepalive
     * @param http - The HTTP service.
     */
    constructor(http, zone) {
        super();
        this.http = http;
        this.zone = zone;
        this.pingInterval = 10 * 60;
        /*
         * An event emitted when the service is pinging.
         */
        this.onPing = new EventEmitter();
        /*
         * An event emitted when the service has pinged an HTTP endpoint and received a response.
         */
        this.onPingResponse = new EventEmitter();
    }
    /*
     * Sets the string or Request that should be used when pinging.
     * @param url - The URL or Request object to use when pinging.
     * @return The current Request used when pinging.
     */
    request(url) {
        if (typeof url === 'string') {
            this.pingRequest = new HttpRequest('GET', url);
        }
        else if (url instanceof HttpRequest) {
            this.pingRequest = url;
        }
        else if (url === null) {
            this.pingRequest = null;
        }
        return this.pingRequest;
    }
    /*
     * Sets the interval (in seconds) at which the ping operation will occur when start() is called.
     * @param seconds - The ping interval in seconds.
     * @return The current interval value.
     */
    interval(seconds) {
        if (!isNaN(seconds) && seconds > 0) {
            this.pingInterval = seconds;
        }
        else if (!isNaN(seconds) && seconds <= 0) {
            throw new Error('Interval value must be greater than zero.');
        }
        return this.pingInterval;
    }
    /*
     * Immediately performs the ping operation. If a request has been set, an HTTP
     * request will be made and the response will be emitted via the
     * onPingResponse event.
     */
    ping() {
        this.onPing.emit(null);
        if (this.pingRequest) {
            this.http.request(this.pingRequest).subscribe((response) => {
                this.onPingResponse.emit(response);
            }, (error) => {
                this.onPingResponse.emit(error);
            });
        }
    }
    /*
     * Starts pinging on an interval.
     */
    start() {
        this.stop();
        this.zone.runOutsideAngular(() => {
            this.pingHandle = setInterval(() => {
                this.zone.run(() => {
                    this.ping();
                });
            }, this.pingInterval * 1000);
        });
    }
    /*
     * Stops pinging on an interval.
     */
    stop() {
        if (this.hasPingHandle()) {
            clearInterval(this.pingHandle);
            this.pingHandle = null;
        }
    }
    /*
     * Performs any cleanup tasks when Angular destroys the instance.
     */
    ngOnDestroy() {
        this.stop();
    }
    /*
     * Returns whether or not the service will ping automatically at the specified interval.
     * @return True if the service will ping at the specified interval; otherwise, false.
     */
    isRunning() {
        return this.hasPingHandle();
    }
    hasPingHandle() {
        return this.pingHandle !== null && typeof this.pingHandle !== 'undefined';
    }
}
Keepalive.ɵfac = function Keepalive_Factory(t) { return new (t || Keepalive)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(ɵngcc0.NgZone)); };
Keepalive.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: Keepalive, factory: Keepalive.ɵfac });
Keepalive.ctorParameters = () => [
    { type: HttpClient },
    { type: NgZone }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Keepalive, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: ɵngcc0.NgZone }]; }, null); })();

class NgIdleKeepaliveModule {
    static forRoot() {
        return {
            ngModule: NgIdleKeepaliveModule,
            providers: [Keepalive, { provide: KeepaliveSvc, useExisting: Keepalive }]
        };
    }
}
NgIdleKeepaliveModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NgIdleKeepaliveModule });
NgIdleKeepaliveModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NgIdleKeepaliveModule_Factory(t) { return new (t || NgIdleKeepaliveModule)(); }, imports: [[NgIdleModule.forRoot()]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NgIdleKeepaliveModule, { imports: [ɵngcc2.NgIdleModule] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgIdleKeepaliveModule, [{
        type: NgModule,
        args: [{ imports: [NgIdleModule.forRoot()] }]
    }], null, null); })();

/*
 * Public API Surface of keepalive
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Keepalive, NgIdleKeepaliveModule };

//# sourceMappingURL=ng-idle-keepalive.js.map