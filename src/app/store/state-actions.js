/**
 * Created by rastislavbertusek on 06.03.17.
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var angular2_redux_1 = require("angular2-redux");
var StateActions = (function (_super) {
    __extends(StateActions, _super);
    function StateActions(appStore) {
        return _super.call(this, appStore) || this;
    }
    StateActions.prototype.setSupportedPairs = function (supportedPairs) {
        return {
            type: 'SET_SUPPORTED_PAIRS',
            supportedPairs: supportedPairs
        };
    };
    ;
    StateActions.prototype.setRatesSnapshot = function (ratesSnapshot) {
        return {
            type: 'SET_RATES_SNAPSHOT',
            ratesSnapshot: ratesSnapshot
        };
    };
    ;
    StateActions.prototype.setOrders = function (orders) {
        return {
            type: 'SET_ORDERS',
            orders: orders
        };
    };
    ;
    return StateActions;
}(angular2_redux_1.Actions));
StateActions = __decorate([
    core_1.Injectable()
], StateActions);
exports.StateActions = StateActions;
//# sourceMappingURL=state-actions.js.map