import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTeamCardComponent } from './home-team-card.component';

describe('HomeTeamCardComponent', () => {
  let component: HomeTeamCardComponent;
  let fixture: ComponentFixture<HomeTeamCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTeamCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
