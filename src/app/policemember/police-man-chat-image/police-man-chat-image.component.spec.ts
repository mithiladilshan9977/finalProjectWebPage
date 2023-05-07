import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceManChatImageComponent } from './police-man-chat-image.component';

describe('PoliceManChatImageComponent', () => {
  let component: PoliceManChatImageComponent;
  let fixture: ComponentFixture<PoliceManChatImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliceManChatImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliceManChatImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
