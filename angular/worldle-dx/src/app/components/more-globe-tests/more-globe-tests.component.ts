import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Euler, Renderer } from 'three';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EARTH_AXIAL_TILT_DEG } from 'src/app/constants';
import { EARTH_MEAN_RADIUS_KM } from 'src/assets/constants';
import { degreesToRadians, getCentroidLatLong } from 'src/app/commonFunctions/functions';
import { GameStatisticsService } from 'src/app/services/game-statistics.service';
import { IFullStats } from 'src/app/models/statistics';
import { ILatLong } from 'src/app/models/game-logic';

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

    
    geometry = new THREE.BoxGeometry(1, 1, 1);
    // material = new THREE.MeshBasicMaterial( { color: 0x00ff00 })
    // cube = new THREE.Mesh( this.geometry, this.material )
    
    globe = new ThreeGlobe({animateIn: false})
        // .globeImageUrl('/assets/img/earth-day.jpg')
        // .globeImageUrl('/assets/img/earth-blue-marble800.jpg')
        // .globeImageUrl('/assets/img/grey.jpg')
        .globeImageUrl('/assets/img/lightblue.jpg')
        // .globeImageUrl('/assets/img/earth-dark.jpg')
        //   .bumpImageUrl('http://unpkg.com/three-globe/example/img/earth-topology.png')
        .pointAltitude('size')


   
    private createScene(){
        console.log("running create scene")

        this.scene.background = new THREE.Color(0x303030);
        

        this.scene.add(new THREE.AmbientLight(0xbbbbbb));
        
        let light = new THREE.DirectionalLight(0xffffff, 0.6)
        // light.position.set(-1,0,1)
        light.position.set(0,1,0)
        this.scene.add(light)
        // this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

        // this.scene.add(this.globe);
        // this.scene.add(this.cube)
        this.scene.add(this.globe)
        // this.cube.position.x = 30
        // this.cube.scale.x = 30;
        // this.cube.scale.y = 30;
        // this.cube.scale.z = 30;
    
        this.camera = new THREE.PerspectiveCamera();
        // this.camera.aspect = window.innerWidth/ window.innerHeight;
        this.camera.aspect = 1; //(square)
            this.camera.position.z = 350;
            this.camera.updateProjectionMatrix();

            
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
            //angle from the pole. North pole is 0
            this.controls.minPolarAngle = Math.PI/4 
            this.controls.maxPolarAngle = 3 * Math.PI/4



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

            // console.log()
            
            console.log(targetLatLong)

            //  this.scene.rotation.y = -degreesToRadians(targetLatLong.longitude)
                        // this.scene.rotation.y = Math.PI/2
            // this.scene.rotation.x = degreesToRadians(targetLatLong.latitude)

            // this.globe.rotation.x = degreesToRadians(targetLatLong.latitude)
            // y = long

            //set spacial xyz position of camera
            // note that if orbit control limits are set then they override the camera.position.set
            // and it pegs out at the limit set in OrbitControl

            targetLatLong = getCentroidLatLong('IN')

            console.log(targetLatLong)
            let newCoords: Euler
            let radius: number = 300
            newCoords = getThreeJSEulerFromLatLong(targetLatLong, radius)
    
            console.log(newCoords)

            // this.camera.position.set(0, 350, 0)
            this.camera.position.set(newCoords.x, newCoords.y, newCoords.z)

            //  this could be useful but it seems OrbitControls (or magic?) is somehow setting the lookAt(0,0,0)
            // this.camera.lookAt(0,0,0);

            this.animate()

            // this.lambda = -targetLatLong.longitude
            // this.phi = -targetLatLong.latitude
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

function getThreeJSEulerFromLatLong(latLong: ILatLong, radius: number): Euler {
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

    return new Euler(_x, _y, _z)
}

