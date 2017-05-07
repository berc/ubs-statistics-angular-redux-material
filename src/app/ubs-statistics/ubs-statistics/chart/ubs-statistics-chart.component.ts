import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { PivotTable } from '../ubs-statistics.component';
import { Utils } from '../../../shared/utils';

@Component({
    selector: 'ubs-statistics-chart',
    styleUrls: ['./ubs-statistics-chart.component.scss', '../../../../assets/css/global.scss'],
    template: require('./ubs-statistics-chart.component.html')
})
export class UbsStatisticsChartComponent implements OnChanges {
    @Input() public isLoading: boolean;
    @Input() public pivotTable: PivotTable;

    @ViewChild('ubsStatisticsChart') public chartEl;
    private chartObject: any;

    public ngOnChanges(changes: SimpleChanges) {
        if (Utils.isChangedObject(changes, 'pivotTable')) {
            this.showPivotTableChart(changes['pivotTable'].currentValue);
        }
    }

    private showPivotTableChart(pivotTable) {
        if (!pivotTable || pivotTable.rows.length === 0 ||
            !this.chartEl || !this.chartEl.nativeElement) { return; }

        let { labels, datasets } = this.transformPivotTableToChardDataset(pivotTable);
        let chartConfig = this.createChartConfig(labels, datasets);

        this.renderChart(this.chartEl.nativeElement, chartConfig);
    }

    private transformPivotTableToChardDataset(pivotTable: PivotTable) {
        let cities = pivotTable.cols.filter((col) => {
            let city = col.prop;
            return city !== 'year' && city !== 'average_stat' &&
            city !== 'median_stat';
        }).map((city) => city.name);
        let cleanRows = pivotTable.rows.filter((r) => r.year !== 'median' && r.year !== 'average');

        let datasets: any[] = [];
        cities.forEach((city) => {
            let dataset = this.createChartDataset(city);
            cleanRows.forEach((row) => {
                dataset.data.push(row[city]);
            });
            datasets.push(dataset);
        });

        let labels: string[] = [];
        cleanRows.forEach((row) => labels.push(row.year));

        return { labels, datasets };
    }

    private createChartDataset(city: string) {
        return {
            label: city,
            data: [],
            borderColor: Utils.convertStringToColor(city),
            fill: false,
            spanGaps: true
        };
    }

    private createChartConfig(labels: string[], datasets: any[]) {
        return {
            type: 'line',
            data: {
                labels,
                datasets
            }
        };
    }

    private renderChart(ctx, chartConfig) {
        this.chartObject = new Chart(ctx, chartConfig);
    }
}
