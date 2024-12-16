import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderReviewComponent } from './detail-order-review.component';

describe('DetailOrderReviewComponent', () => {
  let component: DetailOrderReviewComponent;
  let fixture: ComponentFixture<DetailOrderReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailOrderReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailOrderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
