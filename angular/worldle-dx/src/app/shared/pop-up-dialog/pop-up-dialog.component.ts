import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameMode } from 'src/app/constants';
import { GameLogicService } from 'src/app/services/game-logic.service';

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.scss']
})
export class PopUpDialogComponent {

  constructor(private popUpDialog: MatDialogRef<PopUpDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public newGameMode: GameMode,
    private gameLogicService: GameLogicService) { }

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

  yesProceed(): void {
    this.gameLogicService.actuallySetGameMode(this.newGameMode)
    this.gameLogicService.reInitialiseGame()
    this.confirm()
  }

}
