import { Injectable } from '@angular/core';
import { generateRandomInteger } from '../commonFunctions/functions';
import { GameResult, IFullStats, IGameResult, IGameStats } from '../models/statistics';
import { getRandomCountry } from './game-logic.service';
import { LocalStorageService } from './local-storage.service';

type possibleScores = 'one'|'two'|'three'|'four'|'five'|'fail'

@Injectable({
  providedIn: 'root'
})
export class GameStatisticsService {

    private gameStats: IFullStats = {}

  constructor(private localStorage: LocalStorageService) {
        if(localStorage.getData('gamestatistics') === null || localStorage.getData('gamestatistics') === ''){
            console.log("creating new blank object")
            localStorage.saveData('gamestatistics', JSON.stringify(new Object()))

        }

        // this.gameStats = JSON.parse(localStorage.getData('gameStatistics'))
        // // this.gameStats = JSON.parse(localStorage.getData('gameStatistics'))
        // // localStorage.getData('gameStatistics')
        // console.log("Game stats initialised to:")
        // console.log(this.gameStats)
        // console.log(typeof JSON.parse(localStorage.getData('gamestatistics')))
        // console.log(JSON.parse(localStorage.getData('gamestatistics')))
        this.gameStats = JSON.parse(localStorage.getData('gamestatistics'))
        // this.gameStats = JSON.parse(localStorage.getData('getstatistics'))
   }

    private readLocalStorage(): void{
        if(this.localStorage.getData('gamestatistics') === null || this.localStorage.getData('gamestatistics') === ''){
            this.localStorage.saveData('gamestatistics', JSON.stringify(new Object()))

        } 
        
        this.gameStats = JSON.parse(this.localStorage.getData('gamestatistics'))
    }

    private writeToLocalStorage(): void{
        this.localStorage.saveData('gamestatistics', JSON.stringify(this.gameStats))
    }



    getSingleFlagStats(code: string): IGameResult {
        if(code in this.gameStats) {
            return this.gameStats[code].flags
        } else {
            return new GameResult()
        }
    }

    getSingleBoundaryStats(code: string): IGameResult {
        if(code in this.gameStats) {
            return this.gameStats[code].boundaries
        } else {
            return new GameResult()
        }
    }

    getSingleCombinedStats(code: string): IGameResult{
        // get an array of all results

        let _flagResults = this.getSingleFlagStats(code)
        let _boundaryResults = this.getSingleBoundaryStats(code)

        let inputArray = [_flagResults, _boundaryResults]

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

    getAllBoundaryStats(): IGameResult {
        let _filteredArray: IGameResult[] = []

        for (const [key, result] of Object.entries(this.gameStats)) {
            _filteredArray.push(result.boundaries)
        }

        return sumArrayOfResults(_filteredArray)
    }


    // getAllStatsCountry(code: string): IGameResult {
    //     let combinedResult: IGameResult

    //     if(code in this.gameStats){
    //         let _flagsResult = this.gameStats[code].flags
    //         let _boundariesResult = this.gameStats[code].boundaries

    //         let inputArray = [_flagsResult, _boundariesResult]

    //         combinedResult = sumArrayOfResults(inputArray)
        

    //     } else {
    //         combinedResult = new GameResult
    //     }

    //     return combinedResult
    // }


    addCountryStat(code: string, score: possibleScores, gameMode: string): void {
        //check if the country already exists, if not, add a new one.
        if(!(code in this.gameStats)){
            this.gameStats[code] = {
                flags: new GameResult().getResult(),
                boundaries: new GameResult().getResult()
            }
        }

        // // get the single entry from memory
        let singleGameStat = this.gameStats[code]

        // let _tempValue: number

        // update single entry with new data
        if(gameMode === "flags") {
            singleGameStat[gameMode][score] = singleGameStat[gameMode][score] + 1
        } else if (gameMode==="boundaries"){
            singleGameStat[gameMode][score] = singleGameStat[gameMode][score] + 1
        }


        // Write result back to memory location
        this.gameStats[code] = singleGameStat




        // // write entry back to disk
        // this.writeToLocalStorage()

        // // reload new stats from disk
        // this.readLocalStorage()
    }


    getAllStatsTotal(): IGameResult {
        // get an array of all results

        let _allFlagResults = this.getAllFlagStats()
        let _all_BoundaryResults = this.getAllBoundaryStats()

        let inputArray = [_allFlagResults, _all_BoundaryResults]

        // send to the summation array
        return sumArrayOfResults(inputArray)

    }

  
    resetAllStats(): void{
        // erase the object stored locally in gamestatistics
        this.localStorage.saveData('gamestatistics', JSON.stringify(new Object()))

        // read back the new data into memory
        this.readLocalStorage()
    }

    
    getFullStatsFromDisk(): IFullStats {
        if(this.localStorage.getData('gamestatistics') === null || this.localStorage.getData('gamestatistics') === ''){
            this.localStorage.saveData('gamestatistics', JSON.stringify(new Object()))

        } 
        
        return JSON.parse(this.localStorage.getData('gamestatistics'))  
    }


    generateRandomStats(): IFullStats {
        let statsNumber = 25

        let newStats: IFullStats = {}
    
        for (let i = 0; i < statsNumber; i++) {
            let _countryCode = getRandomCountry().code
            if(!(_countryCode in newStats)){
                newStats[_countryCode] = createRandomGameStats()
            }

          }

        return newStats
    }

    admin_OverwriteToDisk(newFullSet: IFullStats): void {
        //Erase local disk
        this.localStorage.saveData('gamestatistics', JSON.stringify(new Object()))

        //write back inboud set
        this.localStorage.saveData('gamestatistics', JSON.stringify(newFullSet))
    }

    admin_getStatsFromMemory(): IFullStats {
        return this.gameStats
    }


}

function sumArrayOfResults(resultsArray : IGameResult[]): IGameResult{
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
        boundaries: createRandomGameResult()
    }
}

// function createRandomFullStat(code: string): IFullStats {
//     return {
//         [code]: createRandomGameStats()  
//     }
// }