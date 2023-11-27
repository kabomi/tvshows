import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { TvShowOptions } from './app/services/tvshows.options';
import { loadTvShows } from './app/app-config/load-tvshows';
import { TvshowsService } from './app/services/tvshows.service';
import { HttpClientModule } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: TvShowOptions,
      useValue: new TvShowOptions('https://api.tvmaze.com', {
        getAllShows: '/shows',
      }),
    },
    importProvidersFrom(HttpClientModule),
    {
      provide: APP_INITIALIZER,
      useFactory: loadTvShows,
      deps: [TvshowsService],
      multi: true,
    },
  ],
});
