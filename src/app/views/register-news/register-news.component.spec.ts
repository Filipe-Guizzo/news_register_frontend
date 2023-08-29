import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewsComponent } from './register-news.component';

describe('RegisterNewsComponent', () => {
  let component: RegisterNewsComponent;
  let fixture: ComponentFixture<RegisterNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
