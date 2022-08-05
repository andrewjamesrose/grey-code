import { NEW_COUNTRY_LIST } from "src/assets/capitals/data"
import { EARTH_MEAN_RADIUS_KM } from "src/assets/constants"
import { ICountry, ILatLong, LatLong } from "../models/interfaces_and_classes"


export function degreesToRadians(degrees: number): number { 
  return degrees * (Math.PI/180)
}


export function generateRandomInteger(min: number, max: number) {
    return Math.floor(min + Math.random()*(max - min + 1))
}


export function getCountryNameFromCode(twoLetterCode: string): string {
    let _result = <ICountry>NEW_COUNTRY_LIST.find(country => country.code===twoLetterCode)
    return _result.name
}


export function getCapitalFromCode(twoLetterCode: string): string {
    let _result = <ICountry>NEW_COUNTRY_LIST.find(country => country.code===twoLetterCode)
    return _result.capital
}
  

export function getCentroidLatFromCode(twoLetterCode: string): number {
    let _result = <ICountry>NEW_COUNTRY_LIST.find(country => country.code===twoLetterCode)
    return _result.centroidLatLong.latitude
}


export function getCentroidLongFromCode(twoLetterCode: string): number {
    let _result = <ICountry>NEW_COUNTRY_LIST.find(country => country.code===twoLetterCode)
    return _result.centroidLatLong.longitude
}


export function getCentroidFromCode(twoLetterCode: string): LatLong{
    let _result = <ICountry>NEW_COUNTRY_LIST.find(country => country.code===twoLetterCode)
    return _result.centroidLatLong
}

export function getCentroidLatLong(twoLetterCode: string): ILatLong {
    let _lat = getCentroidLatFromCode(twoLetterCode)
    let _long = getCentroidLongFromCode(twoLetterCode)
    return new LatLong(_lat, _long)
}


export function angleBetweenPointsOnSphere(startLocation: ILatLong, endLocation: ILatLong): number {
    // https://en.wikipedia.org/wiki/Great-circle_distance#:~:text=It%20is%20the%20shortest%20distance,line%20through%20the%20sphere's%20interior).
    
    let phi_1 = degreesToRadians(startLocation.latitude)
    let phi_2 = degreesToRadians(endLocation.latitude)
    let lambda_1 = degreesToRadians(startLocation.longitude)
    let lambda_2 = degreesToRadians(endLocation.longitude)
    let deltaL = Math.abs(lambda_2-lambda_1)

    let sinComponent = Math.sin(phi_1) * Math.sin(phi_2)
    let cosComponent = Math.cos(phi_1) * Math.cos(phi_2) * Math.cos(deltaL)

    return Math.acos(sinComponent + cosComponent)
}


export function calculateEarthGreatCircleDistance_KM(startLocation: ILatLong, endLocation: ILatLong): number {
    return EARTH_MEAN_RADIUS_KM * angleBetweenPointsOnSphere(startLocation, endLocation)
}

export function calculateRelativeBearing(startLocation: ILatLong, endLocation: ILatLong): number {
    // Implementation of https://math.stackexchange.com/questions/2688803/angle-between-two-points-on-a-sphere

    // let phi_1 = degreesToRadians(startLocation.latitude)
    // let phi_2 = degreesToRadians(endLocation.latitude)
    let lambda_1 = degreesToRadians(startLocation.longitude)
    let lambda_2 = degreesToRadians(endLocation.longitude)

    let A = Math.abs(lambda_2 - lambda_1)

    let a = angleBetweenPointsOnSphere(startLocation, endLocation)
    // let b = Math.PI - lambda_1
    let c = Math.PI - lambda_2

    let sinC = Math.sin(A)*Math.sin(c) / Math.sin(a)

    return Math.asin(sinC)
}