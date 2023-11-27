import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TvshowPage } from './tvshow.page';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterState } from '@angular/router';
import { harryPotterMovie } from '../services/tvshows.mocks';
import { covertTvShowResponse } from '../services/tvshows.model';
import { By } from '@angular/platform-browser';
import { TvshowItemComponent } from '../components/tvshow-item/tvshow-item.component';

describe('TvshowPage', () => {
  let component: TvshowPage;
  let fixture: ComponentFixture<TvshowPage>;
  let routerState: RouterState;

  afterEach(async () => {
    TestBed.resetTestingModule();
    fixture.destroy();
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // providers: [RouterState],
      imports: [RouterTestingModule],
    });
    // routerState = TestBed.inject(RouterState);
    fixture = TestBed.createComponent(TvshowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a TvShowItem when "show" property is set', () => {
    component.show = covertTvShowResponse(harryPotterMovie);
    fixture.detectChanges();

    const tvShowItem = fixture.debugElement.query(By.directive(TvshowItemComponent))
      .componentInstance as TvshowItemComponent;
    expect(tvShowItem).toBeTruthy();
  });
});
