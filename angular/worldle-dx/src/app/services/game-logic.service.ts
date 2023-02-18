import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NEW_COUNTRY_LIST } from 'src/assets/capitals/data';
import { generateRandomInteger } from '../commonFunctions/geographyFunctions';
import { AppMode, GameDisplayMode, GameMode as GameMode, GameState, GAME_MODES, MAX_GUESSES, VIEW_MODES } from '../constants';
import { ICountry } from '../models/game-logic';
import { PopUpDialogServiceService } from './pop-up-dialog-service.service';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

    private _emptyArray: string[] = []
    // private _currentCountry: ICountry

    private _appMode: AppMode
    private _gameMode: GameMode
    private _displayMode
    private _gameState: GameState
    private _targetCountry: ICountry

    constructor(private popUpService: PopUpDialogServiceService) {
        this.countryListFull = NEW_COUNTRY_LIST
        this._guessList = []

        this._appMode = <AppMode>'GAME'  //initialise to game mode
        this._gameMode = GAME_MODES[0]
        this._displayMode = VIEW_MODES[0]
        this._gameState = <GameState>'ACTIVE'
        this._targetCountry = getRandomCountry(this._gameMode)
        
        
        this.guessList$ = new BehaviorSubject(this._emptyArray)

        this.appMode$ = new BehaviorSubject(this._appMode)
        this.gameMode$ = new BehaviorSubject(this._gameMode)
        this.displayMode$ = new BehaviorSubject(this._displayMode)
        this.gameState$ = new BehaviorSubject(this._gameState)
        this.targetCountry$ = new BehaviorSubject(this._targetCountry)

    }

    countryListFull: ICountry[]
    _guessList: string[]

    private guessList$: BehaviorSubject<string[]> 

    private appMode$: BehaviorSubject<AppMode>
    private gameMode$: BehaviorSubject<GameMode>
    private displayMode$: BehaviorSubject<GameDisplayMode>
    private gameState$: BehaviorSubject<GameState>
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
        let maxIndex = GAME_MODES.length-1

        if(currentIndex===maxIndex){
            this._gameMode=GAME_MODES[0]
        } else {
            this._gameMode=GAME_MODES[currentIndex+1]
        }

        this.gameMode$.next(this._gameMode)
    }


    setGameMode(newGameMode: GameMode): void {
        if(this._gameState==='ACTIVE' && this._gameMode!==newGameMode){
            // Bail out with challenge
            this.popUpService.open(newGameMode)
            console.log("Bailing out as there is a game in progress")
        } else {
            this.actuallySetGameMode(newGameMode)
        }
    }

    
    actuallySetGameMode(newGameMode: GameMode): void {
        this._gameMode = newGameMode
        this.gameMode$.next(this._gameMode)    
    }


    getGameMode(): Observable<GameMode> {
        return this.gameMode$.asObservable()
    }


    setAppMode(newAppMode: AppMode): void {
        this._appMode = newAppMode
        this.appMode$.next(this._appMode)
    }


    getAppMode(): Observable<AppMode> {
        return this.appMode$.asObservable()
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

    
    getGameState(): Observable<GameState> {
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

        this._targetCountry = getRandomCountry(this._gameMode)
        this.targetCountry$.next(this._targetCountry)
    
        this._guessList = []
        this.guessList$.next(this._guessList)

        this._gameState = "ACTIVE"
        this.gameState$.next(this._gameState)

        // this.uiActive= true
        // this._guessList=[]
        // this.jumpList=[]

    }


    

    debug_GetCountryList (): ICountry[] {
        return NEW_COUNTRY_LIST
    }


    


    // getMode

    // setMode

}

export function getRandomCountry(gameMode: GameMode): ICountry {
    if (gameMode === "flags") {
        return getRandomCountryFlagMode()
    } else {
        let _randomIndex = generateRandomInteger(0, NEW_COUNTRY_LIST.length)
        return  NEW_COUNTRY_LIST[_randomIndex]
    }

}

export function getRandomCountryFlagMode(): ICountry {
    let uniqueFlagsOnly = NEW_COUNTRY_LIST.filter(country => country.flagIsParent)
    let _randomIndex = generateRandomInteger(0, uniqueFlagsOnly.length)
    return  uniqueFlagsOnly[_randomIndex]
}