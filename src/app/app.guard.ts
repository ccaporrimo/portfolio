import { CanActivateFn } from "@angular/router";
import { of } from "rxjs";
import { WindowStorage } from "../constants";
import { inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FirstVisitDialogComponent } from "./components/ui/first-visit-dialog/first-visit-dialog.component";
import { BrowserHelpers } from "./services/helpers";

export const firstVisitGuard: CanActivateFn = (route, state) => {
    if (!window.localStorage.getItem(WindowStorage.lsHasVisited)) {
        const dialog = inject(MatDialog);
        const { isMobile } = BrowserHelpers;
        dialog.open(FirstVisitDialogComponent, {
           height:  isMobile() ? '75svh' : '60svh',
           width: isMobile() ? '100svw' : '60svw',
           disableClose: true           
        });
    }

    window.localStorage.setItem(WindowStorage.lsHasVisited, 'true');
    return of(true);
}