import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonImg, IonCardTitle, IonBadge, IonCardContent, IonButton } from '@ionic/angular/standalone';

import { TvshowItemComponent } from './tvshow-item.component';
import { By } from '@angular/platform-browser';
import { harryPotterMovie } from 'src/app/services/tvshows.mocks';
import { covertTvShowResponse } from 'src/app/services/tvshows.model';

describe('TvshowItemComponent', () => {
  let component: TvshowItemComponent;
  let fixture: ComponentFixture<TvshowItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [TvshowItemComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TvshowItemComponent);
    component = fixture.componentInstance;
    component.show = covertTvShowResponse(harryPotterMovie);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain an image', () => {
    const image = fixture.debugElement.query(By.directive(IonImg)).componentInstance as IonImg;
    expect(image.src).toBe(component.show?.image);
  });
  it('should contain a badge with the rating', () => {
    const badgeElement = fixture.debugElement.query(By.directive(IonBadge)).nativeElement as HTMLElement;
    expect(Number(badgeElement.textContent)).toEqual(component.show?.rating!);
  });
  it('should contain a title', () => {
    const titleElement = fixture.debugElement.query(By.directive(IonCardTitle)).nativeElement as HTMLElement;
    expect(titleElement.textContent).toBe(component.show?.name!);
  });
  it('should contain a summary', () => {
    const contentElement = fixture.debugElement.query(By.directive(IonCardContent)).nativeElement as HTMLElement;
    expect(contentElement.innerHTML).toBe(component.show?.summary!);
  });
  it('should contain a call to action button', () => {
    const button = fixture.debugElement.query(By.directive(IonButton)).componentInstance as IonButton;
    expect(button).toBeTruthy();
  });
});
