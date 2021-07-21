import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { KeepaliveSvc } from '@ng-idle/core';
/**
 * An example of an injectable service.
 */
export class Keepalive extends KeepaliveSvc {
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
Keepalive.decorators = [
    { type: Injectable }
];
Keepalive.ctorParameters = () => [
    { type: HttpClient },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2VlcGFsaXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMva2VlcGFsaXZlL3NyYy9saWIva2VlcGFsaXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBZ0IsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdDOztHQUVHO0FBRUgsTUFBTSxPQUFPLFNBQVUsU0FBUSxZQUFZO0lBaUJ6Qzs7O09BR0c7SUFDSCxZQUFvQixJQUFnQixFQUFVLElBQVk7UUFDeEQsS0FBSyxFQUFFLENBQUM7UUFEVSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQW5CbEQsaUJBQVksR0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBR3ZDOztXQUVHO1FBQ0ksV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXREOztXQUVHO1FBQ0ksbUJBQWMsR0FBb0MsSUFBSSxZQUFZLEVBRXRFLENBQUM7SUFRSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE9BQU8sQ0FBSSxHQUE2QjtRQUN0QyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFJLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNuRDthQUFNLElBQUksR0FBRyxZQUFZLFdBQVcsRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztTQUN4QjthQUFNLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUN6QjtRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxPQUFnQjtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7U0FDN0I7YUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7WUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBSTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUMzQyxDQUFDLFFBQTJCLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckMsQ0FBQyxFQUNELENBQUMsS0FBd0IsRUFBRSxFQUFFO2dCQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQ0YsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO29CQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN4QixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVPLGFBQWE7UUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssV0FBVyxDQUFDO0lBQzVFLENBQUM7OztZQXZIRixVQUFVOzs7WUFORixVQUFVO1lBRGdCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEtlZXBhbGl2ZVN2YyB9IGZyb20gJ0BuZy1pZGxlL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEFuIGV4YW1wbGUgb2YgYW4gaW5qZWN0YWJsZSBzZXJ2aWNlLlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgS2VlcGFsaXZlIGV4dGVuZHMgS2VlcGFsaXZlU3ZjIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHBpbmdSZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+O1xyXG4gIHByaXZhdGUgcGluZ0ludGVydmFsOiBudW1iZXIgPSAxMCAqIDYwO1xyXG4gIHByaXZhdGUgcGluZ0hhbmRsZTogYW55O1xyXG5cclxuICAvKlxyXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VydmljZSBpcyBwaW5naW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBvblBpbmc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKlxyXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VydmljZSBoYXMgcGluZ2VkIGFuIEhUVFAgZW5kcG9pbnQgYW5kIHJlY2VpdmVkIGEgcmVzcG9uc2UuXHJcbiAgICovXHJcbiAgcHVibGljIG9uUGluZ1Jlc3BvbnNlOiBFdmVudEVtaXR0ZXI8SHR0cFJlc3BvbnNlPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxcclxuICAgIEh0dHBSZXNwb25zZTxhbnk+XHJcbiAgPigpO1xyXG5cclxuICAvKlxyXG4gICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIEtlZXBhbGl2ZVxyXG4gICAqIEBwYXJhbSBodHRwIC0gVGhlIEhUVFAgc2VydmljZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgem9uZTogTmdab25lKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBTZXRzIHRoZSBzdHJpbmcgb3IgUmVxdWVzdCB0aGF0IHNob3VsZCBiZSB1c2VkIHdoZW4gcGluZ2luZy5cclxuICAgKiBAcGFyYW0gdXJsIC0gVGhlIFVSTCBvciBSZXF1ZXN0IG9iamVjdCB0byB1c2Ugd2hlbiBwaW5naW5nLlxyXG4gICAqIEByZXR1cm4gVGhlIGN1cnJlbnQgUmVxdWVzdCB1c2VkIHdoZW4gcGluZ2luZy5cclxuICAgKi9cclxuICByZXF1ZXN0PFQ+KHVybD86IHN0cmluZyB8IEh0dHBSZXF1ZXN0PFQ+KTogSHR0cFJlcXVlc3Q8VD4ge1xyXG4gICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRoaXMucGluZ1JlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3Q8VD4oJ0dFVCcsIHVybCk7XHJcbiAgICB9IGVsc2UgaWYgKHVybCBpbnN0YW5jZW9mIEh0dHBSZXF1ZXN0KSB7XHJcbiAgICAgIHRoaXMucGluZ1JlcXVlc3QgPSB1cmw7XHJcbiAgICB9IGVsc2UgaWYgKHVybCA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnBpbmdSZXF1ZXN0ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5waW5nUmVxdWVzdDtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogU2V0cyB0aGUgaW50ZXJ2YWwgKGluIHNlY29uZHMpIGF0IHdoaWNoIHRoZSBwaW5nIG9wZXJhdGlvbiB3aWxsIG9jY3VyIHdoZW4gc3RhcnQoKSBpcyBjYWxsZWQuXHJcbiAgICogQHBhcmFtIHNlY29uZHMgLSBUaGUgcGluZyBpbnRlcnZhbCBpbiBzZWNvbmRzLlxyXG4gICAqIEByZXR1cm4gVGhlIGN1cnJlbnQgaW50ZXJ2YWwgdmFsdWUuXHJcbiAgICovXHJcbiAgaW50ZXJ2YWwoc2Vjb25kcz86IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBpZiAoIWlzTmFOKHNlY29uZHMpICYmIHNlY29uZHMgPiAwKSB7XHJcbiAgICAgIHRoaXMucGluZ0ludGVydmFsID0gc2Vjb25kcztcclxuICAgIH0gZWxzZSBpZiAoIWlzTmFOKHNlY29uZHMpICYmIHNlY29uZHMgPD0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludGVydmFsIHZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucGluZ0ludGVydmFsO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBJbW1lZGlhdGVseSBwZXJmb3JtcyB0aGUgcGluZyBvcGVyYXRpb24uIElmIGEgcmVxdWVzdCBoYXMgYmVlbiBzZXQsIGFuIEhUVFBcclxuICAgKiByZXF1ZXN0IHdpbGwgYmUgbWFkZSBhbmQgdGhlIHJlc3BvbnNlIHdpbGwgYmUgZW1pdHRlZCB2aWEgdGhlXHJcbiAgICogb25QaW5nUmVzcG9uc2UgZXZlbnQuXHJcbiAgICovXHJcbiAgcGluZygpOiB2b2lkIHtcclxuICAgIHRoaXMub25QaW5nLmVtaXQobnVsbCk7XHJcbiAgICBpZiAodGhpcy5waW5nUmVxdWVzdCkge1xyXG4gICAgICB0aGlzLmh0dHAucmVxdWVzdCh0aGlzLnBpbmdSZXF1ZXN0KS5zdWJzY3JpYmUoXHJcbiAgICAgICAgKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vblBpbmdSZXNwb25zZS5lbWl0KHJlc3BvbnNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcjogSHR0cFJlc3BvbnNlPGFueT4pID0+IHtcclxuICAgICAgICAgIHRoaXMub25QaW5nUmVzcG9uc2UuZW1pdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBTdGFydHMgcGluZ2luZyBvbiBhbiBpbnRlcnZhbC5cclxuICAgKi9cclxuICBzdGFydCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RvcCgpO1xyXG5cclxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMucGluZ0hhbmRsZSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMucGluZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCB0aGlzLnBpbmdJbnRlcnZhbCAqIDEwMDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFN0b3BzIHBpbmdpbmcgb24gYW4gaW50ZXJ2YWwuXHJcbiAgICovXHJcbiAgc3RvcCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmhhc1BpbmdIYW5kbGUoKSkge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMucGluZ0hhbmRsZSk7XHJcbiAgICAgIHRoaXMucGluZ0hhbmRsZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFBlcmZvcm1zIGFueSBjbGVhbnVwIHRhc2tzIHdoZW4gQW5ndWxhciBkZXN0cm95cyB0aGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0b3AoKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc2VydmljZSB3aWxsIHBpbmcgYXV0b21hdGljYWxseSBhdCB0aGUgc3BlY2lmaWVkIGludGVydmFsLlxyXG4gICAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUgc2VydmljZSB3aWxsIHBpbmcgYXQgdGhlIHNwZWNpZmllZCBpbnRlcnZhbDsgb3RoZXJ3aXNlLCBmYWxzZS5cclxuICAgKi9cclxuICBpc1J1bm5pbmcoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5oYXNQaW5nSGFuZGxlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhc1BpbmdIYW5kbGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5waW5nSGFuZGxlICE9PSBudWxsICYmIHR5cGVvZiB0aGlzLnBpbmdIYW5kbGUgIT09ICd1bmRlZmluZWQnO1xyXG4gIH1cclxufVxyXG4iXX0=