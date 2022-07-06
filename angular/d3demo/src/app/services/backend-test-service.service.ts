import { Injectable } from '@angular/core';
import { Fruit } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendTestServiceService {

  subFruitList: Fruit[] = [];
  subListChange: Subject<Fruit[]> = new Subject<Fruit[]>()

  fruitList!: Observable <Fruit[]>

  anotherFruitList: Fruit[] = []

  constructor(private http: HttpClient) {
    //set up subscription. New values are passed to the subscription infrastructure

    //this updates the values on the service however the components cannot dynamically subscribe to these "this.x" variables
    // The best way is to use Subjects to pass values around the application
    this.subListChange.subscribe((newList: Fruit[])=>{
      this.subFruitList = newList
      console.log(newList)
    })
   }



  // returns an observable
  getFruitList(): Observable <Fruit[]> {
    return this.fruitList = this.http.get<Fruit[]>('/api/fruits')
  }

  getFruitsViaSubscription(){
    this.getFruitList().subscribe((data: Fruit[]) => {
      this.subListChange.next(data)
    })
  }



}
