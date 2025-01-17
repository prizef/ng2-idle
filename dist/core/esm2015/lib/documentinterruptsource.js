import { EventTargetInterruptSource } from './eventtargetinterruptsource';
/*
 * An interrupt source that uses events on the document element (html tag).
 */
export class DocumentInterruptSource extends EventTargetInterruptSource {
    constructor(events, options) {
        super(document.documentElement, events, options);
    }
    /*
     * Checks to see if the event should be filtered.
     * @param event - The original event object.
     * @return True if the event should be filtered (don't cause an interrupt); otherwise, false.
     */
    filterEvent(event) {
        // some browser bad input hacks
        if (event.type === 'mousemove' &&
            // fix for Chrome destop notifications
            ((event.originalEvent &&
                event.originalEvent.movementX === 0 &&
                event.originalEvent.movementY === 0) ||
                // fix for webkit fake mousemove
                ((event.movementX !== void 0 && !event.movementX) || !event.movementY))) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRpbnRlcnJ1cHRzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9saWIvZG9jdW1lbnRpbnRlcnJ1cHRzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLDBCQUEwQixFQUMzQixNQUFNLDhCQUE4QixDQUFDO0FBRXRDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHVCQUF3QixTQUFRLDBCQUEwQjtJQUNyRSxZQUFZLE1BQWMsRUFBRSxPQUE4QztRQUN4RSxLQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxXQUFXLENBQUMsS0FBVTtRQUNwQiwrQkFBK0I7UUFDL0IsSUFDRSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVc7WUFDMUIsc0NBQXNDO1lBQ3RDLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYTtnQkFDbkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssQ0FBQztnQkFDbkMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxnQ0FBZ0M7Z0JBQ2hDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQ3pFO1lBQ0EsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBFdmVudFRhcmdldEludGVycnVwdE9wdGlvbnMsXHJcbiAgRXZlbnRUYXJnZXRJbnRlcnJ1cHRTb3VyY2VcclxufSBmcm9tICcuL2V2ZW50dGFyZ2V0aW50ZXJydXB0c291cmNlJztcclxuXHJcbi8qXHJcbiAqIEFuIGludGVycnVwdCBzb3VyY2UgdGhhdCB1c2VzIGV2ZW50cyBvbiB0aGUgZG9jdW1lbnQgZWxlbWVudCAoaHRtbCB0YWcpLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERvY3VtZW50SW50ZXJydXB0U291cmNlIGV4dGVuZHMgRXZlbnRUYXJnZXRJbnRlcnJ1cHRTb3VyY2Uge1xyXG4gIGNvbnN0cnVjdG9yKGV2ZW50czogc3RyaW5nLCBvcHRpb25zPzogbnVtYmVyIHwgRXZlbnRUYXJnZXRJbnRlcnJ1cHRPcHRpb25zKSB7XHJcbiAgICBzdXBlcihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGV2ZW50cywgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIGV2ZW50IHNob3VsZCBiZSBmaWx0ZXJlZC5cclxuICAgKiBAcGFyYW0gZXZlbnQgLSBUaGUgb3JpZ2luYWwgZXZlbnQgb2JqZWN0LlxyXG4gICAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUgZXZlbnQgc2hvdWxkIGJlIGZpbHRlcmVkIChkb24ndCBjYXVzZSBhbiBpbnRlcnJ1cHQpOyBvdGhlcndpc2UsIGZhbHNlLlxyXG4gICAqL1xyXG4gIGZpbHRlckV2ZW50KGV2ZW50OiBhbnkpOiBib29sZWFuIHtcclxuICAgIC8vIHNvbWUgYnJvd3NlciBiYWQgaW5wdXQgaGFja3NcclxuICAgIGlmIChcclxuICAgICAgZXZlbnQudHlwZSA9PT0gJ21vdXNlbW92ZScgJiZcclxuICAgICAgLy8gZml4IGZvciBDaHJvbWUgZGVzdG9wIG5vdGlmaWNhdGlvbnNcclxuICAgICAgKChldmVudC5vcmlnaW5hbEV2ZW50ICYmXHJcbiAgICAgICAgZXZlbnQub3JpZ2luYWxFdmVudC5tb3ZlbWVudFggPT09IDAgJiZcclxuICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50Lm1vdmVtZW50WSA9PT0gMCkgfHxcclxuICAgICAgICAvLyBmaXggZm9yIHdlYmtpdCBmYWtlIG1vdXNlbW92ZVxyXG4gICAgICAgICgoZXZlbnQubW92ZW1lbnRYICE9PSB2b2lkIDAgJiYgIWV2ZW50Lm1vdmVtZW50WCkgfHwgIWV2ZW50Lm1vdmVtZW50WSkpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=