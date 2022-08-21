import { BufferGeometry, CircleGeometry, DoubleSide, EllipseCurve, Line, LineBasicMaterial, Mesh, MeshLambertMaterial, SphereGeometry, Vector2, Vector3 } from "three"
import { Line2, LineGeometry, LineMaterial } from "three-fatline"
import { ARC_DENSITY, AXIS_ORIGIN, GLOBE_SCALAR, X_UNIT, Y_UNIT, Z_UNIT } from "../constants"
import { ILatLong, LatLong } from "../models/game-logic"
import { angleBetweenPointsOnSphere, degreesToRadians } from "./geographyFunctions"


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
    let myVector = new Vector3(1, 0, 0).multiplyScalar(GLOBE_SCALAR)  

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
    // let _lineMaterial = new LineMaterial({
    //     color: 0xff0000,
    //     linewidth: 5, // px
    //     resolution: new THREE.Vector2(800, 800), // resolution of the viewport
    //     dashed: true,
    //     dashSize: 5,
    //     gapSize: 5,
    //     polygonOffset: true,
    //     polygonOffsetFactor: 1, // positive value pushes polygon further away
    //     polygonOffsetUnits: 1
    //     // dashed, dashScale, dashSize, gapSize
    //   })

    let _lineMaterial = getLine2Material({dashed: true, dashsize: 5, gapSize: 5, color: color})

    //   let _lineMaterial = getLine2Material({color: 0xff0000})

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

    let _markerMmaterial = new MeshLambertMaterial( { color: 0xff0000 } );

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
    let material = new MeshLambertMaterial( { color: 0xffff00, side: DoubleSide, transparent: true, opacity: 0.5} );
    return new Mesh( geometry, material ).rotateOnAxis(X_UNIT, -Math.PI/2).rotateOnAxis(Z_UNIT, -Math.PI/2).rotateOnAxis(Z_UNIT, _offsetLongitude)
    // .rotateOnAxis(Y_UNIT, -Math.PI/2).rotateOnAxis(Z_UNIT, Math.PI/2)
}


export function getGreatCircleMaxPoint(startLatLong: ILatLong, endLatLong: ILatLong): Vector3 {

    let _vectorStart = getVector3FromLatLong(startLatLong, 1)
    let _vectorEnd = getVector3FromLatLong(endLatLong, 1)

    //convect to cartesian coordinates:
    _vectorStart = convertThreeToCartesian(_vectorStart)
    _vectorEnd = convertThreeToCartesian(_vectorEnd)

    let basis_U = _vectorStart
    let basis_V
    let basis_W

    console.log("Start Vector:")
    console.log(_vectorStart)

    console.log("Start End:")
    console.log(_vectorEnd)

    basis_W = new Vector3().crossVectors(_vectorStart, _vectorEnd)
    basis_V = new Vector3().crossVectors(basis_U, basis_W).multiplyScalar(1/basis_W.length())


    console.log("End Vector:")
    console.log(_vectorEnd)

    console.log("Basis U:")
    console.log(basis_U)

    console.log("Basis V:")
    console.log(basis_V)

    console.log("Basis W:")
    console.log(basis_W)

    
    console.log("Basis U Length:")
    console.log(basis_U.length())

    console.log("Basis V Length:")
    console.log(basis_V.length())

    console.log("Basis W Length:")
    console.log(basis_W.length())

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
    // angle between great circle plane and xy plane
    let zMaxVector = getGreatCircleMaxPoint(startLatLong, endLatLong)
   return Math.asin(zMaxVector.y)
}

export function greatCirclePlaneRotation(startLatLong: ILatLong, endLatLong: ILatLong): number{
    // rotation in the xy-plane to get to the z-max point of the great circle
    let zMaxVector = getGreatCircleMaxPoint(startLatLong, endLatLong)
    let planeProjection = new Vector3(zMaxVector.x,0, zMaxVector.z)

    return angleBetweenTwoVectors(Z_UNIT, planeProjection )
}


export function wedgeBetweenTwoPoints(startLatLong: ILatLong, endLatLong: ILatLong, color: number = 0xffffff, opacity: number = 0.3): THREE.Mesh {
    
    let thetaStart 
    let arcLength = angleBetweenPointsOnSphere(startLatLong, endLatLong)

    let geometry = new CircleGeometry(GLOBE_SCALAR, ARC_DENSITY * arcLength, thetaStart, arcLength);
    let material = new MeshLambertMaterial( { color: color, side: DoubleSide, transparent: true, opacity: opacity} );
    
    let elevationAngle = greatCircleElevationAngle(startLatLong, endLatLong)


    let inPlaneRotationAngle = greatCirclePlaneRotation(startLatLong, endLatLong)

    let greatCirclePlaneCrossing = getGreatCirclePlaneCrossing(startLatLong, endLatLong)

    let wedgeRefOrigin = new Vector3(-100, 0, 0).applyAxisAngle(Y_UNIT, inPlaneRotationAngle)

    // let angleZtoXYCrossing = angleBetweenTwoVectors(Z_UNIT, greatCirclePlaneCrossing)
    
    // console.log(angleZtoXYCrossing)

    let _startThree = radialPointFromLatLong(startLatLong)
    let _endThree = radialPointFromLatLong(endLatLong)

    let wedgeOffsetAngle = getClosestAngle(wedgeRefOrigin, _startThree, _endThree )
    // There is a problem if the wedge should pass thorugh the ref origin
    if(isReferenceInsidePoints(wedgeRefOrigin, _startThree, _endThree)){
        wedgeOffsetAngle = wedgeOffsetAngle + 2*Math.PI - arcLength
    }

    console.log("Wedge Offset:")
    console.log(wedgeOffsetAngle * 180 / Math.PI )
    
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
    console.log("######### running test #########")
    console.log(testResult)
    
    let _angle1 = angleBetweenTwoVectors(referencePoint, option1)
    let _angle2 = angleBetweenTwoVectors(referencePoint, option2)

    return Math.min(_angle1, _angle2)
}

function detV3(startVector: Vector3, endVector: Vector3): number {
    return startVector.x * endVector.z - startVector.z * endVector.x
}

function isReferenceInsidePoints(referencePoint: Vector3, option1: Vector3, option2: Vector3 ): boolean{
        let vec_A = option1
        let vec_B = referencePoint
        let vec_C = option2

        let test1 = (detV3(vec_A, vec_B) * detV3(vec_A, vec_C)) > 0
        let test2 = detV3(vec_C, vec_B) * detV3(vec_C, vec_A)  > 0

        return test1 && test2
}


export function greatCircleFromTwoPoints(startLatLong: ILatLong, endLatLong: ILatLong): THREE.Mesh {
    let arcLength = 2* Math.PI
    

    let geometry = new CircleGeometry(GLOBE_SCALAR, ARC_DENSITY * arcLength, 0, arcLength);
    let material = new MeshLambertMaterial( { color: 0xff00ff, side: DoubleSide, transparent: true, opacity: 0.3} );

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

    // let _output = Math.acos(numerator/denominator)

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