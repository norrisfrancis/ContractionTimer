"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var TimerStore = (function () {
    function TimerStore() {
        var _this = this;
        this.activeTime = 0;
        this.contractionTime = '00:00:00';
        this.contractions = 0;
        this.contractionHistory = [];
        this.contracting = false;
        this.contraction = {};
        this.timers = {};
        this.lastContractionDuration = 'N/A';
        this.timeSinceLast = 'N/A';
        this.averageTimeBetween = 'N/A';
        this.lastIntensity = 0;
        this.averageIntensity = 0;
        this.setDetail = function (detail, value) {
            if (!_.isUndefined(_this[detail])) {
                _this[detail] = value;
            }
        };
        this.setContractionDetail = function (detail, value) {
            _this.contraction[detail] = value;
        };
    }
    return TimerStore;
}());
TimerStore = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], TimerStore);
exports.TimerStore = TimerStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lci5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QywwQkFBNEI7QUFHNUIsSUFBYSxVQUFVO0lBQ3RCO1FBQUEsaUJBQWU7UUFDUixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ1osb0JBQWUsR0FBRyxVQUFVLENBQUM7UUFFN0IsaUJBQVksR0FBVSxDQUFDLENBQUM7UUFDeEIsdUJBQWtCLEdBQVUsRUFBRSxDQUFDO1FBQy9CLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGdCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWiw0QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFDaEMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLHFCQUFnQixHQUFFLENBQUMsQ0FBQztRQUVwQixjQUFTLEdBQUcsVUFBQyxNQUFNLEVBQUUsS0FBSztZQUM3QixFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFBO1lBQ3hCLENBQUM7UUFDTCxDQUFDLENBQUE7UUFFTSx5QkFBb0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxLQUFLO1lBQ3hDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLENBQUMsQ0FBQTtJQXZCVSxDQUFDO0lBeUJoQixpQkFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksVUFBVTtJQUR0QixpQkFBVSxFQUFFOztHQUNBLFVBQVUsQ0EwQnRCO0FBMUJZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRpbWVyU3RvcmUge1xuXHRjb25zdHJ1Y3Rvcigpe31cblx0cHVibGljIGFjdGl2ZVRpbWUgPSAwO1xuICAgIHB1YmxpYyBjb250cmFjdGlvblRpbWUgPSAnMDA6MDA6MDAnO1xuICAgIHB1YmxpYyBzdGFydFRpbWU7XG4gICAgcHVibGljIGNvbnRyYWN0aW9uczpudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBjb250cmFjdGlvbkhpc3Rvcnk6IGFueVtdID0gW107XG4gICAgcHVibGljIGNvbnRyYWN0aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGNvbnRyYWN0aW9uOiBhbnkgPSB7fTtcbiAgICBwdWJsaWMgdGltZXJzID0ge307XG4gICAgcHVibGljIGxhc3RDb250cmFjdGlvbkR1cmF0aW9uID0gJ04vQSc7XG4gICAgcHVibGljIHRpbWVTaW5jZUxhc3QgPSAnTi9BJztcbiAgICBwdWJsaWMgYXZlcmFnZVRpbWVCZXR3ZWVuID0gJ04vQSc7XG4gICAgcHVibGljIGxhc3RJbnRlbnNpdHkgPSAwO1xuICAgIHB1YmxpYyBhdmVyYWdlSW50ZW5zaXR5PSAwO1xuXG4gICAgcHVibGljIHNldERldGFpbCA9IChkZXRhaWwsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmKCFfLmlzVW5kZWZpbmVkKHRoaXNbZGV0YWlsXSkpIHtcbiAgICAgICAgICAgIHRoaXNbZGV0YWlsXSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q29udHJhY3Rpb25EZXRhaWwgPSAoZGV0YWlsLCB2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyYWN0aW9uW2RldGFpbF0gPSB2YWx1ZTtcbiAgICB9XG5cbn1cbiJdfQ==