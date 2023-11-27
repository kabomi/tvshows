import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IonGrid,
  IonRow,
  IonCol,
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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    IonGrid,
    IonRow,
    IonCol,
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
  ],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  @Input()
  genres: string[] = [];

  @Input()
  tvShowsByGenre = new Map<string, TvShow[]>();

  @Input()
  showsPerGenreLimit = 5;

  trackByFn: (id: number, name: string) => string = (id, name) => name;
  trackByShowFn: (id: number, tvShow: TvShow) => string = (id, tvShow) => tvShow.name;

  ngOnInit() {
    return;
  }
}
