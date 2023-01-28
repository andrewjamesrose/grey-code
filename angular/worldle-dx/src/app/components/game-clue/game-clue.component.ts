import { Component, OnInit } from '@angular/core';
import { GameMode, GameState } from '../../constants';
import { ICountry } from '../../models/game-logic';
import { GameLogicService } from '../../services/game-logic.service';

@Component({
    selector: 'game-clue',
    templateUrl: './game-clue.component.html',
    styleUrls: ['./game-clue.component.scss']
})
export class GameClueComponent implements OnInit {

    _gameMode!: GameMode
    _targetCountry!: ICountry
    _gameState!: GameState

    constructor(private gameLogicService: GameLogicService) {
        this.gameLogicService.getGameMode().subscribe(gameMode => { this._gameMode = gameMode })
        this.gameLogicService.getTargetCountry().subscribe(targetCountry=>{this._targetCountry = targetCountry})
        this.gameLogicService.getGameState().subscribe(gameState=>{this._gameState = gameState})
    }


    ngOnInit(): void {
    }



}
