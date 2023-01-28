import { Component, OnInit } from '@angular/core';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { AppMode, GameMode, GameState } from '../../constants';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

    _gameMode: GameMode = 'flags'
    _appMode: AppMode = 'GAME'

    constructor(private gameLogicService: GameLogicService) {
        this.gameLogicService.getGameMode().subscribe(gameMode => {this._gameMode = gameMode})
        this.gameLogicService.getAppMode().subscribe(appMode => {this._appMode = appMode})
     }

    ngOnInit(): void {
    }

}
