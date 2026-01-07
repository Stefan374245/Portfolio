/**
 * Shape model for animated background particles
 */
export interface Shape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: ShapeType;
  color: string;
  alpha: number;
  mass: number;
}

/**
 * Shape types available for rendering
 */
export enum ShapeType {
  Square = 0,
  Circle = 1,
  Triangle = 2,
  Hexagon = 3
}

/**
 * Physics configuration for shape behavior
 */
export interface PhysicsConfig {
  mouseRadius: number;
  mouseForce: number;
  attractMode: boolean;
  damping: number;
  gravity: number;
  bounce: number;
  rotationSpeed: number;
}

/**
 * Mouse position and state
 */
export interface MouseState {
  x: number;
  y: number;
  isActive: boolean;
}
