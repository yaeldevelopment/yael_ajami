import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuionComponent } from './quion.component';

describe('QuionComponent', () => {
  let component: QuionComponent;
  let fixture: ComponentFixture<QuionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
