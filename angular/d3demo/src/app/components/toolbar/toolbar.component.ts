import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  itemCount: number

  constructor(private appDataService: AppDataService) {
    this.itemCount= appDataService.basketCount
   }



  ngOnInit(): void {
    this.appDataService.basketCountSub.subscribe((next: number) =>{
      this.itemCount = next
    })
  }

}
