import * as Chance from "chance";

let chance = new Chance();

const labels = ["cat", "dog", "weasel"]
const rowDemoKeys: string[] = ["val1", "val2", "val3", "val4", "val5", "val6", "val7", "val8"]
let _min = 1
let _max = 250


export class DemoRow {
    label: string
    val1?: number
    val2?: number
    val3?: number
    val4?: number
    val5?: number
    val6?: number
    val7?: number
    val8?: number

    constructor(label?: string, startIndex?:number, endIndex?: number) {
        if (label) {
            this.label = label
        } else {
            this.label = chance.pickone(labels)
        }

        startIndex = startIndex ?? 0
        endIndex = endIndex ?? rowDemoKeys.length

        if(startIndex > endIndex) {
            let _a = startIndex
            endIndex = startIndex
            startIndex = _a
        }

        if(startIndex == endIndex) {
            Object.defineProperty(this, rowDemoKeys[startIndex], {value: generateRandomIntegerBetween(_min, _max)} )
        } else {

            rowDemoKeys.slice(startIndex, endIndex).map(propertyName => {
                console.log(propertyName)
                Object.defineProperty(this, propertyName, {value: generateRandomIntegerBetween(_min, _max)}  )
            })
        }

        // this.val1 = generateRandomInteger(_min, _max)
        // this.val2 = generateRandomInteger(_min, _max)
        // this.val3 = generateRandomInteger(_min, _max)
        // this.val4 = generateRandomInteger(_min, _max)
        // this.val5 = generateRandomInteger(_min, _max)
        // this.val6 = generateRandomInteger(_min, _max)
        // this.val7 = generateRandomInteger(_min, _max)
        // this.val8 = generateRandomInteger(_min, _max)
    }
}


export function generateRandomIntegerBetween(min: number, max: number): number {
    return Math.floor(min + Math.random()*(max - min + 1))
  }