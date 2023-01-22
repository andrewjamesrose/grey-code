import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ICountry } from 'src/app/models/game-logic';
import { GameLogicService } from 'src/app/services/game-logic.service';
// import { ICountry } from 'src/app/models/game-logic';


@Component({
  selector: 'data-review',
  templateUrl: './data-review.component.html',
  styleUrls: ['./data-review.component.scss']
})
export class DataReviewComponent implements OnInit {

  constructor(private gameLogic: GameLogicService) { 
    
  }

  selectedCountry!: ICountry

  countryList: ICountry[] = this.gameLogic.debug_GetCountryList()

  ngOnInit(): void {
  }

  
  
  debugClick(): void {
    console.log(this.countryList)
  }

  handleSelect($event: MatSelectChange):void{
    console.log($event.value)
    this.selectedCountry = $event.value
  }


  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

}
