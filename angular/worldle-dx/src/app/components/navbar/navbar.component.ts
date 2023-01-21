import { Component, OnInit } from '@angular/core';
import { PopUpDialogServiceService } from 'src/app/services/pop-up-dialog-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private popUpService: PopUpDialogServiceService) { }

  ngOnInit(): void {
  }

  testClick(): void {
    console.log("clicky mc clickface")
    this.popUpService.open()
  }

}
