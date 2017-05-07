import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StatisticsService } from './services/statistics.service';
import { UbsSelectComponent } from './select/ubs-select.component';

@NgModule({
    declarations: [
        UbsSelectComponent
    ],
    providers: [
    ],
    exports: [
        UbsSelectComponent
    ]
})
export class UbsCommonModule { }
