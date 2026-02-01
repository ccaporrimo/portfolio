import { Directive, signal, WritableSignal } from "@angular/core";
import { BrowserHelpers } from "../services/helpers";

const { isMobile } = BrowserHelpers;

@Directive()
export class ResizeableComponentBase {
    protected readonly isMobile: WritableSignal<boolean> = signal(false);

    constructor() {                
        this.isMobile.set(isMobile());
        window.addEventListener('resize', () => this.processWindowResize());
    }

    protected processWindowResize() {
        this.isMobile.set(isMobile())
    }
}