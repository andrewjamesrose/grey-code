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
    countryInput = new FormControl('')
    availableOptions: Observable<ICountry[]>


    constructor(private testService: GameLogicService){
        //set up service subscriptions
        this.testService.getPrevioustGuesses()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(guessesIn => {this._guessList = guessesIn.concat(Array(MAX_GUESSES-guessesIn.length).fill(""))})


        //Country List Filter
            this.availableOptions = this.countryInput.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value || '')),
                map(value => value.slice(0,MAX_LIST_LENGTH))            
            )
    }


    submit(): void {
        // console.log(this.countryInput.value.name)
        this.testService.updateGuesses(this.countryInput.value.code)
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
