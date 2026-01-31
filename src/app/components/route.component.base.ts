import { Directive, ElementRef, inject, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";

@Directive()
export abstract class RouteComponentBase implements OnDestroy {
    protected route: ActivatedRoute = inject(ActivatedRoute);
    protected elRef: ElementRef = inject(ElementRef);
    protected destroy$: Subject<void> = new Subject();

    protected get el() { return this.elRef?.nativeElement; }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}