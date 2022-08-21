import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BufferGeometry, EllipseCurve, Euler, Group, LineBasicMaterial, LineSegments, Object3D, Renderer, Vector, Vector2, Vector3 } from 'three';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EARTH_MEAN_RADIUS_KM } from 'src/assets/constants';
import { angleBetweenPointsOnSphere, degreesToRadians, getCentroidLatLong } from 'src/app/commonFunctions/geographyFunctions';
import { GameStatisticsService } from 'src/app/services/game-statistics.service';
import { IFullStats } from 'src/app/models/statistics';
import { ILatLong, LatLong } from 'src/app/models/game-logic';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';
import { ARC_DENSITY, AXIS_ORIGIN, GLOBE_SCALAR, X_UNIT, Y_UNIT, Z_UNIT } from 'src/app/constants';
import { convertCartesianToThree, dashedDroplineToAxis, dashedDroplineToPlane, generateAxes, getConstructorLines, getGreatCircleMaxPoint, getGreatCirclePlaneCrossing, getVector3FromLatLong, greatCircleFromTwoPoints, greatCirclePlaneRotation, ILineGeometry, line2FromPoints, markerAtLatLong, markerAtVector3, singleAxisProjection, wedgeBetweenTwoPoints, wedgeXY, xz_PlaneDropLineToAxis, xz_planeProjectionPoint } from 'src/app/commonFunctions/threeSphereFunctions';
import { MatSliderChange } from '@angular/material/slider';

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
  selector: 'app-more-globe-tests',
  templateUrl: './more-globe-tests.component.html',
  styleUrls: ['./more-globe-tests.component.scss']
})
export class MoreGlobeTestsComponent implements OnInit {
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


    constructor(private http: HttpClient, private statsService: GameStatisticsService) { 
        this.scene = new THREE.Scene();      
        this.pointA = {latitude: 45, longitude: 45}
        this.pointB = {latitude: 0, longitude: 0}   
    }

    // Test cube
    // geometry = new THREE.BoxGeometry(1, 1, 1);
    // material = new THREE.MeshBasicMaterial( { color: 0x00ff00 })
    // cube = new THREE.Mesh( this.geometry, this.material )

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
    // geometry = new THREE.BoxGeometry(1, 1, 1);
    // material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    material = new THREE.MeshLambertMaterial( this.materialParameters);
    mathsSphere = new THREE.Mesh( this.geometry, this.material );

    // Edges Wireframe
    // https://stackoverflow.com/questions/20153705/three-js-wireframe-material-all-polygons-vs-just-edges
    geoEdges = new THREE.EdgesGeometry( this.geometry ); // or WireframeGeometry( geometry )
    // geoEdges = new THREE.WireframeGeometry( this.geometry );
    matLines = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
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
        this.scene.add(new THREE.AmbientLight(0xbbbbbb));
        
        let light = new THREE.DirectionalLight(0xffffff, 0.6)
        light.position.set(0,1,0)
        this.scene.add(light)
    
        // this works!
        // this.myVectorLine.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI/4)




        // this.myLine.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI/4)
        // this.myLine.computeLineDistances();




        // Add Meshes to Scene:
        // this.scene.add(this.globe)
        //  this.scene.add( this.mathsSphere );
        // this.scene.add( this.wireframe );
        


        let axesSet = generateAxes()

        for(let axis of axesSet){
            console.log(axis.geometry)
            this.scene.add(axis)
        }

        let inputLine: ILineGeometry = {
                                        startPoint: new Vector3(50,50,25),
                                        endPoint: new Vector3(100, 100, 125)
                                        }

                                        
        let centroid_A = getCentroidLatLong("JP")
        let centroid_B = getCentroidLatLong("AU")


        let _startMeshList = getConstructorLines(centroid_A, 0xeeeeee)
        let _endMeshList = getConstructorLines(centroid_B, 0x8888ff)


        let testAngle = arcTest() //.rotateOnWorldAxis(X_UNIT, Math.PI/4)



        let markerTR = markerAtLatLong(centroid_A, 1.5, 0xff0000)
        let markerJP = markerAtLatLong(centroid_B, 1.5, 0x0000ff)

        
        // let testZero: ILatLong = {latitude: 0, longitude: 0}
        // let test90: ILatLong= {latitude: 0, longitude: 90}
        // let testPole: ILatLong = {latitude: 90, longitude: 0}

        let testV3 = new Vector3(0,0,1).multiplyScalar(GLOBE_SCALAR)
        testV3 = convertCartesianToThree(testV3)

        // let testV3 = getVector3FromLatLong(myVector, GLOBE_SCALAR)

        let greatCircle = greatCircleFromTwoPoints(centroid_A, centroid_B)
        // let greatCircle = greatCircleFromTwoPoints(testZero, testPole)

        let GC_MaxPoint = getGreatCircleMaxPoint(centroid_A, centroid_B).multiplyScalar(GLOBE_SCALAR)
        let GC_MaxMarker = markerAtVector3(GC_MaxPoint, 3, 0xfffff)

        // let crossMarker = markerAtVector3(getGreatCirclePlaneCrossing(centroid_A, centroid_B).multiplyScalar(GLOBE_SCALAR), 3, 0xffffff )
    
        let inPlaneRotationAngle = greatCirclePlaneRotation(centroid_A, centroid_B)
        let newCrossMarkerLocation = new Vector3(-100, 0, 0).applyAxisAngle(Y_UNIT, inPlaneRotationAngle)
        let newCrossMarker = markerAtVector3(newCrossMarkerLocation, 3, 0xffffff)

        // let newWedge = wedgeBetweenTwoPoints(centroid_A, centroid_B) 
        
        

        // funFunFunction(getCentroidLatLong("TR"), getCentroidLatLong("JP"))
        // let greatCircle = great


        // for(let mesh of _startMeshList){
        //     this.scene.add(mesh)
        // }

        // for(let mesh of _endMeshList){
        //     this.scene.add(mesh)
        // }

        // this.scene.add(testAngle)
        // this.scene.add(markerTR)
        // this.scene.add(markerJP)

        // this.scene.add(greatCircle)

        // this.scene.add(GC_MaxMarker)
        // this.scene.add(newCrossMarker)

        // this.scene.add(testWedge)
        // this.scene.add(newWedge)


        //Add all wedges


        let showWedges = false
        let showConstructorLines = false
        let showPoints = false


        if(showWedges){
            for(let i=1; i <= testCountries.length-1; i++){
                let startPoint = getCentroidLatLong(testCountries[i-1])
                let endPoint = getCentroidLatLong(testCountries[i])
                this.scene.add(wedgeBetweenTwoPoints(startPoint, endPoint, colourList[i-1]))
            }
        }

        if(showConstructorLines){
            // add all construction lines
            for(let i=0; i<= testCountries.length-1; i++){
                let point = getCentroidLatLong(testCountries[i])
                
                let _constructorMeshList = getConstructorLines(point, colourList[i])

                for(let mesh of _constructorMeshList){
                    this.scene.add(mesh)
                }
            }
        }

        if(showPoints){    
            // add centroid points
            for(let i=0; i<= testCountries.length-1; i++){
                let point = getCentroidLatLong(testCountries[i])
                let _mesh = markerAtLatLong(point, 2, colourList[i])
                this.scene.add(_mesh)
            }
        }

        
        // let _group = generateGroup(this.pointA, "pointGroupA", 0x00ff00)
        // this.scene.add(_group)
        
        this.updatePointA()
        this.updatePointB()

        this.updateABTriangle()


        // this.scene.add(this.globe)
        // this.scene.add(this.mathsSphere);
        // this.scene.add(this.wireframe);

        // this.scene.add(this.myLine)

    
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
    
            // console.log(newCoords)

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
        this.scene.add(_group)
        this.updateABTriangle()
        // this.animate()
    }

    updatePointB(): void {
        this.deleteObjectByName("pointGroupB")
        let _group = generateGroup(this.pointB, "pointGroupB", 0xff0000)
        this.scene.add(_group)
        this.updateABTriangle()
        // this.animate()
    }

    updateABTriangle(): void {
        this.deleteObjectByName("triangleABO") 
        let _triangleABO = wedgeBetweenTwoPoints(this.pointA, this.pointB, 0xBF1B39)
        _triangleABO.name = "triangleABO"
        this.scene.add(_triangleABO)
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
    let material = new LineBasicMaterial( { color : 0xff0000 } );

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