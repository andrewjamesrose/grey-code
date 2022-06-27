import { Injectable } from '@angular/core';
import { Fruit } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendTestServiceService {

  constructor(private http: HttpClient) { }

  fruitList!: Observable <Fruit[]>

  getFruitList(){
    this.fruitList = this.http.get<Fruit[]>('/api.fruit')
  }
}
