import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NEW_COUNTRY_LIST } from 'src/assets/capitals/data';
import { GAME_MODES, GAME_STATES, VIEW_MODES } from '../constants';
import { ICountry } from '../models/interfaces_and_classes';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

    private _emptyArray: string[] = []
    // private _currentCountry: ICountry

    private _gameMode
    private _displayMode
    private _gameState

    constructor() {
        this.countryListFull = NEW_COUNTRY_LIST
        this.remainingGuesses = []

        this._gameMode = GAME_MODES[0]
        this._displayMode = VIEW_MODES[0]
        this._gameState = GAME_STATES[0]
        
        this.guessList$ = new BehaviorSubject(this._emptyArray)
        this.gameMode$ = new BehaviorSubject(this._gameMode)
        this.displayMode$ = new BehaviorSubject(this._displayMode)
        this.gameState$ = new BehaviorSubject(this._gameState)

        // initialise game modes to 0th defaults

    }

    countryListFull: ICountry[]
    remainingGuesses: string[]

    private guessList$: BehaviorSubject<string[]> 
    private gameMode$: BehaviorSubject<string>
    private displayMode$: BehaviorSubject<string>
    private gameState$: BehaviorSubject<string>


    getPrevioustGuesses(): Observable<string[]> {
        return this.guessList$.asObservable()
    }


    updateGuesses(guessCode: string): void{
        this.remainingGuesses.push(guessCode)
        this.guessList$.next(this.remainingGuesses)
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


    setGameState(){
        
    }

    


    // getMode

    // setMode

}
