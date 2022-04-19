// ### Basics:
// Functions can be named.
// Arguments are named and should have specified types
function greet(name: string) {
    console.log("Hello world, " + name.toUpperCase() + "!");
  }

//Return types of functions
//  It is possible (but not mandatory) to include a function return
//  type in the function defintion:
function generateScaledRandomInt(upperBound: number): number {
    return Math.floor(upperBound * Math.random())
}

// it is also possible to define functions via arrow notation:
let helloWorld = () => {
    console.log(helloWorld())
}

//      with arguments and type definition:
let newScaledRandom = (upperBound: number): number => {
    return Math.floor(upperBound * Math.random())
}


//  Passing Functions to Functions
//      We pass the function to the consumer and the consumer executes it,
//          supplying its own arguments at execution
//      this function expects an inputFn with a single string argument
//      which returns a void
let myConsumerVoid = (inputFn: (a: string)=>void) => {
    inputFn("Mr Man")
}

//this would then print "Hello world, Mr Man!"
myConsumerVoid(greet)


// It's also possible to use types to alias functions and add additional properties:

type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
  };

// then we pass the function to the consumer function.
//      again, we can call the function but we also have
//      the add meta-data properties of the function  
function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
  }


  //Function signatures
  