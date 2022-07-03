import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendTestServiceService } from 'src/app/services/backend-test-service.service';
import { Fruit } from 'src/app/interfaces/interfaces';
import { AppDataService } from 'src/app/services/app-data.service';
import { Person } from 'src/app/classes/person';

@Component({
  selector: 'app-backend-http-test',
  templateUrl: './backend-http-test.component.html',
  styleUrls: ['./backend-http-test.component.scss']
})
export class BackendHttpTestComponent implements OnInit {
  // foods$ = this.httpInstance.get<any[]>('/api/resource_1');

  foods: Fruit[] = []

  _people: Person[]

  // constructor(private httpInstance: HttpClient) { }

  constructor(private backendService: BackendTestServiceService, private appDataService: AppDataService) {
    this._people = []
  }


  ngOnInit(): void {
    //set up subscriptions to the backend services
    this.foods = this.backendService.subFruitList
    this.backendService.subListChange.subscribe((updatedList: Fruit[]) => {
      this.foods = updatedList
    })

    this._people = this.appDataService.peopleList
    this.appDataService.peopleListChanged.subscribe((newList: Person[]) => {
      this._people = newList
    })
  }


  // clicketyClick() {
  //   this.getFruits()
  // }
  // getFruits() {
  //   //Using local call of observable
  //   this.backendService.getFruitList().subscribe((data: Fruit[]) => this.foods = data )
  // }

  getFruitsFromService(){
    this.backendService.getFruitsViaSubscription()
  }


  resetLocal() {
    this.foods = []
  }


  incrementCount(){
    this.appDataService.increaseBasket()
  }

  decrementCount(){
    this.appDataService.reduceBasket()
  }


  addPerson() {
    this.appDataService.addPerson()

  }

  deletePersonById(id: string) {
    this.appDataService.removePerson(id)
  }

  clearPeople() {
    this.appDataService.resetPeople()
  }

}
