import { angleBetweenPointsOnSphere, calculateEarthGreatCircleDistance_KM, getCentroidLatFromCode, getCentroidLongFromCode, getCountryNameFromCode } from "../commonFunctions/geographyFunctions"


export interface ICountry {
    name: string
    capital: string
    capitalLatLong: ILatLong
    centroidLatLong: ILatLong
    code: string
    codeThree: string
    continent: string
}

export class Country implements ICountry {
        name: string
        capital: string
        capitalLatLong: ILatLong
        centroidLatLong: ILatLong
        code: string
        codeThree: string
        continent: string
    constructor(name: string,
                capital: string,
                capitalLatLong: ILatLong,
                centroidLatLong: ILatLong,
                code: string,
                codeThree: string,
                continent: string
        ){
            this.name = name
            this.capital = capital
            this.capitalLatLong = capitalLatLong
            this.centroidLatLong = centroidLatLong
            this.code = code
            this.codeThree = codeThree
            this.continent = continent
        
    }
}

export interface ILatLong {
    latitude: number,
    longitude: number
  }
  
export class LatLong implements ILatLong {
    latitude: number;
    longitude: number
      
    constructor(latitude: number, longitude: number) {
        this.latitude = latitude
        this.longitude = longitude
      }
  
}
  
export interface IJump {
    start: IJumpPoint
    end: IJumpPoint
}
  

export interface IJumpPoint{
      name: string
      code: string
      latlong: ILatLong
  }
  
export class Jump implements IJump {
      start: IJumpPoint
      end: IJumpPoint
      
      constructor(start: JumpPoint, end: JumpPoint){
          this.start = start
          this.end = end
  
      }
  
      getAngle(): number {
          let _result = angleBetweenPointsOnSphere(this.start.latlong, this.end.latlong)
          return _result
      }
  
  
      getDistance(): number {
          let _result = calculateEarthGreatCircleDistance_KM(this.start.latlong, this.end.latlong)
          return _result 
      }
  
  }
  
export class JumpPoint implements IJumpPoint {
    code: string
    name: string
    latlong: ILatLong

    constructor(code: string){
        this.code = code
        this.name = getCountryNameFromCode(code)
        this.latlong = { 
                            latitude: getCentroidLatFromCode(code),
                            longitude: getCentroidLongFromCode(code)
                        }
    }
}


export interface ICountryOld {
    "Country": string
    "Capital": string
    "Capital Latitude": number
    "Capital Longitude": number
    "Two Letter Code": string
    "Three Letter Code": string
    "Centroid Lat": number
    "Centroid Long": number
    "Continent": string
}