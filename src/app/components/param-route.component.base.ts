import { Directive, Input, OnInit, signal, WritableSignal } from "@angular/core";
import { RouteComponentBase } from "./route.component.base";
import { of, takeUntil } from "rxjs";
import { AnimationHelpers } from "../services/helpers";

@Directive()
export abstract class ParamRouteComponentBase<T> extends RouteComponentBase implements OnInit {
    @Input() item?: T;
    protected abstract getItemByRouteParam: (id: string) => T | undefined;

    protected currentItem: WritableSignal<T | null> = signal(null);
    private _animationOptions: KeyframeAnimationOptions = { duration: 333, easing: 'ease' };

    constructor(private _paramName: string) {
        super();        
    }

    ngOnInit() {
        !!this.item ? this.currentItem.set(this.item) :
            this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => this.routeChanged(params.get(this._paramName)));
    }

    private routeChanged(paramVal: string | null) {
        this.animateOut$().subscribe(_ => {
            if (!paramVal) {
                console.error('Invalid route param');
                return;
            }

            const item = this.getItemByRouteParam(paramVal);
            if (!item) return;
            this.currentItem.set(item);
            this.animateIn();
        });        
    }

    private animateOut$() {
    if (!this.el || !this.currentItem()) return of({});
    const keyframes = [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }];
    return AnimationHelpers.animateEl$(this.el, keyframes, this._animationOptions);
    }

    private animateIn() {
    if (!this.el) return; 
    const keyframes = [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }];
    this.el.animate(keyframes, this._animationOptions);
    }
}