import { Component, OnInit } from '@angular/core';
import { printFrozenObject } from 'src/app/commonFunctions/debugFunctions';
import { GameStatisticsService, totalGamesInResultObject } from 'src/app/services/game-statistics.service';

@Component({
  selector: 'app-stats-testing',
  templateUrl: './stats-testing.component.html',
  styleUrls: ['./stats-testing.component.scss']
})
export class StatsTestingComponent implements OnInit {

    constructor(private gameStatsService: GameStatisticsService) { }

    ngOnInit(): void {
    }


    readAndPrintStats(): void {
        console.log(this.gameStatsService.getFullStatsFromDisk())
    }

    
    printRandomStats(): void {
        console.log(this.gameStatsService.admin_generateRandomStats())
    }

    overwriteRandomStatsToDisk(): void {
        let randomStats = this.gameStatsService.admin_generateRandomStats()
        this.gameStatsService.admin_OverwriteToDisk(randomStats)
        console.log("succesfully reset local stats with random data")
    }

    checkFunction(): void {
        let input = 'BR'

        // console.log(this.gameStatsService.getSingleFlagStats(input))
        // console.log(this.gameStatsService.getSingleBoundaryStats(input))
        // console.log(this.gameStatsService.getSingleCombinedStats(input))

        // console.log(this.gameStatsService.getAllFlagStats())
        // console.log(this.gameStatsService.getAllBoundaryStats())
        // console.log(this.gameStatsService.getAllStatsTotal())

        console.log(totalGamesInResultObject(this.gameStatsService.getSingleFlagStats(input)))
    }

    testAddScore(): void {
    // addCountryStat(code: string, score: possibleScores, gameMode: string)

    console.log("initial state in memory:")
    // console.log(JSON.stringify(this.gameStatsService.admin_getStatsFromMemory()))
    printFrozenObject(this.gameStatsService.admin_getStatsFromMemory())

    console.log("updating local memory object...")
    this.gameStatsService.addCountryStat('AI', 'three', 'flags')

    console.log("new memory state:")
    printFrozenObject(this.gameStatsService.admin_getStatsFromMemory())

    }

}
