import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import * as d3 from 'd3';
import * as d3geoprojections from 'd3-geo-projection';

@Component({
  selector: 'app-maths-demo',
  templateUrl: './maths-demo.component.html',
  styleUrls: ['./maths-demo.component.scss']
})
export class MathsDemoComponent implements OnInit {

    svg: any

    longitude_A: number
    latitude_A: number

    longitude_B: number
    latitude_B: number

    axialRotation: number

    constructor() {
        this.longitude_A = 0
        this.latitude_A = 0

        this.longitude_B = 0
        this.latitude_B = 0

        this.axialRotation = 0
    }

    ngOnInit(): void {
        this.svg = d3.select("svg")
        this.svg.append("g").attr("class", "gridlines")
        this.svg.append("g").attr("class", "points")
        this.svg.append("g").attr("class", "boundaries")
        this.svg.append("g").attr("class", "lines")
        this.redrawGraph()
    }

    onInputChange_lat_A(event: MatSliderChange) {
            if(event.value){
                this.latitude_A = event.value
            }
    }

    onInputChange_long_A(event: MatSliderChange) {
        if(event.value){
            this.longitude_A = event.value
        }
    }

    onInputChange_lat_B(event: MatSliderChange) {
            if(event.value){
                this.latitude_B = event.value
            }
    }

    onInputChange_long_B(event: MatSliderChange) {
        if(event.value){
            this.longitude_B = event.value
        }
    }

    clear2DMap(){
        this.svg.selectAll('.boundaries').selectAll('*').remove();
        this.svg.selectAll('.gridlines').selectAll('*').remove();
        this.svg.selectAll('.lines').selectAll('*').remove();
        this.svg.selectAll('.points').selectAll('*').remove();
    }

    onInputChange_lambda(event: MatSliderChange) {
        if(event.value){
            this.axialRotation = event.value
            this.redrawGraph()
        }
    }




    updateProjectionParams(): void {
        let scaleFactor = 120
        let centreLon = 0
        let centreLat = 0
        let lambda = 0 //longitude == axial rotation about spin-axis
        let phi = 0 // latitude == inclination out of equatorial plane
        let gamma = 0 //z-axis rotation
    }


    redrawGraph(): void {
        // this.reset2DMap()
        
        let width = +this.svg.attr("width")
        let height = +this.svg.attr("height")

        let scaleFactor = 250
        let centreLon = 0
        let centreLat = 0
        let lambda = 0 //longitude == axial rotation about spin-axis
        let phi = 0 // latitude == inclination out of equatorial plane
        let gamma = 0 //z-axis rotation

        // Map and projection
        // let projection = d3.geoMercator()
        // let projection = d3.geoNaturalEarth1()
        // let projection = d3geoprojections.geoMiller()
        let projection = d3.geoOrthographic()
        // let projection = d3geoprojections.geoPatterson()
        // let projection = d3geoprojections.geoRobinson()
        // .center([2, 47])                // GPS of location to zoom on
            .scale(scaleFactor)                       // This is like the zoom. Full earth is 128 zoom, lower is further away
            .translate([ width/2, height/2 ])
            .center([centreLon, centreLat])
            // .rotate([lambda, phi, gamma])
            .rotate([this.axialRotation, phi, gamma])

        //Scale Parameter depends on map being used
        // Natural Earth = 180
        // Mercator = 128
        

        // How to use the d3.json syntax in modern d3 with promises:
        // https://stackoverflow.com/questions/49768165/code-within-d3-json-callback-is-not-executed
        // d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then( (data: any) =>{
        d3.json("/assets/boundaries/geojson/ne_110m_admin_0_countries.geojson").then( (data: any) =>{
            // console.log(data)

            this.clear2DMap ()

            // // Filter data for existing guesses only
            // data.features = data.features.filter((d: any) => {
            //                         // console.log(d.properties.ISO_A2_EH)
            //                         // return d.properties.ISO_A2_EH=="US"
            //                         return (this.isExistingGuess( d.properties.ISO_A2_EH))
            //                     })

            // Draw the map

            // this.svg.append("g")
            //     .selectAll("path")
            this.svg
                .select('.boundaries')  
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                // .attr("fill", "grey")
                .attr("fill", (d: any) => {
                    let color: string = "grey"
                    if (d.properties.ISO_A2_EH === "NO"){
                        color = "blue"
                    }
                    return color
                    })
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                .style("stroke", "none")

            // Draw Graticules

            let gridLines = d3.geoGraticule();

            this.svg.select('.gridlines')
                    .datum(gridLines())
                    .append("path")
                    .attr('d',  d3.geoPath()
                        .projection(projection)
                    )
                    .style("stroke", "grey")
                    .style("fill", "none")

            })
        }


}
