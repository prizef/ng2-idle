import { NgModule } from '@angular/core';
import { KeepaliveSvc, NgIdleModule } from '@ng-idle/core';
import { Keepalive } from './keepalive';
export class NgIdleKeepaliveModule {
    static forRoot() {
        return {
            ngModule: NgIdleKeepaliveModule,
            providers: [Keepalive, { provide: KeepaliveSvc, useExisting: Keepalive }]
        };
    }
}
NgIdleKeepaliveModule.decorators = [
    { type: NgModule, args: [{ imports: [NgIdleModule.forRoot()] },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMva2VlcGFsaXZlL3NyYy9saWIvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHeEMsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDO1NBQzFFLENBQUM7SUFDSixDQUFDOzs7WUFQRixRQUFRLFNBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEtlZXBhbGl2ZVN2YywgTmdJZGxlTW9kdWxlIH0gZnJvbSAnQG5nLWlkbGUvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBLZWVwYWxpdmUgfSBmcm9tICcuL2tlZXBhbGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoeyBpbXBvcnRzOiBbTmdJZGxlTW9kdWxlLmZvclJvb3QoKV0gfSlcclxuZXhwb3J0IGNsYXNzIE5nSWRsZUtlZXBhbGl2ZU1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ0lkbGVLZWVwYWxpdmVNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ0lkbGVLZWVwYWxpdmVNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW0tlZXBhbGl2ZSwgeyBwcm92aWRlOiBLZWVwYWxpdmVTdmMsIHVzZUV4aXN0aW5nOiBLZWVwYWxpdmUgfV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==