import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NEW_COUNTRY_LIST } from 'src/assets/capitals/data';
import { generateRandomInteger } from '../commonFunctions/functions';
import { GAME_MODES, MAX_GUESSES, VIEW_MODES } from '../constants';
import { ICountry } from '../models/game-logic';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

    private _emptyArray: string[] = []
    // private _currentCountry: ICountry

    private _gameMode
    private _displayMode
    private _gameState: string
    private _targetCountry: ICountry

    constructor() {
        this.countryListFull = NEW_COUNTRY_LIST
        this._guessList = []

        this._gameMode = GAME_MODES[0]
        this._displayMode = VIEW_MODES[0]
        this._gameState = 'ACTIVE'
        this._targetCountry = getRandomCountry()
        
        
        this.guessList$ = new BehaviorSubject(this._emptyArray)
        this.gameMode$ = new BehaviorSubject(this._gameMode)
        this.displayMode$ = new BehaviorSubject(this._displayMode)
        this.gameState$ = new BehaviorSubject(this._gameState)
        this.targetCountry$ = new BehaviorSubject(this._targetCountry)
       

        // initialise game modes to 0th defaults

    }

    countryListFull: ICountry[]
    _guessList: string[]

    private guessList$: BehaviorSubject<string[]> 
    private gameMode$: BehaviorSubject<string>
    private displayMode$: BehaviorSubject<string>
    private gameState$: BehaviorSubject<string>
    private targetCountry$: BehaviorSubject<ICountry>


    getPrevioustGuesses(): Observable<string[]> {
        return this.guessList$.asObservable()
    }


    updateGuesses(guessCode: string): void{
        this._guessList.push(guessCode)
        this.guessList$.next(this._guessList)
    }

    
    toggleGameMode(): void{
        let currentIndex = GAME_MODES.indexOf(this._gameMode)
        let maxIndex = GAME_MODES.length

        if(currentIndex===maxIndex){
            this._gameMode=GAME_MODES[0]
        } else {
            this._gameMode=GAME_MODES[currentIndex+1]
        }

        this.gameMode$.next(this._gameMode)
    }


    getGameMode(): Observable<string> {
        return this.gameMode$.asObservable()
    }


    toggleDisplayMode(): void {
        let currentIndex = VIEW_MODES.indexOf(this._displayMode)
        let maxIndex = VIEW_MODES.length

        if(currentIndex===maxIndex){
            this._displayMode=VIEW_MODES[0]
        } else {
            this._displayMode=VIEW_MODES[currentIndex+1]
        }

        this.displayMode$.next(this._displayMode)
    }

    getDisplayMode(): Observable<string> {
        return this.displayMode$.asObservable()
    }

    
    getGameState(): Observable<string> {
        return this.gameState$.asObservable()
    }


    getTargetCountry(): Observable<ICountry> {
        return this.targetCountry$.asObservable()
    }


    gameWon(){
        this._gameState = 'CORRECT'
        this.gameState$.next(this._gameState)  
        this.generateEndOfGameData()  
        console.log("winner!")
    }


    badGuess(){
        //execute if game lost, else continue
        if(this._guessList.length===MAX_GUESSES){
            this._gameState = 'GAMEOVER'
            this.gameState$.next(this._gameState) 
            this.generateEndOfGameData()  
            console.log("game over")
            //send game state to gameover

            //generate end of game data

        }
    }

    generateEndOfGameData(){
        console.log("generating output")
    }


    
    reInitialiseGame(): void {

        this._targetCountry = getRandomCountry()
        this.targetCountry$.next(this._targetCountry)
    
        this._guessList = []
        this.guessList$.next(this._guessList)

        this._gameState = "ACTIVE"
        this.gameState$.next(this._gameState)

        // this.uiActive= true
        // this._guessList=[]
        // this.jumpList=[]

    }


    


    // getMode

    // setMode

}

export function getRandomCountry(): ICountry {
    let _randomIndex = generateRandomInteger(0, NEW_COUNTRY_LIST.length)
    return  NEW_COUNTRY_LIST[_randomIndex]
}