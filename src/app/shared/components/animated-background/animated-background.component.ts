import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shape, PhysicsConfig, MouseState } from './models/shape.model';
import { createShape, updateShape, checkCollision } from './utils/shape-factory.util';
import { drawShape } from './utils/shape-renderer.util';
import { DEFAULT_CONFIG, DEFAULT_SHAPE_COUNT } from './utils/constants';

/**
 * Animated Background Component
 *
 * Renders an interactive canvas-based animated background with geometric shapes.
 * Features physics-based movement, mouse interaction, and shape collisions.
 *
 * @example
 * <app-animated-background
 *   [shapeCount]="50"
 *   [enableMouseInteraction]="true"
 *   [enableCollisions]="true">
 * </app-animated-background>
 */
@Component({
  selector: 'app-animated-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-background.component.html',
  styleUrls: ['./animated-background.component.scss']
})
export class AnimatedBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  /** Number of shapes to render */
  @Input() shapeCount: number = DEFAULT_SHAPE_COUNT;

  /** Enable mouse interaction with shapes */
  @Input() enableMouseInteraction: boolean = true;

  /** Enable collision detection between shapes */
  @Input() enableCollisions: boolean = true;

  /** Physics configuration override */
  @Input() config: PhysicsConfig = DEFAULT_CONFIG;

  /** Opacity of the background (0-1) */
  @Input() opacity: number = 1;

  /** Enable/disable rendering (for performance) */
  @Input() enabled: boolean = true;

  private ctx!: CanvasRenderingContext2D;
  private shapes: Shape[] = [];
  private animationId: number | null = null;
  private mouseState: MouseState = { x: 0, y: 0, isActive: false };
  private width: number = 0;
  private height: number = 0;
  private worldHeight: number = 0; // Full document height for shape boundaries

  ngAfterViewInit(): void {
    this.initCanvas();

    // Wait for full document to be rendered before creating shapes
    setTimeout(() => {
      this.resizeCanvas();
      this.initShapes();
      this.startAnimation();
    }, 100);
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.resizeCanvas();
    // Reinitialize shapes with new dimensions after a short delay
    setTimeout(() => {
      this.resizeCanvas(); // Recalculate after layout settles
      this.initShapes();
    }, 100);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.enableMouseInteraction) return;

    // Calculate mouse position relative to document (including scroll)
    this.mouseState.x = event.clientX;
    this.mouseState.y = event.clientY + window.scrollY;
    this.mouseState.isActive = true;
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.mouseState.isActive = false;
  }

  @HostListener('document:mouseenter')
  onMouseEnter(): void {
    this.mouseState.isActive = true;
  }

  /**
   * Initializes the canvas and context
   */
  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true })!;

    this.resizeCanvas();
  }

  /**
   * Resizes canvas to viewport and calculates world bounds
   */
  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;

    // Canvas size = viewport size
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    canvas.width = this.width;
    canvas.height = this.height;

    // World bounds = full document height (ensure we get the actual rendered height)
    this.worldHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );

    console.log('Canvas resized - Viewport:', this.height, 'World:', this.worldHeight);
  }

  /**
   * Initializes all shapes with world bounds
   */
  private initShapes(): void {
    this.shapes = [];
    for (let i = 0; i < this.shapeCount; i++) {
      this.shapes.push(createShape(this.width, this.worldHeight, this.config));
    }
  }

  /**
   * Starts the animation loop
   */
  private startAnimation(): void {
    if (!this.enabled) return;

    const animate = () => {
      this.update();
      this.render();
      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * Stops the animation loop
   */
  private stopAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Updates all shapes with world boundaries
   */
  private update(): void {
    // Update each shape with world boundaries
    this.shapes.forEach(shape => {
      updateShape(shape, this.width, this.worldHeight, this.config, this.mouseState);
    });

    // Check collisions if enabled
    if (this.enableCollisions) {
      for (let i = 0; i < this.shapes.length; i++) {
        for (let j = i + 1; j < this.shapes.length; j++) {
          checkCollision(this.shapes[i], this.shapes[j], this.config.bounce);
        }
      }
    }
  }

  /**
   * Renders visible shapes to canvas
   */
  private render(): void {
    // Clear canvas completely (no trail effect, no background painting)
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Set global opacity
    this.ctx.globalAlpha = this.opacity;

    // Get current scroll position
    const scrollY = window.scrollY;

    // Draw shapes that are in viewport
    this.shapes.forEach(shape => {
      // Calculate position relative to viewport
      const viewportY = shape.y - scrollY;

      // Only draw if shape is in or near viewport
      if (viewportY > -shape.size * 2 && viewportY < this.height + shape.size * 2) {
        // Save context
        this.ctx.save();

        // Translate to viewport coordinates
        this.ctx.translate(0, -scrollY);

        // Draw shape
        drawShape(this.ctx, shape);

        // Restore context
        this.ctx.restore();
      }
    });
  }

  /**
   * Handle visibility change (pause when hidden)
   */
  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (document.hidden) {
      this.stopAnimation();
    } else if (this.enabled) {
      this.startAnimation();
    }
  }
}
