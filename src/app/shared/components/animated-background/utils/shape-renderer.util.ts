import { Shape, ShapeType } from '../models/shape.model';

/**
 * Draws a shape on the canvas context
 */
export const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape): void => {
  ctx.save();
  ctx.translate(shape.x, shape.y);
  ctx.rotate(shape.rotation);
  ctx.globalAlpha = shape.alpha;

  // Glow effect
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size * 1.5);
  gradient.addColorStop(0, `${shape.color}0.15)`);
  gradient.addColorStop(1, `${shape.color}0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(-shape.size * 1.5, -shape.size * 1.5, shape.size * 3, shape.size * 3);

  // Shape gradient
  const shapeGradient = ctx.createLinearGradient(-shape.size, -shape.size, shape.size, shape.size);
  shapeGradient.addColorStop(0, `${shape.color}${shape.alpha})`);
  shapeGradient.addColorStop(1, `${shape.color}${shape.alpha * 0.5})`);

  ctx.fillStyle = shapeGradient;
  ctx.strokeStyle = `${shape.color}0.6)`;
  ctx.lineWidth = 1.5;

  ctx.beginPath();

  switch (shape.type) {
    case ShapeType.Square:
      ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
      break;

    case ShapeType.Circle:
      ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
      break;

    case ShapeType.Triangle:
      ctx.moveTo(0, -shape.size / 2);
      ctx.lineTo(shape.size / 2, shape.size / 2);
      ctx.lineTo(-shape.size / 2, shape.size / 2);
      ctx.closePath();
      break;

    case ShapeType.Hexagon:
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = (shape.size / 2) * Math.cos(angle);
        const y = (shape.size / 2) * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      break;
  }

  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
