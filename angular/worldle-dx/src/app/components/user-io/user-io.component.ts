import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { getCountryNameFromCode } from 'src/app/commonFunctions/geographyFunctions';
import { MAX_GUESSES } from 'src/app/constants';
import { Country, ICountry } from 'src/app/models/game-logic';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { HelloWorldService } from 'src/app/services/hello-world.service';
import { NEW_COUNTRY_LIST } from 'src/assets/capitals/data';


//  Angular re-draws are slow
//  Capping list length to minimise redraw
const MAX_LIST_LENGTH = 20


@Component({
  selector: 'app-user-io',
  templateUrl: './user-io.component.html',
  styleUrls: ['./user-io.component.scss']
})
export class UserIoComponent implements OnInit {

    private unsubscribe$: Subject<any> = new Subject<any>();

    @ViewChild('countryNameInputElement') inputElement!: ElementRef;

    _guessList: string[] = []
    
    _gameMode!: string
    _displayMode!: string
    _gameState!: string
    _targetCountry!: ICountry

    // _uiActive: boolean = true

    countryInput = new FormControl({value: '', disabled: false}, {validators: countryInputValidator()})
    availableOptions: Observable<ICountry[]>


    constructor(private gameLogic: GameLogicService){
        //set up service subscriptions
        this.gameLogic.getPrevioustGuesses()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(guessesIn => {
                if(guessesIn.length < MAX_GUESSES){
                    this._guessList = guessesIn.concat(Array(MAX_GUESSES-guessesIn.length).fill(""))
                } else if (guessesIn.length === MAX_GUESSES ) {
                    this._guessList = guessesIn
                }   
            })


        this.gameLogic.getGameMode().subscribe(gameMode =>{this._gameMode = gameMode})
        this.gameLogic.getDisplayMode().subscribe(displayMode =>{this._displayMode = displayMode})
        this.gameLogic.getTargetCountry().subscribe(targetCountry=>{this._targetCountry = targetCountry})

        this.gameLogic.getGameState().subscribe(gameState=>{
            this._gameState = gameState
            if(gameState!=='ACTIVE'){
                this.countryInput.disable()
            } else {
                this.countryInput.enable()
            }
        })
        

        //Country List Filter
            this.availableOptions = this.countryInput.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value || '')),
                map(value => value.slice(0,MAX_LIST_LENGTH))            
            )
    }

    // Mode Selectors and Debug (move to menu component??)
    toggleGameMode(): void {
        this.gameLogic.toggleGameMode()
    }


    toggleDisplayMode(): void {
        this.gameLogic.toggleDisplayMode()
    }


    submit(): void {
        // console.log(this.countryInput.value.name)
        let _value: string | ICountry = this.countryInput.value
        if (typeof(_value)!=='string'){
            this.gameLogic.updateGuesses(this.countryInput.value.code)
            if (_value.code === this._targetCountry.code) {
                this.gameLogic.gameWon()
            } else {
                this.gameLogic.badGuess()
            }          
            this.countryInput.setValue('') 
        }
    }


    itemSelected(): void {
        console.log(this.countryInput.value.code)
    }


    resetGame(){
        console.log("resetting game")
        this.gameLogic.reInitialiseGame()
        this.inputElement.nativeElement.focus()

        // To be implemented on results service
        // this.jumpList=[]
        // this.initialiseGame()

    }


    getCountryName(input: string): string{
        if(NEW_COUNTRY_LIST.map(country => country.code).includes(input)){
            return getCountryNameFromCode(input)
        } else {
            return "―"
        }
    }

    // onGuess(): void {
    //     let _newGuess = this._selectedCountry.code
    //     if (this.isValidGuess(_newGuess)){
    //         this.updateGuessList(_newGuess)
    //         this.remainingGuesses = MAX_GUESSES - this._guessList.length

    //         let _endPointCentroid = this._selectedCountry.centroidLatLong
    //         this._centroidSeparation = calculateEarthGreatCircleDistance_KM(_endPointCentroid, this.targetLatLong)
           
    //         this.redrawGraph()

                
    //         // check if guess was correct/not
    //         if (_newGuess === this.targetCountry.code) {
    //             this.gameWon()
    //         } else {
    //             this.badGuess()
    //         }
    //     }
    // }

    // Find length of longest country name to set display box width
    // getLength(): void {
    //    let longest = NEW_COUNTRY_LIST.map(country => country.name).reduce(
    //          (a: string, b: string) => {
    //             return a.length > b.length ? a : b;
    //         }
    //     )
    //     console.log(longest)
    // }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.inputElement.nativeElement.focus()
  }

  ngOnDestroy() {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }

//   private _filter(inputCountry: ICountry): ICountry[] {
    
  private _filter(inputCountry: string|ICountry): ICountry[] {

    // console.log(inputCountry)

    if(typeof inputCountry === 'string'){
    // const filterValue = inputCountry.name.toLowerCase();
        // Method if string
        const filterValue = inputCountry.toLowerCase();

        if( filterValue.length === 0){
            return []
        } else {
            return NEW_COUNTRY_LIST.filter(country => country.name.toLowerCase().includes(filterValue))
        }
    }else {
        const filterValue = inputCountry.name.toLowerCase();
        return NEW_COUNTRY_LIST.filter(country => country.name.toLowerCase().includes(filterValue));
      }
    }


  displayCountryName(country: ICountry): string{
    return country.name
  }


}

export function countryInputValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const inputValue = control.value;
        let errorState = false

        if(typeof inputValue==='string'){
            errorState = true
        }

        //if the form is valid, return null, else return anything eg true (or some object)

        return errorState? {errorMessage: "Choose from list"} : null;
    }
}
