import { Component, OnInit } from '@angular/core';
import { ICountry } from 'src/app/models/game-logic';
// import { ICountry } from 'src/app/models/game-logic';


@Component({
  selector: 'data-review',
  templateUrl: './data-review.component.html',
  styleUrls: ['./data-review.component.scss']
})
export class DataReviewComponent implements OnInit {

  constructor() { 

  }

  countryList: ICountry[] 

  ngOnInit(): void {
  }



  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

}
