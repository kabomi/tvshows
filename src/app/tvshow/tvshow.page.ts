import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { TvShow, covertTvShowResponse } from '../services/tvshows.model';
import { TvshowItemComponent } from '../components/tvshow-item/tvshow-item.component';
import { harryPotterMovie } from '../services/tvshows.mocks';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.page.html',
  styleUrls: ['./tvshow.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TvshowItemComponent],
})
export class TvshowPage implements AfterContentInit {
  @Input()
  show: TvShow | undefined = undefined;

  constructor(private loadingCtrl: LoadingController) {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Movie...',
    });

    loading.present();
  }

  ngAfterContentInit() {
    this.showLoading();
  }
}
