import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  @Component({
    imports: [DashboardComponent],
    standalone: true,
    template: `<app-dashboard [genres]="genres"></app-dashboard>`,
  })
  class TestHostComponent {
    @Input()
    genres: string[] = [];
  }

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain a grid', () => {
    const element = fixture.debugElement.query(By.css('.dashboard-grid')).nativeElement as HTMLElement;
    expect(element).toBeTruthy();
  });
  it("should contain a row per genre", () => {
    const genres = ['suspense','comedy','fantasy','drama'];
    const hostFixture = TestBed.createComponent(TestHostComponent);
    const hostComponent = hostFixture.componentInstance;
    hostComponent.genres = genres;
    hostFixture.detectChanges();
    const elements = hostFixture.debugElement.queryAll(By.css('.dashboard-genre-row'));
    
    expect(elements).toHaveSize(genres.length);
  });

  
});
