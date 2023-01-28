import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { elementAt } from 'rxjs';
import { ICountry, ICountryOld } from 'src/app/models/game-logic';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { GlobeVisualiserInputsService, IGeoJSON3D } from 'src/app/services/globe-visualiser-inputs.service';
import { OLD_COUNTRY_DATA } from '../../../assets/capitals/data v1.';

import { Country, ILatLong } from '../../models/game-logic';


@Component({
  selector: 'data-review',
  templateUrl: './data-review.component.html',
  styleUrls: ['./data-review.component.scss']
})
export class DataReviewComponent implements OnInit {

  constructor(private gameLogic: GameLogicService, private globeVisService: GlobeVisualiserInputsService) { 
    
  }

  selectedCountry!: ICountry


  oldCountryData: ICountryOld[] = OLD_COUNTRY_DATA
  countryList: ICountry[] = this.gameLogic.debug_GetCountryList()

  ngOnInit(): void {
  }

  
  
  debugClick(): void {
    console.log(this.countryList)
  }

  debugGeoJSON(): void {
    let geoJSONFiltered = this.globeVisService.getFilteredGeoJSON()

    // ##################################
    // #################################

    let bothLists: string[]
    let onlyThreeD: string[]
    let onlyBoundaryList: string[]

    bothLists = this.countryList.map((element: ICountry) => element.code).filter(twoLetterCodeCountry=>{
        return geoJSONFiltered.map((geoJson: IGeoJSON3D) => geoJson.twoLetterCode).includes(twoLetterCodeCountry)
    })

    onlyBoundaryList = this.countryList.map((element: ICountry) => element.code).filter(twoLetterCodeCountry=>{
        return !geoJSONFiltered.map((geoJson: IGeoJSON3D) => geoJson.twoLetterCode).includes(twoLetterCodeCountry)
    })

    onlyThreeD = geoJSONFiltered.map((element: IGeoJSON3D) => element.twoLetterCode).filter(twoLetterCodeCountry=>{
        return !this.countryList.map((element: ICountry)=>element.code).includes(twoLetterCodeCountry)
    })


    console.log("The full 3D list contains " + geoJSONFiltered.length + " elements")
    console.log("The full boundary list contains " + this.countryList.length + " elements")

    console.log("These exist in both lists:")
    console.log(bothLists)

    console.log("These are only in the 3D List:")
    console.log(onlyThreeD)

    console.log("These are only in the country list")
    console.log(onlyBoundaryList)

    let newCleanedData: ICountry[] = this.countryList.map((element: ICountry)=>{
        return {...element, hasBoundary3D: bothLists.includes(element.code)}
    })

    console.log(newCleanedData)

    // console.log("Full 3D GeoJSON Data")
    // console.log(geoJSONFiltered)


    // 1 genereate a list of all countries in the main country list which do not have a corresponding element in the 3d geojson object
    // 2 generate the inverse list

    // console.log(local)
  }

  handleSelect($event: MatSelectChange):void{
    console.log($event.value)
    this.selectedCountry = $event.value
  }
  
  repairCapitalLatLongs(): void {
    let newCleanedData: ICountry[] = this.countryList.map((newElement: ICountry)=>{
        
        let oldCountry = this.oldCountryData.filter((oldElement: ICountryOld) => {
            return oldElement["Two Letter Code"] === newElement.code
        })

        let _capitalLatLong = {
                                    "latitude": oldCountry[0]["Capital Latitude"],
                                    "longitude":  oldCountry[0]["Capital Longitude"]
                                }

        return {...newElement, capitalLatLong: _capitalLatLong}
    })

    console.log(newCleanedData)

  }

}
