import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor() { }

  listChanged = new EventEmitter<number[]>();

  listOfNumbers: number[] = []

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

  getItems(){
    //create a copy of the array and return it
    return this.listOfNumbers.slice()
  }

  printItems(){
    console.log(this.listOfNumbers)
  }

}


function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random()*(max - min + 1))
}
