import { Shape, PhysicsConfig, MouseState } from '../models/shape.model';
import { COLORS, SHAPE_SIZE } from './constants';

/**
 * Creates a new shape with random properties
 */
export const createShape = (
  width: number,
  height: number,
  config: PhysicsConfig
): Shape => {
  const size = Math.random() * (SHAPE_SIZE.max - SHAPE_SIZE.min) + SHAPE_SIZE.min;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * config.rotationSpeed,
    type: Math.floor(Math.random() * 4),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: 0.15 + Math.random() * 0.15,
    mass: size / 10
  };
};

/**
 * Updates shape position and physics
 */
export const updateShape = (
  shape: Shape,
  width: number,
  height: number,
  config: PhysicsConfig,
  mouseState: MouseState
): void => {
  // Apply damping
  shape.vx *= config.damping;
  shape.vy *= config.damping;

  // Subtle drift (only if gravity is set)
  if (config.gravity > 0) {
    shape.vy += config.gravity * 0.1;
  }

  // Mouse interaction
  if (mouseState.isActive) {
    const dx = shape.x - mouseState.x;
    const dy = shape.y - mouseState.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < config.mouseRadius && distance > 0) {
      const force = (config.mouseRadius - distance) / config.mouseRadius;
      const angle = Math.atan2(dy, dx);
      const multiplier = config.attractMode ? -1 : 1;

      shape.vx += Math.cos(angle) * force * config.mouseForce * multiplier;
      shape.vy += Math.sin(angle) * force * config.mouseForce * multiplier;
    }
  }

  // Update position
  shape.x += shape.vx;
  shape.y += shape.vy;

  // Update rotation
  shape.rotation += shape.rotationSpeed;

  // Boundary collision with bounce
  if (shape.x - shape.size < 0) {
    shape.x = shape.size;
    shape.vx *= -config.bounce;
  }
  if (shape.x + shape.size > width) {
    shape.x = width - shape.size;
    shape.vx *= -config.bounce;
  }
  if (shape.y - shape.size < 0) {
    shape.y = shape.size;
    shape.vy *= -config.bounce;
  }
  if (shape.y + shape.size > height) {
    shape.y = height - shape.size;
    shape.vy *= -config.bounce;
  }
};

/**
 * Checks and handles collision between two shapes
 */
export const checkCollision = (shape1: Shape, shape2: Shape, bounce: number): void => {
  const dx = shape1.x - shape2.x;
  const dy = shape1.y - shape2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDistance = (shape1.size + shape2.size) / 2;

  if (distance < minDistance && distance > 0) {
    const angle = Math.atan2(dy, dx);
    const targetX = shape2.x + Math.cos(angle) * minDistance;
    const targetY = shape2.y + Math.sin(angle) * minDistance;

    // Separate shapes
    const ax = (targetX - shape1.x) * 0.5;
    const ay = (targetY - shape1.y) * 0.5;
    shape1.x += ax;
    shape1.y += ay;
    shape2.x -= ax;
    shape2.y -= ay;

    // Transfer momentum
    const vxTotal = shape1.vx - shape2.vx;
    const vyTotal = shape1.vy - shape2.vy;
    const impactVelocity = Math.cos(angle) * vxTotal + Math.sin(angle) * vyTotal;

    shape1.vx -= Math.cos(angle) * impactVelocity * (shape2.mass / shape1.mass) * bounce;
    shape1.vy -= Math.sin(angle) * impactVelocity * (shape2.mass / shape1.mass) * bounce;
    shape2.vx += Math.cos(angle) * impactVelocity * (shape1.mass / shape2.mass) * bounce;
    shape2.vy += Math.sin(angle) * impactVelocity * (shape1.mass / shape2.mass) * bounce;
  }
};
