import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryProductsSectionComponent } from './accessory-products-section.component';

describe('AccessoryProductsSectionComponent', () => {
  let component: AccessoryProductsSectionComponent;
  let fixture: ComponentFixture<AccessoryProductsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessoryProductsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoryProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
