import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Euler, LineSegments, Object3D, Renderer, Vector, Vector3 } from 'three';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EARTH_AXIAL_TILT_DEG } from 'src/app/constants';
import { EARTH_MEAN_RADIUS_KM } from 'src/assets/constants';
import { angleBetweenPointsOnSphere, degreesToRadians, getCentroidLatLong } from 'src/app/commonFunctions/functions';
import { GameStatisticsService } from 'src/app/services/game-statistics.service';
import { IFullStats } from 'src/app/models/statistics';
import { ILatLong, LatLong } from 'src/app/models/game-logic';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';

const AXIS_ORIGIN = new THREE.Vector3(0,0,0)
const X_UNIT = new Vector3(1, 0, 0)
const Y_UNIT = new Vector3(0, 1, 0)
const Z_UNIT = new Vector3(0, 0, 1)
const GLOBE_SCALAR = 100
const ARC_DENSITY = 360 / Math.PI

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

    phi: number =0
    lambda:number=0
    
    guessList: string[] = []

    geoJSONdata: any[] = []


    constructor(private http: HttpClient, private statsService: GameStatisticsService) { 
        this.scene = new THREE.Scene();         
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



    // Dotted Line to test Rotation 
    // myVector = new THREE.Vector3(1, 0, 0).multiplyScalar(GLOBE_SCALAR)  

    // myLineMaterial = new LineMaterial({
    //     color: 0xff0000,
    //     linewidth: 7, // px
    //     resolution: new THREE.Vector2(800, 800), // resolution of the viewport
    //     dashed: true,
    //     dashSize: 10,
    //     gapSize: 10
    //     // dashed, dashScale, dashSize, gapSize
    //   })

    // myBufferGeo = new THREE.BufferGeometry().setFromPoints([AXIS_ORIGIN, this.myVector])
    // myLineGeometry = new LineGeometry().setPositions(this.myBufferGeo.getAttribute('position').array as any) 
    // myLine = new Line2(this.myLineGeometry, this.myLineMaterial);



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

        // let axisProjections = generateAxisProjectionLines(inputLine)
        // for (let axPro of axisProjections){
        //     this.scene.add(axPro)
        // }

        
        let centroid_A = getCentroidLatLong("CA")
        let centroid_B = getCentroidLatLong("JP")

        let centroidPoint = getVector3FromLatLong(centroid_A, GLOBE_SCALAR)
        
        let centroidLine = line2FromPoints(AXIS_ORIGIN, centroidPoint)
        let xzProjection = xz_planeProjectionPoint(centroidPoint)
        
        let yProjection = singleAxisProjection(AXIS_ORIGIN, centroidPoint, "y")

        let yDropline = dashedDroplineToAxis(centroidPoint, "y")
        let xz_PlaneDropLine = dashedDroplineToPlane(centroidPoint, "xz")

        let xz_xDrop = xz_PlaneDropLineToAxis(centroidPoint, "x")
        let xz_zDrop = xz_PlaneDropLineToAxis(centroidPoint, "z")

        let testAngle = arcTest() //.rotateOnWorldAxis(X_UNIT, Math.PI/4)



        let markerTR = markerAtLatLong(centroid_A, 1.5, 0xff0000)
        let markerJP = markerAtLatLong(centroid_B, 1.5, 0x0000ff)



        let testWedge = wedgeXY(GLOBE_SCALAR, Math.PI / 3, centroid_A.longitude)

        
        // let testZero: ILatLong = {latitude: 0, longitude: 0}
        // let test90: ILatLong= {latitude: 0, longitude: 90}
        // let testPole: ILatLong = {latitude: 90, longitude: 0}

        let testV3 = new Vector3(0,0,1).multiplyScalar(GLOBE_SCALAR)
        testV3 = convertCartesianToThree(testV3)

        // let testV3 = getVector3FromLatLong(myVector, GLOBE_SCALAR)

        let greatCircle = greatCircleFromTwoPoints(centroid_A, centroid_B)
        // let greatCircle = greatCircleFromTwoPoints(testZero, testPole)

        let GC_MaxPoint = getGreatCircleMaxPoint(centroid_A, centroid_B).multiplyScalar(GLOBE_SCALAR)
        let GC_MaxMarker = markerAtVector3(testV3, 3, 0xfffff)

        // let crossMarker = markerAtVector3(getGreatCirclePlaneCrossing(getCentroidLatLong("TR"), getCentroidLatLong("JP")).multiplyScalar(GLOBE_SCALAR), 3, 0xffffff )
    
        let newWedge = wedgeBetweenTwoPoints(centroid_A, centroid_B)                                     

        // funFunFunction(getCentroidLatLong("TR"), getCentroidLatLong("JP"))
        // let greatCircle = great

        this.scene.add(centroidLine)
        this.scene.add(xzProjection)    
        this.scene.add(yProjection)
        this.scene.add(yDropline)
        this.scene.add(xz_PlaneDropLine)
        this.scene.add(xz_xDrop)
        this.scene.add(xz_zDrop)
        this.scene.add(testAngle)
        this.scene.add(markerTR)
        this.scene.add(markerJP)

        this.scene.add(greatCircle)
        // this.scene.add(GC_MaxMarker)

        // this.scene.add(crossMarker)

        // this.scene.add(testWedge)
        this.scene.add(newWedge)


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
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
        this.controls.update()
        this.renderer.render(this.scene, this.camera);
    }

    
    buttonTest(): void {
        let inputCode = 'AU'
        this.highlightCountry(inputCode)


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

            targetLatLong = getCentroidLatLong('IN')

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



}

function getVector3FromLatLong(latLong: ILatLong, radius: number): Vector3 {
    //Spherical geometry but using 3D modelling axes: 
        //x  + right //  - left
        //y  + up    //  - down
        //z  + away  //  - towards

    let _x: number
    let _y: number
    let _z: number

    let _phi = degreesToRadians(latLong.latitude)
    let _lambda = degreesToRadians(latLong.longitude)

    _x = radius * Math.cos(_phi) * Math.sin(_lambda)
    _y = radius * Math.sin(_phi)
    _z = radius * Math.cos(_phi) * Math.cos(_lambda)

    return new Vector3(_x, _y, _z)
}


function generateAxes(): THREE.Line[] {
    let lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );
    let x_axisBegin = new THREE.Vector3(1, 0, 0).multiplyScalar(GLOBE_SCALAR)  
    let x_axisEnd = new THREE.Vector3(-1, 0, 0).multiplyScalar(GLOBE_SCALAR) 
    let y_axisBegin = new THREE.Vector3(0, 1, 0).multiplyScalar(GLOBE_SCALAR)
    let y_axisEnd = new THREE.Vector3(0, -1, 0).multiplyScalar(GLOBE_SCALAR)
    let z_axisBegin = new THREE.Vector3(0, 0, 1).multiplyScalar(GLOBE_SCALAR)
    let z_axisEnd = new THREE.Vector3(0, 0, -1).multiplyScalar(GLOBE_SCALAR)
    let myVector = new THREE.Vector3(1, 0, 0).multiplyScalar(GLOBE_SCALAR)  

    let xAxisGeometry = new THREE.BufferGeometry().setFromPoints([x_axisBegin, x_axisEnd])
    let xAxisLine = new THREE.Line(xAxisGeometry, lineMaterial)

    let yAxisGeometry = new THREE.BufferGeometry().setFromPoints([y_axisBegin, y_axisEnd])
    let yAxisLine = new THREE.Line(yAxisGeometry, lineMaterial)

    let zAxisGeometry = new THREE.BufferGeometry().setFromPoints([z_axisBegin, z_axisEnd])
    let zAxisLine = new THREE.Line(zAxisGeometry, lineMaterial)
    
    return [xAxisLine, yAxisLine, zAxisLine]
}


// function generateLambdaAngle(): THREE.Object3D {

// }


// function generateLambdaAngle(): THREE.Object3D {

// }

// function arcLat
// function arcLong
 
// function arcPolarPhi
// function arcPolarTheta


function generateAxisProjectionLines(inputLine: ILineGeometry): Line2[]{
    let _myLineMaterial = new LineMaterial({
        color: 0xff0000,
        linewidth: 7, // px
        resolution: new THREE.Vector2(800, 800), // resolution of the viewport
        dashed: true,
        dashSize: 10,
        gapSize: 10,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
        // dashed, dashScale, dashSize, gapSize
      })


      let xStart = new Vector3(inputLine.startPoint.x, 0, 0)
      let xEnd = new Vector3(inputLine.endPoint.x, 0, 0)

      let yStart = new Vector3(0, inputLine.startPoint.y, 0)
      let yEnd = new Vector3(0, inputLine.endPoint.y, 0)

      let zStart = new Vector3(0, 0, inputLine.startPoint.z)
      let zEnd = new Vector3(0, 0, inputLine.endPoint.z)

    let _xAxisPro = line2FromPoints(xStart, xEnd)
    let _yAxisPro = line2FromPoints(yStart, yEnd)
    let _zAxisPro = line2FromPoints(zStart, zEnd)


    return [_xAxisPro, _yAxisPro, _zAxisPro]
}

function singleAxisProjection(startPoint: Vector3, endPoint: Vector3, axis: "x"|"y"|"z", color=0xff0000): Line2 {
    let _startPoint: Vector3
    let _endPoint: Vector3

    if(axis === "x") {
        _startPoint = new Vector3(startPoint.x, 0, 0)
        _endPoint = new Vector3(endPoint.x, 0, 0)
    } else if (axis === "y") {
        _startPoint = new Vector3(0, startPoint.y, 0)
        _endPoint = new Vector3(0, endPoint.y, 0)
    } else {
        _startPoint = new Vector3(0, 0, startPoint.z)
        _endPoint = new Vector3(0, 0, endPoint.z)
    }
    return line2FromPoints(_startPoint, _endPoint, color)
}

function line2FromPoints(startPoint: Vector3, endPoint: Vector3, color=0xff0000): Line2 {
    // let _lineMaterial = new LineMaterial({
    //     color: 0xff0000,
    //     linewidth: 5, // px
    //     resolution: new THREE.Vector2(800, 800), // resolution of the viewport
    //     dashed: true,
    //     dashSize: 5,
    //     gapSize: 5,
    //     polygonOffset: true,
    //     polygonOffsetFactor: 1, // positive value pushes polygon further away
    //     polygonOffsetUnits: 1
    //     // dashed, dashScale, dashSize, gapSize
    //   })

    let _lineMaterial = getLine2Material({dashed: true, dashsize: 5, gapSize: 5})

    //   let _lineMaterial = getLine2Material({color: 0xff0000})

    let _bufferGeometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint])
    let _lineGeometry = new LineGeometry().setPositions(_bufferGeometry.getAttribute('position').array as any) 

    return new Line2(_lineGeometry, _lineMaterial).computeLineDistances()
}


function radialLineFromLatLong(inputLatLong: LatLong): Line2 {
    let _endpoint = getVector3FromLatLong(inputLatLong, GLOBE_SCALAR)
    return line2FromPoints(AXIS_ORIGIN, _endpoint)
}

function radialPointFromLatLong(inputLatLong: LatLong): Vector3 {
    return getVector3FromLatLong(inputLatLong, GLOBE_SCALAR)
}


function xz_planeProjectionLatLong(inputLatLong: LatLong): Line2 {
    let _endpoint = getVector3FromLatLong(inputLatLong, GLOBE_SCALAR)
    let _planeEndPoint = new Vector3(_endpoint.x, 0, _endpoint.z)
    return line2FromPoints(AXIS_ORIGIN, _planeEndPoint)
}


function xz_planeProjectionPoint(inputVector3: Vector3): Line2 {
    let _planeEndPoint = new Vector3(inputVector3.x, 0, inputVector3.z)
    return line2FromPoints(AXIS_ORIGIN, _planeEndPoint)
}


function dashedDroplineToAxis(point: Vector3, axis: "x"|"y"|"z"): Line2 {
    let _axisPoint
    if(axis === "x") {
        _axisPoint = new Vector3(point.x, 0, 0)
    } else if (axis === "y") {
        _axisPoint = new Vector3(0, point.y, 0)
    } else {
        _axisPoint = new Vector3(0, 0, point.z)
    }

    return line2FromPoints(point, _axisPoint)
}

function xz_PlaneDropLineToAxis(point: Vector3, axis: "x"|"z"): Line2 {
    let _axisPoint
    let _xzPlanePoint = new Vector3(point.x, 0, point.z)
    if(axis === "x") {
        _axisPoint = new Vector3(point.x, 0, 0)
    } else {
        _axisPoint = new Vector3(0, 0, point.z)
    } 

    return line2FromPoints(_xzPlanePoint, _axisPoint)
}


function dashedDroplineToPlane(point: Vector3, plane: "xy"|"yz"|"xz"): Line2 {
    let _planePoint
    if(plane === "xy") {
        _planePoint = new Vector3(point.x, point.y, 0)
    } else if (plane === "yz") {
        _planePoint = new Vector3(0, point.y, point.z)
    } else {
        _planePoint = new Vector3(point.x, 0, point.z)
    }

    return line2FromPoints(point, _planePoint).computeLineDistances()
}


function arcTest(): Line2 {
    
    let arcCurve = new THREE.EllipseCurve( 
        0, 0,               // ax, aY
        30, 30,             // xRadius, yRadius
        0, 1/2 * Math.PI,   // aStartAngle, aEndAngle
        false,              // aClockwise
        0                   // rotation angle           
    );

    let _lineMaterial = new LineMaterial({
        color: 0x00ff00,
        linewidth: 7, // px
        resolution: new THREE.Vector2(800, 800), // resolution of the viewport
        dashed: true,
        dashSize: 10,
        gapSize: 10,
        // polygonOffset: true,
        // polygonOffsetFactor: 1, // positive value pushes polygon further away
        // polygonOffsetUnits: 1
        // dashed, dashScale, dashSize, gapSize
      })

          // myLineMaterial = new LineMaterial({
    //     color: 0xff0000,
    //     linewidth: 7, // px
    //     resolution: new THREE.Vector2(800, 800), // resolution of the viewport
    //     dashed: true,
    //     dashSize: 10,
    //     gapSize: 10
    //     // dashed, dashScale, dashSize, gapSize
    //   })
    
    let points = arcCurve.getSpacedPoints( 50 );
    let material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

    let _bufferGeometry = new THREE.BufferGeometry().setFromPoints(points)
    let _lineGeometry = new LineGeometry().setPositions(_bufferGeometry.getAttribute('position').array as any) 

    return new Line2(_lineGeometry, _lineMaterial).rotateOnAxis(X_UNIT, Math.PI/4)
}


interface ILineGeometry {
    startPoint: Vector3,
    endPoint: Vector3
}

function getLine2Material({
                        color = 0x0000ff, 
                        lineWidth =5, 
                        dashed=false,
                        dashsize=10, 
                        gapSize=10
                    }):     LineMaterial{


    return new LineMaterial({
        color: color,
        linewidth: lineWidth, // px
        dashed: dashed,
        dashSize: dashsize,
        gapSize: gapSize,

        // fixed params
        resolution: new THREE.Vector2(800, 800), // resolution of the viewport
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
      })
}


function markerAtLatLong(latLong: ILatLong, size: number=10, color: number): THREE.Mesh {
    let _markerGeometry =  new THREE.SphereGeometry( size, 32, 16 )

    let _position = getVector3FromLatLong(latLong, GLOBE_SCALAR)

    let _markerMmaterial = new THREE.MeshLambertMaterial( { color: 0xff0000 } );

    let _markerMesh = new THREE.Mesh(_markerGeometry, _markerMmaterial)
    _markerMesh.position.set(_position.x, _position.y, _position.z)

    return _markerMesh
} 

function markerAtVector3(location: Vector3, size: number=10, color: number): THREE.Mesh {
    let _markerGeometry =  new THREE.SphereGeometry( size, 32, 16 )

    let _position = location

    let _markerMmaterial = new THREE.MeshLambertMaterial( { color: color } );

    let _markerMesh = new THREE.Mesh(_markerGeometry, _markerMmaterial)
    _markerMesh.position.set(_position.x, _position.y, _position.z)

    return _markerMesh
} 


function wedgeXY(radius: number, arcLengthRad: number, offsetLongitude: number= 0): THREE.Mesh {
    let TWO_PI = 2*Math.PI

    let _offsetLongitude = degreesToRadians(offsetLongitude)

    if(arcLengthRad>TWO_PI) {
        arcLengthRad = TWO_PI
    }

    else if (arcLengthRad < -TWO_PI){
        arcLengthRad = -TWO_PI
    }

    let geometry = new THREE.CircleGeometry( radius, 32,0, arcLengthRad );
    let material = new THREE.MeshLambertMaterial( { color: 0xffff00, side: THREE.DoubleSide, transparent: true, opacity: 0.5} );
    return new THREE.Mesh( geometry, material ).rotateOnAxis(X_UNIT, -Math.PI/2).rotateOnAxis(Z_UNIT, -Math.PI/2).rotateOnAxis(Z_UNIT, _offsetLongitude)
    // .rotateOnAxis(Y_UNIT, -Math.PI/2).rotateOnAxis(Z_UNIT, Math.PI/2)
}


function getGreatCircleMaxPoint(startLatLong: ILatLong, endLatLong: ILatLong): Vector3 {

    let _vectorStart = getVector3FromLatLong(startLatLong, 1)
    let _vectorEnd = getVector3FromLatLong(endLatLong, 1)

    //convect to cartesian coordinates:
    _vectorStart = convertThreeToCartesian(_vectorStart)
    _vectorEnd = convertThreeToCartesian(_vectorEnd)

    let basis_U = _vectorStart
    let basis_V
    let basis_W

    console.log("Start Vector:")
    console.log(_vectorStart)

    console.log("Start End:")
    console.log(_vectorEnd)

    basis_W = new Vector3().crossVectors(_vectorStart, _vectorEnd)
    basis_V = new Vector3().crossVectors(basis_U, basis_W).multiplyScalar(1/basis_W.length())


    console.log("End Vector:")
    console.log(_vectorEnd)

    console.log("Basis U:")
    console.log(basis_U)

    console.log("Basis V:")
    console.log(basis_V)

    console.log("Basis W:")
    console.log(basis_W)

    
    console.log("Basis U Length:")
    console.log(basis_U.length())

    console.log("Basis V Length:")
    console.log(basis_V.length())

    console.log("Basis W Length:")
    console.log(basis_W.length())

    //  Parametric angle for max z 
    let zMax_theta = Math.atan(basis_V.z / basis_U.z)
    let zMax_x = basis_U.x * Math.cos(zMax_theta) + basis_V.x * Math.sin(zMax_theta)
    let zMax_y = basis_U.y * Math.cos(zMax_theta) + basis_V.y * Math.sin(zMax_theta)
    let zMax_z = basis_U.z * Math.cos(zMax_theta) + basis_V.z * Math.sin(zMax_theta)

    let outputCartesian = new Vector3(zMax_x, zMax_y, zMax_z)
    let outputThree = convertCartesianToThree(outputCartesian)
    return outputThree

}


function getGreatCirclePlaneCrossing(startLatLong: ILatLong, endLatLong: ILatLong): Vector3 {

    let _vectorStart = getVector3FromLatLong(startLatLong, 1)
    let _vectorEnd = getVector3FromLatLong(endLatLong, 1)

    //convect to cartesian coordinates:
    _vectorStart = convertThreeToCartesian(_vectorStart)
    _vectorEnd = convertThreeToCartesian(_vectorEnd)

    let basis_U = _vectorStart
    let basis_V
    let basis_W

    basis_W = new Vector3().crossVectors(_vectorStart, _vectorEnd)
    basis_V = new Vector3().crossVectors(basis_U, basis_W).multiplyScalar(1/basis_W.length())

    let z0_theta = Math.atan(- basis_U.z / basis_V.z )
    let z0_x = basis_U.x * Math.cos(z0_theta) + basis_V.x * Math.sin(z0_theta)
    let z0_y = basis_U.y * Math.cos(z0_theta) + basis_V.y * Math.sin(z0_theta)
    let z0_z = basis_U.z * Math.cos(z0_theta) + basis_V.z * Math.sin(z0_theta)

    let outputCartesian = new Vector3(z0_x, z0_y, 0)
    let outputThree = convertCartesianToThree(outputCartesian)

    return outputThree

}

function greatCircleElevationAngle(startLatLong: ILatLong, endLatLong: ILatLong): number{
    // angle between great circle plane and xy plane
    let zMaxVector = getGreatCircleMaxPoint(startLatLong, endLatLong)
   return Math.asin(zMaxVector.y)
}

function greatCirclePlaneRotation(startLatLong: ILatLong, endLatLong: ILatLong): number{
    // rotation in the xy-plane to get to the z-max point of the great circle
    let zMaxVector = getGreatCircleMaxPoint(startLatLong, endLatLong)
    let planeProjection = new Vector3(zMaxVector.x,0, zMaxVector.z)

    return angleBetweenTwoVectors(Z_UNIT, planeProjection )
}


function wedgeBetweenTwoPoints(startLatLong: ILatLong, endLatLong: ILatLong): THREE.Mesh {
    
    let thetaStart 
    let arcLength = angleBetweenPointsOnSphere(startLatLong, endLatLong)

    let geometry = new THREE.CircleGeometry(GLOBE_SCALAR, ARC_DENSITY * arcLength, thetaStart, arcLength);
    let material = new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.3} );
    
    let elevationAngle = greatCircleElevationAngle(startLatLong, endLatLong)

    // console.log("elevationAngle")
    // console.log(elevationAngle)

    let inPlaneRotationAngle = greatCirclePlaneRotation(startLatLong, endLatLong)

    let greatCirclePlaneCrossing = getGreatCirclePlaneCrossing(startLatLong, endLatLong)

    let angleZtoXYCrossing = angleBetweenTwoVectors(Z_UNIT,greatCirclePlaneCrossing)
    console.log(angleZtoXYCrossing)

    let _startThree = radialPointFromLatLong(startLatLong)
    let _endThree = radialPointFromLatLong(endLatLong)

    let wedgeOffsetAngle = getClosestAngle(greatCirclePlaneCrossing, _startThree, _endThree )

    let mesh =  new THREE.Mesh(geometry, material)
                                .rotateOnWorldAxis(X_UNIT, -Math.PI/2) //rotate to xy plane
                                .rotateOnWorldAxis(Y_UNIT, -Math.PI/2) //rotate so start of the circle is at Z-unit vector in the Three xz-plane
                                .rotateOnWorldAxis(Y_UNIT, -angleZtoXYCrossing )
                                .rotateOnWorldAxis(Y_UNIT, wedgeOffsetAngle)
                                .rotateOnWorldAxis(greatCirclePlaneCrossing, elevationAngle)


    return mesh
}

function getClosestAngle(referencePoint: Vector3, option1: Vector3, option2: Vector3 ): number{
    let _angle1 = angleBetweenTwoVectors(referencePoint, option1)
    let _angle2 = angleBetweenTwoVectors(referencePoint, option2)

    return Math.min(_angle1, _angle2)
}


function greatCircleFromTwoPoints(startLatLong: ILatLong, endLatLong: ILatLong): THREE.Mesh {
    let arcLength = 2* Math.PI
    
    ///angleBetweenPointsOnSphere(startLatLong, endLatLong)

    // let angleXYPlane = 1
    // let angleRotationZ = 2.5

    let geometry = new THREE.CircleGeometry(GLOBE_SCALAR, ARC_DENSITY * arcLength, 0, arcLength);
    let material = new THREE.MeshLambertMaterial( { color: 0xff00ff, side: THREE.DoubleSide, transparent: true, opacity: 0.3} );

    let elevationAngle = greatCircleElevationAngle(startLatLong, endLatLong)

    // console.log("elevationAngle")
    // console.log(elevationAngle)

    let inPlaneRotationAngle = greatCirclePlaneRotation(startLatLong, endLatLong)
    
    // console.log("planeRotationAngle")
    // console.log(inPlaneRotationAngle)
    

    let mesh =  new THREE.Mesh(geometry, material)
                        .rotateOnWorldAxis(X_UNIT, Math.PI/2) //rotates the circle so the max is along the Z axis
                        .rotateOnWorldAxis(X_UNIT, -elevationAngle) //.rotateOnAxis(Y_UNIT, inPlaneRotationAngle) //.rotateOnAxis(Y_UNIT, 0.5)
                        // .rotateOnAxis(Y_UNIT)
                        
    mesh.rotateOnWorldAxis(Y_UNIT, inPlaneRotationAngle)

    return mesh
}


function angleBetweenTwoVectors(startVector: Vector3, endVector: Vector3): number {
    let numerator = startVector.dot(endVector)
    let denominator = startVector.length() * endVector.length()
    return Math.acos(numerator/denominator)
}


function convertCartesianToThree(cartesianVector: Vector3): Vector3{
    return new Vector3(cartesianVector.y,cartesianVector.z,cartesianVector.x)
}

function convertThreeToCartesian(threeVector: Vector3): Vector3{
    return new Vector3(threeVector.z, threeVector.x, threeVector.y)
}

