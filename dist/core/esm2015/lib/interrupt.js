/*
 * A class for managing an interrupt from an interrupt source.
 */
export class Interrupt {
    constructor(source) {
        this.source = source;
    }
    /*
     * Subscribes to the interrupt using the specified function.
     * @param fn - The subscription function.
     */
    subscribe(fn) {
        this.sub = this.source.onInterrupt.subscribe(fn);
    }
    /*
     * Unsubscribes the interrupt.
     */
    unsubscribe() {
        this.sub.unsubscribe();
        this.sub = null;
    }
    /*
     * Keeps the subscription but resumes interrupt events.
     */
    resume() {
        this.source.attach();
    }
    /*
     * Keeps the subscription but pauses interrupt events.
     */
    pause() {
        this.source.detach();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJydXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvbGliL2ludGVycnVwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQTs7R0FFRztBQUNILE1BQU0sT0FBTyxTQUFTO0lBR3BCLFlBQW1CLE1BQXVCO1FBQXZCLFdBQU0sR0FBTixNQUFNLENBQWlCO0lBQUcsQ0FBQztJQUU5Qzs7O09BR0c7SUFDSCxTQUFTLENBQUMsRUFBaUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBJbnRlcnJ1cHRBcmdzIH0gZnJvbSAnLi9pbnRlcnJ1cHRhcmdzJztcclxuaW1wb3J0IHsgSW50ZXJydXB0U291cmNlIH0gZnJvbSAnLi9pbnRlcnJ1cHRzb3VyY2UnO1xyXG5cclxuLypcclxuICogQSBjbGFzcyBmb3IgbWFuYWdpbmcgYW4gaW50ZXJydXB0IGZyb20gYW4gaW50ZXJydXB0IHNvdXJjZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJbnRlcnJ1cHQge1xyXG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IEludGVycnVwdFNvdXJjZSkge31cclxuXHJcbiAgLypcclxuICAgKiBTdWJzY3JpYmVzIHRvIHRoZSBpbnRlcnJ1cHQgdXNpbmcgdGhlIHNwZWNpZmllZCBmdW5jdGlvbi5cclxuICAgKiBAcGFyYW0gZm4gLSBUaGUgc3Vic2NyaXB0aW9uIGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIHN1YnNjcmliZShmbjogKGFyZ3M6IEludGVycnVwdEFyZ3MpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRoaXMuc3ViID0gdGhpcy5zb3VyY2Uub25JbnRlcnJ1cHQuc3Vic2NyaWJlKGZuKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogVW5zdWJzY3JpYmVzIHRoZSBpbnRlcnJ1cHQuXHJcbiAgICovXHJcbiAgdW5zdWJzY3JpYmUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zdWIgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBLZWVwcyB0aGUgc3Vic2NyaXB0aW9uIGJ1dCByZXN1bWVzIGludGVycnVwdCBldmVudHMuXHJcbiAgICovXHJcbiAgcmVzdW1lKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zb3VyY2UuYXR0YWNoKCk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIEtlZXBzIHRoZSBzdWJzY3JpcHRpb24gYnV0IHBhdXNlcyBpbnRlcnJ1cHQgZXZlbnRzLlxyXG4gICAqL1xyXG4gIHBhdXNlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zb3VyY2UuZGV0YWNoKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==