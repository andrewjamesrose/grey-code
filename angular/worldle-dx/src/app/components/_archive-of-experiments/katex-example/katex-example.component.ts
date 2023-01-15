import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { KatexOptions } from 'ng-katex';

@Component({
  selector: 'app-katex-example',
  templateUrl: './katex-example.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./katex-example.component.scss']
})
export class KatexExampleComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
  }

  equation: string = '\\sum_{i=1}^nx_is\\beta';
  options: KatexOptions = {
    displayMode: true,
  };

}
