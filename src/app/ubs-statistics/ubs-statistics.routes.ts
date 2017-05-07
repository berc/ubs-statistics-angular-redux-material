import { RouterModule, Routes } from '@angular/router';
import { UbsStatisticsComponent } from './ubs-statistics/ubs-statistics.component';

const UbsStatisticsRoutes: Routes = [
    { path: '', component: UbsStatisticsComponent },
];

export const UbsStatisticsRouting = RouterModule.forChild( UbsStatisticsRoutes );
