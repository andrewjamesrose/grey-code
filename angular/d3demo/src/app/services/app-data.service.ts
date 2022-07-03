import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DemoData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor() {
    this.basketCount = generateRandomInteger(1, 20)
  }

  // Events
  // listChanged = new EventEmitter<number[]>();
  // graphDataChanged = new EventEmitter<DemoData[]>()


  //Subject version using rxjs for communication
  listChanged = new Subject<number[]>();
  graphDataChanged = new Subject<DemoData[]>()

  listOfNumbers: number[] = []
  graphData: DemoData[] = []

  addItem(){
    console.log("adding a new item")
    this.listOfNumbers.push(generateRandomInteger(0, 20))
    // this.listChanged.emit(this.listOfNumbers.slice())
    this.listChanged.next(this.listOfNumbers.slice())
    this.printItems()
  }

  deleteItem(){
    console.log("deleting last item")
    this.listOfNumbers.splice(-1)
    // this.listChanged.emit(this.listOfNumbers.slice())
    this.listChanged.next(this.listOfNumbers.slice())
    this.printItems()
  }

  regenerateItems(){
    console.log("generating new data")
    this.listOfNumbers = Array.from({ length: 20 }, ()=> generateRandomInteger(0,20))
    // this.listChanged.emit(this.listOfNumbers.slice())
    this.listChanged.next(this.listOfNumbers.slice())
    this.printItems()
  }

  newGraphData(){
    this.graphData = this.getGraphData()
    // this.graphDataChanged.emit(this.graphData.slice())
    this.graphDataChanged.next(this.graphData.slice())
    // console.log(this.graphData)
  }

  getItems(){
    //create a copy of the array and return it
    return this.listOfNumbers.slice()
  }


  getGraphData(): DemoData[] {
    let initCols: number = generateRandomInteger(0,12)

    let data: DemoData[] = Array.from({ length: initCols}, ()=> generateDemoItem())

    // let data: DemoData[] = [
    //   {"Framework": "Vue", "Stars": generateRandomInteger(0,100), "Release": 2014},
    //   {"Framework": "React", "Stars": generateRandomInteger(0,100), "Release": 2013},
    //   {"Framework": "Angular", "Stars": generateRandomInteger(0,100), "Release": 2016},
    //   {"Framework": "Backbone", "Stars": generateRandomInteger(0,100), "Release": 2010},
    //   {"Framework": "Ember", "Stars": generateRandomInteger(0,100), "Release": 2011},
    // ];

    return data
  }

  printItems(){
    console.log(this.listOfNumbers)
  }


  //  ###################################################################
  //  ####################                           ####################
  //  ####################  Shopping List Test Code  ####################
  //  ####################                           ####################
  //  ###################################################################

  // Initial value set above in the constructor
  basketCount: number

  // Subject for use in broadcasting the data changes
  basketCountSub = new Subject<number>();

  // Set local value on the service then push the new value down the subject pipe using the "next" method on the subject
  increaseBasket() {
    this.basketCount = this.basketCount + 1
    this.basketCountSub.next(this.basketCount)
  }

  reduceBasket() {
    if (this.basketCount > 0 ) {
      this.basketCount = this.basketCount - 1
    } else {
      this.basketCount = 0
    }

    this.basketCountSub.next(this.basketCount)
  }

}

function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random()*(max - min + 1))
}

function generateDemoItem(): DemoData {
    return {
      "Framework": makeid(6),
      "Stars" : generateRandomInteger(0,100),
      "Release": generateRandomInteger(2000,2022)
    }

}


function makeid(length: number):string {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
              charactersLength));
 }
 return result;
}
