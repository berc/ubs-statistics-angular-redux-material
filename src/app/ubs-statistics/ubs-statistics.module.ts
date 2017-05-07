import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { UbsStatisticsService } from './ubs-statistics.service';
import { UbsStatisticsApiService } from './usb-statistics.api.service';
import { UbsStatisticsRouting } from './ubs-statistics.routes';
import { UbsStatisticsComponent } from './ubs-statistics/ubs-statistics.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UbsStatisticsTableComponent } from './ubs-statistics/table/ubs-statistics-table.component';
import { UbsStatisticsChartComponent } from './ubs-statistics/chart/ubs-statistics-chart.component';
import { UbsStatisticsFiltersComponent }
                from './ubs-statistics/filters/ubs-statistics-filters.component';

@NgModule({
  imports: [
      FormsModule,
      BrowserModule,
      MaterialModule,
      CommonModule,
      UbsStatisticsRouting,
      NgxDatatableModule
  ],
  declarations: [
      UbsStatisticsComponent,
      UbsStatisticsFiltersComponent,
      UbsStatisticsTableComponent,
      UbsStatisticsChartComponent
  ],
  providers: [
      UbsStatisticsService,
      UbsStatisticsApiService
  ],
  exports: [
      UbsStatisticsComponent
  ]
})
export class UbsStatisticsModule { }
