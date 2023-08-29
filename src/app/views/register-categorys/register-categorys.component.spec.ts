import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCategorysComponent } from './register-categorys.component';

describe('RegisterCategorysComponent', () => {
  let component: RegisterCategorysComponent;
  let fixture: ComponentFixture<RegisterCategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCategorysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
