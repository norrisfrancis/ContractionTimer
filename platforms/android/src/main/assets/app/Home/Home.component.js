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
            console.log('Navigation button tapped!');
            _this.router.navigate(['timer']);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJIb21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxnQ0FBK0I7QUFDL0Isc0RBQStEO0FBTy9ELElBQWEsYUFBYTtJQUl0Qix1QkFDWSxNQUF3QixFQUN4QixJQUFVO1FBRnRCLGlCQUdJO1FBRlEsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUxkLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFhbEIsYUFBUSxHQUFHO1lBQ2QsNENBQTRDO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUN6QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFBO0lBWEUsQ0FBQztJQUVKLGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDM0QsQ0FBQztJQVFMLG9CQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCWSxhQUFhO0lBTHpCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO0tBQ3pDLENBQUM7cUNBTXNCLHlCQUFnQjtRQUNsQixXQUFJO0dBTmIsYUFBYSxDQW9CekI7QUFwQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLUhvbWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnSG9tZS9Ib21lLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnSG9tZS9Ib21lLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIGlzTG9hZGluZyA9IHRydWU7XG4gICAgcHJpdmF0ZSBjYW5Hb0JhY2s6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZVxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FuR29CYWNrID0gdGhpcy5yb3V0ZXIuY2FuR29CYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYnRuU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIGNhbGxlZCBvbmx5IGluIEFuZHJvaWQuXG4gICAgICAgIGNvbnNvbGUubG9nKCdOYXZpZ2F0aW9uIGJ1dHRvbiB0YXBwZWQhJyk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsndGltZXInXSk7XG4gICAgfVxuXG59XG4iXX0=