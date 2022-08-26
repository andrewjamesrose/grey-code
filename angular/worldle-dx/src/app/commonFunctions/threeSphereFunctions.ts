import { max, min } from "d3"
import { BufferGeometry, CircleGeometry, DoubleSide, EllipseCurve, Line, LineBasicMaterial, Mesh, MeshLambertMaterial, MeshPhongMaterial, SphereGeometry, Vector2, Vector3 } from "three"
import { Line2, LineGeometry, LineMaterial } from "three-fatline"
import { ARC_DENSITY, AXIS_ORIGIN, GLOBE_SCALAR, X_UNIT, Y_UNIT, Z_UNIT } from "../constants"
import { ILatLong, LatLong } from "../models/game-logic"
import { angleBetweenPointsOnSphere, degreesToRadians } from "./geographyFunctions"

const NORTH_POLE: ILatLong = {
    latitude: 90,
    longitude: 1
}

export interface ILineGeometry {
    startPoint: Vector3,
    endPoint: Vector3
}

export function getVector3FromLatLong(latLong: ILatLong, radius: number): Vector3 {
    //Spherical geometry but using 3D modelling axes: 
        //x  + right //  - left
        //y  + up    //  - down
        //z  + away  //  - towards

    let _x: number
    let _y: number
    let _z: number

    let _phi = degreesToRadians(latLong.latitude)
    let _lambda = degreesToRadians(latLong.longitude)

    _x = radius * Math.cos(_phi) * Math.sin(_lambda)
    _y = radius * Math.sin(_phi)
    _z = radius * Math.cos(_phi) * Math.cos(_lambda)

    return new Vector3(_x, _y, _z)
}


export function generateAxes(): THREE.Line[] {
    let lineMaterial = new LineBasicMaterial( { color: 0xffffff } );
    let x_axisBegin = new Vector3(1, 0, 0).multiplyScalar(GLOBE_SCALAR)  
    let x_axisEnd = new Vector3(-1, 0, 0).multiplyScalar(GLOBE_SCALAR) 
    let y_axisBegin = new Vector3(0, 1, 0).multiplyScalar(GLOBE_SCALAR)
    let y_axisEnd = new Vector3(0, -1, 0).multiplyScalar(GLOBE_SCALAR)
    let z_axisBegin = new Vector3(0, 0, 1).multiplyScalar(GLOBE_SCALAR)
    let z_axisEnd = new Vector3(0, 0, -1).multiplyScalar(GLOBE_SCALAR)

    let xAxisGeometry = new BufferGeometry().setFromPoints([x_axisBegin, x_axisEnd])
    let xAxisLine = new Line(xAxisGeometry, lineMaterial)

    let yAxisGeometry = new BufferGeometry().setFromPoints([y_axisBegin, y_axisEnd])
    let yAxisLine = new Line(yAxisGeometry, lineMaterial)

    let zAxisGeometry = new BufferGeometry().setFromPoints([z_axisBegin, z_axisEnd])
    let zAxisLine = new Line(zAxisGeometry, lineMaterial)
    
    return [xAxisLine, yAxisLine, zAxisLine]
}


// function generateLambdaAngle(): THREE.Object3D {

// }


// function generateLambdaAngle(): THREE.Object3D {

// }

// function arcLat
// function arcLong
 
// function arcPolarPhi
// function arcPolarTheta


function generateAxisProjectionLines(inputLine: ILineGeometry): Line2[]{
    let _myLineMaterial = new LineMaterial({
        color: 0xff0000,
        linewidth: 7, // px
        resolution: new Vector2(800, 800), // resolution of the viewport
        dashed: true,
        dashSize: 10,
        gapSize: 10,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
        // dashed, dashScale, dashSize, gapSize
      })


      let xStart = new Vector3(inputLine.startPoint.x, 0, 0)
      let xEnd = new Vector3(inputLine.endPoint.x, 0, 0)

      let yStart = new Vector3(0, inputLine.startPoint.y, 0)
      let yEnd = new Vector3(0, inputLine.endPoint.y, 0)

      let zStart = new Vector3(0, 0, inputLine.startPoint.z)
      let zEnd = new Vector3(0, 0, inputLine.endPoint.z)

    let _xAxisPro = line2FromPoints(xStart, xEnd)
    let _yAxisPro = line2FromPoints(yStart, yEnd)
    let _zAxisPro = line2FromPoints(zStart, zEnd)


    return [_xAxisPro, _yAxisPro, _zAxisPro]
}

export function singleAxisProjection(startPoint: Vector3, endPoint: Vector3, axis: "x"|"y"|"z", color=0xff0000): Line2 {
    let _startPoint: Vector3
    let _endPoint: Vector3

    if(axis === "x") {
        _startPoint = new Vector3(startPoint.x, 0, 0)
        _endPoint = new Vector3(endPoint.x, 0, 0)
    } else if (axis === "y") {
        _startPoint = new Vector3(0, startPoint.y, 0)
        _endPoint = new Vector3(0, endPoint.y, 0)
    } else {
        _startPoint = new Vector3(0, 0, startPoint.z)
        _endPoint = new Vector3(0, 0, endPoint.z)
    }
    return line2FromPoints(_startPoint, _endPoint, color)
}

export function line2FromPoints(startPoint: Vector3, endPoint: Vector3, color=0xff0000): Line2 {
    let _lineMaterial = getLine2Material({dashed: true, dashsize: 4, gapSize: 4, color: color})
    let _bufferGeometry = new BufferGeometry().setFromPoints([startPoint, endPoint])
    let _lineGeometry = new LineGeometry().setPositions(_bufferGeometry.getAttribute('position').array as any) 

    return new Line2(_lineGeometry, _lineMaterial).computeLineDistances()
}


function radialLineFromLatLong(inputLatLong: LatLong): Line2 {
    let _endpoint = getVector3FromLatLong(inputLatLong, GLOBE_SCALAR)
    return line2FromPoints(AXIS_ORIGIN, _endpoint)
}


function radialPointFromLatLong(inputLatLong: LatLong): Vector3 {
    return getVector3FromLatLong(inputLatLong, GLOBE_SCALAR)
}


export function xz_planeProjectionLatLong(inputLatLong: LatLong, color: number = 0xff0000): Line2 {
    let _endpoint = getVector3FromLatLong(inputLatLong, GLOBE_SCALAR)
    let _planeEndPoint = new Vector3(_endpoint.x, 0, _endpoint.z)
    return line2FromPoints(AXIS_ORIGIN, _planeEndPoint, color)
}


export function xz_planeProjectionPoint(inputVector3: Vector3, color:number = 0xff0000): Line2 {
    let _planeEndPoint = new Vector3(inputVector3.x, 0, inputVector3.z)
    return line2FromPoints(AXIS_ORIGIN, _planeEndPoint, color)
}


export function dashedDroplineToAxis(point: Vector3, axis: "x"|"y"|"z", color: number = 0xff0000): Line2 {
    let _axisPoint
    if(axis === "x") {
        _axisPoint = new Vector3(point.x, 0, 0)
    } else if (axis === "y") {
        _axisPoint = new Vector3(0, point.y, 0)
    } else {
        _axisPoint = new Vector3(0, 0, point.z)
    }

    return line2FromPoints(point, _axisPoint, color)
}


export function xz_PlaneDropLineToAxis(point: Vector3, axis: "x"|"z", color: number = 0xff0000): Line2 {
    let _axisPoint
    let _xzPlanePoint = new Vector3(point.x, 0, point.z)
    if(axis === "x") {
        _axisPoint = new Vector3(point.x, 0, 0)
    } else {
        _axisPoint = new Vector3(0, 0, point.z)
    } 

    return line2FromPoints(_xzPlanePoint, _axisPoint, color)
}


export function dashedDroplineToPlane(point: Vector3, plane: "xy"|"yz"|"xz", color: number = 0xff0000): Line2 {
    let _planePoint
    if(plane === "xy") {
        _planePoint = new Vector3(point.x, point.y, 0)
    } else if (plane === "yz") {
        _planePoint = new Vector3(0, point.y, point.z)
    } else {
        _planePoint = new Vector3(point.x, 0, point.z)
    }

    return line2FromPoints(point, _planePoint, color).computeLineDistances()
}


function getLine2Material({
                        color = 0x0000ff, 
                        lineWidth =5, 
                        dashed=false,
                        dashsize=10, 
                        gapSize=10
                    }):     LineMaterial{


    return new LineMaterial({
        color: color,
        linewidth: lineWidth, // px
        dashed: dashed,
        dashSize: dashsize,
        gapSize: gapSize,

        // fixed params
        resolution: new Vector2(800, 800), // resolution of the viewport
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
      })
}


export function markerAtLatLong(latLong: ILatLong, size: number=10, color: number): THREE.Mesh {
    let _markerGeometry =  new SphereGeometry( size, 32, 16 )

    let _position = getVector3FromLatLong(latLong, GLOBE_SCALAR)

    let _markerMmaterial = new MeshLambertMaterial( { color: color } );

    let _markerMesh = new Mesh(_markerGeometry, _markerMmaterial)
    _markerMesh.position.set(_position.x, _position.y, _position.z)

    return _markerMesh
} 

export function markerAtVector3(location: Vector3, size: number=10, color: number): THREE.Mesh {
    let _markerGeometry =  new SphereGeometry( size, 32, 16 )

    let _position = location

    let _markerMmaterial = new MeshLambertMaterial( { color: color } );

    let _markerMesh = new Mesh(_markerGeometry, _markerMmaterial)
    _markerMesh.position.set(_position.x, _position.y, _position.z)

    return _markerMesh
} 


export function wedgeXY(radius: number, arcLengthRad: number, offsetLongitude: number= 0): THREE.Mesh {
    let TWO_PI = 2*Math.PI

    let _offsetLongitude = degreesToRadians(offsetLongitude)

    if(arcLengthRad>TWO_PI) {
        arcLengthRad = TWO_PI
    }

    else if (arcLengthRad < -TWO_PI){
        arcLengthRad = -TWO_PI
    }

    let geometry = new CircleGeometry( radius, 32,0, arcLengthRad );
    let material = new MeshLambertMaterial( { color: 0xffff00, side: DoubleSide, transparent: true, opacity: 0.8} );
    return new Mesh( geometry, material ).rotateOnAxis(X_UNIT, -Math.PI/2).rotateOnAxis(Z_UNIT, -Math.PI/2).rotateOnAxis(Z_UNIT, _offsetLongitude)
}


export function getGreatCircleMaxPoint(startLatLong: ILatLong, endLatLong: ILatLong): Vector3 {

    let _vectorStart = getVector3FromLatLong(startLatLong, 1)
    let _vectorEnd = getVector3FromLatLong(endLatLong, 1)

    
    // check if parallel / anti-parallel in the plane then return (0,v,0) ThreeCoordinates
    if(vectorsParallelXZThree(_vectorStart, _vectorEnd)){
        console.log("These two vectors are anti-parallel:")
        console.log(_vectorStart)
        console.log(_vectorEnd)
        return new Vector3 (0, _vectorStart.length(), 0)
    }


    //convect to cartesian coordinates:
    _vectorStart = convertThreeToCartesian(_vectorStart)
    _vectorEnd = convertThreeToCartesian(_vectorEnd)

    let basis_U = _vectorStart
    let basis_V
    let basis_W


    basis_W = new Vector3().crossVectors(_vectorStart, _vectorEnd)
    if(basis_W.length()==0){
        // let _epsilon = 0.0001
        let _epsilon = 0
        let _epsilonVector = new Vector3(_vectorStart.x+_epsilon, _vectorStart.y+_epsilon, _vectorStart.z+_epsilon)
        basis_W = new Vector3().crossVectors(_epsilonVector, _vectorEnd)
    }
    basis_V = new Vector3().crossVectors(basis_U, basis_W).multiplyScalar(1/basis_W.length())


    // console.log("End Vector:")
    // console.log(_vectorEnd)

    // console.log("Basis U:")
    // console.log(basis_U)

    // console.log("Basis V:")
    // console.log(basis_V)

    // console.log("Basis W:")
    // console.log(basis_W)

    
    // console.log("Basis U Length:")
    // console.log(basis_U.length())

    // console.log("Basis V Length:")
    // console.log(basis_V.length())

    // console.log("Basis W Length:")
    // console.log(basis_W.length())

    //  Parametric angle for max z 
    let zMax_theta = Math.atan(basis_V.z / basis_U.z)
    let zMax_x = basis_U.x * Math.cos(zMax_theta) + basis_V.x * Math.sin(zMax_theta)
    let zMax_y = basis_U.y * Math.cos(zMax_theta) + basis_V.y * Math.sin(zMax_theta)
    let zMax_z = basis_U.z * Math.cos(zMax_theta) + basis_V.z * Math.sin(zMax_theta)
    
    let outputCartesian 

    if (zMax_z < 0) {
        outputCartesian = new Vector3(-zMax_x, -zMax_y, -zMax_z) 
    } else {
        outputCartesian = new Vector3(zMax_x, zMax_y, zMax_z) 
    }
   
    let outputThree = convertCartesianToThree(outputCartesian)
    return outputThree

}


export function getGreatCirclePlaneCrossing(startLatLong: ILatLong, endLatLong: ILatLong): Vector3 {

    let _vectorStart = getVector3FromLatLong(startLatLong, 1)
    let _vectorEnd = getVector3FromLatLong(endLatLong, 1)

    //convect to cartesian coordinates:
    _vectorStart = convertThreeToCartesian(_vectorStart)
    _vectorEnd = convertThreeToCartesian(_vectorEnd)

    let basis_U = _vectorStart
    let basis_V
    let basis_W

    basis_W = new Vector3().crossVectors(_vectorStart, _vectorEnd)
    if(basis_W.length()==0){
        // let _epsilon = 0.0001
        let _epsilon = 0 
        let _epsilonVector = new Vector3(_vectorStart.x+_epsilon, _vectorStart.y+_epsilon, _vectorStart.z+_epsilon)
        basis_W = new Vector3().crossVectors(_epsilonVector, _vectorEnd)
    }
    basis_V = new Vector3().crossVectors(basis_U, basis_W).multiplyScalar(1/basis_W.length())

    let z0_theta = Math.atan(- basis_U.z / basis_V.z )
    let z0_x = basis_U.x * Math.cos(z0_theta) + basis_V.x * Math.sin(z0_theta)
    let z0_y = basis_U.y * Math.cos(z0_theta) + basis_V.y * Math.sin(z0_theta)
    let z0_z = basis_U.z * Math.cos(z0_theta) + basis_V.z * Math.sin(z0_theta)

    let outputCartesian = new Vector3(z0_x, z0_y, 0)
    let outputThree = convertCartesianToThree(outputCartesian)

    // det = x1*y2 - y1*x2
    // det = z1 * x2 - x1 * z2
    console.log("Initial GC determinant")
    let det =  X_UNIT.x * outputThree.z - X_UNIT.z * outputThree.x
    console.log(det)

    if(det < 0) {
        outputThree.multiplyScalar(-1)
    }

    // let newVector = outputThree.multiplyScalar(-1)
    // let newdet =  X_UNIT.x * newVector.z - X_UNIT.z * newVector.x
    
    
    // console.log("New GC determinant")
    // console.log(newdet)

    return outputThree

}

function greatCircleElevationAngle(startLatLong: ILatLong, endLatLong: ILatLong): number{
    // check the vectors have (anti)parallel xy components (in Cartesial space)
    // if so, reject one of the vectors and use the unit z-vecot instead
    // ...except messy three definitions so let's switch to xz plane calcs
    let _startV3 = getVector3FromLatLong(startLatLong, 1)
    let _endV3 = getVector3FromLatLong(endLatLong, 1)
    
    if(_startV3.y===0 && _endV3.y===0) {
        return 0
    }

    if(vectorsParallelXZThree(_startV3, _endV3)){
        return Math.PI/2
    } else {
        // angle between great circle plane and xy plane
        let zMaxVector = getGreatCircleMaxPoint(startLatLong, endLatLong)
        return Math.asin(zMaxVector.y)
    }

}

export function greatCirclePlaneRotation(startLatLong: ILatLong, endLatLong: ILatLong): number{
    // rotation in the xy-plane to get to the z-max point of the great circle
    // if the vectors are (anti)parallel then the great circle passes through both points.
    // it can therefore be rotated the exact angle between z-unit and either of the input vectors

    let _startV3 = getVector3FromLatLong(startLatLong, 1)
    let _endV3 = getVector3FromLatLong(endLatLong, 1)
    let planeProjection
    let angle

    if(_startV3.y===0 && _endV3.y===0){
        return 0
    }

    let isAntiParallel = isNearlyOne(Math.abs(aTanTwoThee(_startV3, _endV3)/Math.PI))
    let isParallel = (snapToZero(Math.abs(aTanTwoThee(_startV3, _endV3)))===0)


    // if(vectorsParallelXZThree(_startV3, _endV3)){
    if(isAntiParallel){
        planeProjection = new Vector3(_startV3.x, 0, _startV3.z)
        console.log("using the new vectors")
        angle = aTanTwoThee(planeProjection, Z_UNIT) //+ Math.PI/2
        if (angle < 0) {
            angle += 2*Math.PI;
        }
        return angle + Math.PI/2
        // return angleBetweenTwoVectors(Z_UNIT, planeProjection) + Math.PI/2
    } else if (isParallel) { 
        angle = aTanTwoThee(_startV3, Z_UNIT)
        if (angle < 0) {
            angle += 2*Math.PI;
        }
        return angle + Math.PI/2
    } else {
        let zMaxVector = getGreatCircleMaxPoint(startLatLong, endLatLong)

        //clean the vector because negative signs in the wrong place are a nightmare
        zMaxVector = new Vector3 (  
                                    snapToZero(zMaxVector.x),
                                    snapToZero(zMaxVector.y),
                                    snapToZero(zMaxVector.z)
                                )

        planeProjection = new Vector3(zMaxVector.x,0, zMaxVector.z)
        angle = aTanTwoThee(planeProjection, Z_UNIT)
        if (angle < 0) {
            angle += 2*Math.PI;
        }
    
        return angle 
        // return angleBetweenTwoVectors(Z_UNIT, planeProjection)
    }

}


export function wedgeBetweenTwoPoints(startLatLong: ILatLong, endLatLong: ILatLong, color: number = 0xffffff, opacity: number = 0.8, wedgeScaler: number=1): THREE.Mesh {
    console.log("################# Wedge Calculation Begins ##################")
    let thetaStart 
    let arcLength = angleBetweenPointsOnSphere(startLatLong, endLatLong)

    let geometry = new CircleGeometry(GLOBE_SCALAR * wedgeScaler , ARC_DENSITY * arcLength, thetaStart, arcLength);
    let material = new MeshLambertMaterial( { color: color, side: DoubleSide, transparent: true, opacity: opacity} );
    

    let elevationAngle = greatCircleElevationAngle(startLatLong, endLatLong)

    //this is the angle from Three(0,0,1) to the xz projection of the y-max line
    let inPlaneRotationAngle = greatCirclePlaneRotation(startLatLong, endLatLong)
    // let inPlaneRotationAngle = newGreatCirclePlaneRotation(startLatLong, endLatLong)



    let wedgeRefOrigin = new Vector3(-100, 0, 0).applyAxisAngle(Y_UNIT, inPlaneRotationAngle)

    let _startThree = radialPointFromLatLong(startLatLong)
    let _endThree = radialPointFromLatLong(endLatLong)


        // co-planar angle between O-vector-prime and the first vector encountered where:
        //    O-vector is the (-100,0,0) [i.e. negative X vector]
        //    O-vector prime is is O-vector rotated alpha in the xz plane
        //          to account for the "inPlane rotation alpha
        //          this is the angle between 0-prime and the great-circle plane crossing
    let wedgeOffsetAngle = getClosestAngle(wedgeRefOrigin, _startThree, _endThree )
    // let wedgeOffsetAngle = newOffsetCalculation(wedgeRefOrigin, _startThree, _endThree)
    
    // There is a problem if the wedge should pass thorugh the ref origin

    let parallel_RefOp1 = vectorsParallelXZThree(wedgeRefOrigin, _startThree)
    let parallel_RefOp2 = vectorsParallelXZThree(wedgeRefOrigin, _endThree)

    // if (!parallel_RefOp1 && !parallel_RefOp2){
    //     if(isReferenceInsidePoints(wedgeRefOrigin, _startThree, _endThree)){
    //         wedgeOffsetAngle = wedgeOffsetAngle + 2*Math.PI - arcLength
    //     }
    // }

    // if(wedgeOffsetAngle===0){
    //     wedgeOffsetAngle = 2*Math.PI - arcLength
    // }


    if(isNaN(wedgeOffsetAngle)){
        console.log("Using backup angle method @@@@@@")
        wedgeOffsetAngle = angleBetweenTwoVectors(_startThree, _endThree)
    }

    console.log("elevationAngle")
    console.log(elevationAngle * 180 / Math.PI)
    console.log("in plane rotation")
    console.log(inPlaneRotationAngle * 180 / Math.PI)
    console.log("wedgeOffsetAngle")
    console.log(wedgeOffsetAngle * 180 / Math.PI)






    // console.log("elevationAngle")
    // console.log(elevationAngle)
    // console.log("in plane rotation")
    // console.log(inPlaneRotationAngle)

    // let _startV3 = getVector3FromLatLong(startLatLong, 1)
    // let _endV3 = getVector3FromLatLong(startLatLong, 1)
    
    let _startCartesian = convertThreeToCartesian(_startThree)
    let _endCartesian = convertThreeToCartesian(_endThree)
    let test = vectorsParallelXYCartesian(_startCartesian, _endCartesian)

    
    let mesh =  new Mesh(geometry, material)
                                .rotateOnWorldAxis(X_UNIT, -Math.PI/2) //rotate to xy plane
                                .rotateOnWorldAxis(Y_UNIT, -Math.PI) //rotate so start of the circle is at Z-unit vector in the Three xz-plane
                                .rotateOnWorldAxis(Y_UNIT, wedgeOffsetAngle)
                                .rotateOnWorldAxis(X_UNIT, -elevationAngle)

    mesh.rotateOnWorldAxis(Y_UNIT, inPlaneRotationAngle)

    return mesh
}

function getClosestAngle(referencePoint: Vector3, option1: Vector3, option2: Vector3 ): number{

    let testResult = isReferenceInsidePoints(referencePoint, option1, option2)

   // console.log(testResult)

    // console.log("referencePoint")
    // console.log(referencePoint)
    // console.log("option1")
    // console.log(option1)
    // console.log("option2")
    // console.log(option2)

    // console.log("checking parallelness")
    // console.log ("ref and op1")
    // console.log(vectorsParallelXZThree(referencePoint, option1))
    // console.log("ref and op2")
    // console.log(vectorsParallelXZThree(referencePoint, option2))
    
    //possible states:

    //ref is (anti)parallel with op1
    // let parallel_RefOp1 = vectorsParallelXZThree(referencePoint, option1)
    // let parallel_RefOp2 =  vectorsParallelXZThree(referencePoint, option2)

    let parallel_RefOp1 = parallelcoplanarXZ(referencePoint, option1)
    let antiParallel_RefOp1 = antiParallelcoplanarXZ(referencePoint, option1)
    let parallel_RefOp2 = parallelcoplanarXZ(referencePoint, option2)
    let antiParallel_RefOp2 = antiParallelcoplanarXZ(referencePoint, option2)

    let vectorsParallel = parallelcoplanarXZ(option1, option2)
    let vectorsAntiParallel = antiParallelcoplanarXZ(option1, option2)

    let _angle1 = angleBetweenTwoVectors(referencePoint, option1)
    let _angle2 = angleBetweenTwoVectors(referencePoint, option2) 

    let _arcLength = angleBetweenTwoVectors(option1, option2)

    if(parallel_RefOp1 || parallel_RefOp2 || antiParallel_RefOp1 || antiParallel_RefOp2 ){
        "refop1 (anti)-parallel so returning 0"
        // this should in fact return the angle between the xy plane and the closest vector

       
        if(_angle1 === 0 && _angle2 === 0){
            return 0
        } else if (_angle1 === 0 || isNaN(_angle1)) {
            return _angle2
        } else if (_angle2 === 0 || isNaN(_angle2)) {
            return _angle1
        }


        if(vectorsParallel){

            // use correct version of cosine scalar product
            _angle1 = angleBetweenTwoEitherDirection(referencePoint, option1)
            _angle2 = angleBetweenTwoEitherDirection(referencePoint, option2)

            // There are 4 situations where the vectors are parralel:
            //  opt1.y > 0 && opt2.Y > 0
            //  opt1.y < 0 && opt2.Y < 0

            //  opt1.y > 0 && opt2.Y > 0
            //  opt1.y < 0 && opt2.y < 0

            if ((_angle1 === 0 && option2.y > 1) || (_angle2 === 0 && option1.y > 1)) {
                return 0
            } else 
            if ((_angle1 === 0 && option2.y > 1) || (_angle2 === 0 && option1.y > 1)) {
                return -Math.max(_angle1, _angle2)
            }


            if(option1.y > 0 && option2.y > 0) {
                return Math.min(_angle1,_angle2)
            } else if (option1.y < 0 && option2.y < 0) {
                return -Math.max(_angle1,_angle2)
            } else if (option1.y > 0 && option2.y < 0) {
                return -_angle2
            } else if (option1.y < 0 && option2.y > 0) {
                return -_angle1
            }
            
        }


        if(vectorsAntiParallel){
            _angle1 = angleBetweenTwoEitherDirection(referencePoint, option1)
            _angle2 = angleBetweenTwoEitherDirection(referencePoint, option2)

            if(option1.y > 0 && option2.y > 0) {
                return Math.min(_angle1,_angle2)

            } else if (option1.y < 0 && option2.y < 0) {
                return -Math.max(_angle1,_angle2)

            } else if (option1.y > 0 && option2.y < 0) {
                if ((_angle1 + _angle2) > Math.PI){
                    return -_angle2 + _arcLength
                } else {
                    return 2*Math.PI-_angle2
                }

            } else if (option1.y < 0 && option2.y > 0) {
                if ((_angle1 + _angle2) > Math.PI){
                    return _arcLength - _angle1
                } else {
                    return 2*Math.PI-_angle1
                }
            }
        }
   
    }

  



    if(isNaN(_angle1)){
        return _angle2
    } else if(isNaN(_angle2)){
        return _angle1
    }


    if(_angle1 < _angle2){
        // console.log(_angle1)
        if (testResult){
            _angle1 = _angle1 + _arcLength
        }
    } else {
        // console.log(_angle2)
        if (option1.y < 0 && option2.y <0) {
            _angle2 = _angle2
        } else if (option2.y < 0 && testResult ===false) {
            _angle2 = _angle2 + 2*Math.PI - _arcLength//+ Math.PI
        } else if (option1.y < 0 && testResult === true) { //&& testResult ===false) {
            _angle2 = _angle2  - _arcLength//+ Math.PI
        }

        
    }

    return Math.min(_angle1, _angle2)
}

function detV3(startVector: Vector3, endVector: Vector3): number {
    return startVector.x * endVector.z - startVector.z * endVector.x
}

function isReferenceInsidePoints(referencePoint: Vector3, option1: Vector3, option2: Vector3 ): boolean{
        // in the xy plane
        let vec_A = option1
        let vec_B = referencePoint
        let vec_C = option2

        let test1 = (detV3(vec_A, vec_B) * detV3(vec_A, vec_C)) > 0
        let test2 = detV3(vec_C, vec_B) * detV3(vec_C, vec_A)  > 0

    

        return test1 && test2
}


function newOffsetCalculation(referencePointThree: Vector3, vecThree_A: Vector3, vecThree_B: Vector3): number {
    let _refInsideTest = isReferenceInsidePoints(referencePointThree, vecThree_A, vecThree_B)



    console.log("referencePointThree")
    console.log(referencePointThree)
    console.log("vecThree_A")
    console.log(vecThree_A)
    console.log("vecThree_B")
    console.log(vecThree_B)

    let aVec1 = aTanTwoThee(referencePointThree, vecThree_A)
    let aVec2 = aTanTwoThee(referencePointThree, vecThree_B)

    console.log("aVec1")
    console.log(aVec1)
    console.log("aVec2")
    console.log(aVec2)

    let p_apCheck_A = vectorsParallelXZThree(referencePointThree, vecThree_A)
    let p_apCheck_B = vectorsParallelXZThree(referencePointThree, vecThree_B)

    console.log("p_apCheck_A")
    console.log(p_apCheck_A)
    console.log("p_apCheck_B")
    console.log(p_apCheck_B)

    if (p_apCheck_A || p_apCheck_B){
        return 0
    }

    if (aVec1 === aVec2){
        return aVec1
    } else if (_refInsideTest) {
        return Math.max(aVec1, aVec2)
    } else {
        return Math.min(aVec1, aVec2)
    }

}

function aTanTwoThee(refVector: Vector3, toVector: Vector3): number {
    //calculating in the Three xz plane

    let arg1 = refVector.x * toVector.z - refVector.z * toVector.x 
    let arg2 =  refVector.x * toVector.x + refVector.z * toVector.z

    return snapToZero(Math.atan2(arg1, arg2))
}


export function greatCircleFromTwoPoints(startLatLong: ILatLong, endLatLong: ILatLong, color: number = 0xffffff, opacity: number = 0.8): THREE.Mesh {
    let arcLength = 2* Math.PI
    

    let geometry = new CircleGeometry(GLOBE_SCALAR, ARC_DENSITY * arcLength, 0, arcLength);
    let material = new MeshLambertMaterial( { color: color, side: DoubleSide, transparent: true, opacity: opacity} );

    let elevationAngle = greatCircleElevationAngle(startLatLong, endLatLong)

    // console.log("elevationAngle")
    // console.log(elevationAngle)

    let inPlaneRotationAngle = greatCirclePlaneRotation(startLatLong, endLatLong)
    
    // console.log("planeRotationAngle")
    // console.log(inPlaneRotationAngle)
    

    let mesh =  new Mesh(geometry, material)
                        .rotateOnWorldAxis(X_UNIT, Math.PI/2) //rotates the circle so the max is along the Z axis
                        .rotateOnWorldAxis(X_UNIT, -elevationAngle) //.rotateOnAxis(Y_UNIT, inPlaneRotationAngle) //.rotateOnAxis(Y_UNIT, 0.5)
                        // .rotateOnAxis(Y_UNIT)
                        
    mesh.rotateOnWorldAxis(Y_UNIT, inPlaneRotationAngle)

    return mesh
}


function angleBetweenTwoVectors(startVector: Vector3, endVector: Vector3): number {
    let numerator = startVector.dot(endVector)
    let denominator = startVector.length() * endVector.length()


    let dot = startVector.x*endVector.x + startVector.y*endVector.y + startVector.z*endVector.z   //#between [x1, y1, z1] and [x2, y2, z2]
    let lenSq1 = startVector.length() * startVector.length()
    let lenSq2 = endVector.length() * endVector.length()
    let _output = Math.acos(dot/Math.sqrt(lenSq1 * lenSq2))

    // let det = x1*y2 - y1*x2      # determinant
    let det = startVector.x * endVector.z - startVector.z * endVector.x
    console.log("determinant")
    console.log(det)

    console.log("output")
    console.log(_output)

    if (det > 0) {
        _output = 2*Math.PI - _output 
    }

    //negative determinant gives the correct answer

    return _output
}

function angleBetweenTwoEitherDirection(startVector: Vector3, endVector: Vector3): number {
    let numerator = startVector.dot(endVector)
    let denominator = startVector.length() * endVector.length()


    let dot = startVector.x*endVector.x + startVector.y*endVector.y + startVector.z*endVector.z   //#between [x1, y1, z1] and [x2, y2, z2]
    let lenSq1 = startVector.length() * startVector.length()
    let lenSq2 = endVector.length() * endVector.length()
    let _output = Math.acos(dot/Math.sqrt(lenSq1 * lenSq2))

    // let det = x1*y2 - y1*x2      # determinant
    // let det = startVector.x * endVector.z - startVector.z * endVector.x

    return _output
}



export function convertCartesianToThree(cartesianVector: Vector3): Vector3{
    return new Vector3(cartesianVector.y,cartesianVector.z,cartesianVector.x)
}

function convertThreeToCartesian(threeVector: Vector3): Vector3{
    return new Vector3(threeVector.z, threeVector.x, threeVector.y)
}



export function getConstructorLines(point: ILatLong, color: number = 0xff0000): Mesh[] {
    let _point = getVector3FromLatLong(point, GLOBE_SCALAR)
    
    let centroidLine = line2FromPoints(AXIS_ORIGIN, _point, color)
    let xzProjection = xz_planeProjectionPoint(_point, color)  
    // let yProjection = singleAxisProjection(AXIS_ORIGIN, _point, "y")
    let yDropline = dashedDroplineToAxis(_point, "y", color)
    let xz_PlaneDropLine = dashedDroplineToPlane(_point, "xz", color)
    let xz_xDrop = xz_PlaneDropLineToAxis(_point, "x", color)
    let xz_zDrop = xz_PlaneDropLineToAxis(_point, "z", color)

    let _output: Mesh[] = []

    _output.push(centroidLine)
    _output.push(xzProjection)
    // _output.push(yProjection)
    _output.push(yDropline)
    _output.push(xz_PlaneDropLine)
    _output.push(xz_xDrop)
    _output.push(xz_zDrop)

    return _output
}

function vectorsParallelXYCartesian(vec1: Vector3, vec2: Vector3): boolean {
    let vec1_xy = new Vector3(vec1.x, vec1.y, 0)
    let vec2_xy = new Vector3(vec2.x, vec2.y, 0)

    let denominator = Math.abs(vec1_xy.length() * vec2_xy.length())
    let numerator = vec1_xy.dot(vec2_xy)

    // console.log("############ running paralle test:")
    // console.log(numerator / denominator)
    // console.log(vec1_xy)
    // console.log(vec2_xy)

    
    if (isNearlyOne(numerator / denominator)) {
        // console.log( "(anti)parallel condition met")
        return true
    } else {
        return false
    }
}

function vectorsParallelXZThree(vec1: Vector3, vec2: Vector3): boolean {
    let vec1_xz = new Vector3(vec1.x, 0, vec1.z)
    let vec2_xz = new Vector3(vec2.x, 0, vec2.z)

    let denominator = Math.abs(vec1_xz.length() * vec2_xz.length())
    let numerator = vec1_xz.dot(vec2_xz)

    // console.log("############ running parallel test:")
    // console.log(numerator / denominator)
    // console.log(vec1_xz)
    // console.log(vec2_xz)

    
    if (isNearlyOne(numerator / denominator)) {
        // console.log( "(anti)parallel condition met")
        return true
    } else {
        return false
    }
}

function vectorsAntiParallelXZThree(vec1: Vector3, vec2: Vector3): boolean {
    let vec1_xz = new Vector3(vec1.x, 0, vec1.z)
    let vec2_xz = new Vector3(vec2.x, 0, vec2.z)

    let denominator = Math.abs(vec1_xz.length() * vec2_xz.length())
    let numerator = vec1_xz.dot(vec2_xz)

    // console.log("############ running parallel test:")
    // console.log(numerator / denominator)
    // console.log(vec1_xz)
    // console.log(vec2_xz)

    
    if (isNearlyOne(numerator / denominator)) {
        // console.log( "(anti)parallel condition met")
        return true
    } else {
        return false
    }
}



function parallelcoplanarXZ(startV3: Vector3, endV3: Vector3): boolean {
    return snapToZero(Math.abs(aTanTwoThee(startV3, endV3)))===0  
}


function antiParallelcoplanarXZ(startV3: Vector3, endV3: Vector3): boolean {
    
    return isNearlyOne(Math.abs(aTanTwoThee(startV3, endV3)/Math.PI))
}


//because maths in JS is not accurate
function isNearlyOne(input: number){
    if(0.99999 < input && input < 1.00001){
        return true
    } else {
        return false
    }
}


//because maths in JS is not accurate
function snapToZero(input: number): number{
    if(-0.00000000001 < input && input < 0.00000000001){
        return 0
    } else {
        return input
    }
}