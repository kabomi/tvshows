import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TvShow } from 'src/app/services/tvshows.model';
import { TvshowDetailNavigationDirective } from '../tvshow-detail-navigation.directive';

@Component({
  selector: 'app-tvshow-item',
  standalone: true,
  templateUrl: './tvshow-item.component.html',
  styleUrls: ['./tvshow-item.component.scss'],
  imports: [CommonModule, IonicModule, TvshowDetailNavigationDirective],
})
export class TvshowItemComponent implements OnInit {
  @Input()
  show: TvShow | undefined = undefined;

  @Input()
  callToAction = true;

  imgLoaded = false;

  constructor() {}

  ngOnInit() {
    return;
  }
}
