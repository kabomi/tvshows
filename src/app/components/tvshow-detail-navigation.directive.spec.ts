import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvshowDetailNavigationDirective } from './tvshow-detail-navigation.directive';
import { Component, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('TvshowDetailNavigationDirective', () => {
  let directive: TvshowDetailNavigationDirective;
  let testComponent: DirectiveTestComponent;
  let fixture: ComponentFixture<DirectiveTestComponent>;
  let container: DebugElement;
  let router: Router;

  afterEach(async () => {
    fixture.destroy();
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [TvshowDetailNavigationDirective, DirectiveTestComponent],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
    fixture = TestBed.createComponent(DirectiveTestComponent);
    fixture.autoDetectChanges();
    testComponent = fixture.componentInstance;
    directive = TestBed.inject(TvshowDetailNavigationDirective);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    container = fixture.debugElement.query(By.css('.container'));
  });
  it('should create an instance', () => {
    directive = new TvshowDetailNavigationDirective(router);
    expect(directive).toBeTruthy();
  });
  it('should navigate to "/tvshow/{tvShowId} on click', () => {
    testComponent.tvShowId = '100';
    fixture.detectChanges();

    container.triggerEventHandler('click', {});

    expect(router.navigate).toHaveBeenCalledWith(['tvshow', '100']);
  });
  it('should not navigate when value is falsy', () => {
    testComponent.tvShowId = undefined;
    fixture.detectChanges();

    container.triggerEventHandler('click', {});

    expect(router.navigate).not.toHaveBeenCalled();
  });
});

@Component({
  imports: [TvshowDetailNavigationDirective],
  standalone: true,
  template: ` <div class="container" [appTvshowDetailNavigation]="tvShowId">TestContent</div> `,
})
class DirectiveTestComponent {
  tvShowId: string | undefined = '85';
}
