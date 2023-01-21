import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.scss']
})
export class PopUpDialogComponent {

  constructor(private popUpDialog: MatDialogRef<PopUpDialogComponent>) { }

//   ngOnInit(): void {
//   }

  public cancel() {
    this.close(false);
  }
  public close(value: boolean) {
    this.popUpDialog.close(value);
  }
  public confirm() {
    this.close(true);
  }

}
