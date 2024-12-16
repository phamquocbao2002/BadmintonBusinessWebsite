import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePointsComponent } from './store-points.component';

describe('StorePointsComponent', () => {
  let component: StorePointsComponent;
  let fixture: ComponentFixture<StorePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorePointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
