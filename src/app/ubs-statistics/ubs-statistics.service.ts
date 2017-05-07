import { Injectable } from '@angular/core';
import { UbsStatisticsApiService } from './usb-statistics.api.service';
import { StateActions } from '../store/state-actions';
import { StatItem } from './model/stat-item';
import { StatisticsService } from '../shared/services/statistics.service';
import * as _ from 'lodash';
import { Utils } from '../shared/utils';
import { PivotTable } from './ubs-statistics/ubs-statistics.component';
import { GeoZone } from './model/geo-zone';

export interface Filters {
    fromYear: number;
    toYear: number;
    timeSerie: string;
    weightsSection: string;
}

@Injectable()
export class UbsStatisticsService {

    private setUbsStatistics;
    private setGeoZones;

    private EARNING_TIME_SERIES = 'Earnings:';
    private WORKING_HOURS_REQUIRED = 'General: Working time required';

    constructor(actions: StateActions,
                private ubsStatisticsApiService: UbsStatisticsApiService,
                private statisticsService: StatisticsService) {
        this.setUbsStatistics = actions.createDispatcher(actions.setUbsStatistics);
        this.setGeoZones = actions.createDispatcher(actions.setGeoZones);

        this.loadUbsStatisticsModel();
    }

    public extractTimeSerie(ubsStatistics: StatItem[], filters: Filters): any {
        let pivotedData = this.pivotData(ubsStatistics, filters);
        let pivotedTable = this.generatePivotTable(pivotedData);
        this.formatColumns(pivotedTable.cols);
        return this.calculateStatistics(pivotedTable, filters, ubsStatistics);
    }

    public extractGeoZoneTimeSerie(ubsStatistics: StatItem[], filters: Filters,
                                   geoZones: GeoZone[]): any {
        let pivotedData = this.pivotData(ubsStatistics, filters);
        let geoZonePivotTable = this.transformCitiesToGeoZones(pivotedData, geoZones);
        let pivotedTable = this.generatePivotTable(geoZonePivotTable);
        this.formatColumns(pivotedTable.cols);
        return this.calculateStatistics(pivotedTable, filters);
    }

    public extractMonitoredYearsRange(ubsStatistics: StatItem[]): number[] {
        return _.uniq(ubsStatistics
            .map((o) => o.year))
            .sort() as number[];
    }

    public extractEarningTimeSeries(ubsStatistics: StatItem[]): string[] {
        return _.uniq(ubsStatistics
            .filter((o) => o.mainSection.indexOf(this.EARNING_TIME_SERIES) > -1)
            .map((o) => o.mainSection + ' | ' + o.subSection))
            .sort((o1, o2) => {
                if (o1 > o2) { return 1; }
                if (o1 < o2) { return -1; }
                return 0;
            });
    }

    public extractWorkingHoursRequired(ubsStatistics: StatItem[]): string[] {
        return _.uniq(ubsStatistics
            .filter((o) => o.mainSection.indexOf(this.WORKING_HOURS_REQUIRED) > -1)
            .map((o) => o.subSection))
            .sort((o1, o2) => {
                if (o1 > o2) { return 1; }
                if (o1 < o2) { return -1; }
                return 0;
            });
    }

    private calculateStatistics(pivotedTable: PivotTable, filters: Filters, ubsStats?: StatItem[]) {
        let statRows = this.calculateAgregatedRows(pivotedTable);
        pivotedTable.rows = pivotedTable.rows.concat(statRows);
        this.calculateAgregatedColumns(pivotedTable);

        if (filters.weightsSection && ubsStats) {
            let weights = ubsStats.filter((o) =>
                o.mainSection.indexOf(this.WORKING_HOURS_REQUIRED) === 0 &&
                o.subSection === filters.weightsSection);
            this.calculateWeightedColumn(pivotedTable, weights);
        }
        return pivotedTable;
    }

    private formatColumns(pivotedColumns: any[]) {
        pivotedColumns.sort((o1, o2) => {
            if (o1.prop > o2.prop) { return 1; }
            if (o1.prop < o2.prop) { return -1; }
            return 0;
        });
        pivotedColumns.unshift(
            { name: 'Year', prop: 'year', frozenLeft: true },
            { name: 'Average', prop: 'average_stat' },
            { name: 'Median', prop: 'median_stat' });
    }

    private generatePivotTable(pivotedData: any) {
        let pivotedColumns = [];
        let pivotedRows = [];
        Object.keys(pivotedData).forEach((k) => {
            let item = {year: k};
            let cities = pivotedData[k];
            Object.keys(cities).forEach((c) => {
                if (!pivotedColumns.filter((p) => p.name === c).length) {
                    pivotedColumns.push({name: c.trim(), prop: c.trim()});
                }
                item[c] = cities[c];
            });
            pivotedRows.push(item);
        });
        return { rows: pivotedRows, cols: pivotedColumns };
    }

    private pivotData(ubsStatistics: StatItem[], filters: Filters): any {
        let pivotedData = {};
        ubsStatistics
            .filter((o) => o.mainSection.indexOf(filters.timeSerie.split(' | ')[0]) > -1 &&
            o.subSection.indexOf(filters.timeSerie.split(' | ')[1]) > -1 &&
            o.year >= filters.fromYear && o.year <= filters.toYear)
            .forEach((o) => {
                pivotedData[o.year.toString()] = pivotedData[o.year.toString()] || {};
                pivotedData[o.year.toString()][o.city] = o.value;
            });
        return pivotedData;
    }

    private calculateAgregatedRows(table) {
        let medianRow = { year: 'median', average_stat: '', median_stat: '', weighted_stat: '' };
        let averageRow = { year: 'average', average_stat: '', median_stat: '', weighted_stat: '' };

        table.cols.forEach((col) => {
            if (col.prop === 'year' || col.prop === 'average_stat' || col.prop === 'median_stat') {
                return;
            }

            let city = col.prop;
            let statNumbers = table.rows
                .map((row) => row[city])
                .filter((v) => Utils.isNumber(v))
                .sort((a, b) => a - b);

            medianRow[city] = this.statisticsService.calculateMedian(statNumbers).toFixed(2);
            averageRow[city] = this.statisticsService.calculateAverage(statNumbers).toFixed(2);
        });

        return [medianRow, averageRow];
    }

    private calculateAgregatedColumns(table) {
        table.rows.forEach((row) => {
            if (row.year === 'median' || row.year === 'average') {
                return;
            }

            let statNumbers = Object.keys(row)
                .map((city) => city === 'year' || city === 'average_stat' ||
                city === 'median_stat' ? null : row[city] )
                .filter((v) => Utils.isNumber(v))
                .sort((a, b) => a - b);

            row['median_stat'] = this.statisticsService.calculateMedian(statNumbers).toFixed(2);
            row['average_stat'] = this.statisticsService.calculateAverage(statNumbers).toFixed(2);
        });
    }

    private calculateWeightedColumn(table, weights: StatItem[]) {
        table.rows.forEach((row) => {
            if (row.year === 'median' || row.year === 'average') {
                return;
            }

            let statCities = this.extractCities(row);
            row['weighted_stat'] = this.calculateWeightedAverage(row, statCities, weights);
        });

        let yearCol = table.cols.shift();
        table.cols.unshift({ name: 'Weighted av.', prop: 'weighted_stat' });
        table.cols.unshift(yearCol);
    };

    private calculateWeightedAverage(items: any, cities: string[], weights: StatItem[]) {
        let weightedSum = 0;
        let weightsSum = 0;
        cities.forEach((city) => {
            let weightEntryList = weights.filter((o) =>
            o.year.toString() === items['year'] && o.city === city);
            if (weightEntryList.length === 1) {
                let weightEntry = weightEntryList[0];
                weightsSum = weightsSum + (weightEntry.value as number);
                weightedSum = weightedSum + (weightEntry.value as number) * items[city];
            }
        });

        return (weightsSum > 0 ? (weightedSum / weightsSum).toFixed(2) : '');
    }

    private extractCities(row) {
        return Object.keys(row)
            .filter((city) =>
            city !== 'year' && city !== 'average_stat' && city !== 'median_stat' &&
            Utils.isNumber(row[city]));
    }

    private transformCitiesToGeoZones(pivotedData, geoZonesData: GeoZone[]) {
        let geoZones = this.transformGeoZones(geoZonesData);
        let res = {};
        Object.keys(pivotedData).forEach((year) => {
            res[year] = {};
            let pivotCities = Object.keys(pivotedData[year]);
            Object.keys(geoZones).forEach((zone) => {
                let statNumbers = _.intersection(pivotCities, geoZones[zone])
                    .map((city) => pivotedData[year][city]);
                if (!statNumbers || !statNumbers.length) { return; }
                res[year][zone] = Math.round(this.statisticsService.calculateAverage(statNumbers));
            });
        });
        return res;
    }

    private transformGeoZones(geoZonesData: GeoZone[]) {
        let geoZones = {};
        _.uniq(geoZonesData.map((o) => o.geoZone))
            .forEach((zone) => {
                geoZones[zone] = geoZonesData.filter((o) => o.geoZone === zone)
                    .map((o) => o.city);
            });
        return geoZones;
    }

    private loadUbsStatisticsModel() {
        this.retrieveGeoZones();
        this.retrieveUbsStatistics();
    }

    private retrieveUbsStatistics() {
        this.ubsStatisticsApiService.getUbsStatistics().map(
          (statItems: StatItem[]) => statItems.map((item: StatItem) => {
            item.year = parseInt(item.year as any, 10);
            item.value = parseFloat(item.value as any);
            return item;
        })).subscribe(
            (o: any[]) => this.setUbsStatistics(o),
            (error) => console.log(error)
        );
    }

    private retrieveGeoZones() {
        this.ubsStatisticsApiService.getGeoZones().subscribe(
            (o: StatItem[]) => this.setGeoZones(o),
            (error) => console.log(error)
        );
    }
}
