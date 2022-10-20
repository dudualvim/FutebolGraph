import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteFutebolComponent } from './teste-futebol.component';

describe('TesteFutebolComponent', () => {
  let component: TesteFutebolComponent;
  let fixture: ComponentFixture<TesteFutebolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteFutebolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteFutebolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
