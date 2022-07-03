import * as Chance from "chance";
import { IPerson } from "../interfaces/interfaces";

let chance = new Chance();

export class Person implements IPerson {
  firstName: string
  lastName: string
  city: string
  birthday: Date
  guid: string

  constructor(){
    this.firstName = chance.first({ nationality: "en"})
    this.lastName = chance.last({ nationality: "en"})
    this.city = chance.city();
    this.birthday = chance.birthday()
    this.guid = chance.guid()
  }
}
