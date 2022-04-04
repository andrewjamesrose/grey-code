//union types, we may wish to have a flexible type
// eg something that can accept either a string or a number as an input


function flexibleAdd(num1: number|string, num2: number|string) {
   let result
    if(typeof num1 === "number" && typeof num2 ==="number"){
        result = num1 + num2
    } else {
        result = num1.toString() + num2.toString()
    }
    return result
}

console.log(flexibleAdd(15,2))
console.log(flexibleAdd("hello ","world"))