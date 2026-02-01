import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-first-visit-dialog',
  templateUrl: './first-visit-dialog.component.html',
  styleUrls: ['./first-visit-dialog.component.scss'],
  imports: [MatIcon, MatDialogContent, MatDialogActions]
})
export class FirstVisitDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<FirstVisitDialogComponent>) { }

  ngOnInit() {
  }

  close() {
    this._dialogRef.close();
  }
}
