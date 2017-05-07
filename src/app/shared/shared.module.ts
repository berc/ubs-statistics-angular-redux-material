import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StatisticsService } from './services/statistics.service';

@NgModule({
  declarations: [
      HeaderComponent,
      FooterComponent
  ],
  providers: [
      StatisticsService
  ],
  exports: [
      HeaderComponent,
      FooterComponent
  ]
})
export class SharedModule { }
