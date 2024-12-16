import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductsSectionComponent } from './main-products-section.component';

describe('MainProductsSectionComponent', () => {
  let component: MainProductsSectionComponent;
  let fixture: ComponentFixture<MainProductsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainProductsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
