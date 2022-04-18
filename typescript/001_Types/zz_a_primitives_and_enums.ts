
console.log("hello world of adventure")

function add(num1: number, num2: number):number {
    return num1 + num2
}


// //this will fail:
// let input1: string
// let input2: number

// console.log(add(input1, input2))


//this will work:
let input1: number
let input2: number

input1 = 5
input2 = 2

console.log(add(input1, input2))

let myTuple: [number, string]
myTuple = [1, "cat"]

// myTuple = ["cat", 1]

console.log(myTuple)

//Enums
enum MyEnum { ENUM_ONE, ENUM_TWO, ENUM_THREE }
//this automatically maps to 0, 1, 2

//It is possible to dictate the starting integer
enum MyOffsetEnum{
    ENUM_ONE = 17.2, 
    ENUM_TWO, 
    ENUM_THREE
}

//and one can set all the values arbitrarily
enum MyArbitraryEnum {
    ENUM_ONE = 17, 
    ENUM_TWO = -99,  
    ENUM_THREE = 22.2,
    ENUM_FOUR = "cat"   
}

console.log(MyEnum.ENUM_ONE)

//String enums are also possible
enum MyStringEnum {
    Up  = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}

console.log(MyStringEnum.Left)
