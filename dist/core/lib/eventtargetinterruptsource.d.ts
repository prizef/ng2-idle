import { InterruptSource } from './interruptsource';
/**
 * Options for EventTargetInterruptSource
 */
export interface EventTargetInterruptOptions {
    /**
     * The number of milliseconds to throttle the events coming from the target.
     */
    throttleDelay?: number;
    /**
     * Whether or not to use passive event listeners.
     * Note: you need to detect if the browser supports passive listeners, and only set this to true if it does.
     */
    passive?: boolean;
}
export declare class EventTargetInterruptSource extends InterruptSource {
    protected target: any;
    protected events: string;
    private eventSrc;
    private eventSubscription;
    protected throttleDelay: number;
    protected passive: boolean;
    constructor(target: any, events: string, options?: number | EventTargetInterruptOptions);
    protected filterEvent(event: any): boolean;
    /**
     * Returns the current options being used.
     * @return The current option values.
     */
    get options(): EventTargetInterruptOptions;
}
