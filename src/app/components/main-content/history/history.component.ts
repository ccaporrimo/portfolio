import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { HistoryService } from '../../../services/history.service';
import { TimelineNodeBranch } from '../../../interfaces/timeline-node.interface';
import { NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  imports: [NgTemplateOutlet, MatIcon]
})
export class HistoryComponent implements OnInit {
  protected readonly branches: TimelineNodeBranch[];
  protected readonly currentBranch: WritableSignal<TimelineNodeBranch | null> = signal(null);

  constructor(private _historyService: HistoryService) {
    this.branches = this._historyService.branches;
  }

  ngOnInit() {
    setTimeout(() => this.currentBranch.set(this.branches[3]), 3000);
  }

  selectBranch(branch: TimelineNodeBranch | null) {
    this.currentBranch.set(branch);
  }

  animateHover(branch: TimelineNodeBranch | null) {
    this.currentBranch.set(branch);
  }

  openNode(idx: number) {

  }
}
