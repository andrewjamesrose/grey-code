import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ICountry } from 'src/app/models/interfaces_and_classes';
import { NEW_COUNTRY_LIST } from 'src/assets/capitals/data';

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
    filteredOptions!: Observable<string[]>;
  



    ngOnInit() {
        this._countryList = NEW_COUNTRY_LIST
        this.countryNames = this._countryList.map(country => country.name)

        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
            map(value => value.slice(0,20))            
        )

        

        console.log("filter is hit")
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
    //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
        return this.countryNames.filter(name => name.toLowerCase().includes(filterValue));
    }
  }