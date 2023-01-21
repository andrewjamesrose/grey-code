import { Component, OnInit } from '@angular/core';
import { ICountry } from 'src/app/models/game-logic';
import { GameLogicService } from 'src/app/services/game-logic.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  constructor(private gameLogic: GameLogicService) { }

  _gameMode!: string
  _displayMode!: string
  _gameState!: string
  _targetCountry!: ICountry

  ngOnInit(): void {
    this.gameLogic.getGameMode().subscribe(gameMode =>{this._gameMode = gameMode})
    this.gameLogic.getDisplayMode().subscribe(displayMode =>{this._displayMode = displayMode})
    this.gameLogic.getTargetCountry().subscribe(targetCountry=>{this._targetCountry = targetCountry})
    this.gameLogic.getGameState().subscribe(gameState=>{this._gameState = gameState})
  }


  regenerateJSON() {
    let _countryList = this.gameLogic.debug_GetCountryList()
    console.log("country list:")
    
    console.log(_countryList)
  }

}
