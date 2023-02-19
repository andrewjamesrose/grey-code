// export interface IStat {
//     attempts: number
//     correct: number
// }

export interface IGameStats {
    flags: IGameResult
    boundaries: IGameResult 
    capitals: IGameResult 
}

export interface IGameResult {
    one: number
    two: number
    three: number
    four: number
    five: number
    fail: number
}

export class GameResult implements IGameResult {
    one: number
    two: number
    three: number
    four: number
    five: number
    fail: number

    constructor() {
        this.one = 0
        this.two = 0
        this.three = 0
        this.four = 0
        this.five = 0
        this.fail = 0
    }

    getResult(): IGameResult {
        return {
            one: this.one,
            two: this.two,
            three: this.three,
            four: this.four,
            five: this.five,
            fail: this.fail          
        }
    }
}

export interface IFullStats {
    [index: string]: IGameStats;
  }


export interface IResultsTable {
    code: string,
    name: string,
    flags: IGameResult
    boundaries: IGameResult
    capitals: IGameResult
    totals: IGameResult
}

export interface IResultsTableDisplayRow {
    code: string,
    name: string,
    data: IGameResult
}

