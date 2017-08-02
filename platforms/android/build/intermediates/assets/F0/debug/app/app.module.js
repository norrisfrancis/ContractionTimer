"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var angular2_moment_1 = require("angular2-moment");
// Services
var timer_service_1 = require("./services/timer.service");
// Stores
var timer_store_1 = require("./stores/timer.store");
// Pipes
var sort_1 = require("./pipes/sort");
// Components
var Home_component_1 = require("./Home/Home.component");
var Timer_component_1 = require("./Timer/Timer.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [
            app_component_1.AppComponent
        ],
        imports: [
            nativescript_module_1.NativeScriptModule,
            app_routing_1.AppRoutingModule,
            angular2_moment_1.MomentModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            Home_component_1.HomeComponent,
            Timer_component_1.TimerComponent,
            sort_1.Sort
        ],
        providers: [
            timer_service_1.TimerService,
            timer_store_1.TimerStore
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0MsbURBQStDO0FBRS9DLFdBQVc7QUFDWCwwREFBd0Q7QUFFeEQsU0FBUztBQUNULG9EQUFrRDtBQUVsRCxRQUFRO0FBQ1IscUNBQW9DO0FBRXBDLGFBQWE7QUFDYix3REFBc0Q7QUFDdEQsMkRBQXlEO0FBeUJ6RCxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUExQixJQUEwQjtBQUFiLFNBQVM7SUF2QnJCLGVBQVEsQ0FBQztRQUNOLFNBQVMsRUFBRTtZQUNQLDRCQUFZO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsOEJBQWdCO1lBQ2hCLDhCQUFZO1NBQ2Y7UUFDRCxZQUFZLEVBQUU7WUFDViw0QkFBWTtZQUNaLDhCQUFhO1lBQ2IsZ0NBQWM7WUFDZCxXQUFJO1NBQ1A7UUFDRCxTQUFTLEVBQUU7WUFDUCw0QkFBWTtZQUNaLHdCQUFVO1NBQ2I7UUFDRCxPQUFPLEVBQUU7WUFDTCx1QkFBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csU0FBUyxDQUFJO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb21lbnRNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1tb21lbnQnO1xuXG4vLyBTZXJ2aWNlc1xuaW1wb3J0IHsgVGltZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdGltZXIuc2VydmljZVwiO1xuXG4vLyBTdG9yZXNcbmltcG9ydCB7IFRpbWVyU3RvcmUgfSBmcm9tIFwiLi9zdG9yZXMvdGltZXIuc3RvcmVcIjtcblxuLy8gUGlwZXNcbmltcG9ydCB7IFNvcnQgfSBmcm9tIFwiLi9waXBlcy9zb3J0XCI7XG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9Ib21lL0hvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBUaW1lckNvbXBvbmVudCB9IGZyb20gXCIuL1RpbWVyL1RpbWVyLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBNb21lbnRNb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBIb21lQ29tcG9uZW50LFxuICAgICAgICBUaW1lckNvbXBvbmVudCxcbiAgICAgICAgU29ydFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFRpbWVyU2VydmljZSxcbiAgICAgICAgVGltZXJTdG9yZVxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=