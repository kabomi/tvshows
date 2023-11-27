import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  standalone: true,
  selector: '[appTvshowDetailNavigation]',
})
export class TvshowDetailNavigationDirective {
  @Input('appTvshowDetailNavigation')
  tvShowId: string | undefined = undefined;

  constructor(private router: Router) {}

  @HostListener('click', ['$event']) onClick($event: Event) {
    // $event.stopPropagation();
    // $event.preventDefault();
    if (this.tvShowId) {
      this.router.navigate(['tvshow', this.tvShowId]);
    }
  }
}
