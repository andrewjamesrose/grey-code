import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-button-panel',
  templateUrl: './button-panel.component.html',
  styleUrls: ['./button-panel.component.scss']
})
export class ButtonPanelComponent implements OnInit {

  constructor(private appData: AppDataService) {
  }


  ngOnInit(): void {
  }

  addItem(): void{
    // console.log("local click")
    this.appData.addItem()
  }

  deleteItem(): void{
    this.appData.deleteItem()
  }

  regenerateList(): void{
    this.appData.regenerateItems()
  }

}
