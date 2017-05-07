import { Component, Input } from '@angular/core';
import { PivotTable } from '../ubs-statistics.component';

@Component({
    selector: 'ubs-statistics-table',
    styleUrls: ['./ubs-statistics-table.component.scss', '../../../../assets/css/global.scss'],
    template: require('./ubs-statistics-table.component.html')
})
export class UbsStatisticsTableComponent {
    @Input() public isLoading: boolean;
    @Input() public pivotTable: PivotTable;
}
