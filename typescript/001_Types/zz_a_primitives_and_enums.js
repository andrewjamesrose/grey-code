"use strict";
console.log("hello world of adventure");
function add(num1, num2) {
    return num1 + num2;
}
// //this will fail:
// let input1: string
// let input2: number
// console.log(add(input1, input2))
//this will work:
let input1;
let input2;
input1 = 5;
input2 = 2;
console.log(add(input1, input2));
let myTuple;
myTuple = [1, "cat"];
// myTuple = ["cat", 1]
console.log(myTuple);
//Enums
var MyEnum;
(function (MyEnum) {
    MyEnum[MyEnum["ENUM_ONE"] = 0] = "ENUM_ONE";
    MyEnum[MyEnum["ENUM_TWO"] = 1] = "ENUM_TWO";
    MyEnum[MyEnum["ENUM_THREE"] = 2] = "ENUM_THREE";
})(MyEnum || (MyEnum = {}));
//this automatically maps to 0, 1, 2
//It is possible to dictate the starting integer
var MyOffsetEnum;
(function (MyOffsetEnum) {
    MyOffsetEnum[MyOffsetEnum["ENUM_ONE"] = 17.2] = "ENUM_ONE";
    MyOffsetEnum[MyOffsetEnum["ENUM_TWO"] = 18.2] = "ENUM_TWO";
    MyOffsetEnum[MyOffsetEnum["ENUM_THREE"] = 19.2] = "ENUM_THREE";
})(MyOffsetEnum || (MyOffsetEnum = {}));
//and one can set all the values arbitrarily
var MyArbitraryEnum;
(function (MyArbitraryEnum) {
    MyArbitraryEnum[MyArbitraryEnum["ENUM_ONE"] = 17] = "ENUM_ONE";
    MyArbitraryEnum[MyArbitraryEnum["ENUM_TWO"] = -99] = "ENUM_TWO";
    MyArbitraryEnum[MyArbitraryEnum["ENUM_THREE"] = 22.2] = "ENUM_THREE";
    MyArbitraryEnum["ENUM_FOUR"] = "cat";
})(MyArbitraryEnum || (MyArbitraryEnum = {}));
console.log(MyEnum.ENUM_ONE);
//String enums are also possible
var MyStringEnum;
(function (MyStringEnum) {
    MyStringEnum["Up"] = "UP";
    MyStringEnum["Down"] = "DOWN";
    MyStringEnum["Left"] = "LEFT";
    MyStringEnum["Right"] = "RIGHT";
})(MyStringEnum || (MyStringEnum = {}));
console.log(MyStringEnum.Left);
//# sourceMappingURL=zz_a_primitives_and_enums.js.map