/**
 * Created by rastislavbertusek
 */

import * as StateActions from './state-actions';

import { CurrencyPair } from '../ubs-statistics/model/currency-pair';
import { GeoZone } from '../ubs-statistics/model/geo-zone';
import { StatItem } from '../ubs-statistics/model/stat-item';

export interface ReduxState {
    ubsStatistics: StatItem[];
    geoZones: GeoZone[];
}

export interface ReduxAction {
    type: StateActions.StateActionType;

    ubsStatistics?: StatItem[];
    geoZones?: GeoZone[];
}

const initState: ReduxState = {
    ubsStatistics: [],
    geoZones: []
};

export let Reducer = (state: ReduxState = initState, action: ReduxAction = {type: null}) => {
    switch (action.type) {
        case 'SET_UBS_STATISTICS':
            return Object.assign({}, state, { ubsStatistics: action.ubsStatistics });
        case 'SET_GEO_ZONES':
            return Object.assign({}, state, { geoZones: action.geoZones });
        default:
            return state;
    }
};
