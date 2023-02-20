import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { CountryCode } from 'src/app/models/game-logic';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { Group, Renderer, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLOBE_SCALAR } from 'src/app/constants';
import threeGlobe from 'three-globe';
import { generateAxes, getVector3FromLatLong, greatCircleFromTwoPoints, markerAtLatLong, wedgeBetweenTwoPoints } from 'src/app/commonFunctions/threeSphereFunctions';
import { degreesToRadians, getCentroidLatLong } from 'src/app/commonFunctions/geographyFunctions';
import { IDisplayModeState } from '../globe-controls/globe-controls.component';
import gsap from 'gsap';

//############################ TO DO ###########################################
// Add handler for when a country doesn't have a 3d map...add a dot

const colourList: number[] = [
  0xBF1B39,   //red
  0xBF4A30,   //orange 
  0xBF9E3B,   //yellow
  0x3F7EA6,   //teal
  0x45488C,   //purple
  0x999999    //grey
]


const ALTITUDE_DEFAULT: number = 0.01
const ALTITUDE_CORRECT: number = 0.5
const ALTITUDE_INCORRECT: number = 0.20

const COLOUR_GLOBE_CAP_GREY: string = 'rgba(200, 220, 200, 1)'
const COLOUR_GLOBE_CAP_CORRECT: string = 'rgba(42, 157, 143, 0.8)'
const COLOUR_GLOBE_CAP_INCORRECT: string = 'rgba(191, 27, 57, 0.6)'

const COLOUR_GLOBE_SIDE_GREY: string = 'rgba(200, 220, 200, 0.6)'
const COLOUR_GLOBE_SIDE_CORRECT: string = 'rgba(42, 157, 143, 0.6)'
const COLOUR_GLOBE_SIDE_INCORRECT: string = 'rgba(191, 27, 57, 0.6)'


const testCountries: CountryCode[] = ['FI', 'CL', 'JP', 'CA', 'AU', 'DE']

@Component({
  selector: 'globe-results-visualiser',
  templateUrl: './globe-results-visualiser.component.html',
  styleUrls: ['./globe-results-visualiser.component.scss']
})
export class GlobeResultsVisualiserComponent implements OnInit {
  @ViewChild('globeResultsVisualiser', { static: true }) rendererContainer!: ElementRef<HTMLInputElement>;

  // ####### boilerplate to be fixed

  private renderer: Renderer = new THREE.WebGLRenderer({ antialias: true });
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  geoJSONdata: any

  guessList: CountryCode[] = []
  targetCode!: CountryCode

  DEV_GUESS_LIST = ['DE', 'MX', 'BR', 'JP', 'CL']

  visualiserDisplayState: IDisplayModeState = {
    resultsGlobe: true,
    globeWedges: false,
    wireFrameSphere: false,
    cartesianAxes: true,
    guessWedges: false,
    guessConstructorLines: false,
    guessCentroids: false,
    guessGreatCircles: false,
    mathsDemo: false
  }


  constructor(private http: HttpClient, private gameLogicService: GameLogicService) {

    this.scene = new THREE.Scene();

    this.gameLogicService.getPrevioustGuesses()
      .subscribe((guessesIn: CountryCode[]) => {
        this.guessList = guessesIn
        this.reRenderGlobe()
        this.highlightCountry(this.guessList.slice(-1)[0])
      })

    this.gameLogicService.getTargetCountry()
      .subscribe((country) => {
        this.targetCode = country.code
      })
  }

  ngOnInit(): void {
  }

  // ###refactor, same in Globe Maths Visualise
  materialParameters = {
    color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25,
    depthTest: true,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  }

  geometry = new THREE.SphereGeometry(GLOBE_SCALAR, 32, 16);
  material = new THREE.MeshLambertMaterial(this.materialParameters);
  mathsSphere = new THREE.Mesh(this.geometry, this.material);

  // Edges Wireframe
  // https://stackoverflow.com/questions/20153705/three-js-wireframe-material-all-polygons-vs-just-edges
  geoEdges = new THREE.EdgesGeometry(this.geometry);
  matLines = new THREE.LineBasicMaterial({ color: 0xaaaaaa, linewidth: 2, opacity: 0.1 });
  wireframe = new THREE.LineSegments(this.geoEdges, this.matLines);



  // Also
  // How to display both wireframe and solid colour:
  // https://stackoverflow.com/questions/31539130/display-wireframe-and-solid-color/31541369#31541369

  lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });



  globe = new threeGlobe({ animateIn: false })
    .globeImageUrl('/assets/img/lightblue.jpg')
    .pointAltitude('size')

  ngAfterViewInit() {
    let url = '/assets/boundaries/geojson/ne_110m_admin_0_countries.geojson'
    this.http.get<any>(url).subscribe({
      next: data => {

        this.geoJSONdata = data

        this.reRenderGlobe()

        this.createScene()
        console.log(this.rendererContainer)
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(600, 600);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();

        // console.log("THIS IS THE DATA")
        // console.log(data)

        console.log("filtered data:")
        console.log(data.features.filter((feature: { properties: { ISO_A2_EH: string; }; }) => feature.properties.ISO_A2_EH === 'FR'))

        // type MyType = {
        //   [key: string]: any;
        // }

        // this.globe
        //   .polygonsData(data.features)
        //   .polygonCapColor((feat) => { return this.getCountryCapColour((<MyType>feat)['properties'].ISO_A2_EH) })
        //   .polygonSideColor((feat) => { return this.getCountrySideColour((<MyType>feat)['properties'].ISO_A2_EH) })
        //   .polygonStrokeColor(() => '#111')
        //   .polygonAltitude(feat => { return this.getCountryAltitute((<MyType>feat)['properties'].ISO_A2_EH) })



        // this.createScene()
        // console.log(this.rendererContainer)
        // // this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.setSize(600, 600);
        // this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        // this.animate();

      }
    })
  }

  reRenderGlobe(): void {
    type TempType = {
      [key: string]: any;
    }

    this.globe
      .polygonsData(this.geoJSONdata.features)

    this.globe
      .polygonsData(this.geoJSONdata.features)
      .polygonCapColor((feat) => { return this.getCountryCapColour((<TempType>feat)['properties'].ISO_A2_EH) })
      .polygonSideColor((feat) => { return this.getCountrySideColour((<TempType>feat)['properties'].ISO_A2_EH) })
      .polygonStrokeColor(() => '#111')
      .polygonAltitude(feat => { return this.getCountryAltitute((<TempType>feat)['properties'].ISO_A2_EH) })
  }

  cameraJumpTest(): void {

    console.log("attempting camera jump")
    this.highlightCountry("AU")
  }

  highlightCountry(countryCode: CountryCode): void {

    if (countryCode) {
        let targetLatLong = getCentroidLatLong(countryCode)

        console.log("lat: " + degreesToRadians(targetLatLong.latitude))
        console.log("long: " + degreesToRadians(targetLatLong.longitude))

        console.log(targetLatLong)


        //set spatial xyz position of camera
        // note that if orbit control limits are set then they override the camera.position.set
        // and it pegs out at the limit set in OrbitControl

        targetLatLong = getCentroidLatLong(countryCode)

        let newCoords: Vector3
        let radius: number = 300
        newCoords = getVector3FromLatLong(targetLatLong, radius)

        gsap.to(this.camera.position, {x: newCoords.x, y: newCoords.y, z: newCoords.z, duration: 2})
    }
}


  deleteTest(): void {
    this.globe.polygonsData([])
  }

  


  animate(): void {
    window.requestAnimationFrame(() => this.animate());
    this.controls.update()
    this.renderer.render(this.scene, this.camera);
  }

  private createScene(): void {
    this.scene.background = new THREE.Color(0x303030);
    this.scene.add(new THREE.AmbientLight(0xffffff));

    let light = new THREE.DirectionalLight(0xffffff, 0.6)
    light.position.set(0, 1, 0)
    this.scene.add(light)


    // "cartesianAxes"
    let axesSet = generateAxes()
    let _group = new Group();
    _group.name = "cartesianAxes"

    _group.visible = this.visualiserDisplayState[_group.name as keyof IDisplayModeState]

    for (let axis of axesSet) {
      _group.add(axis)
    }
    this.scene.add(_group)


    //set initial visibility
    this.globe.visible = this.visualiserDisplayState.resultsGlobe
    this.globe.name = "resultsGlobe"
    this.scene.add(this.globe)

    //Add all wedges

    // Set up geometry wedges 
    _group = new Group();
    _group.name = "guessWedges"
    _group.visible = this.visualiserDisplayState[_group.name as keyof IDisplayModeState]


    for (let i = 1; i <= testCountries.length - 1; i++) {
      let startPoint = getCentroidLatLong(testCountries[i - 1])
      let endPoint = getCentroidLatLong(testCountries[i])
      _group.add(wedgeBetweenTwoPoints(startPoint, endPoint, colourList[i - 1], 0.8, 1))
    }
    this.scene.add(_group)


    // Set up globe wedges 
    _group = new Group();
    _group.name = "globeWedges"
    _group.visible = this.visualiserDisplayState[_group.name as keyof IDisplayModeState]

    for (let i = 1; i <= testCountries.length - 1; i++) {
      let startPoint = getCentroidLatLong(testCountries[i - 1])
      let endPoint = getCentroidLatLong(testCountries[i])
      _group.add(wedgeBetweenTwoPoints(startPoint, endPoint, colourList[i - 1], 0.8, 1.15))
    }
    this.scene.add(_group)


    // Set up centroid points
    _group = new Group()
    _group.name = "guessCentroids"
    _group.visible = this.visualiserDisplayState[_group.name as keyof IDisplayModeState]

    for (let i = 0; i <= testCountries.length - 1; i++) {
      let point = getCentroidLatLong(testCountries[i])
      let _mesh = markerAtLatLong(point, 2, colourList[i])
      _group.add(_mesh)
      // this.scene.add(_mesh)
    }
    this.scene.add(_group)


    // Set up circles
    _group = new Group();
    _group.name = "guessGreatCircles"
    _group.visible = this.visualiserDisplayState[_group.name as keyof IDisplayModeState]

    for (let i = 1; i <= testCountries.length - 1; i++) {
      let startPoint = getCentroidLatLong(testCountries[i - 1])
      let endPoint = getCentroidLatLong(testCountries[i])
      _group.add(greatCircleFromTwoPoints(startPoint, endPoint, colourList[i - 1], 0.5))
    }
    this.scene.add(_group)

    this.camera = new THREE.PerspectiveCamera();
    this.camera.aspect = 1; //(square)
    this.camera.position.z = 350;
    this.camera.updateProjectionMatrix();


    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //angle from the pole. North pole is 0, using spherical coordinates.
    this.controls.minPolarAngle = Math.PI / 4
    this.controls.maxPolarAngle = 3 * Math.PI / 4
    this.controls.enablePan = false
  }


  //possible make a single function and a type with type.alt type.side, type.cap
  private getCountryAltitute(countryCode: CountryCode): number {
    // let guessList = this.DEV_GUESS_LIST
    let guessList = this.guessList

    let altitude: number = ALTITUDE_DEFAULT

    if (countryCode === this.targetCode) {
      altitude = ALTITUDE_CORRECT
    } else if (guessList.includes(countryCode)) {
      altitude = ALTITUDE_INCORRECT
    }

    return altitude
  }

  private getCountryCapColour(countryCode: CountryCode,): string {
    // let guessList = this.DEV_GUESS_LIST
    let guessList = this.guessList

    let colour: string = COLOUR_GLOBE_CAP_GREY

    if (guessList.includes(countryCode)) {
      colour = COLOUR_GLOBE_CAP_INCORRECT
    }
    if (countryCode === this.targetCode) {
      colour = COLOUR_GLOBE_CAP_CORRECT
    }

    return colour
  }

  private getCountrySideColour(countryCode: CountryCode): string {
    // let guessList = this.DEV_GUESS_LIST
    let guessList = this.guessList

    let sideColor: string = COLOUR_GLOBE_SIDE_GREY

    if (guessList.includes(countryCode)) {
      sideColor = COLOUR_GLOBE_SIDE_INCORRECT
    }
    if (countryCode === this.targetCode) {
      sideColor = COLOUR_GLOBE_SIDE_CORRECT
    }

    return sideColor
  }
}