import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  // storedValue: number

  constructor() {
    // storedValue=0
  }



  displayedValue = new FormControl('', [Validators.pattern(regexNumberShorthand)]);


  ngOnInit(): void {

  }



  onFocusTest(): void {
    // this.displayedValue.setValue("Benjamin")
  }

  onBlurTest(): void {
    let localString = this.displayedValue.value
    const regex = /m/g;
    let count = (localString.match(regex)||[]).length

    // console.log(this.displayedValue.valid)
    console.log(regexNumberShorthand.test(this.displayedValue.value))

    console.log(count)

    // this.displayedValue.setValue("Button")
  }

}


// const regexNumberShorthand: RegExp = /(\d+[e]\d+|\d+(m)\1+(?!\d))/g
// const regexNumberShorthand: RegExp = /(\d+[e]\d+|\d+(m{1,})(?!\[0-9]))/ig
// const regexNumberShorthand: RegExp = /\d+[e]\d+$|([0-9](m{1,})$)/ig
const regexNumberShorthand: RegExp = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)m{0,}$/ig

// regex
//  https://extendsclass.com/regex-tester.html

//  regex visualiser


// (\d+[e]\d+|\d+(m)\1+)

// (\d+[e]\d+|\d+(m)\1+)
