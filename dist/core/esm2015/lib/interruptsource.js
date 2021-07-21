import { EventEmitter } from '@angular/core';
/*
 * A base for classes that act as a source for interrupts.
 */
export class InterruptSource {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJydXB0c291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvbGliL2ludGVycnVwdHNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTdDOztHQUVHO0FBQ0gsTUFBTSxPQUFnQixlQUFlO0lBT25DLFlBQ1ksUUFBNEMsRUFDNUMsUUFBNEM7UUFENUMsYUFBUSxHQUFSLFFBQVEsQ0FBb0M7UUFDNUMsYUFBUSxHQUFSLFFBQVEsQ0FBb0M7UUFSeEQsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVaLGdCQUFXLEdBQWdDLElBQUksWUFBWSxFQUUvRCxDQUFDO0lBS0QsQ0FBQztJQUVKOztPQUVHO0lBQ0gsTUFBTTtRQUNKLHlHQUF5RztRQUN6Ryx3R0FBd0c7UUFDeEcsZ0hBQWdIO1FBQ2hILElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM3QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSW50ZXJydXB0QXJncyB9IGZyb20gJy4vaW50ZXJydXB0YXJncyc7XHJcblxyXG5kZWNsYXJlIGNvbnN0IFpvbmU6IGFueTtcclxuXHJcbi8qXHJcbiAqIEEgYmFzZSBmb3IgY2xhc3NlcyB0aGF0IGFjdCBhcyBhIHNvdXJjZSBmb3IgaW50ZXJydXB0cy5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnRlcnJ1cHRTb3VyY2Uge1xyXG4gIGlzQXR0YWNoZWQgPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIG9uSW50ZXJydXB0OiBFdmVudEVtaXR0ZXI8SW50ZXJydXB0QXJncz4gPSBuZXcgRXZlbnRFbWl0dGVyPFxyXG4gICAgSW50ZXJydXB0QXJnc1xyXG4gID4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgYXR0YWNoRm4/OiAoc291cmNlOiBJbnRlcnJ1cHRTb3VyY2UpID0+IHZvaWQsXHJcbiAgICBwcm90ZWN0ZWQgZGV0YWNoRm4/OiAoc291cmNlOiBJbnRlcnJ1cHRTb3VyY2UpID0+IHZvaWRcclxuICApIHt9XHJcblxyXG4gIC8qXHJcbiAgICogQXR0YWNoZXMgdG8gdGhlIHNwZWNpZmllZCBldmVudHMgb24gdGhlIHNwZWNpZmllZCBzb3VyY2UuXHJcbiAgICovXHJcbiAgYXR0YWNoKCk6IHZvaWQge1xyXG4gICAgLy8gSWYgdGhlIGN1cnJlbnQgem9uZSBpcyB0aGUgJ2FuZ3VsYXInIHpvbmUgKGEuay5hLiBOZ1pvbmUpIHRoZW4gcmUtZW50ZXIgdGhpcyBtZXRob2QgaW4gaXRzIHBhcmVudCB6b25lXHJcbiAgICAvLyBUaGUgcGFyZW50IHpvbmUgaXMgdXN1YWxseSB0aGUgJzxyb290Picgem9uZSBidXQgaXQgY2FuIGFsc28gYmUgJ2xvbmctc3RhY2stdHJhY2Utem9uZScgaW4gZGVidWcgbW9kZVxyXG4gICAgLy8gSW4gdGVzdHMsIHRoZSBjdXJyZW50IHpvbmUgaXMgdHlwaWNhbGx5IGEgJ1Byb3h5Wm9uZScgY3JlYXRlZCBieSBhc3luYy9mYWtlQXN5bmMgKGZyb20gQGFuZ3VsYXIvY29yZS90ZXN0aW5nKVxyXG4gICAgaWYgKFpvbmUuY3VycmVudC5nZXQoJ2lzQW5ndWxhclpvbmUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICBab25lLmN1cnJlbnQucGFyZW50LnJ1bigoKSA9PiB0aGlzLmF0dGFjaCgpKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5pc0F0dGFjaGVkICYmIHRoaXMuYXR0YWNoRm4pIHtcclxuICAgICAgdGhpcy5hdHRhY2hGbih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlzQXR0YWNoZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBEZXRhY2hlcyBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnRzIG9uIHRoZSBzcGVjaWZpZWQgc291cmNlLlxyXG4gICAqL1xyXG4gIGRldGFjaCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzQXR0YWNoZWQgJiYgdGhpcy5kZXRhY2hGbikge1xyXG4gICAgICB0aGlzLmRldGFjaEZuKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNBdHRhY2hlZCA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=