import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSliderChange } from '@angular/material/slider';
import { degreesToRadians, getCentroidLatLong } from 'src/app/commonFunctions/geographyFunctions';
import { convertCartesianToThree, generateAxes, getConstructorLines, getGreatCircleMaxPoint, getGreatCirclePlaneCrossing, getVector3FromLatLong, greatCircleFromTwoPoints, greatCirclePlaneRotation, ILineGeometry, markerAtLatLong, markerAtVector3, wedgeBetweenTwoPoints } from 'src/app/commonFunctions/threeSphereFunctions';
import { GLOBE_SCALAR, X_UNIT, Y_UNIT } from 'src/app/constants';
import { ILatLong } from 'src/app/models/game-logic';
import { GameStatisticsService } from 'src/app/services/game-statistics.service';
import * as THREE from 'three';
import { BufferGeometry, EllipseCurve, Group, Renderer, Vector2, Vector3 } from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const colourList: number[] = [
    0xBF1B39,   //red
    0xBF4A30,   //orange 
    0xBF9E3B,   //yellow
    0x3F7EA6,   //teal
    0x45488C,   //purple
    0x999999    //grey
]

const testCountries: string[] = ['FI','CL','JP','CA','AU','DE']


@Component({
  selector: 'globe-visualiser',
  templateUrl: './globe-visualiser.component.html',
  styleUrls: ['./globe-visualiser.component.scss']
})
export class GlobeVisualiser implements OnInit {
    @ViewChild('testid', { static: true }) rendererContainer!:  ElementRef<HTMLInputElement>;

    private renderer: Renderer = new THREE.WebGLRenderer({antialias: true});
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private controls!: OrbitControls;

    phi: number = 0
    lambda:number = 0
    
    guessList: string[] = []

    geoJSONdata: any[] = []

    
    pointA: ILatLong
    pointB: ILatLong

    resultsDisplayOptions = new FormGroup ({
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


    constructor(private http: HttpClient, private statsService: GameStatisticsService) { 
        this.scene = new THREE.Scene();      
        this.pointA = {latitude: 45, longitude: 45}
        this.pointB = {latitude: 0, longitude: 0}   
    }


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


    geometry = new THREE.SphereGeometry( GLOBE_SCALAR, 32, 16 );
    material = new THREE.MeshLambertMaterial( this.materialParameters);
    mathsSphere = new THREE.Mesh( this.geometry, this.material );

    // Edges Wireframe
    // https://stackoverflow.com/questions/20153705/three-js-wireframe-material-all-polygons-vs-just-edges
    geoEdges = new THREE.EdgesGeometry( this.geometry ); // or WireframeGeometry( geometry )
    // geoEdges = new THREE.WireframeGeometry( this.geometry );
    matLines = new THREE.LineBasicMaterial( { color: 0xaaaaaa, linewidth: 2, opacity: 0.1} );
    wireframe = new THREE.LineSegments( this.geoEdges, this.matLines );
    


    // Also
    // How to display both wireframe and solid colour:
    // https://stackoverflow.com/questions/31539130/display-wireframe-and-solid-color/31541369#31541369

    lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );


    globe = new ThreeGlobe({animateIn: false})
        // .globeImageUrl('/assets/img/earth-day.jpg')
        // .globeImageUrl('/assets/img/earth-blue-marble800.jpg')
        // .globeImageUrl('/assets/img/grey.jpg')
        // .globeImageUrl('/assets/img/earth-dark.jpg')
        // .bumpImageUrl('http://unpkg.com/three-globe/example/img/earth-topology.png')
        .globeImageUrl('/assets/img/lightblue.jpg')
        .pointAltitude('size')


   
    private createScene(){
        console.log("running create scene")

        this.scene.background = new THREE.Color(0x303030);
        this.scene.add(new THREE.AmbientLight(0xffffff));
        
        let light = new THREE.DirectionalLight(0xffffff, 0.6)
        light.position.set(0,1,0)
        this.scene.add(light)
    

        let axesSet = generateAxes()
        
        // "cartesianAxes"
        let _group = new Group();
        _group.name = "cartesianAxes"
        _group.visible = this.resultsDisplayOptions.controls[_group.name].value
        for(let axis of axesSet){
            _group.add(axis)
        }
        this.scene.add(_group)

                                        
        let centroid_A = getCentroidLatLong("JP")
        let centroid_B = getCentroidLatLong("AU")

        
        // let testZero: ILatLong = {latitude: 0, longitude: 0}
        // let test90: ILatLong= {latitude: 0, longitude: 90}
        // let testPole: ILatLong = {latitude: 90, longitude: 0}

        let testV3 = new Vector3(0,0,1).multiplyScalar(GLOBE_SCALAR)
        testV3 = convertCartesianToThree(testV3)


        let GC_MaxPoint = getGreatCircleMaxPoint(centroid_A, centroid_B).multiplyScalar(GLOBE_SCALAR)

        // let crossMarker = markerAtVector3(getGreatCirclePlaneCrossing(centroid_A, centroid_B).multiplyScalar(GLOBE_SCALAR), 3, 0xffffff )
    
        let inPlaneRotationAngle = greatCirclePlaneRotation(centroid_A, centroid_B)
        let newCrossMarkerLocation = new Vector3(-100, 0, 0).applyAxisAngle(Y_UNIT, inPlaneRotationAngle)
        let newCrossMarker = markerAtVector3(newCrossMarkerLocation, 3, 0xffffff)


        this.wireframe.name = "wireFrameSphere"
        this.wireframe.visible = this.resultsDisplayOptions.controls[this.wireframe.name].value
        this.scene.add( this.wireframe );


        //set initial visibility
        this.globe.visible = false
        this.globe.name = "resultsGlobe"

        this.scene.add(this.globe)

        //Add all wedges


        let showConstructorLines = true
        let showPoints = true


        // Set up geometry wedges 
        _group = new Group();
        _group.name = "guessWedges"
        _group.visible = this.resultsDisplayOptions.controls[_group.name].value
        for(let i=1; i <= testCountries.length-1; i++){
            let startPoint = getCentroidLatLong(testCountries[i-1])
            let endPoint = getCentroidLatLong(testCountries[i])
            _group.add(wedgeBetweenTwoPoints(startPoint, endPoint, colourList[i-1], 0.8, 1))
        }
        this.scene.add(_group)


        // Set up globe wedges 
        _group = new Group();
        _group.name = "globeWedges"
        _group.visible = this.resultsDisplayOptions.controls[_group.name].value
        for(let i=1; i <= testCountries.length-1; i++){
            let startPoint = getCentroidLatLong(testCountries[i-1])
            let endPoint = getCentroidLatLong(testCountries[i])
            _group.add(wedgeBetweenTwoPoints(startPoint, endPoint, colourList[i-1], 0.8, 1.15))
        }
        this.scene.add(_group)
        


        // Set up construction lines
        _group = new Group();
        _group.name = "guessConstructorLines"
        _group.visible = this.resultsDisplayOptions.controls[_group.name].value
        for(let i=0; i<= testCountries.length-1; i++){
            let point = getCentroidLatLong(testCountries[i])
            let _constructorMeshList = getConstructorLines(point, colourList[i])

            for(let mesh of _constructorMeshList){
                // this.scene.add(mesh)
                _group.add(mesh)
            }
        }
        this.scene.add(_group)


        // Set up centroid points
        _group = new Group();
        _group.name = "guessCentroids"
        _group.visible = this.resultsDisplayOptions.controls[_group.name].value
        for(let i=0; i<= testCountries.length-1; i++){
            let point = getCentroidLatLong(testCountries[i])
            let _mesh = markerAtLatLong(point, 2, colourList[i])
            _group.add(_mesh)
            // this.scene.add(_mesh)
        }
        this.scene.add(_group)

        
        // Set up circles
        _group = new Group();
        _group.name = "guessGreatCircles"
        _group.visible = this.resultsDisplayOptions.controls[_group.name].value
        for(let i=1; i <= testCountries.length-1; i++){
            let startPoint = getCentroidLatLong(testCountries[i-1])
            let endPoint = getCentroidLatLong(testCountries[i])
            _group.add(greatCircleFromTwoPoints(startPoint, endPoint, colourList[i-1], 0.5))
        }
        this.scene.add(_group)
        
        this.updatePointA()
        this.updatePointB()

        this.updateABTriangle()
        this.updateDebugGroup()
        
    
        this.camera = new THREE.PerspectiveCamera();
        // this.camera.aspect = window.innerWidth/ window.innerHeight;
        this.camera.aspect = 1; //(square)
            this.camera.position.z = 350;
            this.camera.updateProjectionMatrix();

            
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
            //angle from the pole. North pole is 0, using spherical coordinates.
            this.controls.minPolarAngle = Math.PI/4 
            this.controls.maxPolarAngle = 3 * Math.PI/4
            this.controls.enablePan=false
    }




    ngOnInit(): void {
        console.log("initialising")
    }


    ngAfterViewInit() {
            let url = '/assets/boundaries/geojson/ne_110m_admin_0_countries.geojson'
            // let url = '/assets/boundaries/geojson/fileused.json'
                this.http.get<any>(url).subscribe({
                    next: data => {

                        this.geoJSONdata = data
                        

                        console.log("filtered data:")
                        // console.log(data.filter((country: { properties: { ISO_A2_EH: string; }; }) => country.properties.ISO_A2_EH === 'FR'))
                        console.log(data.features.filter((feature: { properties: { ISO_A2_EH: string; }; }) => feature.properties.ISO_A2_EH==='FR'))
                        
                        type MyType = {
                            [key: string]: any;
                        }

                        //add France
                        this.globe
                            .polygonsData(data.features)
                            // .polygonsData(data.features.filter((feature: { properties: { ISO_A2_EH: string; }; }) => feature.properties.ISO_A2_EH==='FR'))
                            // .polygonCapColor(() => 'rgba(42, 157, 143, 0.8)')
                            // .polygonSideColor(() => 'rgba(42, 157, 143, 0.6)')
                            .polygonCapColor((feat) => {return this.checkColourCap( (<MyType>feat)['properties'].ISO_A2_EH)})
                            .polygonSideColor((feat) => {return this.checkColourSide( (<MyType>feat)['properties'].ISO_A2_EH)})
                            // this.checkColourCap
                            // this.checkColourSide
                            .polygonStrokeColor(() => '#111')
                            // .polygonAltitude(feat => Math.max(0.1, Math.sqrt(+(<MyType>feat)['properties'].POP_EST) * 7e-5))
                            .polygonAltitude(feat => {return this.checkCountry( (<MyType>feat)['properties'].ISO_A2_EH)})
                            // .showGlobe(false)

                        // //add !France
                        // this.globe
                        //     // .polygonsData(data.features)
                        //     .polygonsData(data.features.filter((feature: { properties: { ISO_A2_EH: string; }; }) => feature.properties.ISO_A2_EH!=='FR'))
                        //     .polygonCapColor(() => 'rgba(42, 157, 143, 0.8)')
                        //     .polygonSideColor(() => 'rgba(42, 157, 143, 0.6)')
                        //     .polygonStrokeColor(() => '#111')

            
                        this.createScene()
                        console.log(this.rendererContainer)
                        // this.renderer.setSize(window.innerWidth, window.innerHeight);
                        this.renderer.setSize(600, 600);
                        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
                        this.animate();
                
                    }
                    })
        

    }

    
    animate() {
        window.requestAnimationFrame(() => this.animate());
        this.controls.update()
        this.renderer.render(this.scene, this.camera);
    }

    
    buttonTest(): void {
        let inputCode = 'AU'
        this.highlightCountry(inputCode)
    }

    onInputChange_lat_A(event: MatSliderChange) {
        if(event.value){
            this.pointA.latitude = event.value
            this.updatePointA()
        }
}

    onInputChange_long_A(event: MatSliderChange) {
        if(event.value){
            this.pointA.longitude = event.value
            this.updatePointA()
        }
    }

    onInputChange_lat_B(event: MatSliderChange) {
            if(event.value){
                this.pointB.latitude = event.value
                this.updatePointB()
            }
    }

    onInputChange_long_B(event: MatSliderChange) {
        if(event.value){
            this.pointB.longitude = event.value
            this.updatePointB()
        }
    }

    highlightCountry(countryCode: string): void{

        if(countryCode){
            let targetLatLong = getCentroidLatLong(countryCode)    
            
            console.log("lat: " + degreesToRadians(targetLatLong.latitude))
            console.log("lat: " + degreesToRadians(targetLatLong.longitude))

            
            console.log(targetLatLong)


            //set spacial xyz position of camera
            // note that if orbit control limits are set then they override the camera.position.set
            // and it pegs out at the limit set in OrbitControl

            targetLatLong = getCentroidLatLong('AU')

            // console.log(targetLatLong)
            let newCoords: Vector3
            let radius: number = 300
            newCoords = getVector3FromLatLong(targetLatLong, radius)
 
            this.camera.position.set(newCoords.x, newCoords.y, newCoords.z)
            this.animate()
        } 
    }

    checkCountry(countryCode: string): number{
        let guessList = ['DE', 'MX', 'BR', 'JP', 'CL']
        let correctAnswer = 'AU'

        let altitude: number = 0.01

        if(countryCode === correctAnswer) {
            altitude = 0.5
        } else if (guessList.includes(countryCode)) {
            altitude = 0.2
        }

        return altitude
    }

    checkColourCap(countryCode: string): string{
        let guessList = ['DE', 'MX', 'BR', 'JP', 'CL']
        let correctAnswer = 'AU'

        // let colour: string = 'rgba(42, 157, 143, 0.8)'  //green
        let colour: string = 'rgba(200, 220, 200, 1)'  //grey
        

        if (guessList.includes(countryCode)) {
            colour = 'rgba(191, 27, 57, 0.6)'
        }
        if(countryCode===correctAnswer){
            colour = 'rgba(42, 157, 143, 0.8)'
        }

        return colour
    }

    checkColourSide(countryCode: string): string{
        let guessList = ['DE', 'MX', 'BR', 'JP', 'CL']
        let correctAnswer = 'AU'

        let sideColor: string = 'rgba(200, 220, 200, 0.6)'  //grey
        // let sideColor: string = 'rgba(42, 157, 143, 0.6)'

        if (guessList.includes(countryCode)) {
            sideColor = 'rgba(191, 27, 57, 0.6)'
        }
        if(countryCode===correctAnswer){
            sideColor = 'rgba(42, 157, 143, 0.6)'
        }

        return sideColor
    }

    deleteObjectByNameAndUpdate(name: string){
        let object = this.scene.getObjectByName(name)
            if(object){
                this.scene.remove(object)
            }
        
        this.animate()
    }


    deleteObjectByName(name: string){
        let object = this.scene.getObjectByName(name)
            if(object){
                this.scene.remove(object)
            }
    }

    deleteTest(){
        console.log("attempting to delete")
        this.deleteObjectByName('pointGroupA')
        // this.animate()
    }

    updatePointA(): void {
        this.deleteObjectByName("pointGroupA")
        let _group = generateGroup(this.pointA, "pointGroupA", 0x00ff00)
        _group.visible=this.resultsDisplayOptions.controls["mathsDemo"].value
        this.scene.add(_group)
        this.updateABTriangle()
        this.updateDebugGroup()
        // this.animate()
    }

    updatePointB(): void {
        this.deleteObjectByName("pointGroupB")
        let _group = generateGroup(this.pointB, "pointGroupB", 0xff0000)
        _group.visible=this.resultsDisplayOptions.controls["mathsDemo"].value
        this.scene.add(_group)
        this.updateABTriangle()
        this.updateDebugGroup()
        // this.animate()
    }

    updateABTriangle(): void {
        this.deleteObjectByName("triangleABO") 
        let _triangleABO = wedgeBetweenTwoPoints(this.pointA, this.pointB, 0xBF1B39)
        _triangleABO.name = "triangleABO"
        _triangleABO.visible =this.resultsDisplayOptions.controls["mathsDemo"].value
        this.scene.add(_triangleABO)
    }

    updateMathsDemo(): void {
        this.updatePointA()
        this.updatePointB()
    }

    updateDebugGroup(): void {
        this.deleteObjectByName("debugGroup") 
        let _debug = this.debugConstuctorPoints()
        _debug.name = "debugGroup"
        _debug.visible = true
        this.scene.add(_debug)    
    }


    debugConstuctorPoints(): Group {
        let GC_MaxPoint = getGreatCircleMaxPoint(this.pointA, this.pointB).multiplyScalar(GLOBE_SCALAR)
        let GC_MaxMarker = markerAtVector3(GC_MaxPoint, 3, 0xfffff)
        let crossMarker = markerAtVector3(getGreatCirclePlaneCrossing(this.pointA, this.pointB).multiplyScalar(GLOBE_SCALAR), 3, 0xffffff )

        let _group = new Group()
        // _group.name = "debugGroup"
        _group.add(GC_MaxMarker)
        _group.add(crossMarker)

        return _group
    }

 

    displayOptionChanged(event: MatCheckboxChange): void{
        // redrawOutput()
        this.updateSceneVisibility()
        
    }

    updateSceneVisibility(): void{
        //select each named group
        //check visibility
        //toggle visibility
        let _namedGroups: string[] = [  "wireFrameSphere", 
                                        "cartesianAxes", 
                                        "resultsGlobe", 
                                        "guessWedges", 
                                        "guessConstructorLines", 
                                        "guessCentroids",
                                        "guessGreatCircles",
                                        "globeWedges"
                                    ]

        for(let group of _namedGroups){
            this.updateNamedObjectVisibility(group)
        }

        this.updateMathsDemo()


    }

    updateNamedObjectVisibility(objectName: string): void{
        //select each named group
        //check visibility
        //toggle visibility 
        let object = this.scene.getObjectByName(objectName)
        if(object){
            object.visible = this.resultsDisplayOptions.controls[objectName].value
        }
    }
}


function arcTest(): Line2 {
    
    let arcCurve = new EllipseCurve( 
        0, 0,               // ax, aY
        30, 30,             // xRadius, yRadius
        0, 1/2 * Math.PI,   // aStartAngle, aEndAngle
        false,              // aClockwise
        0                   // rotation angle           
    );

    let _lineMaterial = new LineMaterial({
        color: 0x00ff00,
        linewidth: 7, // px
        resolution: new Vector2(800, 800), // resolution of the viewport
        dashed: true,
        dashSize: 10,
        gapSize: 10,
        // polygonOffset: true,
        // polygonOffsetFactor: 1, // positive value pushes polygon further away
        // polygonOffsetUnits: 1
        // dashed, dashScale, dashSize, gapSize
      })

    
    let points = arcCurve.getSpacedPoints( 50 );

    let _bufferGeometry = new BufferGeometry().setFromPoints(points)
    let _lineGeometry = new LineGeometry().setPositions(_bufferGeometry.getAttribute('position').array as any) 

    return new Line2(_lineGeometry, _lineMaterial).rotateOnAxis(X_UNIT, Math.PI/4)
}


function generateGroup(point: ILatLong, name: string, color: number = 0xff0000, showConstructorLines: boolean = true): Group {
    let _group = new THREE.Group();
    _group.name = name

    let _pointMarker = markerAtLatLong(point, 3, color)
    _group.add(_pointMarker)

    if(showConstructorLines){
        let _lineSet = getConstructorLines(point, color)
            for(let mesh of _lineSet){
                _group.add(mesh)
            }
    }

    return _group
}