"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var RatesComponent = (function () {
    function RatesComponent(store, actions, UbsStatisticsService) {
        var _this = this;
        this.UbsStatisticsService = UbsStatisticsService;
        this.setSupportedPairs = actions.createDispatcher(actions.setSupportedPairs);
        this.setRatesSnapshot = actions.createDispatcher(actions.setRatesSnapshot);
        this.isLoading = true;
        this.unsubscribeFromStore = store.subscribe(function (state) {
            _this.supportedPairs = state.supportedPairs;
            _this.ratesSnapshot = state.ratesSnapshot;
            _this.isLoading = (!_this.supportedPairs || !_this.supportedPairs.length ||
                !_this.ratesSnapshot || !_this.ratesSnapshot.length);
        });
    }
    RatesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.UbsStatisticsService.getSupportedPairs().subscribe(function (supportedPairs) { return _this.setSupportedPairs(supportedPairs); }, function (error) { return console.log(error); });
        this.UbsStatisticsService.getRatesSnapshot().subscribe(function (rates) { return _this.setRatesSnapshot(rates); }, function (error) { return console.log(error); });
    };
    RatesComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeFromStore();
    };
    return RatesComponent;
}());
RatesComponent = __decorate([
    core_1.Component({
        selector: 'rates',
        styleUrls: ['src/app/ubs-statistics/ubs-statistics/ubs-statistics.component.scss', '../../../assets/css/global.css'],
        templateUrl: 'src/app/ubs-statistics/ubs-statistics/ubs-statistics.component.html'
    })
], RatesComponent);
exports.RatesComponent = RatesComponent;
//# sourceMappingURL=ubs-statistics.component.js.mapnt.js.map