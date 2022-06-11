import { Component, OnInit } from '@angular/core';
import { DemoData } from 'src/app/interfaces/interfaces';
import { AppDataService } from 'src/app/services/app-data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-display-graph',
  templateUrl: './display-graph.component.html',
  styleUrls: ['./display-graph.component.scss']
})
export class DisplayGraphComponent implements OnInit {

  displayedNumbers: number[] = []
  graphData: DemoData[] = []

  constructor(private appData: AppDataService) {

  }

  ngOnInit(): void {
    this.displayedNumbers = this.appData.getItems()

    //subscribe to changes on the Data service
    this.appData.listChanged.subscribe(
      (inboundList: number[]) => {
        this.displayedNumbers = inboundList
      }
    )

    this.graphData = this.appData.getGraphData()
    this.appData.graphDataChanged.subscribe(
      (inboundGraphData: DemoData[]) => {
        this.graphData = inboundGraphData
        console.log(this.graphData)

        d3.selectAll('svg').remove();
        this.createSvg()
        this.redrawGraph(this.graphData)

      })
  }

  redrawGraph(inputData: DemoData[]){
    this.drawBars(inputData);
  }

  ngAfterViewInit(): void{
    this.createSvg();
    this.redrawGraph(this.graphData)
  }

  createSvg(): void {
    this.svg = d3.select("figure#bar")
                .append("svg")
                .attr("width", this.width + (this.margin * 2))
                .attr("height", this.height + (this.margin * 2))
                .append("g")
                .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  hovered: DemoData|undefined;

  ttPos = {
    "left.px": 0,
    "top.px": 0
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
                .domain([0, 20])
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
