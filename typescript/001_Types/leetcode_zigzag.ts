//union types, we may wish to have a flexible type
// eg something that can accept either a string or a number as an input


// function flexibleAdd(num1: number|string, num2: number|string) {
//    let result
//     if(typeof num1 === "number" && typeof num2 ==="number"){
//         result = num1 + num2
//     } else { 
//         result = num1.toString() + num2.toString()
//     }
//     return result
// }

// console.log(flexibleAdd(15,2))
// console.log(flexibleAdd("hellox ","world"))

function convert(s: string, numRows: number): string {
    let inputString: string[] = s.split("")
    let colNumber: number
    let tempArray: string[][] = []

    colNumber = Math.floor(inputString.length/numRows)

    if(tempArray.length % numRows != 0) {
        colNumber+1
    } 

    //define the internal structure of tempArray and fill with 0s:
    for(let i=0; i<numRows; i++){
        tempArray[i] = "0".repeat(colNumber).split("")
    }


    let _col = 0
    let _row = 0

    let colStep = 0
    let rowStep = 1

    for(let i=0; i<inputString.length; i++){
        // _col = _col + colStep
        // _row = _row + rowStep

        if ((i+1) % numRows === 0 ){
            if(colStep === 0){
                colStep = 1
                rowStep = -1
            } else {
                colStep = 0
                rowStep = 1
            }
        }

        tempArray[_row][_col] = inputString[i]

        _col = _col + colStep
        _row = _row + rowStep
    }

    console.log(tempArray)


    return ""
};

let inputString: string
inputString = "PAYPALISHIRING"
convert(inputString, 2)
