import { Component, OnInit } from '@angular/core';
import { GameMode } from 'src/app/constants';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { PopUpDialogServiceService } from 'src/app/services/pop-up-dialog-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private popUpService: PopUpDialogServiceService, private gameLogicService: GameLogicService) { }

  ngOnInit(): void {
  }

//   testClick(): void {
//     console.log("clicky mc clickface")
//     this.popUpService.open()
//   }

  modeSelector(newGameMode: GameMode): void {
    this.gameLogicService.setGameMode(newGameMode)
  }

}
