import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideAnimationComponent } from './slide-animation.component';

describe('AutoAnimationComponent', () => {
  let component: SlideAnimationComponent;
  let fixture: ComponentFixture<SlideAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlideAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
