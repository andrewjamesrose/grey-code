import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILatLong } from '../models/game-logic';

@Injectable({
  providedIn: 'root'
})
export class GlobeVisualiserInputsService {

    // private _

  constructor() {
    // this.guessList$ = new BehaviorSubject(this._emptyArray)
    // this.gameMode$ = new BehaviorSubject(this._gameMode)
    // this.displayMode$ = new BehaviorSubject(this._displayMode)
    // this.gameState$ = new BehaviorSubject(this._gameState)
    // this.targetCountry$ = new BehaviorSubject(this._targetCountry)
  }

//   private guessList$: BehaviorSubject<string[]> 
//   private gameMode$: BehaviorSubject<string>
//   private displayMode$: BehaviorSubject<string>
//   private gameState$: BehaviorSubject<string>
//   private targetCountry$: BehaviorSubject<ICountry>

// private profileObs$: BehaviorSubject<Profile> = new BehaviorSubject(null);

    private pointA$: BehaviorSubject<ILatLong> = new BehaviorSubject({latitude: 45, longitude: 45});
    private pointB$: BehaviorSubject<ILatLong> = new BehaviorSubject({latitude: 0, longitude: 0});
  

    // getProfileObs(): Observable<Profile> {
    //     return this.profileObs$.asObservable();
    // }

    // setProfileObs(profile: Profile) {
    //     this.profileObs$.next(profile);
    // }

    getPointA(): Observable<ILatLong> {
        return this.pointA$.asObservable();
    }

    setPointA(newCoord: ILatLong) {
        this.pointA$.next(newCoord)
    }

    getPointB(): Observable<ILatLong> {
        return this.pointB$.asObservable();
    }

    setPointB(newCoord: ILatLong) {
        this.pointB$.next(newCoord)
    }

//   pointA: ILatLong
//   pointB: ILatLong

}
