"use strict";
exports.__esModule = true;
var router_1 = require("@angular/router");
var rates_component_1 = require("./ubs-statistics/ubs-statistics.component");
var orders_component_1 = require("./orders-component/orders.component");
var UbsStatisticsRoutes = [
    { path: '', component: rates_component_1.RatesComponent },
    { path: 'orders', component: orders_component_1.OrdersComponent }
];
exports.UbsStatisticsRouting = router_1.RouterModule.forChild(UbsStatisticsRoutes);
//# sourceMappingURL=ubs-statistics.routes.js.map