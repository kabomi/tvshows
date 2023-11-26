import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains a header title', () => {
    const element = fixture.debugElement.query(By.css('.home-header-title')).nativeElement as HTMLElement;
    expect(element.innerText).toContain('Movies');
  });
  it('contains a dashboard', () => {
    const dashboard = fixture.debugElement.query(By.directive(DashboardComponent));
    expect(dashboard).toBeTruthy();
  });
});
