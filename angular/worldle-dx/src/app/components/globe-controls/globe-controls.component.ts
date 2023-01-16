import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSliderChange } from '@angular/material/slider';
import { ILatLong } from 'src/app/models/game-logic';
import { GlobeVisualiserInputsService } from 'src/app/services/globe-visualiser-inputs.service';

@Component({
    selector: 'globe-controls',
    templateUrl: './globe-controls.component.html',
    styleUrls: ['./globe-controls.component.scss']
})
export class GlobeControlsComponent implements OnInit {

    constructor(private globeInputsService: GlobeVisualiserInputsService) {
        // begin subscriptions
        // this.globeInputsService.

        // this.gameLogic.getGameMode().subscribe(gameMode =>{this._gameMode = gameMode})

    }

    pointA: ILatLong = { latitude: 0, longitude: 0 }
    pointB: ILatLong = { latitude: 0, longitude: 0 }


    ngOnInit(): void {
        this.globeInputsService.getPointA().subscribe(pointA => this.pointA = pointA)
        this.globeInputsService.getPointB().subscribe(pointB => this.pointB = pointB)
    }

    visualiserDisplayOptions = new FormGroup({
        wireFrameSphere: new FormControl(false),
        cartesianAxes: new FormControl(true),
        resultsGlobe: new FormControl(false),
        globeWedges: new FormControl(false),
        guessWedges: new FormControl(false),
        guessConstructorLines: new FormControl(false),
        guessCentroids: new FormControl(false),
        guessGreatCircles: new FormControl(false),
        mathsDemo: new FormControl(true)
    })



    displayOptionChanged(event: MatCheckboxChange): void {
        let change: IDisplayModeChange = {
            caller: <DisplayModeKeys>event.source.id,
            state: event.checked
        }

        this.globeInputsService.setDisplayModeState(change)
    }

    onInputChange_lat_A(event: MatSliderChange) {
        if (event.value) {
            // this.pointA.latitude = event.value
            this.globeInputsService.setPointA({ latitude: event.value, longitude: this.pointA.longitude })
        }
    }

    onInputChange_long_A(event: MatSliderChange) {
        if (event.value) {
            // this.pointA.longitude = event.value
            this.globeInputsService.setPointA({ latitude: this.pointA.latitude, longitude: event.value })
        }
    }

    onInputChange_lat_B(event: MatSliderChange) {
        if (event.value) {
            // this.pointB.latitude = event.value
            this.globeInputsService.setPointB({ latitude: event.value, longitude: this.pointB.longitude })
        }
    }

    onInputChange_long_B(event: MatSliderChange) {
        if (event.value) {
            // this.pointB.longitude = event.value
            this.globeInputsService.setPointB({ latitude: this.pointB.latitude, longitude: event.value })
        }
    }
}


export interface IDisplayModeChange {
    caller: DisplayModeKeys,
    state: boolean
}

export interface IDisplayModeState {
    resultsGlobe: boolean,
    globeWedges: boolean,
    wireFrameSphere: boolean,
    cartesianAxes: boolean,
    guessWedges: boolean,
    guessConstructorLines: boolean,
    guessCentroids: boolean,
    guessGreatCircles: boolean,
    mathsDemo: boolean
}

export type DisplayModeKeys = "resultsGlobe" | "globeWedges" | "wireFrameSphere" | "cartesianAxes" | "guessWedges" | "guessConstructorLines" | "guessCentroids" | "guessGreatCircles" | "mathsDemo"