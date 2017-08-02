"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var timer_service_1 = require("../services/timer.service");
var timer_store_1 = require("../stores/timer.store");
var TimerComponent = (function () {
    function TimerComponent(timerService, timerStore) {
        var _this = this;
        this.timerService = timerService;
        this.timerStore = timerStore;
        this.isLoading = true;
        this.contracting = false;
        this.intensity = false;
        this.startContraction = function () {
            _this.contracting = true;
            _this.timerService.startContraction();
        };
        this.endContractionTimer = function () {
            _this.contracting = false;
            _this.timerService.endContractionTimer();
            _this.showIntensity();
        };
        this.endContraction = function () {
            _this.intensity = false;
            _this.contracting = false;
            _this.timerService.endContraction(true);
        };
        this.setIntensity = function (intensity) {
            _this.timerService.setIntensity(intensity);
            _this.intensity = false;
        };
        this.showIntensity = function () {
            _this.intensity = true;
        };
    }
    TimerComponent.prototype.ngOnInit = function () {
        this.timerService.initializeTimer();
    };
    return TimerComponent;
}());
TimerComponent = __decorate([
    core_1.Component({
        selector: 'app-Timer',
        templateUrl: 'Timer/Timer.component.html',
        styleUrls: ['Timer/Timer.component.css']
    }),
    __metadata("design:paramtypes", [timer_service_1.TimerService, timer_store_1.TimerStore])
], TimerComponent);
exports.TimerComponent = TimerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGltZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBR2pELDJEQUF1RDtBQUN2RCxxREFBaUQ7QUFhakQsSUFBYSxjQUFjO0lBS3ZCLHdCQUFtQixZQUEwQixFQUFTLFVBQXNCO1FBQTVFLGlCQUFpRjtRQUE5RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFTLGVBQVUsR0FBVixVQUFVLENBQVk7UUFKckUsY0FBUyxHQUFHLElBQUksQ0FBQTtRQUNoQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBUTNCLHFCQUFnQixHQUFHO1lBQ3RCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUE7UUFFTSx3QkFBbUIsR0FBRztZQUN6QixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixLQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDeEMsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQTtRQUVNLG1CQUFjLEdBQUc7WUFDcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsS0FBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFBO1FBRU0saUJBQVksR0FBRyxVQUFDLFNBQVM7WUFDNUIsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQyxDQUFBO1FBRU0sa0JBQWEsR0FBRztZQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDLENBQUE7SUE5QitFLENBQUM7SUFFakYsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDdkMsQ0FBQztJQTJCTCxxQkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7QUFwQ1ksY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztLQUMzQyxDQUFDO3FDQU1tQyw0QkFBWSxFQUFxQix3QkFBVTtHQUxuRSxjQUFjLENBb0MxQjtBQXBDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtUaW1lclNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL3RpbWVyLnNlcnZpY2UnO1xuaW1wb3J0IHtUaW1lclN0b3JlfSBmcm9tICcuLi9zdG9yZXMvdGltZXIuc3RvcmUnO1xuXG5pbnRlcmZhY2UgQ29udHJhY3Rpb24ge1xuICAgIHN0YXJ0VGltZTogbnVtYmVyO1xuICAgIGVuZFRpbWU6IG51bWJlcjtcbiAgICBkdXJhdGlvbjogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1UaW1lcicsXG4gICAgdGVtcGxhdGVVcmw6ICdUaW1lci9UaW1lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ1RpbWVyL1RpbWVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIGlzTG9hZGluZyA9IHRydWVcbiAgICBwdWJsaWMgY29udHJhY3Rpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaW50ZW5zaXR5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGltZXJTZXJ2aWNlOiBUaW1lclNlcnZpY2UsIHB1YmxpYyB0aW1lclN0b3JlOiBUaW1lclN0b3JlKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnRpbWVyU2VydmljZS5pbml0aWFsaXplVGltZXIoKVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydENvbnRyYWN0aW9uID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyYWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aW1lclNlcnZpY2Uuc3RhcnRDb250cmFjdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmRDb250cmFjdGlvblRpbWVyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyYWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGltZXJTZXJ2aWNlLmVuZENvbnRyYWN0aW9uVGltZXIoKTtcbiAgICAgICAgdGhpcy5zaG93SW50ZW5zaXR5KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGVuZENvbnRyYWN0aW9uID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmludGVuc2l0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbnRyYWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGltZXJTZXJ2aWNlLmVuZENvbnRyYWN0aW9uKHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJbnRlbnNpdHkgPSAoaW50ZW5zaXR5KSA9PiB7XG4gICAgICAgIHRoaXMudGltZXJTZXJ2aWNlLnNldEludGVuc2l0eShpbnRlbnNpdHkpO1xuICAgICAgICB0aGlzLmludGVuc2l0eSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93SW50ZW5zaXR5ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmludGVuc2l0eSA9IHRydWU7XG4gICAgfVxufVxuIl19