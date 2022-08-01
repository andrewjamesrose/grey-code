import { Component, OnInit } from '@angular/core';
import { calculateEarthGreatCircleDistance_KM, generateRandomInteger, getCentroidLatLong } from 'src/app/commonFunctions/functions';
import { ICountry, ILatLong, Jump, JumpPoint } from 'src/app/models/interfaces_and_classes';
import { NEW_COUNTRY_LIST } from 'src/assets/capitals/data';
import { EARTH_MEAN_RADIUS_KM } from 'src/assets/constants';

const MAX_GUESSES = 5


@Component({
  selector: 'app-calc-test',
  templateUrl: './calc-test.component.html',
  styleUrls: ['./calc-test.component.scss']
})
export class CalcTestComponent implements OnInit {

    remainingGuesses: number

    gameState: "ACTIVE"| "GAMEOVER" | 'CORRECT'
    uiActive: boolean

    constructor() { 
        this._countryList = NEW_COUNTRY_LIST
        this.remainingGuesses = MAX_GUESSES
        this.gameState = "ACTIVE"
        this.uiActive= true
        this.initialiseGame()
    }


// Hacky. To be fixed
    // _countryList: {[key: string]: any}[] = []
    _countryList: ICountry[] = []
    
    _selectedCountry!: ICountry

    _capitalSeparation: number | undefined
    _centroidSeparation: number | undefined

    _resultAvailable: boolean | undefined
    _guessList: string[] = []
    target: string = ""
    targetLatLong!: ILatLong;
    targetCountry!: ICountry

    jumpList!: Jump[]


    ngOnInit(): void {
    }


    initialiseGame(): void {
        let _randomIndex = generateRandomInteger(0, this._countryList.length)
        this.targetCountry = this._countryList[_randomIndex]
        this.target = this.targetCountry.code
        this.targetLatLong = this.targetCountry.centroidLatLong
    }
        
    
    onGuess(): void {
        let _newGuess = this._selectedCountry.code
        if (this.isValidGuess(_newGuess)){
            this.updateGuessList(_newGuess)
            this.remainingGuesses = MAX_GUESSES - this._guessList.length

            let _endPointCentroid = this._selectedCountry.centroidLatLong
            this._centroidSeparation = calculateEarthGreatCircleDistance_KM(this.targetLatLong, _endPointCentroid)
                
            // check if guess was correct/not
            if (_newGuess === this.targetCountry.code) {
                this.gameWon()
            } else {
                this.badGuess()
            }
        }
    }

    repeatGuessHandler(code: string): void {

    }

    validGuessHandler(code: string): void {

    }

    isValidGuess(code: string): boolean {
        let _output = true
        if (this._guessList.find(item => item === code)){
            _output = false
        }
        
        return _output
    }

    
    updateGuessList(twoLetterCode: string): void {
        this._guessList.push(twoLetterCode)
    }


    badGuess(): void {
        if (this.remainingGuesses === 0) {
            this.gameOver()
            this.generateEndOfGameData()
        }
    }


    gameOver(): void {
        this.gameState = 'GAMEOVER'
    }


    gameWon(): void {
        this.gameState = 'CORRECT'
        this.generateEndOfGameData()
    }


    generateEndOfGameData(): void {
        //to be implemented
        //generate the coordinate pairs for the output diagram
        this.uiActive = false
        let _attempts = this._guessList.length

        let _answer = this._countryList.find(element => element.code === this.targetCountry.code)

        if(_attempts > 1) {
            this.generateJumpList()
        }   

        // if (this.gameState === 'GAMEOVER') {
        //     if(_answer){
        //         console.log('You did not guess correctly in 5 turns. The correct answer was: ' + _answer.name)
        //     }
        // } else {

        //   console.log("Congratulations, you won in " + _attempts)  
        //   if(_answer) {
        //     console.log("The correct answer was indeed: " + _answer.name)
        //   }
        // }

    }

    resetGame(){
        console.log("resetting game")
        this.remainingGuesses = MAX_GUESSES
        this.gameState = "ACTIVE"
        this.uiActive= true
        this._guessList=[]
        this.jumpList=[]
        this.initialiseGame()

    }


    generateJumpList(){
        let _outputJumpList: Jump[] = []
        let index: number = 0
        for (let index = 1; index < this._guessList.length; index++) {
        // for (let guess of this._guessList) {

                let _start = new JumpPoint(this._guessList[index-1])
                let _end = new JumpPoint(this._guessList[index])
                let _jump = new Jump(_start, _end)
                _outputJumpList.push(_jump)
    
        }

        this.jumpList = _outputJumpList
        console.log(this.jumpList)
    }

    
    getMissDistance(code: string): number {
        let _guess: ILatLong = getCentroidLatLong(code)
        return calculateEarthGreatCircleDistance_KM(_guess, this.targetLatLong)
    }
}