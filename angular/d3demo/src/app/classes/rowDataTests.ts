import * as Chance from "chance";

let chance = new Chance();

const labels = ["cat", "dog", "weasel"]
let _min = 1
let _max = 250


export class DemoRow {
    label: string
    val1: number
    val2: number
    val3: number
    val4: number
    val5: number
    val6: number
    val7: number
    val8: number

    constructor(label?: string) {
        if (label) {
            this.label = label
        } else {
            this.label = chance.pickone(labels)
        }
        this.val1 = generateRandomInteger(_min, _max)
        this.val2 = generateRandomInteger(_min, _max)
        this.val3 = generateRandomInteger(_min, _max)
        this.val4 = generateRandomInteger(_min, _max)
        this.val5 = generateRandomInteger(_min, _max)
        this.val6 = generateRandomInteger(_min, _max)
        this.val7 = generateRandomInteger(_min, _max)
        this.val8 = generateRandomInteger(_min, _max)
    }
}


function generateRandomInteger(min: number, max: number) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }