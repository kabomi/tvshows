import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TvshowPage } from './tvshow.page';

describe('TvshowPage', () => {
  let component: TvshowPage;
  let fixture: ComponentFixture<TvshowPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(TvshowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
