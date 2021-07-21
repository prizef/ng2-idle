/*
 * Represents a base class for types that provide expiry detection for the Idle service.
 */
export class IdleExpiry {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRsZWV4cGlyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2xpYi9pZGxlZXhwaXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsTUFBTSxPQUFnQixVQUFVO0lBSTlCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsRUFBRSxDQUFDLEtBQVc7UUFDWixJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQzthQUMxRDtZQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFTRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLEtBQWU7UUFDcEIsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7UUFFRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEdBQUc7UUFDRCwwQkFBMEI7UUFDMUIsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLE9BQU8sTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2hELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFJlcHJlc2VudHMgYSBiYXNlIGNsYXNzIGZvciB0eXBlcyB0aGF0IHByb3ZpZGUgZXhwaXJ5IGRldGVjdGlvbiBmb3IgdGhlIElkbGUgc2VydmljZS5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJZGxlRXhwaXJ5IHtcclxuICBwcm90ZWN0ZWQgaWRWYWx1ZTogYW55O1xyXG4gIHByb3RlY3RlZCBpZGxpbmdWYWx1ZTogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmlkVmFsdWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy5pZGxpbmdWYWx1ZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBHZXRzIG9yIHNldHMgYSB1bmlxdWUgSUQgZm9yIHRoZSB3aW5kb3dcclxuICAgKiBAcGFyYW0gaWQgLSBUaGUgaWQuXHJcbiAgICogQHJldHVybiBUaGUgY3VycmVudCBpZC5cclxuICAgKi9cclxuICBpZCh2YWx1ZT86IGFueSk6IGFueSB7XHJcbiAgICBpZiAodmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHZhbHVlIG11c3QgYmUgc3BlY2lmaWVkIGZvciB0aGUgSUQuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuaWRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmlkVmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgbGFzdCBleHBpcnkgZGF0ZS5cclxuICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gc2V0LlxyXG4gICAqIEByZXR1cm4gVGhlIGxhc3QgZXhwaXJ5IHZhbHVlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGxhc3QodmFsdWU/OiBEYXRlKTogRGF0ZTtcclxuXHJcbiAgLypcclxuICAgKiBHZXRzIG9yIHNldHMgdGhlIGlkbGluZyB2YWx1ZS5cclxuICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gc2V0LlxyXG4gICAqIEByZXR1cm4gVGhlIGlkbGluZyB2YWx1ZS5cclxuICAgKi9cclxuICBpZGxpbmcodmFsdWU/OiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICB0aGlzLmlkbGluZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaWRsaW5nVmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgRGF0ZS5cclxuICAgKiBAcmV0dXJuIFRoZSBjdXJyZW50IERhdGUuXHJcbiAgICovXHJcbiAgbm93KCk6IERhdGUge1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIHJldHVybiBuZXcgRGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IGl0IGlzIGV4cGlyZWQuXHJcbiAgICogQHJldHVybiBUcnVlIGlmIGV4cGlyZWQ7IG90aGVyd2lzZSwgZmFsc2UuXHJcbiAgICovXHJcbiAgaXNFeHBpcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZXhwaXJ5ID0gdGhpcy5sYXN0KCk7XHJcbiAgICByZXR1cm4gZXhwaXJ5ICE9IG51bGwgJiYgZXhwaXJ5IDw9IHRoaXMubm93KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==