import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import * as d3 from 'd3';
import * as d3geoprojections from 'd3-geo-projection';
import { getCentroidLatLong } from 'src/app/commonFunctions/functions';
import { ILatLong } from 'src/app/models/interfaces_and_classes';

type D3SVGSelection = d3.Selection<SVGElement, any, null, undefined>;

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
    axialTilt: number
    obsRoll: number

    geoJSONBase: any

    constructor() {
        this.longitude_A = 0
        this.latitude_A = 0

        this.longitude_B = 0
        this.latitude_B = 0

        this.axialRotation = 0
        this.axialTilt = 0
        this.obsRoll = 0

        this.geoJSONBase = []
    }

    ngOnInit(): void {
        //initialise local copy of map data
        let mapGeoJSONurl = "/assets/boundaries/geojson/ne_110m_admin_0_countries.geojson"
        // let mapGeoJSONurl = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson"
        // let mapGeoJSONurl = "https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json"
        d3.json(mapGeoJSONurl).then( (data: any) =>{

            this.geoJSONBase = data

            this.svg = d3.select("svg")
            this.svg.append("g").attr("class", "gridlines")
            this.svg.append("g").attr("class", "points")
            this.svg.append("g").attr("class", "boundaries")
            this.svg.append("g").attr("class", "lines")
            this.redrawGraph()
        })
        

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
            // this.redrawGraph()
        }
    }

    onInputChange_phi(event: MatSliderChange) {
        if(event.value){
            this.axialTilt = event.value
            // this.redrawGraph()
        }
    }

    onInputChange_gamma(event: MatSliderChange) {
        if(event.value){
            this.obsRoll = event.value
            // this.redrawGraph()
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


    buttonTest(): void {
        let inputCode = 'GB'
        this.highlightCountry(inputCode)
    }

    highlightCountry(countryCode: string): void{
        this.redrawGraph(countryCode)
    }


    redrawGraph(countryCode?: string): void {
        // this.reset2DMap()
    
        let scaleFactor = 250
        let centreLon = 30
        let centreLat = 0

        let lambda = 0 //longitude == axial rotation about spin-axis
        let phi = 0 // latitude == inclination out of equatorial plane
        let gamma = 0 //z-axis rotation

        if(countryCode){
            let targetLatLong = getCentroidLatLong(countryCode)     
            console.log(targetLatLong)
            lambda = -targetLatLong.longitude
            phi = -targetLatLong.latitude
        } else {
            countryCode = ''
        }


        let width = +this.svg.attr("width")
        let height = +this.svg.attr("height")


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
            .rotate([lambda, phi, gamma])
            // .rotate([this.axialRotation, this.axialTilt, this.obsRoll])

        
        //Scale Parameter depends on map being used
        // Natural Earth = 180
        // Mercator = 128
        
            this.clear2DMap ()

            let data = this.geoJSONBase

            console.log(countryCode)

            this.svg
                .select('.boundaries')  
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                // .attr("fill", "grey")
                .attr("fill", (d: any) => {
                    let color: string = "grey"
                    if (d.properties.ISO_A2_EH === countryCode){
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

            this.svg.select('.lines')
                    .append("path")
                    .datum({
                        type: 'Feature',
                        geometry: {
                          type: 'LineString',
                          coordinates: [[0.1278, 51.5074], [-74.0059, 40.7128]]
                        }})
                    .attr('d', d3.geoPath().projection(projection)
                    )
                    .style("stroke", "red")
                    .style("fill", "none")
                    .style("stroke-width", 3)
                    .style("stroke-linecap", "round")

        }


}
