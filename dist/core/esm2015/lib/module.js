import { NgModule } from '@angular/core';
import { Idle } from './idle';
import { IdleExpiry } from './idleexpiry';
import { LocalStorageExpiry } from './localstorageexpiry';
import { LocalStorage } from './localstorage';
export class NgIdleModule {
    static forRoot() {
        return {
            ngModule: NgIdleModule,
            providers: [
                LocalStorageExpiry,
                { provide: IdleExpiry, useExisting: LocalStorageExpiry },
                Idle
            ]
        };
    }
}
NgIdleModule.decorators = [
    { type: NgModule, args: [{
                providers: [LocalStorage]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvbGliL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzlDLE1BQU0sT0FBTyxZQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxrQkFBa0I7Z0JBQ2xCLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUU7Z0JBQ3hELElBQUk7YUFDTDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFiRixRQUFRLFNBQUM7Z0JBQ1IsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElkbGUgfSBmcm9tICcuL2lkbGUnO1xyXG5pbXBvcnQgeyBJZGxlRXhwaXJ5IH0gZnJvbSAnLi9pZGxlZXhwaXJ5JztcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlRXhwaXJ5IH0gZnJvbSAnLi9sb2NhbHN0b3JhZ2VleHBpcnknO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL2xvY2Fsc3RvcmFnZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIHByb3ZpZGVyczogW0xvY2FsU3RvcmFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nSWRsZU1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ0lkbGVNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ0lkbGVNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIExvY2FsU3RvcmFnZUV4cGlyeSxcclxuICAgICAgICB7IHByb3ZpZGU6IElkbGVFeHBpcnksIHVzZUV4aXN0aW5nOiBMb2NhbFN0b3JhZ2VFeHBpcnkgfSxcclxuICAgICAgICBJZGxlXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==