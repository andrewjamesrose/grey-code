import { angleBetweenPointsOnSphere, calculateEarthGreatCircleDistance_KM, getCentroidLatFromCode, getCentroidLongFromCode, getCountryNameFromCode } from "../commonFunctions/geographyFunctions"

export type CountryCode = "AF" | "AX" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AQ" | "AG" | "AR" | "AM" | "AW" | "AU" | "AT" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BM" | "BT" | "BO" | "BA" | "BW" | "BV" | "BR" | "IO" | "VG" | "BN" | "BG" | "BF" | "BI" | "KH" | "CM" | "CA" | "CV" | "KY" | "CF" | "TD" | "CL" | "CN" | "CX" | "CC" | "CO" | "KM" | "CD" | "CG" | "CK" | "CR" | "CI" | "HR" | "CU" | "CW" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO" | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "ET" | "FK" | "FO" | "FJ" | "FI" | "FR" | "GF" | "PF" | "TF" | "GA" | "GM" | "GE" | "DE" | "GH" | "GI" | "GR" | "GL" | "GD" | "GP" | "GU" | "GT" | "GG" | "GN" | "GW" | "GY" | "HT" | "HN" | "HK" | "HU" | "IS" | "IN" | "ID" | "IR" | "IQ" | "IE" | "IM" | "IL" | "IT" | "JM" | "JP" | "JE" | "JO" | "KZ" | "KE" | "KI" | "XK" | "KW" | "KG" | "LA" | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MO" | "MK" | "MG" | "MW" | "MY" | "MV" | "ML" | "MT" | "MH" | "MQ" | "MR" | "MU" | "YT" | "MX" | "FM" | "MD" | "MC" | "MN" | "ME" | "MS" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "AN" | "NC" | "NZ" | "NI" | "NE" | "NG" | "NU" | "NF" | "KP" | "MP" | "NO" | "OM" | "PK" | "PW" | "PA" | "PG" | "PY" | "PE" | "PH" | "PN" | "PL" | "PT" | "PR" | "QA" | "RE" | "RO" | "RU" | "RW" | "PM" | "VC" | "WS" | "SM" | "ST" | "SA" | "SN" | "RS" | "SC" | "SL" | "SG" | "SK" | "SI" | "SB" | "SO" | "ZA" | "GS" | "KR" | "SS" | "ES" | "LK" | "BL" | "KN" | "LC" | "SX" | "SD" | "SR" | "SJ" | "SZ" | "SE" | "CH" | "SY" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG" | "TK" | "TO" | "TT" | "SH" | "TN" | "TR" | "TM" | "TC" | "TV" | "VI" | "UG" | "UA" | "AE" | "GB" | "US" | "UY" | "UZ" | "VU" | "VA" | "VE" | "VN" | "WF" | "EH" | "YE" | "ZM" | "ZW"

export interface ICountry {
    name: string
    capital: string
    capitalLatLong: ILatLong
    centroidLatLong: ILatLong
    code: CountryCode
    codeThree: string
    continent: string
    flagIsParent: boolean
    hasBoundary2D: boolean
    hasBoundary3D: boolean
}

export class Country implements ICountry {
        name: string
        capital: string
        capitalLatLong: ILatLong
        centroidLatLong: ILatLong
        code: CountryCode
        codeThree: string
        continent: string
        flagIsParent: boolean
        hasBoundary2D: boolean
        hasBoundary3D: boolean
    constructor(name: string,
                capital: string,
                capitalLatLong: ILatLong,
                centroidLatLong: ILatLong,
                code: CountryCode,
                codeThree: string,
                continent: string,
                flagIsParent: boolean,
                hasBoundary2D: boolean,
                hasBoundary3D: boolean
        ){
            this.name = name
            this.capital = capital
            this.capitalLatLong = capitalLatLong
            this.centroidLatLong = centroidLatLong
            this.code = code
            this.codeThree = codeThree
            this.continent = continent
            this.flagIsParent = flagIsParent
            this.hasBoundary2D = hasBoundary3D
            this.hasBoundary3D = hasBoundary2D

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


export interface IJumpPoint {
    name: string
    code: string
    latlong: ILatLong
}

export class Jump implements IJump {
    start: IJumpPoint
    end: IJumpPoint

    constructor(start: JumpPoint, end: JumpPoint) {
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

    constructor(code: string) {
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