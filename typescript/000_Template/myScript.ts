
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