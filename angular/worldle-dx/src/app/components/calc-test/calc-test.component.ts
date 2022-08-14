import { Component, OnInit } from '@angular/core';
import { calculateEarthGreatCircleDistance_KM, calculateRelativeBearingDegs, generateRandomInteger, getCentroidLatLong } from 'src/app/commonFunctions/functions';
import { ICountry, ILatLong, Jump, JumpPoint } from 'src/app/models/game-logic';
import { NEW_COUNTRY_LIST } from 'src/assets/capitals/data';
import { EARTH_MEAN_RADIUS_KM } from 'src/assets/constants';
import * as d3 from 'd3';
import * as d3geoprojections from 'd3-geo-projection';
import { GAME_MODES, MAX_GUESSES, VIEW_MODES } from 'src/app/constants';




@Component({
  selector: 'app-calc-test',
  templateUrl: './calc-test.component.html',
  styleUrls: ['./calc-test.component.scss']
})
export class CalcTestComponent implements OnInit {


    svg: any;

    remainingGuesses: number

    gameState: "ACTIVE"| "GAMEOVER" | 'CORRECT'
    uiActive: boolean

    constructor() { 
        this._countryList = NEW_COUNTRY_LIST
        this.remainingGuesses = MAX_GUESSES
        this.gameState = "ACTIVE"
        this.uiActive= true

        this.gameModeIndex=0
        this.gameModeString=GAME_MODES[this.gameModeIndex]
        this.viewModeIndex=0
        this.viewModeString=VIEW_MODES[this.viewModeIndex]
        this.initialiseGame()
    }


// Hacky. To be fixed
    // _countryList: {[key: string]: any}[] = []
    _countryList: ICountry[] = []
    
    _selectedCountry!: ICountry

    _capitalSeparation: number | undefined
    _centroidSeparation: number | undefined
    
    _interCentroidBearing: number | undefined
    _interCapitalBearing: number | undefined

    _resultAvailable: boolean | undefined
    _guessList: string[] = []
    target: string = ""
    targetLatLong!: ILatLong;
    targetCountry!: ICountry
    gameModeIndex: number
    gameModeString: string
    viewModeIndex: number
    viewModeString: string

    jumpList!: Jump[]


    ngOnInit(): void {
        this.svg = d3.select("svg"),
        this.redrawGraph()

    }


    initialiseGame(): void {
        let _randomIndex = generateRandomInteger(0, this._countryList.length)
        this.targetCountry = this._countryList[_randomIndex]
        this.target = this.targetCountry.code
        this.targetLatLong = this.targetCountry.centroidLatLong
    }
        
    
    onGuess(): void {
        let _newGuess = this._selectedCountry.code
        if (this.isValidGuess(_newGuess)){
            this.updateGuessList(_newGuess)
            this.remainingGuesses = MAX_GUESSES - this._guessList.length

            let _endPointCentroid = this._selectedCountry.centroidLatLong
            this._centroidSeparation = calculateEarthGreatCircleDistance_KM(_endPointCentroid, this.targetLatLong)
           
            this.redrawGraph()

                
            // check if guess was correct/not
            if (_newGuess === this.targetCountry.code) {
                this.gameWon()
            } else {
                this.badGuess()
            }
        }
    }


    repeatGuessHandler(code: string): void {

    }

    validGuessHandler(code: string): void {

    }

    isValidGuess(code: string): boolean {
        let _output = true
        if (this.isExistingGuess(code)){
            _output = false
        }
        
        return _output
    }

    
    updateGuessList(twoLetterCode: string): void {
        this._guessList.push(twoLetterCode)
    }


    badGuess(): void {
        if (this.remainingGuesses === 0) {
            this.gameOver()
            this.generateEndOfGameData()
        }
    }


    gameOver(): void {
        this.gameState = 'GAMEOVER'
    }


    gameWon(): void {
        this.gameState = 'CORRECT'
        this.generateEndOfGameData()
    }


    generateEndOfGameData(): void {
        //to be implemented
        //generate the coordinate pairs for the output diagram
        this.uiActive = false
        let _attempts = this._guessList.length

        let _answer = this._countryList.find(element => element.code === this.targetCountry.code)

        if(_attempts > 1) {
            this.generateJumpList()
        }   

    }

    resetGame(){
        console.log("resetting game")
        this.remainingGuesses = MAX_GUESSES
        this.gameState = "ACTIVE"
        this.uiActive= true
        this._guessList=[]
        this.jumpList=[]
        this.initialiseGame()

    }


    generateJumpList(){
        let _outputJumpList: Jump[] = []
        let index: number = 0
        for (let index = 1; index < this._guessList.length; index++) {
        // for (let guess of this._guessList) {

                let _start = new JumpPoint(this._guessList[index-1])
                let _end = new JumpPoint(this._guessList[index])
                let _jump = new Jump(_start, _end)
                _outputJumpList.push(_jump)
    
        }

        this.jumpList = _outputJumpList
        console.log(this.jumpList)
    }

    
    getMissDistance(code: string): number {
        let _guess: ILatLong = getCentroidLatLong(code)
        return calculateEarthGreatCircleDistance_KM(_guess, this.targetLatLong)
    }


    // replace this with an observable?
    gameModeSelector(): void {
        if(this.gameModeIndex === GAME_MODES.length-1){
            this.gameModeIndex = 0
        } else {
            this.gameModeIndex += 1
        }
        this.gameModeString = GAME_MODES[this.gameModeIndex]
    }


    viewModeSelector(): void {
        if(this.viewModeIndex === VIEW_MODES.length-1){
            this.viewModeIndex = 0
        } else {
            this.viewModeIndex += 1
        }
        this.viewModeString = VIEW_MODES[this.viewModeIndex]
    }


    isExistingGuess(code: string): boolean{
        let _output = false

        if (this._guessList.find(item => item === code)){
            _output = true
        }

        return _output
    }

    debugPrint():void {
        console.log(this._guessList)
    }

    clear2DMap(){
        this.svg.selectAll('*').remove();
    }

    redrawGraph(): void {
        // this.reset2DMap()
        
        let width = +this.svg.attr("width")
        let height = +this.svg.attr("height")

        // Map and projection
        // let projection = d3.geoMercator()
        // let projection = d3.geoNaturalEarth1()
        let projection = d3geoprojections.geoMiller()
        // let projection = d3geoprojections.geoPatterson()
        // let projection = d3geoprojections.geoRobinson()
        // .center([2, 47])                // GPS of location to zoom on
        .scale(120)                       // This is like the zoom. Full earth is 128 zoom, lower is further away
        .translate([ width/2, height/2 ])

        //Scale Parameter depends on map being used
        // Natural Earth = 180
        // Mercator = 128
        

        // How to use the d3.json syntax in modern d3 with promises:
        // https://stackoverflow.com/questions/49768165/code-within-d3-json-callback-is-not-executed
        // d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then( (data: any) =>{
        d3.json("/assets/boundaries/geojson/ne_110m_admin_0_countries.geojson").then( (data: any) =>{
            // console.log(data)

            this.clear2DMap ()

            // Filter data for existing guesses only
            data.features = data.features.filter((d: any) => {
                                    // console.log(d.properties.ISO_A2_EH)
                                    // return d.properties.ISO_A2_EH=="US"
                                    return (this.isExistingGuess( d.properties.ISO_A2_EH))
                                })

            // Draw the map
            this.svg.append("g")
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                // .attr("fill", "grey")
                .attr("fill", (d: any) => {
                    let color: string = "grey"
                    if (d.properties.ISO_A2_EH === "NO"){
                        color = "blue"
                    }
                    return color
                    })
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                .style("stroke", "none")
            })
        }
}