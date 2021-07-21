import { IdleExpiry } from './idleexpiry';
/*
 * Represents a simple in-memory store of expiry values.
 * @extends IdleExpiry
 */
export class SimpleExpiry extends IdleExpiry {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlZXhwaXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvbGliL3NpbXBsZWV4cGlyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTFDOzs7R0FHRztBQUNILE1BQU0sT0FBTyxZQUFhLFNBQVEsVUFBVTtJQUcxQztRQUNFLEtBQUssRUFBRSxDQUFDO1FBSEYsY0FBUyxHQUFTLElBQUksQ0FBQztJQUkvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUksQ0FBQyxLQUFZO1FBQ2YsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDeEI7UUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSWRsZUV4cGlyeSB9IGZyb20gJy4vaWRsZWV4cGlyeSc7XHJcblxyXG4vKlxyXG4gKiBSZXByZXNlbnRzIGEgc2ltcGxlIGluLW1lbW9yeSBzdG9yZSBvZiBleHBpcnkgdmFsdWVzLlxyXG4gKiBAZXh0ZW5kcyBJZGxlRXhwaXJ5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2ltcGxlRXhwaXJ5IGV4dGVuZHMgSWRsZUV4cGlyeSB7XHJcbiAgcHJpdmF0ZSBsYXN0VmFsdWU6IERhdGUgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgbGFzdCBleHBpcnkgZGF0ZS5cclxuICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgZXhwaXJ5IHZhbHVlIHRvIHNldDsgb21pdCB0byBvbmx5IHJldHVybiB0aGUgdmFsdWUuXHJcbiAgICogQHJldHVybiBUaGUgY3VycmVudCBleHBpcnkgdmFsdWUuXHJcbiAgICovXHJcbiAgbGFzdCh2YWx1ZT86IERhdGUpOiBEYXRlIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgIHRoaXMubGFzdFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubGFzdFZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=