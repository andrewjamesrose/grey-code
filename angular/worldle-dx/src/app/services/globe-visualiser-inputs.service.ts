import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, elementAt, Observable } from 'rxjs';
import { IDisplayModeChange, IDisplayModeState } from '../components/globe-controls/globe-controls.component';
import { ILatLong, CountryCode } from '../models/game-logic';

@Injectable({
  providedIn: 'root'
})
export class GlobeVisualiserInputsService {

    // private _

  constructor(private http: HttpClient) {
    // this.guessList$ = new BehaviorSubject(this._emptyArray)
    // this.gameMode$ = new BehaviorSubject(this._gameMode)
    // this.displayMode$ = new BehaviorSubject(this._displayMode)
    // this.gameState$ = new BehaviorSubject(this._gameState)
    // this.targetCountry$ = new BehaviorSubject(this._targetCountry)
    console.log("hello")
    this.http.get<any>(this.geoJSONURL).subscribe((data: any) => {
        this.geoJSONData = data
        console.log("spinning up local visualiser service")
        console.log(this.geoJSONData)
    })

  }

  geoJSONURL: string = "/assets/boundaries/geojson/ne_110m_admin_0_countries.geojson"
//   data: any[]

//   getData() {
//     this.http.get<any>(this.geoJSONURL).subscribe((data: any) => {
//         this.data = data
//     });  
//   }

//   private guessList$: BehaviorSubject<string[]> 
//   private gameMode$: BehaviorSubject<string>
//   private displayMode$: BehaviorSubject<string>
//   private gameState$: BehaviorSubject<string>
//   private targetCountry$: BehaviorSubject<ICountry>

    private _displayModeState: IDisplayModeState = DISPLAY_MODE_INITIAL_STATE
    private _pointA$: BehaviorSubject<ILatLong> = new BehaviorSubject({latitude: 45, longitude: 45});
    private _pointB$: BehaviorSubject<ILatLong> = new BehaviorSubject({latitude: 0, longitude: 0});
    private _displayModeState$: BehaviorSubject<IDisplayModeState> = new BehaviorSubject(DISPLAY_MODE_INITIAL_STATE);

    private geoJSONData: any = {}

    getPointA(): Observable<ILatLong> {
        return this._pointA$.asObservable();
    }

    setPointA(newCoord: ILatLong) {
        this._pointA$.next(newCoord)
    }

    getPointB(): Observable<ILatLong> {
        return this._pointB$.asObservable();
    }

    setPointB(newCoord: ILatLong) {
        this._pointB$.next(newCoord)
    }

    getDisplayModeState(): Observable<IDisplayModeState> {
        return this._displayModeState$.asObservable()
    }

    setDisplayModeState(newDisplayModeState: IDisplayModeChange): void  {
        this._displayModeState = {...this._displayModeState, [newDisplayModeState.caller]: newDisplayModeState.state }
        this._displayModeState$.next(this._displayModeState)
    }

    getGeoJSONData(): any {
    console.log(this.geoJSONData)
        return this.geoJSONData
    }

    getCountryGeoJSON(twoLetterCode: string) {

    }


    getFilteredGeoJSON(): any[] {

        console.log("Full 3D Data:")
        console.log(this.geoJSONData.features)

        let outputArray: any = []
        this.geoJSONData.features.forEach((element: any) => {
            let tempObj: IGeoJSON3D = { twoLetterCode: element.properties.ISO_A2_EH, 
                                        geometry:   JSON.parse(JSON.stringify(element.geometry))
                                    }
            outputArray.push(tempObj)

        })

        return outputArray
    }

}

export interface IGeoJSON3D {
    twoLetterCode: CountryCode,
    geometry: object

}

export const DISPLAY_MODE_INITIAL_STATE: IDisplayModeState = {
    resultsGlobe: false,
    globeWedges: false,
    wireFrameSphere: false,
    cartesianAxes: true,
    guessWedges: false,
    guessConstructorLines: false,
    guessCentroids: false,
    guessGreatCircles: false,
    mathsDemo: true
}
