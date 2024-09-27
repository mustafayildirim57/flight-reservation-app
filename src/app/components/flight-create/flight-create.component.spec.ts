import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCreateComponent } from './flight-create.component';

describe('FlightCreateComponent', () => {
  let component: FlightCreateComponent;
  let fixture: ComponentFixture<FlightCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightCreateComponent]
    });
    fixture = TestBed.createComponent(FlightCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
