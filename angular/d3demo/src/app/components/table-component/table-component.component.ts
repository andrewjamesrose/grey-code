import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit {

  displayedNumbers: number[] = [];

  constructor(private appData: AppDataService) {

  }

  ngOnInit(): void {
    this.displayedNumbers = this.appData.getItems()

    //subscribe to changes on the Data service
    this.appData.listChanged.subscribe(
      (inboundList: number[]) => {
        this.displayedNumbers = inboundList
      }
    )
  }

}
