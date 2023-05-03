import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicememberComponent } from './policemember.component';

describe('PolicememberComponent', () => {
  let component: PolicememberComponent;
  let fixture: ComponentFixture<PolicememberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicememberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicememberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
