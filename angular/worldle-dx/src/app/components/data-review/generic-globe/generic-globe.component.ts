import { Component, OnInit, Input } from '@angular/core';
import { ICountry } from 'src/app/models/game-logic';

@Component({
  selector: 'generic-globe',
  templateUrl: './generic-globe.component.html',
  styleUrls: ['./generic-globe.component.scss']
})
export class GenericGlobeComponent implements OnInit {
    @Input() selectedCountry?: ICountry;


  constructor() { }

  ngOnInit(): void {
  }

}
