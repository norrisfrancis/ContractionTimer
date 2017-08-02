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
        /**
         * Sets timer properties
         * @param {string} detail - The name of the property.
         * @param {(number|string|Object)} value - The value being set.
         */
        this.setTimerProperty = function (detail, value) {
            if (!_.isUndefined(_this[detail])) {
                _this[detail] = value;
            }
        };
        /**
         * Sets contraction properties
         * @param {string} detail - The name of the property.
         * @param {(number|string|Object)} value - The value being set.
         */
        this.setContractionProperty = function (detail, value) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lci5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QywwQkFBNEI7QUFHNUIsSUFBYSxVQUFVO0lBQ3RCO1FBQUEsaUJBQWdCO1FBQ1QsZUFBVSxHQUFrQixDQUFDLENBQUM7UUFDM0Isb0JBQWUsR0FBVyxVQUFVLENBQUM7UUFFckMsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsdUJBQWtCLEdBQWtCLEVBQUUsQ0FBQztRQUN2QyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFnQixFQUFFLENBQUM7UUFDOUIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLDRCQUF1QixHQUFXLEtBQUssQ0FBQztRQUN4QyxrQkFBYSxHQUFXLEtBQUssQ0FBQztRQUM5Qix1QkFBa0IsR0FBVyxLQUFLLENBQUM7UUFDbkMsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBRXBDOzs7O1dBSUc7UUFDSSxxQkFBZ0IsR0FBRyxVQUFDLE1BQWMsRUFBRSxLQUFVO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDekIsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVEOzs7O1dBSUc7UUFDSSwyQkFBc0IsR0FBRyxVQUFDLE1BQWMsRUFBRSxLQUFVO1lBQ3ZELEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLENBQUMsQ0FBQTtJQWpDVyxDQUFDO0lBbUNqQixpQkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7QUFwQ1ksVUFBVTtJQUR0QixpQkFBVSxFQUFFOztHQUNBLFVBQVUsQ0FvQ3RCO0FBcENZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7Q29udHJhY3Rpb259IGZyb20gJy4vVGltZXIudHlwZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGltZXJTdG9yZSB7XG5cdGNvbnN0cnVjdG9yKCkge31cblx0cHVibGljIGFjdGl2ZVRpbWU6IHN0cmluZ3xudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBjb250cmFjdGlvblRpbWU6IHN0cmluZyA9ICcwMDowMDowMCc7XG4gICAgcHVibGljIHN0YXJ0VGltZTogRGF0ZTtcbiAgICBwdWJsaWMgY29udHJhY3Rpb25zOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBjb250cmFjdGlvbkhpc3Rvcnk6IENvbnRyYWN0aW9uW10gPSBbXTtcbiAgICBwdWJsaWMgY29udHJhY3Rpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgY29udHJhY3Rpb246IENvbnRyYWN0aW9uID0ge307XG4gICAgcHVibGljIHRpbWVycyA9IHt9O1xuICAgIHB1YmxpYyBsYXN0Q29udHJhY3Rpb25EdXJhdGlvbjogc3RyaW5nID0gJ04vQSc7XG4gICAgcHVibGljIHRpbWVTaW5jZUxhc3Q6IHN0cmluZyA9ICdOL0EnO1xuICAgIHB1YmxpYyBhdmVyYWdlVGltZUJldHdlZW46IHN0cmluZyA9ICdOL0EnO1xuICAgIHB1YmxpYyBsYXN0SW50ZW5zaXR5OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBhdmVyYWdlSW50ZW5zaXR5OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aW1lciBwcm9wZXJ0aWVzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRldGFpbCAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nfE9iamVjdCl9IHZhbHVlIC0gVGhlIHZhbHVlIGJlaW5nIHNldC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0VGltZXJQcm9wZXJ0eSA9IChkZXRhaWw6IHN0cmluZywgdmFsdWU6IGFueSkgPT4ge1xuICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQodGhpc1tkZXRhaWxdKSkge1xuICAgICAgICAgICAgdGhpc1tkZXRhaWxdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGNvbnRyYWN0aW9uIHByb3BlcnRpZXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGV0YWlsIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7KG51bWJlcnxzdHJpbmd8T2JqZWN0KX0gdmFsdWUgLSBUaGUgdmFsdWUgYmVpbmcgc2V0LlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRDb250cmFjdGlvblByb3BlcnR5ID0gKGRldGFpbDogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuY29udHJhY3Rpb25bZGV0YWlsXSA9IHZhbHVlO1xuICAgIH1cblxufVxuIl19