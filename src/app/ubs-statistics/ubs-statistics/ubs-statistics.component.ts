import { Component, OnDestroy } from '@angular/core';
import { AppStore } from 'angular2-redux';
import { GeoZone } from '../model/geo-zone';
import { StatItem } from '../model/stat-item';
import { UbsStatisticsService, Filters } from '../ubs-statistics.service';

export interface PivotTable {
    rows: any[];
    cols: ColumnItem[];
}
interface ColumnItem {
    name: string;
    prop: string;
}

@Component({
    selector: 'rates',
    styleUrls: ['./ubs-statistics.component.scss', '../../../assets/css/global.scss'],
    template: require('./ubs-statistics.component.html')
})
export class UbsStatisticsComponent implements OnDestroy {

    public isLoading: boolean = true;
    public ubsStats: StatItem[];
    public geoZones: GeoZone[];

    public monitoredYears: number[] = [];
    public earningTimeSeries: string[] = [];
    public workingHoursRequired: string[];

    public isLoadingDataTable: boolean = false;
    public pivotTable: PivotTable = { rows: [], cols: [{ name: 'Year', prop: 'year' }] };
    public geoZonePivotTable: PivotTable = { rows: [], cols: [{ name: 'Year', prop: 'year' }] };

    private filters: Filters = null;
    private unsubscribeFromStore;

    constructor(store: AppStore,
                private ubsStatisticsService: UbsStatisticsService) {

        this.watchStateChanges(store, ubsStatisticsService);
    }

    public ngOnDestroy(): void {
        this.unsubscribeFromStore();
    }

    public onChangedFilters(filters: Filters) {
        if (!filters) { return; }

        this.filters = filters;
        this.generateTimeSerieTable();
    }

    private generateTimeSerieTable() {
        if (this.isLoading || !this.filters) { return; }

        this.isLoadingDataTable = true;
        this.pivotTable = this.ubsStatisticsService.extractTimeSerie(this.ubsStats, this.filters);
        this.geoZonePivotTable = this.ubsStatisticsService
            .extractGeoZoneTimeSerie(this.ubsStats, this.filters, this.geoZones);
        this.isLoadingDataTable = false;
    }

    private watchStateChanges(store: AppStore, ubsStatisticsService: UbsStatisticsService) {
        this.isLoading = true;
        this.unsubscribeFromStore = store.subscribe((state) => {
            this.ubsStats = state.ubsStatistics;
            this.geoZones = state.geoZones;

            this.isLoading = (!this.ubsStats || !this.ubsStats.length ||
                                !this.geoZones || !this.geoZones.length);

            this.refreshViewModel(ubsStatisticsService);

            this.generateTimeSerieTable();
        });
    }

    private refreshViewModel(ubsStatisticsService: UbsStatisticsService) {
        if (this.isLoading) { return; }

        this.monitoredYears = ubsStatisticsService.extractMonitoredYearsRange(this.ubsStats);
        this.earningTimeSeries = ubsStatisticsService.extractEarningTimeSeries(this.ubsStats);
        this.workingHoursRequired = ubsStatisticsService.extractWorkingHoursRequired(this.ubsStats);
    }
}
