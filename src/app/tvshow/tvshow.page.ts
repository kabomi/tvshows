import { TvshowsService } from './../services/tvshows.service';
import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { TvShow } from '../services/tvshows.model';
import { TvshowItemComponent } from '../components/tvshow-item/tvshow-item.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.page.html',
  styleUrls: ['./tvshow.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TvshowItemComponent],
})
export class TvshowPage implements AfterContentInit, OnDestroy {
  show: TvShow | undefined = undefined;

  // @Input()
  // id!: string;

  private loading: HTMLIonLoadingElement | undefined;
  private _showDetailsSub!: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private tvShowsService: TvshowsService,
    private route: ActivatedRoute,
  ) {
    const showId = this.route.snapshot.paramMap.get('id');
    if (!showId) return;

    this._showDetailsSub = this.tvShowsService.getShowDetails(showId).subscribe((show) => {
      this.show = show;
      this.loading?.dismiss();
    });
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading Movie...',
    });

    this.loading.present();
  }

  ngAfterContentInit() {
    this.showLoading();
  }

  ngOnDestroy() {
    this._showDetailsSub?.unsubscribe();
  }
}
