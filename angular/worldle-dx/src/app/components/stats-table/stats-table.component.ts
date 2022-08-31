import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort, MatSort } from '@angular/material/sort';
import { GameResult, IGameResult, IResultsTable, IResultsTable as IResultsTableObject, IResultsTableDisplayRow } from 'src/app/models/statistics';
import { GameStatisticsService, possibleScores } from 'src/app/services/game-statistics.service';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss']
})
export class StatsTableComponent implements OnInit {

  constructor(private gameStatsService: GameStatisticsService) {}

    inputDataType = new FormControl('totals');
    inputStatType = new FormControl('count');


    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;

    rawData: IResultsTableObject[] = []
    displayedData: IResultsTableDisplayRow[] = []

    resultsColumns: string[] = ['name', 'code', 'one', 'two', 'three', 'four', 'five', 'fail'] //, 'total']
    //resultsData: IResultsTableObject[] = []

    ngOnInit(): void {
        this.rawData = this.gameStatsService.getFullResultsTable()
        this.recalculateTableData()
    }


    getTableFullData() {
        console.log(this.rawData)
    }


    totalGamesPlayed(inputRow: IResultsTableObject): number {
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

        for (let resultRow of this.rawData){
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


function totalGamesPlayed(inputRow: IResultsTableObject): number {
    let _summation = 0
    let fields: string[] = ['one', 'two', 'three', 'four', 'five', 'fail']
    
    for (let fieldName of fields) {
        let _value = inputRow[fieldName as keyof IResultsTableObject]
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

