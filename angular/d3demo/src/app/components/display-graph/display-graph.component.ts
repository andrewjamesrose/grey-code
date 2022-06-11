import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-display-graph',
  templateUrl: './display-graph.component.html',
  styleUrls: ['./display-graph.component.scss']
})
export class DisplayGraphComponent implements OnInit {

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
