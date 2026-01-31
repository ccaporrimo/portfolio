import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { TimelineNode } from '../../../interfaces/timeline-node.interface';
import { HistoryDetailComponent } from "../../main-content/history-detail/history-detail.component";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-history-detail-dialog',
  templateUrl: './history-detail-dialog.component.html',
  styleUrls: ['./history-detail-dialog.component.scss'],
  imports: [MatDialogContent, HistoryDetailComponent, MatIcon]
})
export class HistoryDetailDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TimelineNode, private _dialogRef: MatDialogRef<HistoryDetailDialogComponent>) {
    console.log('data: ', data);
  }

  ngOnInit() {
  }

  close() {
    this._dialogRef.close();
  }

}
