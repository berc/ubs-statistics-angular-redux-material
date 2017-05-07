import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import 'hammerjs';

// Platform and Environment providers/directives/pipes
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { StateActions } from './store/state-actions';
import { UbsStatisticsModule } from './ubs-statistics/ubs-statistics.module';
import { appStoreProvider } from './store/state';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent],
  imports: [
    UbsStatisticsModule,
    SharedModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    FlexLayoutModule,
    MaterialModule.forRoot()
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    appStoreProvider,
    StateActions
  ]
})
export class AppModule {
}
