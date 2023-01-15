declare module "d3-geo-projection" {
	import { GeoProjection } from "d3-geo"
	export function geoPatterson(): GeoProjection
    export function geoMiller(): GeoProjection
    export function geoRobinson(): GeoProjection
}
