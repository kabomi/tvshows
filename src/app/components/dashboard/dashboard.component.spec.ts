import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { TvShow } from 'src/app/services/tvshows.model';
import { dragonMovie, flockerMovie, harryPotterMovie, lastActionMovie } from 'src/app/services/tvshows.mocks';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  @Component({
    imports: [DashboardComponent],
    standalone: true,
    template: `<app-dashboard
      [genres]="genres"
      [tvShowsByGenre]="tvShowsByGenre"
      [showsPerGenreLimit]="showsPerGenreLimit"
    ></app-dashboard>`,
  })
  class TestHostComponent {
    @Input()
    genres: string[] = [];

    @Input()
    tvShowsByGenre = new Map<string, TvShow[]>();

    @Input()
    showsPerGenreLimit = 5;
  }

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain a grid', () => {
    const element = fixture.debugElement.query(By.css('.dashboard-grid')).nativeElement as HTMLElement;
    expect(element).toBeTruthy();
  });
  it('should contain a row per genre', () => {
    const genres = ['suspense', 'comedy', 'fantasy', 'drama'];
    const hostFixture = TestBed.createComponent(TestHostComponent);
    const hostComponent = hostFixture.componentInstance;
    hostComponent.genres = genres;
    hostFixture.detectChanges();
    const rowElements = hostFixture.debugElement.queryAll(By.css('.dashboard-genre-row'));

    expect(rowElements).toHaveSize(genres.length);
  });

  it('should list the shows of each genre limiting its number to showsLimitPerGenre value', () => {
    const genres = ['Drama', 'Action'];
    const tvShowsByGenre = new Map<string, TvShow[]>();
    tvShowsByGenre.set('Drama', [harryPotterMovie, dragonMovie]);
    tvShowsByGenre.set('Thriller', [harryPotterMovie]);
    tvShowsByGenre.set('Science-Fiction', [harryPotterMovie]);
    tvShowsByGenre.set('Crime', [flockerMovie]);
    tvShowsByGenre.set('Action', [flockerMovie, dragonMovie, lastActionMovie]);
    const hostFixture = TestBed.createComponent(TestHostComponent);
    const hostComponent = hostFixture.componentInstance;

    hostComponent.genres = genres;
    hostComponent.tvShowsByGenre = tvShowsByGenre;
    hostComponent.showsPerGenreLimit = 2;
    hostFixture.detectChanges();

    const rowElements = hostFixture.debugElement.queryAll(By.css('.dashboard-genre-row'));

    // Drama columns
    const columnsFirstRowElements = rowElements[0].queryAll(By.css('.dashboard-genre-column'));
    expect(columnsFirstRowElements).toHaveSize(hostComponent.showsPerGenreLimit);

    // Action columns
    const columnsSecondRowElements = rowElements[1].queryAll(By.css('.dashboard-genre-column'));
    expect(columnsSecondRowElements).toHaveSize(hostComponent.showsPerGenreLimit);
  });
});
