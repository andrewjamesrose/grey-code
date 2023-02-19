import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { CountryCode } from 'src/app/models/game-logic';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { Group, Renderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLOBE_SCALAR } from 'src/app/constants';
import threeGlobe from 'three-globe';
import { generateAxes, greatCircleFromTwoPoints, markerAtLatLong, wedgeBetweenTwoPoints } from 'src/app/commonFunctions/threeSphereFunctions';
import { getCentroidLatLong } from 'src/app/commonFunctions/geographyFunctions';
import { IDisplayModeState } from '../globe-controls/globe-controls.component';

const colourList: number[] = [
  0xBF1B39,   //red
  0xBF4A30,   //orange 
  0xBF9E3B,   //yellow
  0x3F7EA6,   //teal
  0x45488C,   //purple
  0x999999    //grey
]

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

  geoJSONdata: any[] = []

  guessList: CountryCode[] = []
  targetCode!: CountryCode

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
        console.log("filtered data:")
        console.log(data.features.filter((feature: { properties: { ISO_A2_EH: string; }; }) => feature.properties.ISO_A2_EH === 'FR'))

        type MyType = {
          [key: string]: any;
        }

        this.globe
          .polygonsData(data.features)
          .polygonCapColor((feat) => { return this.checkColourCap((<MyType>feat)['properties'].ISO_A2_EH) })
          .polygonSideColor((feat) => { return this.checkColourSide((<MyType>feat)['properties'].ISO_A2_EH) })
          .polygonStrokeColor(() => '#111')
          .polygonAltitude(feat => { return this.checkCountry((<MyType>feat)['properties'].ISO_A2_EH) })



        this.createScene()
        console.log(this.rendererContainer)
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(600, 600);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();

      }
    })
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
    _group = new Group();
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

  checkCountry(countryCode: CountryCode): number {
    let guessList = ['DE', 'MX', 'BR', 'JP', 'CL']
    let correctAnswer = 'AU'

    let altitude: number = 0.01

    if (countryCode === correctAnswer) {
      altitude = 0.5
    } else if (guessList.includes(countryCode)) {
      altitude = 0.2
    }

    return altitude
  }

  checkColourCap(countryCode: CountryCode): string {
    let guessList = ['DE', 'MX', 'BR', 'JP', 'CL']
    let correctAnswer = 'AU'

    // let colour: string = 'rgba(42, 157, 143, 0.8)'  //green
    let colour: string = 'rgba(200, 220, 200, 1)'  //grey


    if (guessList.includes(countryCode)) {
      colour = 'rgba(191, 27, 57, 0.6)'
    }
    if (countryCode === correctAnswer) {
      colour = 'rgba(42, 157, 143, 0.8)'
    }

    return colour
  }

  checkColourSide(countryCode: CountryCode): string {
    let guessList = ['DE', 'MX', 'BR', 'JP', 'CL']
    let correctAnswer = 'AU'

    let sideColor: string = 'rgba(200, 220, 200, 0.6)'  //grey
    // let sideColor: string = 'rgba(42, 157, 143, 0.6)'

    if (guessList.includes(countryCode)) {
      sideColor = 'rgba(191, 27, 57, 0.6)'
    }
    if (countryCode === correctAnswer) {
      sideColor = 'rgba(42, 157, 143, 0.6)'
    }

    return sideColor
  }
}
