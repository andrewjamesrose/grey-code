import { Component, OnInit } from '@angular/core';
import { COUNTRY_DATA } from 'src/assets/capitals/data';
import { EARTH_MEAN_RADIUS_KM } from 'src/assets/constants';

@Component({
  selector: 'app-calc-test',
  templateUrl: './calc-test.component.html',
  styleUrls: ['./calc-test.component.scss']
})
export class CalcTestComponent implements OnInit {

  constructor() { }


// Hacky. To be fixed
  _countryList: {[key: string]: any}[] = []
  
  _selectedCountryA: {[key: string]: any} = {}
  _selectedCountryB: {[key: string]: any} = {}

  _capitalSeparation: number | undefined
  _centroidSeparation: number | undefined

  _resultAvailable: boolean | undefined

  ngOnInit(): void {
    this._countryList = COUNTRY_DATA
    this._resultAvailable = false
  }

  onSelectChange(): void {
    // console.log("Country A:")
    // console.log(this._selectedCountryA)
    // console.log(Object.keys(this._selectedCountryA).length)
    // console.log("Country B:")
    // console.log(this._selectedCountryB)

    if(!this._resultAvailable) {
      if ((Object.keys(this._selectedCountryA).length > 0) && (Object.keys(this._selectedCountryB).length > 0)) {
        this._resultAvailable = true
      }

    }

    if(this._resultAvailable) {
      let _startPointCapital: LatLong = {
                                  latitute: this._selectedCountryA["Capital Latitude"] ,
                                  longitude:  this._selectedCountryA["Capital Longitude"]
                                }
      let _endPointCapital: LatLong = {
                                  latitute: this._selectedCountryB["Capital Latitude"] ,
                                  longitude:  this._selectedCountryB["Capital Longitude"]
                                }
        
      
      
        this._capitalSeparation = calculateEarthGreatCircleDistance_KM(_startPointCapital, _endPointCapital)
        

        let _startPointCentroid: LatLong = {
          latitute: this._selectedCountryA["Centroid Lat"] ,
          longitude:  this._selectedCountryA["Centroid Long"]
        }
        let _endPointCentroid: LatLong = {
          latitute: this._selectedCountryB["Centroid Lat"] ,
          longitude:  this._selectedCountryB["Centroid Long"]
        }

        


this._centroidSeparation = calculateEarthGreatCircleDistance_KM(_startPointCentroid, _endPointCentroid)

console.log(this._capitalSeparation)
    }
  }




}

interface LatLong {
  latitute: number,
  longitude: number
}

// Thanks, Wikipedia!
// https://en.wikipedia.org/wiki/Great-circle_distance#:~:text=It%20is%20the%20shortest%20distance,line%20through%20the%20sphere's%20interior).

function calculateEarthGreatCircleDistance_KM(startLocation: LatLong, endLocation: LatLong): number {
  let phi_1 = degreesToRadians(startLocation.latitute)
  let phi_2 = degreesToRadians(endLocation.latitute)
  let lambda_1 = degreesToRadians(startLocation.longitude)
  let lambda_2 = degreesToRadians(endLocation.longitude)
  let deltaL = Math.abs(lambda_2-lambda_1)

  let sinComponent = Math.sin(phi_1) * Math.sin(phi_2)
  let cosComponent = Math.cos(phi_1) * Math.cos(phi_2) * Math.cos(deltaL)

  return EARTH_MEAN_RADIUS_KM * Math.acos(sinComponent + cosComponent)
}

function degreesToRadians(degrees: number): number { 
  return degrees * (Math.PI/180)
}