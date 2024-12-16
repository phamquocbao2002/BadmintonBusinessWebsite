import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationSignUpComponent } from './consultation-sign-up.component';

describe('ConsultationSignUpComponent', () => {
  let component: ConsultationSignUpComponent;
  let fixture: ComponentFixture<ConsultationSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultationSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
