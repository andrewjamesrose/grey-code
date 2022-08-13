import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Renderer } from 'three';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EARTH_AXIAL_TILT_DEG } from 'src/app/constants';
import { EARTH_MEAN_RADIUS_KM } from 'src/assets/constants';

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

    geoJsonData: any


    constructor(private http: HttpClient) { 

        this.scene = new THREE.Scene();         
  
    }

    
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00 })
    cube = new THREE.Mesh( this.geometry, this.material )
    
    globe = new ThreeGlobe()
        // .globeImageUrl('/assets/img/earth-day.jpg')
        // .globeImageUrl('/assets/img/earth-blue-marble800.jpg')
        .globeImageUrl('/assets/img/grey.jpg')
        // .globeImageUrl('/assets/img/earth-dark.jpg')
        //   .bumpImageUrl('http://unpkg.com/three-globe/example/img/earth-topology.png')
        .pointAltitude('size')


   
    private createScene(){
        console.log("running create scene")

        this.scene.background = new THREE.Color(0x303030);
        

        this.scene.add(new THREE.AmbientLight(0xbbbbbb));
        this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

        // this.scene.add(this.globe);
        this.scene.add(this.cube)
        this.scene.add(this.globe)
        // this.cube.position.x = 30
        // this.cube.scale.x = 30;
        // this.cube.scale.y = 30;
        // this.cube.scale.z = 30;
    
        this.camera = new THREE.PerspectiveCamera();
        // this.camera.aspect = window.innerWidth/ window.innerHeight;
        this.camera.aspect = 1; //(square)
            this.camera.position.z = 500;
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
                        console.log("received data")
                        console.log(data)
                        this.globe
                            .polygonsData(data.features)
                            .polygonCapColor(() => 'rgba(42, 157, 143, 0.8)')
                            .polygonSideColor(() => 'rgba(42, 157, 143, 0.6)')
                            .polygonStrokeColor(() => '#111')
                            // .polygonAltitude(() => Math.random())
                            // .showGlobe(false)

            
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


}

