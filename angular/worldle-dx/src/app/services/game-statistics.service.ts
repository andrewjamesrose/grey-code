import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { generateRandomInteger, getCountryNameFromCode } from '../commonFunctions/geographyFunctions';
import { GameMode } from '../constants';
import { Country, CountryCode } from '../models/game-logic';
import { GameResult, IFullStats, IGameResult, IGameStats, IResultsTable } from '../models/statistics';
import { getRandomCountry } from './game-logic.service';
import { LocalStorageService } from './local-storage.service';

export type possibleScores = 'one' | 'two' | 'three' | 'four' | 'five' | 'fail'
export const SCORE_ARRAY: possibleScores[] = ['one', 'two', 'three', 'four', 'five']

@Injectable({
    providedIn: 'root'
})
export class GameStatisticsService {

    private gameStats: IFullStats = {}

    private _gameResultsTable: IResultsTable[] = []
    private gameResultsTable$: BehaviorSubject<IResultsTable[]>
    

    constructor(private localStorage: LocalStorageService) {
        if (localStorage.getData('gamestatistics') === null || localStorage.getData('gamestatistics') === '') {
            console.log("creating new blank object")
            localStorage.saveData('gamestatistics', JSON.stringify(new Object()))

        }

        this.gameStats = JSON.parse(localStorage.getData('gamestatistics'))


        console.log ("missing code to generate results table")
        this.gameResultsTable$ = new BehaviorSubject(this._gameResultsTable)
    }

    private readLocalStorage(): void {
        if (this.localStorage.getData('gamestatistics') === null || this.localStorage.getData('gamestatistics') === '') {
            this.localStorage.saveData('gamestatistics', JSON.stringify(new Object()))

        }

        this.gameStats = JSON.parse(this.localStorage.getData('gamestatistics'))

        this._gameResultsTable = this.getFullResultsTable()
        this.gameResultsTable$.next(this._gameResultsTable)

    }

    private writeToLocalStorage(): void {
        this.localStorage.saveData('gamestatistics', JSON.stringify(this.gameStats))
    }


    getFullResultsTable$(): Observable<IResultsTable[]> {
        return this.gameResultsTable$.asObservable()
    }


    getSingleFlagStats(code: CountryCode): IGameResult {
        if (code in this.gameStats) {
            return this.gameStats[code].flags
        } else {
            return new GameResult()
        }
    }


    getSingleBoundaryStats(code: CountryCode): IGameResult {
        if (code in this.gameStats) {
            return this.gameStats[code].boundaries
        } else {
            return new GameResult()
        }
    }

    getSingleCapitalStats(code: CountryCode): IGameResult {
        if (code in this.gameStats) {
            return this.gameStats[code].capitals
        } else {
            return new GameResult()
        }
    }


    getSingleCombinedStats(code: CountryCode): IGameResult {
        // get an array of all results

        let _flagResults = this.getSingleFlagStats(code)
        let _boundaryResults = this.getSingleBoundaryStats(code)
        let _capitalResults = this.getSingleCapitalStats(code)

        let inputArray = [_flagResults, _boundaryResults, _capitalResults]

        // send to the summation array function + return result
        return sumArrayOfResults(inputArray)
    }


    getAllFlagStats(): IGameResult {
        let _filteredArray: IGameResult[] = []

        for (const [key, result] of Object.entries(this.gameStats)) {
            _filteredArray.push(result.flags)
        }

        return sumArrayOfResults(_filteredArray)
    }

    getFullResultsTable(): IResultsTable[] {
        let _resultsTableData: IResultsTable[] = []

        //console.log(this.gameStats)


        Object.keys(this.gameStats).forEach((key) => {
            let tableRow: IResultsTable = {
                code: key,
                name: getCountryNameFromCode(key as CountryCode),
                flags: this.getSingleFlagStats(key as CountryCode),
                boundaries: this.getSingleBoundaryStats(key as CountryCode),
                capitals: this.getSingleCapitalStats(key as CountryCode),
                totals: this.getSingleCombinedStats(key as CountryCode)
            }

            _resultsTableData.push(tableRow)
            // console.log(key, this.gameStats[key]);

        });


        return _resultsTableData
    }


    getAllBoundaryStats(): IGameResult {
        let _filteredArray: IGameResult[] = []

        for (const [key, result] of Object.entries(this.gameStats)) {
            _filteredArray.push(result.boundaries)
        }

        return sumArrayOfResults(_filteredArray)
    }

    getAllCapitalStats(): IGameResult {
        let _filteredArray: IGameResult[] = []

        for (const [key, result] of Object.entries(this.gameStats)) {
            _filteredArray.push(result.capitals)
        }

        return sumArrayOfResults(_filteredArray)
    }


    addCountryStat(code: CountryCode, score: possibleScores, gameMode: GameMode): void {
        //check if the country already exists, if not, add a new one.
        if (!(code in this.gameStats)) {
            this.gameStats[code] = {
                flags: new GameResult().getResult(),
                boundaries: new GameResult().getResult(),
                capitals: new GameResult().getResult()
            }
        }

        // // get the single entry from memory
        let singleGameStat = this.gameStats[code]

        // update single entry with new data
        if (gameMode === "flags") {
            singleGameStat[gameMode][score] = singleGameStat[gameMode][score] + 1
        } else if (gameMode === "boundaries") {
            singleGameStat[gameMode][score] = singleGameStat[gameMode][score] + 1
        } else if (gameMode === "capitals") {
            singleGameStat[gameMode][score] = singleGameStat[gameMode][score] + 1
        }
        


        // Write result back to memory location
        this.gameStats[code] = singleGameStat


        // // write entry back to disk
        this.writeToLocalStorage()

        // // sync new stats from disk
        this.readLocalStorage()
    }


    getAllStatsTotal(): IGameResult {
        // get an array of all results

        let _allFlagResults = this.getAllFlagStats()
        let _allBoundaryResults = this.getAllBoundaryStats()
        let _allCapitalResults = this.getAllCapitalStats()

        let inputArray = [_allFlagResults, _allBoundaryResults, _allCapitalResults]

        // send to the summation array
        return sumArrayOfResults(inputArray)

    }


    resetAllStats(): void {
        // erase the object stored locally in gamestatistics
        this.localStorage.saveData('gamestatistics', JSON.stringify(new Object()))

        // read back the new data into memory
        this.readLocalStorage()
    }


    getFullStatsFromDisk(): IFullStats {
        if (this.localStorage.getData('gamestatistics') === null || this.localStorage.getData('gamestatistics') === '') {
            this.localStorage.saveData('gamestatistics', JSON.stringify(new Object()))

        }

        return JSON.parse(this.localStorage.getData('gamestatistics'))
    }


    admin_generateRandomStats(): IFullStats {
        let statsNumber = 25

        let newStats: IFullStats = {}

        for (let i = 0; i < statsNumber; i++) {
            let _countryCode = getRandomCountry('flags').code
            if (!(_countryCode in newStats)) {
                newStats[_countryCode] = createRandomGameStats()
            }
        }

        return newStats
    }


    admin_OverwriteToDisk(newFullSet: IFullStats): void {
        //Erase local disk
        this.localStorage.saveData('gamestatistics', JSON.stringify(new Object()))

        //write back inbound set
        this.localStorage.saveData('gamestatistics', JSON.stringify(newFullSet))

        //read-back to memory (and push to push data)
        this.readLocalStorage()
    }


    admin_getStatsFromMemory(): IFullStats {
        return this.gameStats
    }

}


function sumArrayOfResults(resultsArray: IGameResult[]): IGameResult {
    let _initialValue = new GameResult

    let _outputResult = resultsArray.reduce((accumulatedValues, currentResult) => {
        for (let [key, value] of Object.entries(currentResult)) {
            accumulatedValues[key as keyof typeof accumulatedValues] = accumulatedValues[key as keyof typeof accumulatedValues] + value
        }
        return accumulatedValues
    }, _initialValue)

    return _outputResult
}


export function totalGamesInResultObject(resultObject: IGameResult): number {
    return Object.values(resultObject).reduce((a, b) => a + b);
}


function createRandomGameResult(): IGameResult {
    return {
        one: generateRandomInteger(0, 50),
        two: generateRandomInteger(0, 50),
        three: generateRandomInteger(0, 50),
        four: generateRandomInteger(0, 50),
        five: generateRandomInteger(0, 50),
        fail: generateRandomInteger(0, 50)
    }
}


function createRandomGameStats(): IGameStats {
    return {
        flags: createRandomGameResult(),
        boundaries: createRandomGameResult(),
        capitals: createRandomGameResult()
    }
}