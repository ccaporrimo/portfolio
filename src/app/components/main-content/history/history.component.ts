import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { HistoryService } from '../../../services/history.service';
import { TimelineNodeBranch } from '../../../interfaces/timeline-node.interface';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { BrowserHelpers } from '../../../services/helpers';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HistoryDetailDialogComponent } from '../../ui/history-detail-dialog/history-detail-dialog.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  imports: [NgTemplateOutlet, MatIcon, DatePipe]
})
export class HistoryComponent {
  protected readonly branches: TimelineNodeBranch[];
  protected readonly currentBranch: WritableSignal<TimelineNodeBranch | null> = signal(null);
  protected readonly selectedBranch: WritableSignal<TimelineNodeBranch | null> = signal(null);

  constructor(private _historyService: HistoryService, private _dialog: MatDialog, private _router: Router) {
    this.branches = this._historyService.branches;
  }

  animateHover(branch: TimelineNodeBranch | null) {
    this.branches.forEach(b => b.isHovered = false);
    if (BrowserHelpers.isMobile()) return;
    this.currentBranch.set(branch);
    if (!branch) return;
    branch.isHovered = true;
  }

  openNode(branch: TimelineNodeBranch | null) {
    this.selectedBranch.set(branch);
    if (!branch) return;

    setTimeout(() => {
      if (BrowserHelpers.isMobile()) {
        this._dialog.open(HistoryDetailDialogComponent, {
          width: '100svw',
          data: branch
        });
        return;
      }
      
      this._router.navigate([{ outlets: { rightpanel: ['history', branch.id] } }]);
    }, 300);
  }
}
