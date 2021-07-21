import { Injectable } from '@angular/core';
import { AlternativeStorage } from './alternativestorage';
/*
 * Represents a localStorage store.
 */
export class LocalStorage {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxzdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvbGliL2xvY2Fsc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTFEOztHQUVHO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUFHdkI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxVQUFVO1FBQ2hCLElBQUk7WUFDRixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUM7WUFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckMsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsT0FBTyxDQUFDLEdBQVc7UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxVQUFVLENBQUMsR0FBVztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsT0FBTyxDQUFDLEdBQVcsRUFBRSxJQUFZO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7WUE5REYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWx0ZXJuYXRpdmVTdG9yYWdlIH0gZnJvbSAnLi9hbHRlcm5hdGl2ZXN0b3JhZ2UnO1xyXG5cclxuLypcclxuICogUmVwcmVzZW50cyBhIGxvY2FsU3RvcmFnZSBzdG9yZS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZSB7XHJcbiAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBTYWZhcmksIGluIFByaXZhdGUgQnJvd3NpbmcgTW9kZSwgbG9va3MgbGlrZSBpdCBzdXBwb3J0cyBsb2NhbFN0b3JhZ2UgYnV0IGFsbCBjYWxscyB0byBzZXRJdGVtXHJcbiAgICogdGhyb3cgUXVvdGFFeGNlZWRlZEVycm9yLiBXZSdyZSBnb2luZyB0byBkZXRlY3QgdGhpcyBhbmQganVzdCBzaWxlbnRseSBkcm9wIGFueSBjYWxscyB0b1xyXG4gICAqIHNldEl0ZW1cclxuICAgKiB0byBhdm9pZCB0aGUgZW50aXJlIHBhZ2UgYnJlYWtpbmcsIHdpdGhvdXQgaGF2aW5nIHRvIGRvIGEgY2hlY2sgYXQgZWFjaCB1c2FnZSBvZiBTdG9yYWdlLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0U3RvcmFnZSgpOiBTdG9yYWdlIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2U7XHJcbiAgICAgIHN0b3JhZ2Uuc2V0SXRlbSgnbmcySWRsZVN0b3JhZ2UnLCAnJyk7XHJcbiAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSgnbmcySWRsZVN0b3JhZ2UnKTtcclxuICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIG5ldyBBbHRlcm5hdGl2ZVN0b3JhZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogR2V0cyBhbiBpdGVtIGluIHRoZSBzdG9yYWdlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGdldC5cclxuICAgKiBAcmV0dXJuIFRoZSBjdXJyZW50IHZhbHVlLlxyXG4gICAqL1xyXG4gIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSgnbmcySWRsZS4nICsga2V5KTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUmVtb3ZlcyBhbiBpdGVtIGluIHRoZSBzdG9yYWdlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIHJlbW92ZS5cclxuICAgKi9cclxuICByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnbmcySWRsZS4nICsga2V5KTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogU2V0cyBhbiBpdGVtIGluIHRoZSBzdG9yYWdlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGtleSAtIFRoZSBrZXkgdG8gc2V0IHRoZSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gc2V0IHRvIHRoZSBrZXkuXHJcbiAgICovXHJcbiAgc2V0SXRlbShrZXk6IHN0cmluZywgZGF0YTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSgnbmcySWRsZS4nICsga2V5LCBkYXRhKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUmVwcmVzZW50cyB0aGUgc3RvcmFnZSwgY29tbW9ubHkgdXNlIGZvciB0ZXN0aW5nIHB1cnBvc2VzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGtleSAtIFRoZSBrZXkgdG8gc2V0IHRoZSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gc2V0IHRvIHRoZSBrZXkuXHJcbiAgICovXHJcbiAgX3dyYXBwZWQoKTogU3RvcmFnZSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlO1xyXG4gIH1cclxufVxyXG4iXX0=