import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith, takeUntil, Subject } from 'rxjs';
import { ICountry } from 'src/app/models/interfaces_and_classes';
import { HelloWorldService } from 'src/app/services/hello-world.service';
import { NEW_COUNTRY_LIST } from 'src/assets/capitals/data';

//  Angular re-draws are slow
//  Capping list length to minimise redraw
const MAX_LIST_LENGTH = 20

@Component({
  selector: 'app-angular-autofilter-example',
  templateUrl: './angular-autofilter-example.component.html',
  styleUrls: ['./angular-autofilter-example.component.scss']
})
export class AngularAutofilterExampleComponent implements OnInit {
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three', 'Cat'];
    _countryList: ICountry[] = []
    countryNames!: string[]
    filteredOptions: Observable<string[]>
  
    _inboundObservableValue: string = ''

    private unsubscribe$: Subject<any> = new Subject<any>();

    constructor(private testService: HelloWorldService){
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
            map(value => value.slice(0,MAX_LIST_LENGTH))            
        )

        //set up service subscription in constructor
        
        this.testService.getCode()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(codeIn => {this._inboundObservableValue = codeIn})

    }

    ngOnInit() {
        this._countryList = NEW_COUNTRY_LIST
        this.countryNames = this._countryList.map(country => country.name)

    }

    ngOnDestroy() {
        this.unsubscribe$.next('');
        this.unsubscribe$.complete();
      }

    serviceTest(): void{
        // Test code to push a new value to the service
        this.testService.setCode(Math.random().toString())
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
    //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
        return this.countryNames.filter(name => name.toLowerCase().includes(filterValue));
    }
  }