import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { getCountryNameFromCode } from 'src/app/commonFunctions/functions';
import { MAX_GUESSES } from 'src/app/constants';
import { ICountry } from 'src/app/models/interfaces_and_classes';
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

    _guessList: string[] = []
    
    _gameMode!: string
    _displayMode!: string

    countryInput = new FormControl('')
    availableOptions: Observable<ICountry[]>


    constructor(private gameLogic: GameLogicService){
        //set up service subscriptions
        this.gameLogic.getPrevioustGuesses()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(guessesIn => {this._guessList = guessesIn.concat(Array(MAX_GUESSES-guessesIn.length).fill(""))})


        this.gameLogic.getGameMode().subscribe(gameMode =>{this._gameMode = gameMode})
        this.gameLogic.getDisplayMode().subscribe(displayMode =>{this._displayMode = displayMode})


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
        this.gameLogic.updateGuesses(this.countryInput.value.code)
        this.countryInput.setValue('')
    }

    itemSelected(): void {
        console.log(this.countryInput.value.code)
    }

    getCountryName(input: string): string{
        if(NEW_COUNTRY_LIST.map(country => country.code).includes(input)){
            return getCountryNameFromCode(input)
        } else {
            return "―"
        }
    }

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
        return NEW_COUNTRY_LIST.filter(country => country.name.toLowerCase().includes(filterValue)) }
      else {
        const filterValue = inputCountry.name.toLowerCase();
        return NEW_COUNTRY_LIST.filter(country => country.name.toLowerCase().includes(filterValue));
      }
    }


  displayCountryName(country: ICountry): string{
    return country.name
  }


}
