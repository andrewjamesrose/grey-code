import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';


@Component({
  selector: 'app-three-test',
  templateUrl: './three-test.component.html',
  styleUrls: ['./three-test.component.scss']
})
export class ThreeTestComponent implements OnInit {
    @ViewChild('canvas')
    private canvasRef!: ElementRef;

  
    //? Helper Properties (Private Properties);
    private camera!: THREE.PerspectiveCamera;
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00 })
    private renderer!: THREE.WebGLRenderer;
    private scene!: THREE.Scene;
    cube = new THREE.Mesh( this.geometry, this.material )


    // private get canvas(): HTMLCanvasElement {
    //   return this.canvasRef.nativeElement;
    // }


    private createScene() {
      //* Scene
      this.scene = new THREE.Scene();
        this.scene.add(this.cube)
        
      //* Camera
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.camera.position.z = 5
    }
  
    
    render() {
        window.requestAnimationFrame(this.render)
        this.renderer.render(this.scene, this.camera)
    }
  
    constructor() { }
  
    ngOnInit(): void {
  
    }

  
    ngAfterViewInit() {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement, antialias: true, alpha: true });
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.createScene();
        this.render();
    }
  
  }
