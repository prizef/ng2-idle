/*
 * Represents an alternative storage for browser that doesn't support localstorage. (i.e. Safari in
 * private mode)
 * @implements Storage
 */
export class AlternativeStorage {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpdmVzdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvbGliL2FsdGVybmF0aXZlc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLGtCQUFrQjtJQUEvQjtRQUNVLGVBQVUsR0FBUSxFQUFFLENBQUM7SUE0RC9CLENBQUM7SUExREM7O09BRUc7SUFDSCxJQUFJLE1BQU07UUFDUixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsT0FBTyxDQUFDLEdBQVc7UUFDakIsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQy9DLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLEtBQWE7UUFDZixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNyRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFVBQVUsQ0FBQyxHQUFXO1FBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE9BQU8sQ0FBQyxHQUFXLEVBQUUsS0FBYTtRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0NBSUYiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBSZXByZXNlbnRzIGFuIGFsdGVybmF0aXZlIHN0b3JhZ2UgZm9yIGJyb3dzZXIgdGhhdCBkb2Vzbid0IHN1cHBvcnQgbG9jYWxzdG9yYWdlLiAoaS5lLiBTYWZhcmkgaW5cclxuICogcHJpdmF0ZSBtb2RlKVxyXG4gKiBAaW1wbGVtZW50cyBTdG9yYWdlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWx0ZXJuYXRpdmVTdG9yYWdlIGltcGxlbWVudHMgU3RvcmFnZSB7XHJcbiAgcHJpdmF0ZSBzdG9yYWdlTWFwOiBhbnkgPSB7fTtcclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm5zIGFuIGludGVnZXIgcmVwcmVzZW50aW5nIHRoZSBudW1iZXIgb2YgZGF0YSBpdGVtcyBzdG9yZWQgaW4gdGhlIHN0b3JhZ2VNYXAgb2JqZWN0LlxyXG4gICAqL1xyXG4gIGdldCBsZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zdG9yYWdlTWFwKS5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFJlbW92ZSBhbGwga2V5cyBvdXQgb2YgdGhlIHN0b3JhZ2UuXHJcbiAgICovXHJcbiAgY2xlYXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0b3JhZ2VNYXAgPSB7fTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSBrZXkncyB2YWx1ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIGtleSAtIG5hbWUgb2YgdGhlIGtleSB0byByZXRyaWV2ZSB0aGUgdmFsdWUgb2YuXHJcbiAgICogQHJldHVybiBUaGUga2V5J3MgdmFsdWVcclxuICAgKi9cclxuICBnZXRJdGVtKGtleTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuc3RvcmFnZU1hcFtrZXldICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5zdG9yYWdlTWFwW2tleV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSBudGgga2V5IGluIHRoZSBzdG9yYWdlXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW5kZXggLSB0aGUgbnVtYmVyIG9mIHRoZSBrZXkgeW91IHdhbnQgdG8gZ2V0IHRoZSBuYW1lIG9mLlxyXG4gICAqIEByZXR1cm4gVGhlIG5hbWUgb2YgdGhlIGtleS5cclxuICAgKi9cclxuICBrZXkoaW5kZXg6IG51bWJlcik6IHN0cmluZyB8IG51bGwge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuc3RvcmFnZU1hcClbaW5kZXhdIHx8IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFJlbW92ZSBhIGtleSBmcm9tIHRoZSBzdG9yYWdlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGtleSAtIHRoZSBuYW1lIG9mIHRoZSBrZXkgeW91IHdhbnQgdG8gcmVtb3ZlLlxyXG4gICAqL1xyXG4gIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RvcmFnZU1hcFtrZXldID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBBZGQgYSBrZXkgdG8gdGhlIHN0b3JhZ2UsIG9yIHVwZGF0ZSBhIGtleSdzIHZhbHVlIGlmIGl0IGFscmVhZHkgZXhpc3RzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGtleSAtIHRoZSBuYW1lIG9mIHRoZSBrZXkuXHJcbiAgICogQHBhcmFtIHZhbHVlIC0gdGhlIHZhbHVlIHlvdSB3YW50IHRvIGdpdmUgdG8gdGhlIGtleS5cclxuICAgKi9cclxuICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0b3JhZ2VNYXBba2V5XSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgW2tleTogc3RyaW5nXTogYW55O1xyXG4gIFtpbmRleDogbnVtYmVyXTogc3RyaW5nO1xyXG59XHJcbiJdfQ==