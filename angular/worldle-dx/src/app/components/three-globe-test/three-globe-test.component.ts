import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { Renderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ThreeGlobe from 'three-globe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-three-globe-test',
  templateUrl: './three-globe-test.component.html',
  styleUrls: ['./three-globe-test.component.scss']
})
export class ThreeGlobeTestComponent implements OnInit {
    @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef;

    constructor(private http: HttpClient) { }

    private renderer!: Renderer

    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private controls!: OrbitControls;

    globeData: any


    // globe
    globe = new ThreeGlobe()

    
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00 })
    cube = new THREE.Mesh( this.geometry, this.material )


    getGlobeData(){
        // let url = '/assets/boundaries/geojson/ne_110m_admin_0_countries.geojson'
        let url = '/assets/boundaries/geojson/fileused.json'
            this.http.get<any>(url).subscribe({
                next: data => {
                    // let newData = JSON.parse(data.features)
                    // console.log(data.features)
                    // console.log(newData)
                    // data.forEach(element => {
                    //     console.log(element)
                    // });
                    this.globeData = Array.from(data.features)
                    // console.log("data received")
                    // console.log(typeof this.globeData)
                    // console.log(Array.isArray(this.globeData))

                    this.globe.globeImageUrl('https://unpkg.com/three-globe@2.24.6/example/img/earth-day.jpg')

                    // this.globe.polygonsData(this.globeData)
                    //     // .polygonCapMaterial(new THREE.MeshLambertMaterial({ color: 'white', side: THREE.DoubleSide }))
                    //     .polygonCapColor(()=>'rgba(200, 0, 0, 0.7)')
                    //     .polygonSideColor(()=>'rgba(0, 200, 0, 0.1)')
                    //     .polygonStrokeColor(()=>'#111')
                    //     // .globeImageUrl('/assets/img/earth-dark.jpg')

                    //     .polygonAltitude(1.2)
                    //     // .showGlobe(false)
                    //     // .showAtmosphere(false);



                    this.createGlobe()
                },
                error: error => {

                    console.error('There was an error!', error);
                }
            })
    }


    private createScene(){
        console.log("running create scene")
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AmbientLight(0xbbbbbb));
        this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));
        this.scene.add(this.globe);
        this.scene.add(this.cube)
        this.cube.position.x = 30
        this.cube.scale.x = 30;
        this.cube.scale.y = 30;
        this.cube.scale.z = 30;

        

    
        this.camera = new THREE.PerspectiveCamera();
        this.camera.aspect = window.innerWidth/ window.innerHeight;
            this.camera.position.z = 150;
            this.camera.updateProjectionMatrix();

    }

    
    renderScene(){
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement, antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(this.renderScene)  
    }

    // setOrbitcontrols() {
    //     this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //     this.controls.screenSpacePanning = false;
    //     this.controls.enableDamping = true;
    //     this.controls.dampingFactor = 1;
    //     this.controls.minDistance = 10;
    //     this.controls.maxDistance = 400;
    //     this.controls.autoRotate = false;
    
    //     this.controls.minPolarAngle = 0.0 * Math.PI;
    //     this.controls.maxPolarAngle = 0.4 * Math.PI;
    //     this.controls.minAzimuthAngle = -0.25 * Math.PI;
    //     this.controls.maxAzimuthAngle = 0.25 * Math.PI;
    //   }

    ngOnInit(): void {
        
        console.log("initialising2")
    }

    ngAfterViewInit() {
        this.getGlobeData()
        // this.createGlobe()
    }

    createGlobe(){
        console.log("now create globe is running")
        this.createScene()
        // this.setOrbitControls()
        this.renderScene()
        console.log("globe data:")
        // console.log(this.globe.polygonsData())
    }

    printPolyData(){

    }

}
