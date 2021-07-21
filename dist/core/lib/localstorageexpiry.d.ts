import { IdleExpiry } from './idleexpiry';
import { LocalStorage } from './localstorage';
import * as ɵngcc0 from '@angular/core';
export declare class LocalStorageExpiry extends IdleExpiry {
    private localStorage;
    private idleName;
    constructor(localStorage: LocalStorage);
    last(value?: Date): Date;
    idling(value?: boolean): boolean;
    getIdleName(): string;
    setIdleName(key: string): void;
    private getExpiry;
    private setExpiry;
    private getIdling;
    private setIdling;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<LocalStorageExpiry, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<LocalStorageExpiry>;
}

//# sourceMappingURL=localstorageexpiry.d.ts.map