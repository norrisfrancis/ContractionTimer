"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("nativescript-angular/router");
var HomeComponent = (function () {
    function HomeComponent(router, page) {
        var _this = this;
        this.router = router;
        this.page = page;
        this.isLoading = true;
        this.btnStart = function () {
            // This code will be called only in Android.
            console.log("Navigation button tapped!");
            _this.router.navigate(["timer"]);
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = false;
        this.canGoBack = this.router.canGoBackToPreviousPage();
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app-Home',
        templateUrl: 'Home/Home.component.html',
        styleUrls: ['Home/Home.component.css']
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        page_1.Page])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJIb21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRDtBQUNqRCxnQ0FBOEI7QUFDOUIsc0RBQThEO0FBUTlELElBQWEsYUFBYTtJQUl0Qix1QkFDWSxNQUF3QixFQUN4QixJQUFVO1FBRnRCLGlCQUdJO1FBRlEsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUxkLGNBQVMsR0FBRyxJQUFJLENBQUE7UUFhakIsYUFBUSxHQUFHO1lBQ2QsNENBQTRDO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUN6QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFBO0lBWEUsQ0FBQztJQUVKLGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFLENBQUE7SUFDMUQsQ0FBQztJQVFMLG9CQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCWSxhQUFhO0lBTHpCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO0tBQ3pDLENBQUM7cUNBTXNCLHlCQUFnQjtRQUNsQixXQUFJO0dBTmIsYUFBYSxDQW9CekI7QUFwQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSdcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInXG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtSG9tZScsXG4gICAgdGVtcGxhdGVVcmw6ICdIb21lL0hvbWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydIb21lL0hvbWUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByaXZhdGUgaXNMb2FkaW5nID0gdHJ1ZVxuICAgIHByaXZhdGUgY2FuR29CYWNrOiBib29sZWFuXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbkdvQmFjayA9IHRoaXMucm91dGVyLmNhbkdvQmFja1RvUHJldmlvdXNQYWdlKClcbiAgICB9XG5cbiAgICBwdWJsaWMgYnRuU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIGNhbGxlZCBvbmx5IGluIEFuZHJvaWQuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGltZXJcIl0pO1xuICAgIH1cblxufVxuIl19