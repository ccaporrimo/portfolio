import { from, Observable, take } from "rxjs";

export class Year extends Date { constructor(year: number) { super(year, 0, 1); } }

export function createDeferred<T>() {
    let resolve!: (value?: any) => void;
    let reject!: (reason?: any) => void;

    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });

    return { promise, resolve, reject };
}

export namespace ColorHelpers {
    const changeLuminance = (color: string, percent: number, isDarken = false): string => {
        percent = Math.abs(percent > 1 ? percent / 100 : percent);
        const operator = isDarken ? '-' : '+';
        return `oklch(from ${color} calc(l ${operator} ${percent}) c h)`;
    }

    export const lightenColor = (color: string, percent: number): string => changeLuminance(color, percent);
    export const darkenColor = (color: string, percent: number): string => changeLuminance(color, percent, true);
}

export namespace AnimationHelpers {
    export const deferredTimeout = (cb: () => void, delay: number = 0): Promise<void> => {
        const deferred = createDeferred<void>();
        setTimeout(() => { cb(); deferred.resolve(); }, delay);
        return deferred.promise;
    }

    export const setTimeout$ = (cb: () => void, delay: number = 0): Observable<void> => {
        return from(deferredTimeout(cb, delay)).pipe(take(1));
    }

    export const animateEl$ = (el: HTMLElement, keyframes: Keyframe[], options?: KeyframeAnimationOptions) => {
        return from(el.animate(keyframes, options).finished).pipe(take(1));
    }

    export const fadeOut$ = (el: HTMLElement, duration: number, startingOpacity: number = 1) => {
        const keyframes: Keyframe[] = [{ opacity: startingOpacity }, { opacity: 0 }];
        const options: KeyframeAnimationOptions = { duration, easing: 'ease-in-out' };
        return animateEl$(el, keyframes, options);
    }

    export const slideLeft$ = (el: HTMLElement, distance: string, duration: number, persist: boolean = false) => {
        const keyframes: Keyframe[] = [
            { transform: 'translateX(0)' },
            { transform: `translateX(-${distance})`}
        ];
        const options: KeyframeAnimationOptions = { duration, easing: 'ease-in-out' };
        persist && (options.fill = 'forwards');
        return animateEl$(el, keyframes, options);
    }

    export const slideInFromRight$ = (el: HTMLElement, distance: string, duration: number, persist: boolean = false) => {
        const keyframes: Keyframe[] = [
            { transform: `translateX(${distance})` },
            { transform: 'translateX(0)'}
        ];
        const options: KeyframeAnimationOptions = { duration, easing: 'ease-in-out' };
        persist && (options.fill = 'forwards');
        return animateEl$(el, keyframes, options);
    }
}

export namespace BrowserHelpers {
    export const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;
    export const isLargeWidth = () => window.innerWidth > 1100;
    export const isMobile = () => !isLargeWidth();
}