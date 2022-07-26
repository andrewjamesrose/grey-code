import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as cytoscape from 'cytoscape';
import { Core } from 'cytoscape';
import { DEMO_GRAPH } from './first-test.demo-graph-elements';


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

    _lastNode: string | undefined

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.MyDOMElement);
    if(this.MyDOMElement) {
        // this.MyDOMElement.nativeElement.innerHTML = "I am changed by ElementRef & ViewChild";

        this.cy = cytoscape({
            container:  this.MyDOMElement.nativeElement,
            // layout: { name: "breadthfirst" },
            elements: DEMO_GRAPH
                ,
              style: [
                // the stylesheet for the graph
                {
                  selector: "node",
                  style: {
                    shape: "roundrectangle",
                    width: 230,
                    height: 80,
                    // "border-radius": "8px",
                    "background-color": "#3B3B3B",
                    //label: "data(id)",
                    // "border-bottom": "1px solid blue",
                    color: "#121212",
                    "text-valign": "center",
                    "label": "data(id)",
                    // "label": this.position()
                  },

                },
            
                {
                  selector: "edge",
                  style: {
                    width: 3,
                    "line-color": "#69F0AE",
                    "target-arrow-color": "#69F0AE",
                    "target-arrow-shape": "circle",
                    // "curve-style": "taxi"
            
                    // //failed "S" shape settings
                    // "target-endpoint": [-115, 0],
                    // "source-endpoint": [115, 0],
                    "curve-style": "unbundled-bezier",
                    "control-point-distances": [100, -80],
                    "control-point-weights": [0.1, 0.75],
                  
                  }
                }
              ]
          })

        this.cy.on('click', 'node', (evt) => {
          this._lastNode = evt.target.id()
          // console.log( evt.target.id() )
        
        })

    }
  }
  
  reArrangeGraph(): void {
      console.log("hello")
  }
}
