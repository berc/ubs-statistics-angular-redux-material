import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Filters } from '../../ubs-statistics.service';
import { StatisticsService } from '../../../shared/services/statistics.service';
import { Utils } from '../../../shared/utils';

@Component({
    selector: 'ubs-statistics-filters',
    styleUrls: ['./ubs-statistics-filters.component.scss', '../../../../assets/css/global.scss'],
    template: require('./ubs-statistics-filters.component.html')
})
export class UbsStatisticsFiltersComponent implements OnChanges {

    @Input() public monitoredYears;
    public monitoredYearsFrom: number[];
    public monitoredYearsTo: number[];
    public selectedFromYear: number;
    public selectedToYear: number;

    @Input() public earningTimeSeries: string[];
    public selectedTimeSerie: string;

    @Input() public workingHoursRequired: string[];
    public selectedHoursRequired: string;

    @Output() public onChangedFilters: EventEmitter<Filters> = new EventEmitter();

    constructor(private statisticsService: StatisticsService) {}

    public changedFromYear() {
        this.monitoredYearsTo = this.statisticsService.calculateYearsRange(this.monitoredYears,
            this.selectedFromYear, this.selectedToYear, true);

        this.emitChangedFilters();
    }

    public changedToYear() {
        this.monitoredYearsFrom = this.statisticsService.calculateYearsRange(this.monitoredYears,
            this.selectedFromYear, this.selectedToYear, false);

        this.emitChangedFilters();
    }

    public changedSelectedTimeSerie() {
        this.emitChangedFilters();
    }

    public changedSelectedHoursRequired() {
        this.emitChangedFilters();
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (Utils.isChangedArray(changes, 'monitoredYears')) {
            let years = changes['monitoredYears'].currentValue;
            this.monitoredYearsFrom = years.slice();
            this.monitoredYearsTo = years.slice();
            this.selectedFromYear = years[0];
            this.selectedToYear = years[years.length - 1];
        }
        if (Utils.isChangedArray(changes, 'earningTimeSeries')) {
            this.selectedTimeSerie = changes['earningTimeSeries'].currentValue[0];
        }
        if (Utils.isChangedArray(changes, 'workingHoursRequired')) {
            this.workingHoursRequired = changes['workingHoursRequired'].currentValue;
            this.workingHoursRequired.unshift('');
        }
        this.emitChangedFilters();
    }

    private emitChangedFilters(): Filters {
        if (!this.isInitFilters()) { return; }

        let filters: Filters = { fromYear: this.selectedFromYear, toYear: this.selectedToYear,
            timeSerie: this.selectedTimeSerie, weightsSection: this.selectedHoursRequired };
        this.onChangedFilters.emit(filters);
    }

    private isInitFilters(): boolean {
        return !!this.selectedFromYear && !!this.selectedToYear && !!this.selectedTimeSerie;
    }
}
