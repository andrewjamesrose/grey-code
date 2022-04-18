// from: https://www.typescriptlang.org/docs/handbook/classes.html

// classes: feature for making objects

// defining a basic class with a constructor and a method:
class Animal {
    name: string;
    constructor(theName: string) {
      this.name = theName;
    }
    move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }


// Extending a class:
// we can extend a base class to a modified version of the class
// when calling functions of the base class in the extended class we need to use the super keyword

class Cat extends Animal {
    constructor(name: string) {
      super(name);
    }

    move(distanceInMeters = 45) {
      console.log("Slinking...");
      super.move(distanceInMeters);
    }
  }

  //instantiating a new instance of the custom Cat class
  let whiskerface = new Cat("Whiskers");
  whiskerface.move(20)


// ###  Public, private, and protected modifiers ###
//  Properties and methods are by default public on a class

class StealthAnimal {
    private name: string;

    //NOTE, it is possible to make a property read only
    //it can only be set by a constructor and cannot be changed afterwards
     protected readonly id: number

    constructor(theName: string) {
      this.name = theName;
      this.id = Math.floor(Math.random() * (100) )
    }
  }

let cameleon = new StealthAnimal("Cammo")
//this line would fail:
//  console.log(cameleon.name)

//However, this would work:
console.log(whiskerface.name)


//Extending StealthAnimal would work but it would not be possible for the derived class
// to access the private memebers of the base class. Instead the "protected" modifier should be used


class ExtendedStealthAnimal extends StealthAnimal {
    constructor(name: string) {
        super(name);
      }

      //This would not work as name is private on the base class
        // sayname(){
        //     console.log(`my name is ${this.name}`);
        // }
        
      //This works
        sayID(){
            console.log(`I'm a Fox, my ID is ${this.id}`);
        }
      
}

let speakingFox = new ExtendedStealthAnimal("Fantastic Mr")
speakingFox.sayID()


// ### Getters and Setters ###
//  define using the special get and set keywords

class Thing {
    _size = 0;
   
    get size(): number {
      return this._size;
    }
   
    set size(value: string | number | boolean) {
      let num = Number(value);
   
      // Don't allow NaN, Infinity, etc
   
      if (!Number.isFinite(num)) {
        this._size = 0;
        return;
      }
   
      this._size = num;
    }
  }


//note that these are not called with brackets, they are just get / set by calling the parameter directly
let myThing = new Thing()
myThing.size = 2
console.log(`My thing has a size of: $(myThing.size)`)