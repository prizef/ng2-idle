import { Injectable } from '@angular/core';
import { IdleExpiry } from './idleexpiry';
import { LocalStorage } from './localstorage';
/*
 * Represents a localStorage store of expiry values.
 * @extends IdleExpiry
 */
export class LocalStorageExpiry extends IdleExpiry {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxzdG9yYWdlZXhwaXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvbGliL2xvY2Fsc3RvcmFnZWV4cGlyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDOzs7R0FHRztBQUVILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxVQUFVO0lBR2hELFlBQW9CLFlBQTBCO1FBQzVDLEtBQUssRUFBRSxDQUFDO1FBRFUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGdEMsYUFBUSxHQUFHLE1BQU0sQ0FBQztJQUkxQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFJLENBQUMsS0FBWTtRQUNmLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWU7UUFDcEIsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXLENBQUMsR0FBVztRQUNyQixJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVPLFNBQVM7UUFDZixNQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBQzVFLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRU8sU0FBUyxDQUFDLEtBQVc7UUFDM0IsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLEVBQ3pCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FDM0IsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVPLFNBQVM7UUFDZixNQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBQzVFLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLEtBQUssTUFBTSxDQUFDO1NBQzFCO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVPLFNBQVMsQ0FBQyxLQUFjO1FBQzlCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDeEU7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQzs7O1lBakZGLFVBQVU7OztZQU5GLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElkbGVFeHBpcnkgfSBmcm9tICcuL2lkbGVleHBpcnknO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL2xvY2Fsc3RvcmFnZSc7XHJcblxyXG4vKlxyXG4gKiBSZXByZXNlbnRzIGEgbG9jYWxTdG9yYWdlIHN0b3JlIG9mIGV4cGlyeSB2YWx1ZXMuXHJcbiAqIEBleHRlbmRzIElkbGVFeHBpcnlcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZUV4cGlyeSBleHRlbmRzIElkbGVFeHBpcnkge1xyXG4gIHByaXZhdGUgaWRsZU5hbWUgPSAnbWFpbic7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYWxTdG9yYWdlOiBMb2NhbFN0b3JhZ2UpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgbGFzdCBleHBpcnkgZGF0ZSBpbiBsb2NhbFN0b3JhZ2UuXHJcbiAgICogSWYgbG9jYWxTdG9yYWdlIGRvZXNuJ3Qgd29yayBjb3JyZWN0bHkgKGkuZS4gU2FmYXJpIGluIHByaXZhdGUgbW9kZSksIHdlIHN0b3JlIHRoZSBleHBpcnkgdmFsdWUgaW4gbWVtb3J5LlxyXG4gICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBleHBpcnkgdmFsdWUgdG8gc2V0OyBvbWl0IHRvIG9ubHkgcmV0dXJuIHRoZSB2YWx1ZS5cclxuICAgKiBAcmV0dXJuIFRoZSBjdXJyZW50IGV4cGlyeSB2YWx1ZS5cclxuICAgKi9cclxuICBsYXN0KHZhbHVlPzogRGF0ZSk6IERhdGUge1xyXG4gICAgaWYgKHZhbHVlICE9PSB2b2lkIDApIHtcclxuICAgICAgdGhpcy5zZXRFeHBpcnkodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RXhwaXJ5KCk7XHJcbiAgfVxyXG5cclxuICBpZGxpbmcodmFsdWU/OiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICB0aGlzLnNldElkbGluZyh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5nZXRJZGxpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogR2V0cyB0aGUgaWRsZSBuYW1lLlxyXG4gICAqIEByZXR1cm4gVGhlIG5hbWUgb2YgdGhlIGlkbGUuXHJcbiAgICovXHJcbiAgZ2V0SWRsZU5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmlkbGVOYW1lO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBTZXRzIHRoZSBpZGxlIG5hbWUuXHJcbiAgICogQHBhcmFtIFRoZSBuYW1lIG9mIHRoZSBpZGxlLlxyXG4gICAqL1xyXG4gIHNldElkbGVOYW1lKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgIHRoaXMuaWRsZU5hbWUgPSBrZXk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEV4cGlyeSgpOiBEYXRlIHtcclxuICAgIGNvbnN0IGV4cGlyeTogc3RyaW5nID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmlkbGVOYW1lICsgJy5leHBpcnknKTtcclxuICAgIGlmIChleHBpcnkpIHtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHBhcnNlSW50KGV4cGlyeSwgMTApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRFeHBpcnkodmFsdWU6IERhdGUpIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICAgIHRoaXMuaWRsZU5hbWUgKyAnLmV4cGlyeScsXHJcbiAgICAgICAgdmFsdWUuZ2V0VGltZSgpLnRvU3RyaW5nKClcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5pZGxlTmFtZSArICcuZXhwaXJ5Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldElkbGluZygpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGlkbGluZzogc3RyaW5nID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmlkbGVOYW1lICsgJy5pZGxpbmcnKTtcclxuICAgIGlmIChpZGxpbmcpIHtcclxuICAgICAgcmV0dXJuIGlkbGluZyA9PT0gJ3RydWUnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRJZGxpbmcodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuaWRsZU5hbWUgKyAnLmlkbGluZycsIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmlkbGVOYW1lICsgJy5pZGxpbmcnLCAnZmFsc2UnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19