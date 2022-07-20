import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as cytoscape from 'cytoscape';
import { Core } from 'cytoscape';


@Component({
  selector: 'app-first-test',
  templateUrl: './first-test.component.html',
  styleUrls: ['./first-test.component.scss']
})
export class FirstTestComponent implements OnInit {

  constructor() { }

  @ViewChild('myDOMElement')
  MyDOMElement: ElementRef | undefined;

    cy: Core | undefined

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.MyDOMElement);
    if(this.MyDOMElement) {
        // this.MyDOMElement.nativeElement.innerHTML = "I am changed by ElementRef & ViewChild";

        this.cy = cytoscape({
            container:  this.MyDOMElement.nativeElement,
            // layout: { name: "breadthfirst" },
            elements: [
                // nodes
                { data: { id: 'a' } },
                { data: { id: 'b' } },
                { data: { id: 'c' } },
                { data: { id: 'd' } },
                { data: { id: 'e' } },
                { data: { id: 'f' } },
                // edges
                {
                  data: {
                    id: 'ab',
                    source: 'a',
                    target: 'b'
                  }
                },
                {
                  data: {
                    id: 'cd',
                    source: 'c',
                    target: 'd'
                  }
                },
                {
                  data: {
                    id: 'ef',
                    source: 'e',
                    target: 'f'
                  }
                },
                {
                  data: {
                    id: 'ac',
                    source: 'a',
                    target: 'c'
                  }
                },
                {
                  data: {
                    id: 'be',
                    source: 'b',
                    target: 'e'
                  }
                }
              ],
              style: [
                // the stylesheet for the graph
                {
                  selector: "node",
                  style: {
                    shape: "roundrectangle",
                    width: 230,
                    height: 80,
                    // "border-radius": "8px",
                    "background-color": "#3a3d4b",
                    //label: "data(id)",
                    // "border-bottom": "1px solid blue",
                    color: "black",
                    "text-valign": "center"
                  }
                },
            
                {
                  selector: "edge",
                  style: {
                    width: 3,
                    "line-color": "rgb(0, 111, 255)",
                    "target-arrow-color": "rgb(0, 111, 255)",
                    "target-arrow-shape": "circle",
                    // "curve-style": "taxi"
            
                    // //failed "S" shape settings
                    // "target-endpoint": [-115, 0],
                    // "source-endpoint": [115, 0],
                    "curve-style": "unbundled-bezier",
                    "control-point-distances": [100, -80],
                    "control-point-weights": [0.1, 0.75]
                  }
                }
              ]
          })
        
    }

  }


}
