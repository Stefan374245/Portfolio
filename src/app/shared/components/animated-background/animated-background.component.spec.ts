import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimatedBackgroundComponent } from './animated-background.component';

describe('AnimatedBackgroundComponent', () => {
  let component: AnimatedBackgroundComponent;
  let fixture: ComponentFixture<AnimatedBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedBackgroundComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimatedBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default shape count', () => {
    expect(component.shapeCount).toBe(40);
  });

  it('should enable mouse interaction by default', () => {
    expect(component.enableMouseInteraction).toBe(true);
  });

  it('should enable collisions by default', () => {
    expect(component.enableCollisions).toBe(true);
  });
});
