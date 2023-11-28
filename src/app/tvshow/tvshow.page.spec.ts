import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TvshowPage } from './tvshow.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { harryPotterMovie } from '../services/tvshows.mocks';
import { covertTvShowResponse } from '../services/tvshows.model';
import { By } from '@angular/platform-browser';
import { TvshowItemComponent } from '../components/tvshow-item/tvshow-item.component';
import { TvshowsService } from '../services/tvshows.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TvShowOptions } from '../services/tvshows.options';

describe('TvshowPage', () => {
  let component: TvshowPage;
  let fixture: ComponentFixture<TvshowPage>;
  let tvShowsService: TvshowsService;
  let apiOptions: TvShowOptions;

  afterEach(async () => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  beforeEach(waitForAsync(() => {
    apiOptions = new TvShowOptions('https://api.tvshows.com', {
      getAllShows: '/shows',
    });
    TestBed.configureTestingModule({
      providers: [
        TvshowsService,
        {
          provide: TvShowOptions,
          useValue: apiOptions,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => harryPotterMovie.id.toString() } },
          },
        },
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    tvShowsService = TestBed.inject(TvshowsService);
    fixture = TestBed.createComponent(TvshowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a "Loading" text when "show" property is not set', () => {
    const tvShowItem = fixture.debugElement.query(By.directive(TvshowItemComponent))
      ?.componentInstance as TvshowItemComponent;
    expect(tvShowItem).toBeFalsy();

    const titleElement = fixture.debugElement.query(By.css('ion-title')).nativeElement as HTMLElement;
    expect(titleElement.textContent).toEqual('Loading...');
  });

  it('shows a TvShowItem when "show" property is set', () => {
    component.show = covertTvShowResponse(harryPotterMovie);
    fixture.detectChanges();

    const tvShowItem = fixture.debugElement.query(By.directive(TvshowItemComponent))
      .componentInstance as TvshowItemComponent;
    expect(tvShowItem).toBeTruthy();

    const titleElement = fixture.debugElement.query(By.css('ion-title')).nativeElement as HTMLElement;
    expect(titleElement.textContent).toEqual(harryPotterMovie.name);
  });

  it('shows a TvShowItem without call to action', () => {
    component.show = covertTvShowResponse(harryPotterMovie);
    fixture.detectChanges();

    const tvShowItem = fixture.debugElement.query(By.directive(TvshowItemComponent))
      .componentInstance as TvshowItemComponent;
    expect(tvShowItem).toBeTruthy();
    expect(tvShowItem.callToAction).toBeFalsy();
  });

  it('fetches TvShowItem from TvShowService', () => {
    // Take a look above (ActivatedRoute)
    spyOn(tvShowsService, 'getShowDetails').and.returnValue(of(covertTvShowResponse(harryPotterMovie)));
    fixture = TestBed.createComponent(TvshowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.show).toEqual(covertTvShowResponse(harryPotterMovie));
    const tvShowItem = fixture.debugElement.query(By.directive(TvshowItemComponent))
      .componentInstance as TvshowItemComponent;
    expect(tvShowItem).toBeTruthy();
  });
});
