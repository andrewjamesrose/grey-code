import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort, MatSort } from '@angular/material/sort';
import { GameResult, IGameResult, IResultsTable, IResultsTableDisplayRow } from 'src/app/models/statistics';
import { GameStatisticsService, possibleScores } from 'src/app/services/game-statistics.service';


@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss']
})
export class StatsTableComponent implements OnInit {

  // _resultsTable: IResultsTable[] = []

  constructor(private gameStatsService: GameStatisticsService) {
    this.gameStatsService.getFullResultsTable$().subscribe(resultsTable => {
        this._resultsTable = resultsTable
        this.recalculateTableData()
      })
  }

    inputDataType = new FormControl('totals');
    inputStatType = new FormControl('count');

    _resultsTable: IResultsTable[] = []
    displayedData: IResultsTableDisplayRow[] = []

    resultsColumns: string[] = ['name', 'code', 'one', 'two', 'three', 'four', 'five', 'fail'] //, 'total']

    ngOnInit(): void {
        this._resultsTable = this.gameStatsService.getFullResultsTable()
        this.recalculateTableData()
    }


    getTableFullData() {
        this._resultsTable = this.gameStatsService.getFullResultsTable()
        console.log(this._resultsTable)
    }


    totalGamesPlayed(inputRow: IResultsTable): number {
        return totalGamesPlayed(inputRow)
    }


    onDataTypeChange(newValue: string): void {
        console.log(newValue)
        this.recalculateTableData()
    }

    onStatsTypeChange(newValue: string): void{
        console.log(newValue)
        this.recalculateTableData()
        // console.log(this.rawData)
    }

    recalculateTableData(): void {
        let output: IResultsTableDisplayRow[] = []

        for (let resultRow of this._resultsTable){
            // let _displayRow: IResultsTableDisplayRow 
            let _displayRow = IResultsTableDisplayRowFactory()
            _displayRow.code = resultRow.code
            _displayRow.name = resultRow.name

            let dataType = this.inputDataType.value

            if (this.inputStatType.value === 'percentage'){
                _displayRow.data = resultCountToPercent(resultRow[dataType as keyof IResultsTable] as IGameResult)
            } else {
                _displayRow.data = resultRow[dataType as keyof IResultsTable] as IGameResult
            }

            output.push(_displayRow)

        }

        this.displayedData = output
    }

    sortData(sort: Sort) {
        const data = this.displayedData.slice();
        if (!sort.active || sort.direction === '') {
          this.displayedData = data;
          return;
        }
    
        this.displayedData = data.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'name':
                return comparator(a.name, b.name, isAsc);
            case 'code':
                return comparator(a.code, b.code, isAsc);
            case 'one':
              return comparator(a.data.one, b.data.one, isAsc);
            case 'two':
              return comparator(a.data.two, b.data.two, isAsc);
            case 'three':
              return comparator(a.data.three, b.data.three, isAsc);
            case 'four':
              return comparator(a.data.four, b.data.four, isAsc);
            case 'five':
              return comparator(a.data.five, b.data.five, isAsc);
            case 'fail':
                return comparator(a.data.fail, b.data.fail, isAsc);
            default:
              return 0;
          }
        });
      }
    
    

}


function totalGamesPlayed(inputRow: IResultsTable): number {
    let _summation = 0
    let fields: string[] = ['one', 'two', 'three', 'four', 'five', 'fail']
    
    for (let fieldName of fields) {
        let _value = inputRow[fieldName as keyof IResultsTable]
        if (typeof _value === 'number'){
            _summation = _summation + _value
        }
    }

    return _summation
}

function totalInGameResult(gameResult: IGameResult): number {
    let _summation = 0
    
    Object.keys(gameResult).forEach((key) => {
        let _value = gameResult[key as keyof IGameResult] 
        if (typeof _value === 'number'){
            _summation = _summation + _value
        }
    })

    return _summation
}


function resultCountToPercent(gameResult: IGameResult): IGameResult{
    
    let _output: IGameResult = IGameResultFactory()

    let _total = totalInGameResult(gameResult)

    if (_total > 0){

        Object.keys(gameResult).forEach((key) => {

            _output[key as keyof IGameResult] = gameResult[key as keyof IGameResult]/_total
        
        });
    }


    return _output
}


function IGameResultFactory(): IGameResult {
    return  { one: 0, two: 0, three: 0, four: 0, five: 0, fail: 0 }
}


function IResultsTableDisplayRowFactory(): IResultsTableDisplayRow {
    return {
                code: '',
                name: '',
                data: IGameResultFactory()
            }
}


function comparator(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

