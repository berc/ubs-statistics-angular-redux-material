/**
 * Created by rastislavbertusek on 08.04.17.
 */
"use strict";
exports.__esModule = true;
// create factory to be called once angular has been bootstrapped
var angular2_redux_1 = require("angular2-redux");
var state_reducer_1 = require("./state-reducer");
var appStoreFactory = angular2_redux_1.createAppStoreFactoryWithOptions({
    reducers: state_reducer_1.Reducer,
    debug: true
});
exports.appStoreProvider = {
    provide: angular2_redux_1.AppStore,
    useFactory: appStoreFactory
};
//# sourceMappingURL=state.js.map