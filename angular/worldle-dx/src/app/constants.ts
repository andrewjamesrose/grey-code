import { Vector3 } from "three";

export const MAX_GUESSES = 5;
export const GAME_MODES: string[] = ['flags','boundariesSVG','boundaries2D', 'boundaries3D','capitals']
export const VIEW_MODES: string[] = ['none','2D','3D']
export const EARTH_AXIAL_TILT_DEG: number = 23.5 

export const AXIS_ORIGIN = new Vector3(0,0,0)
export const X_UNIT = new Vector3(1, 0, 0)
export const Y_UNIT = new Vector3(0, 1, 0)
export const Z_UNIT = new Vector3(0, 0, 1)

export const GLOBE_SCALAR = 100
export const ARC_DENSITY = 360 / Math.PI