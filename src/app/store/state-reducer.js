/**
 * Created by rastislavbertusek on 08.04.17.
 */
"use strict";
exports.__esModule = true;
var initState = {
    supportedPairs: [],
    ratesSnapshot: [],
    orders: []
};
exports.Reducer = function (state, action) {
    if (state === void 0) { state = initState; }
    if (action === void 0) { action = { type: null }; }
    switch (action.type) {
        case 'SET_SUPPORTED_PAIRS':
            return Object.assign({}, state, { supportedPairs: action.supportedPairs });
        case 'SET_RATES_SNAPSHOT':
            return Object.assign({}, state, { ratesSnapshot: action.ratesSnapshot });
        case 'SET_ORDERS':
            return Object.assign({}, state, { orders: action.orders });
        default:
            return state;
    }
};
//# sourceMappingURL=state-reducer.js.map