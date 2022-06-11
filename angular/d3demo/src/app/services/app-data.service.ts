import { EventEmitter, Injectable } from '@angular/core';
import { DemoData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor() { }

  // Events
  listChanged = new EventEmitter<number[]>();
  graphDataChanged = new EventEmitter<DemoData[]>()

  listOfNumbers: number[] = []
  graphData: DemoData[] = []

  addItem(){
    console.log("adding a new item")
    this.listOfNumbers.push(generateRandomInteger(0, 20))
    this.listChanged.emit(this.listOfNumbers.slice())
    this.printItems()
  }

  deleteItem(){
    console.log("deleting last item")
    this.listOfNumbers.splice(-1)
    this.listChanged.emit(this.listOfNumbers.slice())
    this.printItems()
  }

  regenerateItems(){
    console.log("generating new data")
    this.listOfNumbers = Array.from({ length: 20 }, ()=> generateRandomInteger(0,20))
    this.listChanged.emit(this.listOfNumbers.slice())
    this.printItems()
  }

  newGraphData(){
    this.graphData = this.getGraphData()
    this.graphDataChanged.emit(this.graphData.slice())
    // console.log(this.graphData)
  }

  getItems(){
    //create a copy of the array and return it
    return this.listOfNumbers.slice()
  }


  getGraphData(): DemoData[] {
    let data: DemoData[] = [
      {"Framework": "Vue", "Stars": generateRandomInteger(0,20), "Release": 2014},
      {"Framework": "React", "Stars": generateRandomInteger(0,20), "Release": 2013},
      {"Framework": "Angular", "Stars": generateRandomInteger(0,20), "Release": 2016},
      {"Framework": "Backbone", "Stars": generateRandomInteger(0,20), "Release": 2010},
      {"Framework": "Ember", "Stars": generateRandomInteger(0,20), "Release": 2011},
    ];

    return data
  }

  printItems(){
    console.log(this.listOfNumbers)
  }

}


function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random()*(max - min + 1))
}