import { Injectable } from '@angular/core';

@Injectable()
export class StatisticsService {

    public calculateAverage(statNumbers: number[]) {
        if (!statNumbers.length) { return 0; }
        return (statNumbers.reduce((a, b) => a + b, 0) / statNumbers.length);
    }

    public calculateMedian(statNumbers: number[]) {
        if (!statNumbers.length) { return 0; }
        let half = Math.floor(statNumbers.length / 2);
        if (statNumbers.length % 2) { return statNumbers[half]; }
        return (statNumbers[half - 1] + statNumbers[half]) / 2.0;
    }

    public calculateYearsRange(items: number[], from: number, to: number, isTo: boolean) {
        let start = isTo ? from : items[0];
        let end = isTo ? items[items.length - 1] : to;
        console.log(items.filter( (i) => i >= start && i <= end ));
        return items.filter( (i) => i >= start && i <= end );
    }
}
