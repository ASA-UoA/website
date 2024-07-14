import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomCountdownComponent} from './countdown.component';

describe('CountdownComponent', () => {
  let component: CustomCountdownComponent;
  let fixture: ComponentFixture<CustomCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCountdownComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
