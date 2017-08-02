"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var angular2_moment_1 = require("angular2-moment");
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
// Services
var timer_service_1 = require("./Timer/timer.service");
// Stores
var timer_store_1 = require("./Timer/timer.store");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBK0M7QUFDL0MsNkNBQWlEO0FBQ2pELG1EQUErQztBQUMvQyxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBRTlFLFdBQVc7QUFDWCx1REFBcUQ7QUFFckQsU0FBUztBQUNULG1EQUFpRDtBQUVqRCxRQUFRO0FBQ1IscUNBQW9DO0FBRXBDLGFBQWE7QUFDYix3REFBc0Q7QUFDdEQsMkRBQXlEO0FBeUJ6RCxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUExQixJQUEwQjtBQUFiLFNBQVM7SUF2QnJCLGVBQVEsQ0FBQztRQUNOLFNBQVMsRUFBRTtZQUNQLDRCQUFZO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsOEJBQWdCO1lBQ2hCLDhCQUFZO1NBQ2Y7UUFDRCxZQUFZLEVBQUU7WUFDViw0QkFBWTtZQUNaLDhCQUFhO1lBQ2IsZ0NBQWM7WUFDZCxXQUFJO1NBQ1A7UUFDRCxTQUFTLEVBQUU7WUFDUCw0QkFBWTtZQUNaLHdCQUFVO1NBQ2I7UUFDRCxPQUFPLEVBQUU7WUFDTCx1QkFBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csU0FBUyxDQUFJO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gJy4vYXBwLnJvdXRpbmcnO1xuaW1wb3J0IHsgTW9tZW50TW9kdWxlIH0gZnJvbSAnYW5ndWxhcjItbW9tZW50JztcbmltcG9ydCB7IE5PX0VSUk9SU19TQ0hFTUEsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlJztcblxuLy8gU2VydmljZXNcbmltcG9ydCB7IFRpbWVyU2VydmljZSB9IGZyb20gJy4vVGltZXIvdGltZXIuc2VydmljZSc7XG5cbi8vIFN0b3Jlc1xuaW1wb3J0IHsgVGltZXJTdG9yZSB9IGZyb20gJy4vVGltZXIvdGltZXIuc3RvcmUnO1xuXG4vLyBQaXBlc1xuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vcGlwZXMvc29ydCc7XG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tICcuL0hvbWUvSG9tZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZXJDb21wb25lbnQgfSBmcm9tICcuL1RpbWVyL1RpbWVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIE1vbWVudE1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIEhvbWVDb21wb25lbnQsXG4gICAgICAgIFRpbWVyQ29tcG9uZW50LFxuICAgICAgICBTb3J0XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgVGltZXJTZXJ2aWNlLFxuICAgICAgICBUaW1lclN0b3JlXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==