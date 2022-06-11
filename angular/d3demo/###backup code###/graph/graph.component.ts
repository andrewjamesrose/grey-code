import { Component, ContentChild, Directive, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

interface DemoData {
    Framework: string;
    Stars: number;
    Release: number;
}

@Directive({
    selector: "[chart-tooltip]"
  })
  export class ChartTooltipDirective {
    constructor(public tmp: TemplateRef<any>) {}
  }
  

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})

export class GraphComponent implements OnInit {

    @ContentChild(ChartTooltipDirective)
    toolTipTmp!: ChartTooltipDirective

  constructor() { }



  ngOnInit(): void {

  }

  ngAfterViewInit(): void{
    this.createSvg();
    this.drawBars(this.data);
  }



    private data = [
      {"Framework": "Vue", "Stars": 166443, "Released": 2014},
      {"Framework": "React", "Stars": 150793, "Released": 2013},
      {"Framework": "Angular", "Stars": 62342, "Released": 2016},
      {"Framework": "Backbone", "Stars": 27647, "Released": 2010},
      {"Framework": "Ember", "Stars": 21471, "Released": 2011},
    ];

    // private svg: any;
    // svg: Selection<any, any, any, any>;
    svg: any;
    private margin = 50;
    private width = 750 - (this.margin * 2);
    private height = 400 - (this.margin * 2);
    
    

    hovered: DemoData|undefined;

    ttPos = {
      "left.px": 0,
      "top.px": 0
    }

     createSvg(): void {
        this.svg = d3.select("figure#bar")
        .append("svg")
        .attr("width", this.width + (this.margin * 2))
        .attr("height", this.height + (this.margin * 2))
        .append("g")
        .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    }

     drawBars(data: any[]): void {
        // Add X axis
        const x = d3.scaleBand()
        .range([0, this.width])
        .domain(data.map(d => d.Framework))
        .padding(0.2);
    
        this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
        // Add Y axis
        const y = d3.scaleLinear()
        .domain([0, 200000])
        .range([this.height, 0]);
    
        this.svg.append("g")
        .call(d3.axisLeft(y));
    
        //define mouse events for svg bars
        let tipMouseOver = (event: MouseEvent, d: DemoData) => {
             this.hovered = d;
             this.ttPos["left.px"] = event.clientX + 15;
             this.ttPos["top.px"] = event.clientY - 28;
             console.log(event);
         }
        // tooltip mouseout event handler
        let tipMouseOut = (d: DemoData) => {
            this.hovered = undefined;
            console.log("leaving")
        };

        // Create and fill the bars
        this.svg.selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d: DemoData ) =>  x(d.Framework))
        .attr("y", (d: DemoData ) => y(d.Stars))
        .attr("width", x.bandwidth())
        .attr("height", (d: DemoData ) => this.height - y(d.Stars))
        .attr("fill", "#d04a35")
        .on("mouseover", tipMouseOver)
        .on("mouseout", tipMouseOut);
      }
    

}
