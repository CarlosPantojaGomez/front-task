import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  public text: string;

  @Output() acept = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data) {
      if (this.data.reset) {
        this.text = 'Are you sure you want to reset all data?';
      } else if (this.data.remove) {
        this.text = 'Are you sure you want to delete all data?';
      }
    } else {
      this.text = 'Someting went wrong';
    }
  }

  public accept(): void {
    this.acept.emit();
  }

}
