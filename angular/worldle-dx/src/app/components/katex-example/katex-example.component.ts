import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';

@Component({
  selector: 'app-katex-example',
  templateUrl: './katex-example.component.html',
  styleUrls: ['./katex-example.component.scss']
})
export class KatexExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  equation: string = '\\sum_{i=1}^nx_i';
  options: KatexOptions = {
    displayMode: true,
  };

}
