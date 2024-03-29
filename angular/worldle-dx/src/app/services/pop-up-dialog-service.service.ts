import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GameMode } from '../constants';
import { PopUpDialogComponent } from '../shared/pop-up-dialog/pop-up-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpDialogServiceService {

  constructor(private dialog: MatDialog) { }

  dialogRef!: MatDialogRef<PopUpDialogComponent>

  public open(newGameMode: GameMode){
    this.dialogRef = this.dialog.open(PopUpDialogComponent, {data: newGameMode})
  }
 
}
