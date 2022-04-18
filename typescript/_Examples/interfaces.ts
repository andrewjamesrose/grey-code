// Intefaces define the types of the properties / methods an object
// It allows us to define the type of a property of an object and whether or not those are optional

// Interfaces compile to nothing in JS. It is only a development-time feature in the language
// nothing is generated for runtime


//syntax
interface Person {
    name: string;
    age: number;
    
    //it is possible to add read-only properties (here, optional property)
    readonly myReadOnlyProperty?: string;
    
    //optional parameter
    bloodtype?: string

    //optional method on the interface:
    greet?(phrase: string): void
  }
   
  //we can guarantee that person.name exists on person
  function greet(person: Person) {
    return "Hello " + person.name;
  }

  const myPerson: Person = {name: "ghost", age: 999}

  //this would fail as shoesize is not defined on the interface
//   const newPerson: Person = {name: "Richard", age: 22, bloodtype: "A+", showsize=5}


// Why use Interfaces instead of Type definitions?
// These are clearer than type definitions

// An use an interface to define a class. 
// The IDE + compiler will check that the new class does indeed implement
// the interface acceptibly:
// Note, implements defines the minimum set of things. We can add more methods / functions

class MyPerson implements Person {
    name: string

    constructor(inputName: string){
        this.name = inputName
    }

    age: number = Math.floor(Math.random()*100)

    //this is fine, it is not required by the interface but we can add extra properties and methods:
    house: string = "Ravenflaw"
}



// Inheritence exists in interfaces:
// This extends the Person interface and requires that a list of superpowers is present
// It is possible to merge multiple interfaces by using a comma separated list after "extends" below
interface Superhero extends Person {
    superPowers: string[]
}

const ratMan: Superhero = {name: "Rat Man", age: 35, superPowers: ["being a rat", "squeaking"]}


//defining a function with an interface:
interface AddFn {
    (a: number, b: number): number
}

let add: AddFn
//this would fail:
// add = (n1: number, n2: number) {
//     return "hello"
// }