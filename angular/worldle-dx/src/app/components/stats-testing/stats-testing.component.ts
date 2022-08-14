import { Component, OnInit } from '@angular/core';
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
        console.log(this.gameStatsService.generateRandomStats())
    }

    overwriteRandomStatsToDisk(): void {
        let randomStats = this.gameStatsService.generateRandomStats()
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

}
