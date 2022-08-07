import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-results-map',
  templateUrl: './results-map.component.html',
  styleUrls: ['./results-map.component.scss']
})
export class ResultsMapComponent implements OnInit {

  constructor() { }

//   private outputResult!: number;
    _outputResult!: number

  @Input() set outputResult(data: number) {
    this._outputResult = data;
    // console.log(this.outputResult);
  };

  get outputResult(): number {
    return this._outputResult
  }

  


  

  ngOnInit(): void {
    // this.outputResult = this.inputItem
  }

  ngOnChange(change: SimpleChanges): void {
    console.log("change detected")
  }



//   ngOnChanges(changes: SimpleChanges): void{
//     this.outputResult = inputItem
//   }
//      Use ngOnChanges whenever you want to detect changes from a variable decorated by @Input. Remember that only changes from the parent component will trigger this function.
//      changes from the parent still update the child value even without implementing ngOnChanges. ngOnChanges simply adds the benefit of tracking those changes with previous and current value.

}
