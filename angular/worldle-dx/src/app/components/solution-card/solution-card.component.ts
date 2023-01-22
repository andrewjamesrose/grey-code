import { Component, OnInit } from '@angular/core';
import { ICountry } from 'src/app/models/game-logic';
import { GameLogicService } from 'src/app/services/game-logic.service';

@Component({
  selector: 'solution-card',
  templateUrl: './solution-card.component.html',
  styleUrls: ['./solution-card.component.scss']
})
export class SolutionCardComponent implements OnInit {

  constructor(private gameLogicService: GameLogicService) { 
    this.gameLogicService.getTargetCountry().subscribe(targetCountry=>{this.targetCountry = targetCountry})
  }

  targetCountry!: ICountry

  ngOnInit(): void {
  }

  

}
