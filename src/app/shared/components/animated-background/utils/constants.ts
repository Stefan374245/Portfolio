import { PhysicsConfig } from '../models/shape.model';

/**
 * Default physics configuration
 */
export const DEFAULT_CONFIG: PhysicsConfig = {
  mouseRadius: 150,
  mouseForce: 0.3,
  attractMode: false,
  damping: 0.98,
  gravity: 0,
  bounce: 0.7,
  rotationSpeed: 0.02
};

/**
 * Color palette for shapes - lighter colors matching portfolio theme
 */
export const COLORS = [
  'rgba(112, 230, 28, ',
  'rgba(28, 218, 230, ',
  'rgba(151, 71, 255, ',
  'rgba(102, 126, 234, ',
  'rgba(255, 154, 158, ',
  'rgba(130, 204, 221, ',
  'rgba(118, 255, 122, '
];

/**
 * Minimum and maximum shape sizes
 */
export const SHAPE_SIZE = {
  min: 20,
  max: 50
};

/**
 * Default number of shapes to render
 */
export const DEFAULT_SHAPE_COUNT = 15;
