import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonBadge,
  IonTitle,
  IonImg,
} from '@ionic/angular/standalone';
import { TvShow } from 'src/app/services/tvshows.model';
import { TvshowDetailNavigationDirective } from '../tvshow-detail-navigation.directive';

@Component({
  selector: 'app-tvshow-item',
  standalone: true,
  templateUrl: './tvshow-item.component.html',
  styleUrls: ['./tvshow-item.component.scss'],
  imports: [
    IonButton,
    CommonModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonTitle,
    IonBadge,
    IonImg,
    TvshowDetailNavigationDirective,
  ],
})
export class TvshowItemComponent implements OnInit {
  @Input()
  show: TvShow | undefined = undefined;

  @Input()
  callToAction = true;

  constructor() {}

  ngOnInit() {
    return;
  }
}
