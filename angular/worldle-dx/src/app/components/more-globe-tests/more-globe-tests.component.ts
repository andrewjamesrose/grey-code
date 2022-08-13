import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Renderer } from 'three';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-more-globe-tests',
  templateUrl: './more-globe-tests.component.html',
  styleUrls: ['./more-globe-tests.component.scss']
})


export class MoreGlobeTestsComponent implements OnInit {
    @ViewChild('testid', { static: true }) rendererContainer!:  ElementRef<HTMLInputElement>;

    private renderer: Renderer = new THREE.WebGLRenderer();
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private controls!: OrbitControls;



    constructor(private http: HttpClient) { 

        this.scene = new THREE.Scene();         
  
    }

    
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00 })
    cube = new THREE.Mesh( this.geometry, this.material )
    
    globe = new ThreeGlobe()
      .globeImageUrl('http://unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('http://unpkg.com/three-globe/example/img/earth-topology.png')
      .pointAltitude('size')
      .pointColor('color');

   
    private createScene(){
        console.log("running create scene")

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
        this.camera.aspect = window.innerWidth/ window.innerHeight;
            this.camera.position.z = 500;
            this.camera.updateProjectionMatrix();

    }

 

    ngOnInit(): void {
        console.log("initialising")
    }


    ngAfterViewInit() {
        this.createScene()
        console.log(this.rendererContainer)
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();

    }

    
    animate() {
        window.requestAnimationFrame(() => this.animate());
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    }


}

