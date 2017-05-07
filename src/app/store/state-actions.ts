/**
 * Created by rastislavbertusek
 */

import { Injectable } from '@angular/core';
import { Actions, AppStore } from 'angular2-redux';
import { ReduxAction } from './state-reducer';

import { GeoZone } from '../ubs-statistics/model/geo-zone';
import { CurrencyPair } from '../ubs-statistics/model/currency-pair';
import { StatItem } from '../ubs-statistics/model/stat-item';

export type StateActionType = 'SET_UBS_STATISTICS' | 'SET_GEO_ZONES';

@Injectable()
export class StateActions extends Actions {

    constructor(appStore: AppStore ) {
        super(appStore);
    }

    public setUbsStatistics(ubsStatistics: StatItem[]): ReduxAction {
        return {
            type: 'SET_UBS_STATISTICS',
            ubsStatistics
        };
    };

    public setGeoZones(geoZones: GeoZone[]): ReduxAction {
        return {
            type: 'SET_GEO_ZONES',
            geoZones
        };
    };
}
