import { Component, OnInit } from '@angular/core';
import { AppMode, GameMode } from 'src/app/constants';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { PopUpDialogServiceService } from 'src/app/services/pop-up-dialog-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    _appMode!: AppMode
    _gameMode!: GameMode

  constructor(private popUpService: PopUpDialogServiceService, private gameLogicService: GameLogicService) { 
    this.gameLogicService.getAppMode().subscribe(appMode => {this._appMode = appMode})
    this.gameLogicService.getGameMode().subscribe(gameMode => {this._gameMode = gameMode})
  }

  ngOnInit(): void {
  }

//   testClick(): void {
//     console.log("clicky mc clickface")
//     this.popUpService.open()
//   

  gameModeSelector(newGameMode: GameMode): void {
    this.gameLogicService.setAppMode('GAME')
    this.gameLogicService.setGameMode(newGameMode)
  }

  appModeSelector(newAppMode: AppMode): void {
    this.gameLogicService.setAppMode(newAppMode)
  }

  newGame(): void {
    this.gameLogicService.reInitialiseGame()
  }

}
