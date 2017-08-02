"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var timer_store_1 = require("./timer.store");
var _ = require("lodash");
var moment = require("moment");
var TimerService = (function () {
    function TimerService(timerStore) {
        var _this = this;
        this.timerStore = timerStore;
        /**
         * Start a timer and execute a callback
         * @param {string} name - The name of the timer.
         * @callback cb - callback function to invoke.
         */
        this.createTimer = function (name, cb) {
            var start = moment();
            _this.timerStore.timers[name] = setInterval(function () {
                // Get todays date and time
                var now = moment();
                // Find the distance between now an the count down date
                var timer = _this.convertDuration(now.diff(start));
                cb(timer);
            }, 1000);
        };
        /**
         * Stop a timer and execute a callback
         * @param {string} timer - The name of the timer.
         * @callback callback - callback function to invoke.
         */
        this.stopTimer = function (timer, callback) {
            if (!_.isUndefined(_this.timerStore.timers[timer])) {
                clearInterval(_this.timerStore.timers[timer]);
            }
            if (!_.isUndefined(callback)) {
                callback();
            }
        };
        /**
         * Create a  contraction timer and execute a callback
         */
        this.startContractionTimer = function () {
            _this.createTimer('contraction', function (c) {
                _this.timerStore.setTimerProperty('contractionTime', c);
            });
        };
        /**
         * Create a time between timer and execute a callback
         */
        this.startInBetweenTimer = function () {
            _this.createTimer('between', function (c) {
                _this.timerStore.setTimerProperty('timeSinceLast', c);
            });
        };
        /**
         * Create the active time timer and execute a callback
         */
        this.startActiveTime = function () {
            _this.createTimer('active', function (c) {
                _this.timerStore.setTimerProperty('activeTime', c);
            });
        };
        /**
         * Stop a timer and execute a callback
         * @param {string} timer - The name of the timer.
         * @callback callback - callback function to invoke.
         */
        this.convertDuration = function (durations) {
            return moment.utc(moment.duration(durations).asMilliseconds()).format('HH:mm:ss');
        };
        /**
         * Initializes the contraction timer / store
         */
        this.initializeTimer = function () {
            _this.timerStore.setTimerProperty('startTime', moment().format('MM-DD-YY h:mm A'));
            _this.startActiveTime();
            _this.startInBetweenTimer();
        };
        /**
         * Start a new contraction and update associated timer data
         */
        this.startContraction = function () {
            _this.startContractionTimer();
            _this.stopTimer('between');
            _this.calculateTimeBetween(_this.timerStore.contraction, _this.timerStore.contractionHistory);
            _this.timerStore.setContractionProperty('startTime', moment());
        };
        /**
         * Stop a contraction and update associated timer data
         */
        this.endContractionTimer = function () {
            _this.stopTimer('contraction');
            _this.timerStore.setContractionProperty('duration', _this.timerStore.contractionTime);
            _this.timerStore.setContractionProperty('endTime', moment());
        };
        /**
         * End a contraction
         * @param {boolean} canceled - determines if the currenct contraction has been canceled or is completed.
         */
        this.endContraction = function (canceled) {
            if (canceled === void 0) { canceled = false; }
            //If the timer was not canceled then process the current contraction.
            if (!canceled) {
                _this.addToHistory(_this.timerStore.contraction);
                _this.updateHistoryDetails();
            }
            _this.resetContraction();
        };
        /**
         * Add a contraction to the history of contractions
         * @param {Object} contraction - The contraction being added to the history.
         */
        this.addToHistory = function (contraction) {
            _this.timerStore.contractionHistory.push(contraction);
        };
        /**
         * Resets the contraction time when canceled.
         */
        this.resetContraction = function () {
            _this.stopTimer('contraction');
            _this.timerStore.setTimerProperty('contracting', false);
            _this.timerStore.setTimerProperty('intensity', false);
            _this.timerStore.setTimerProperty('contraction', {});
            _this.timerStore.setTimerProperty('contractionTime', '00:00:00');
        };
        /**
         * Sets the contraction intensity then ends the contraction.
         */
        this.setIntensity = function (intensity) {
            _this.timerStore.setContractionProperty('intensity', intensity);
            _this.endContraction();
        };
        /**
         * Udpates the history and sets additional values
         */
        this.updateHistoryDetails = function () {
            _this.timerStore.setTimerProperty('lastContractionDuration', _this.setLastContractionDuration(_this.timerStore.contractionHistory));
            _this.timerStore.setTimerProperty('lastIntensity', _this.setLastIntensity(_this.timerStore.contractionHistory));
            _this.timerStore.setTimerProperty('averageIntensity', _this.calculateAverageIntensity(_this.timerStore.contractionHistory));
            _this.timerStore.setTimerProperty('timeSinceLast', _this.timeSince(_this.timerStore.contractionHistory));
            _this.timerStore.setTimerProperty('averageTimeBetween', _this.calculateAverageTime(_this.timerStore.contractionHistory));
        };
        /**
         * Sets the last contraction duration value.
         */
        this.setLastContractionDuration = function (history) {
            return history[history.length - 1].duration;
        };
        /**
         * Sets the last contraction intensity.
         */
        this.setLastIntensity = function (history) {
            return history[history.length - 1].intensity;
        };
        /**
         * Calculates the average intensity.
         */
        this.calculateAverageIntensity = function (history) {
            return (history.reduce(function (p, c) { return p + c.intensity; }, 0) / history.length).toFixed(1);
        };
        /**
         * Calculate the time since last contraction.
         */
        this.timeSince = function (history) {
            if (history.length >= 2) {
                var count = history.length - 1;
                return history[count].startTime.diff(history[count - 1].endTime, 'hours') + ':' + history[count].startTime.diff(history[count - 1].endTime, 'minutes') + ':' + history[count].startTime.diff(history[count - 1].endTime, 'seconds');
            }
            else {
                return '0:00:00';
            }
        };
        /**
         * Calculate the time between recent contractions and restarts the in between timer.
         */
        this.calculateTimeBetween = function (currentContraction, history) {
            var timeBetween = (history.length > 0) ? moment(currentContraction.duration).diff(moment(history[history.length - 1].startTime)) : _.clone(_this.timerStore.activeTime);
            _this.timerStore.setContractionProperty('timeBetween', moment.duration(timeBetween).asSeconds());
            _this.startInBetweenTimer();
        };
        /**
         * Calculates the average time between contractions.
         */
        this.calculateAverageTime = function (history) {
            var totalTime = history.reduce(function (x, y) { return x + moment.duration(y.timeBetween).asMilliseconds(); }, 0) / history.length;
            var avgTime = moment.duration(totalTime).asMilliseconds();
            return moment.utc(avgTime * 1000).format('HH:mm:ss');
        };
    }
    return TimerService;
}());
TimerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [timer_store_1.TimerStore])
], TimerService);
exports.TimerService = TimerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQTJDO0FBQzNDLDBCQUE0QjtBQUM1QiwrQkFBaUM7QUFJakMsSUFBYSxZQUFZO0lBQ3hCLHNCQUFtQixVQUFzQjtRQUF6QyxpQkFFQztRQUZrQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSXpDOzs7O1dBSUc7UUFDSSxnQkFBVyxHQUFHLFVBQUMsSUFBWSxFQUFFLEVBQUU7WUFDckMsSUFBTSxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUM7WUFDdkIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDO2dCQUMxQywyQkFBMkI7Z0JBQzNCLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDO2dCQUVyQix1REFBdUQ7Z0JBQ3ZELElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFWCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVixDQUFDLENBQUE7UUFFRTs7OztXQUlHO1FBQ0MsY0FBUyxHQUFHLFVBQUMsS0FBYSxFQUFFLFFBQVM7WUFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxhQUFhLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENB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QUNyQyxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBbkQsQ0FBbUQsRUFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3BILElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUE7SUF2TUQsQ0FBQztJQXdNRixtQkFBQztBQUFELENBQUMsQUEzTUQsSUEyTUM7QUEzTVksWUFBWTtJQUR4QixpQkFBVSxFQUFFO3FDQUVtQix3QkFBVTtHQUQ3QixZQUFZLENBMk14QjtBQTNNWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVyU3RvcmUgfSBmcm9tICcuL3RpbWVyLnN0b3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgQ29udHJhY3Rpb24gfSBmcm9tICcuL1RpbWVyLnR5cGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGltZXJTZXJ2aWNlIHtcblx0Y29uc3RydWN0b3IocHVibGljIHRpbWVyU3RvcmU6IFRpbWVyU3RvcmUpIHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFN0YXJ0IGEgdGltZXIgYW5kIGV4ZWN1dGUgYSBjYWxsYmFja1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB0aW1lci5cblx0ICogQGNhbGxiYWNrIGNiIC0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gaW52b2tlLlxuXHQgKi9cblx0cHVibGljIGNyZWF0ZVRpbWVyID0gKG5hbWU6IHN0cmluZywgY2IpOiB2b2lkID0+IHtcblx0XHRjb25zdCBzdGFydCA9IG1vbWVudCgpO1xuXHRcdHRoaXMudGltZXJTdG9yZS50aW1lcnNbbmFtZV0gPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHQvLyBHZXQgdG9kYXlzIGRhdGUgYW5kIHRpbWVcblx0XHRcdGNvbnN0IG5vdyA9IG1vbWVudCgpO1xuXG5cdFx0XHQvLyBGaW5kIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIG5vdyBhbiB0aGUgY291bnQgZG93biBkYXRlXG5cdFx0XHRjb25zdCB0aW1lciA9IHRoaXMuY29udmVydER1cmF0aW9uKG5vdy5kaWZmKHN0YXJ0KSk7XG5cdFx0XHRjYih0aW1lcik7XG5cblx0XHR9LCAxMDAwKTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU3RvcCBhIHRpbWVyIGFuZCBleGVjdXRlIGEgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGltZXIgLSBUaGUgbmFtZSBvZiB0aGUgdGltZXIuXG4gICAgICogQGNhbGxiYWNrIGNhbGxiYWNrIC0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gaW52b2tlLlxuICAgICAqL1xuXHRwdWJsaWMgc3RvcFRpbWVyID0gKHRpbWVyOiBzdHJpbmcsIGNhbGxiYWNrPyk6IHZvaWQgPT4ge1xuXHRcdGlmICghXy5pc1VuZGVmaW5lZCh0aGlzLnRpbWVyU3RvcmUudGltZXJzW3RpbWVyXSkpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy50aW1lclN0b3JlLnRpbWVyc1t0aW1lcl0pO1xuXHRcdH1cblxuXHRcdGlmICghXy5pc1VuZGVmaW5lZChjYWxsYmFjaykpIHtcblx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0fVxuXHR9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSAgY29udHJhY3Rpb24gdGltZXIgYW5kIGV4ZWN1dGUgYSBjYWxsYmFja1xuICAgICAqL1xuXHRwdWJsaWMgc3RhcnRDb250cmFjdGlvblRpbWVyID0gKCk6IHZvaWQgPT4ge1xuXHRcdHRoaXMuY3JlYXRlVGltZXIoJ2NvbnRyYWN0aW9uJywgKGMpOiB2b2lkID0+IHtcblx0XHRcdHRoaXMudGltZXJTdG9yZS5zZXRUaW1lclByb3BlcnR5KCdjb250cmFjdGlvblRpbWUnLCBjKTtcblx0XHR9KTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgdGltZSBiZXR3ZWVuIHRpbWVyIGFuZCBleGVjdXRlIGEgY2FsbGJhY2tcbiAgICAgKi9cblx0cHVibGljIHN0YXJ0SW5CZXR3ZWVuVGltZXIgPSAoKTogdm9pZCA9PiB7XG5cdFx0dGhpcy5jcmVhdGVUaW1lcignYmV0d2VlbicsIChjKTogdm9pZCA9PiB7XG5cdFx0XHR0aGlzLnRpbWVyU3RvcmUuc2V0VGltZXJQcm9wZXJ0eSgndGltZVNpbmNlTGFzdCcsIGMpO1xuXHRcdH0pO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIGFjdGl2ZSB0aW1lIHRpbWVyIGFuZCBleGVjdXRlIGEgY2FsbGJhY2tcbiAgICAgKi9cblx0cHVibGljIHN0YXJ0QWN0aXZlVGltZSA9ICgpOiB2b2lkID0+IHtcblx0XHR0aGlzLmNyZWF0ZVRpbWVyKCdhY3RpdmUnLCAoYyk6IHZvaWQgPT4ge1xuXHRcdFx0dGhpcy50aW1lclN0b3JlLnNldFRpbWVyUHJvcGVydHkoJ2FjdGl2ZVRpbWUnLCBjKTtcblx0XHR9KTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU3RvcCBhIHRpbWVyIGFuZCBleGVjdXRlIGEgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGltZXIgLSBUaGUgbmFtZSBvZiB0aGUgdGltZXIuXG4gICAgICogQGNhbGxiYWNrIGNhbGxiYWNrIC0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gaW52b2tlLlxuICAgICAqL1xuXHRwdWJsaWMgY29udmVydER1cmF0aW9uID0gKGR1cmF0aW9uczogbnVtYmVyKTogc3RyaW5nID0+IHtcblx0XHRyZXR1cm4gbW9tZW50LnV0Yyhtb21lbnQuZHVyYXRpb24oZHVyYXRpb25zKS5hc01pbGxpc2Vjb25kcygpKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBjb250cmFjdGlvbiB0aW1lciAvIHN0b3JlXG4gICAgICovXG5cdHB1YmxpYyBpbml0aWFsaXplVGltZXIgPSAoKTogdm9pZCA9PiB7XG5cdFx0dGhpcy50aW1lclN0b3JlLnNldFRpbWVyUHJvcGVydHkoJ3N0YXJ0VGltZScsIG1vbWVudCgpLmZvcm1hdCgnTU0tREQtWVkgaDptbSBBJykpO1xuXHRcdHRoaXMuc3RhcnRBY3RpdmVUaW1lKCk7XG5cdFx0dGhpcy5zdGFydEluQmV0d2VlblRpbWVyKCk7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGEgbmV3IGNvbnRyYWN0aW9uIGFuZCB1cGRhdGUgYXNzb2NpYXRlZCB0aW1lciBkYXRhXG4gICAgICovXG5cdHB1YmxpYyBzdGFydENvbnRyYWN0aW9uID0gKCk6IHZvaWQgPT4ge1xuXHRcdHRoaXMuc3RhcnRDb250cmFjdGlvblRpbWVyKCk7XG5cdFx0dGhpcy5zdG9wVGltZXIoJ2JldHdlZW4nKTtcblx0XHR0aGlzLmNhbGN1bGF0ZVRpbWVCZXR3ZWVuKHRoaXMudGltZXJTdG9yZS5jb250cmFjdGlvbiwgdGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeSk7XG5cdFx0dGhpcy50aW1lclN0b3JlLnNldENvbnRyYWN0aW9uUHJvcGVydHkoJ3N0YXJ0VGltZScsIG1vbWVudCgpKTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU3RvcCBhIGNvbnRyYWN0aW9uIGFuZCB1cGRhdGUgYXNzb2NpYXRlZCB0aW1lciBkYXRhXG4gICAgICovXG5cdHB1YmxpYyBlbmRDb250cmFjdGlvblRpbWVyID0gKCk6IHZvaWQgPT4ge1xuXHRcdHRoaXMuc3RvcFRpbWVyKCdjb250cmFjdGlvbicpO1xuXHRcdHRoaXMudGltZXJTdG9yZS5zZXRDb250cmFjdGlvblByb3BlcnR5KCdkdXJhdGlvbicsIHRoaXMudGltZXJTdG9yZS5jb250cmFjdGlvblRpbWUpO1xuXHRcdHRoaXMudGltZXJTdG9yZS5zZXRDb250cmFjdGlvblByb3BlcnR5KCdlbmRUaW1lJywgbW9tZW50KCkpO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBFbmQgYSBjb250cmFjdGlvblxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2FuY2VsZWQgLSBkZXRlcm1pbmVzIGlmIHRoZSBjdXJyZW5jdCBjb250cmFjdGlvbiBoYXMgYmVlbiBjYW5jZWxlZCBvciBpcyBjb21wbGV0ZWQuXG4gICAgICovXG5cdHB1YmxpYyBlbmRDb250cmFjdGlvbiA9IChjYW5jZWxlZDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCA9PiB7XG5cdFx0Ly9JZiB0aGUgdGltZXIgd2FzIG5vdCBjYW5jZWxlZCB0aGVuIHByb2Nlc3MgdGhlIGN1cnJlbnQgY29udHJhY3Rpb24uXG5cdFx0aWYgKCFjYW5jZWxlZCkge1xuXHRcdFx0dGhpcy5hZGRUb0hpc3RvcnkodGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uKTtcblx0XHRcdHRoaXMudXBkYXRlSGlzdG9yeURldGFpbHMoKTtcblx0XHR9XG5cdFx0dGhpcy5yZXNldENvbnRyYWN0aW9uKCk7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNvbnRyYWN0aW9uIHRvIHRoZSBoaXN0b3J5IG9mIGNvbnRyYWN0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb250cmFjdGlvbiAtIFRoZSBjb250cmFjdGlvbiBiZWluZyBhZGRlZCB0byB0aGUgaGlzdG9yeS5cbiAgICAgKi9cblx0cHVibGljIGFkZFRvSGlzdG9yeSA9IChjb250cmFjdGlvbjogQ29udHJhY3Rpb24pOiB2b2lkID0+IHtcblx0XHR0aGlzLnRpbWVyU3RvcmUuY29udHJhY3Rpb25IaXN0b3J5LnB1c2goY29udHJhY3Rpb24pO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGNvbnRyYWN0aW9uIHRpbWUgd2hlbiBjYW5jZWxlZC5cbiAgICAgKi9cblx0cHVibGljIHJlc2V0Q29udHJhY3Rpb24gPSAoKTogdm9pZCA9PiB7XG5cdFx0dGhpcy5zdG9wVGltZXIoJ2NvbnRyYWN0aW9uJyk7XG5cdFx0dGhpcy50aW1lclN0b3JlLnNldFRpbWVyUHJvcGVydHkoJ2NvbnRyYWN0aW5nJywgZmFsc2UpO1xuXHRcdHRoaXMudGltZXJTdG9yZS5zZXRUaW1lclByb3BlcnR5KCdpbnRlbnNpdHknLCBmYWxzZSk7XG5cdFx0dGhpcy50aW1lclN0b3JlLnNldFRpbWVyUHJvcGVydHkoJ2NvbnRyYWN0aW9uJywge30pO1xuXHRcdHRoaXMudGltZXJTdG9yZS5zZXRUaW1lclByb3BlcnR5KCdjb250cmFjdGlvblRpbWUnLCAnMDA6MDA6MDAnKTtcblx0fVxuXG5cdC8qKlxuICAgICAqIFNldHMgdGhlIGNvbnRyYWN0aW9uIGludGVuc2l0eSB0aGVuIGVuZHMgdGhlIGNvbnRyYWN0aW9uLlxuICAgICAqL1xuXHRwdWJsaWMgc2V0SW50ZW5zaXR5ID0gKGludGVuc2l0eSk6IHZvaWQgPT4ge1xuXHRcdHRoaXMudGltZXJTdG9yZS5zZXRDb250cmFjdGlvblByb3BlcnR5KCdpbnRlbnNpdHknLCBpbnRlbnNpdHkpO1xuXHRcdHRoaXMuZW5kQ29udHJhY3Rpb24oKTtcblx0fVxuXG5cdC8qKlxuICAgICAqIFVkcGF0ZXMgdGhlIGhpc3RvcnkgYW5kIHNldHMgYWRkaXRpb25hbCB2YWx1ZXNcbiAgICAgKi9cblx0cHVibGljIHVwZGF0ZUhpc3RvcnlEZXRhaWxzID0gKCk6IHZvaWQgPT4ge1xuXHRcdHRoaXMudGltZXJTdG9yZS5zZXRUaW1lclByb3BlcnR5KCdsYXN0Q29udHJhY3Rpb25EdXJhdGlvbicsIHRoaXMuc2V0TGFzdENvbnRyYWN0aW9uRHVyYXRpb24odGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeSkpO1xuXHRcdHRoaXMudGltZXJTdG9yZS5zZXRUaW1lclByb3BlcnR5KCdsYXN0SW50ZW5zaXR5JywgdGhpcy5zZXRMYXN0SW50ZW5zaXR5KHRoaXMudGltZXJTdG9yZS5jb250cmFjdGlvbkhpc3RvcnkpKVxuXHRcdHRoaXMudGltZXJTdG9yZS5zZXRUaW1lclByb3BlcnR5KCdhdmVyYWdlSW50ZW5zaXR5JywgdGhpcy5jYWxjdWxhdGVBdmVyYWdlSW50ZW5zaXR5KHRoaXMudGltZXJTdG9yZS5jb250cmFjdGlvbkhpc3RvcnkpKTtcblx0XHR0aGlzLnRpbWVyU3RvcmUuc2V0VGltZXJQcm9wZXJ0eSgndGltZVNpbmNlTGFzdCcsIHRoaXMudGltZVNpbmNlKHRoaXMudGltZXJTdG9yZS5jb250cmFjdGlvbkhpc3RvcnkpKTtcblx0XHR0aGlzLnRpbWVyU3RvcmUuc2V0VGltZXJQcm9wZXJ0eSgnYXZlcmFnZVRpbWVCZXR3ZWVuJywgdGhpcy5jYWxjdWxhdGVBdmVyYWdlVGltZSh0aGlzLnRpbWVyU3RvcmUuY29udHJhY3Rpb25IaXN0b3J5KSk7XG5cdH1cblxuXHQvKipcbiAgICAgKiBTZXRzIHRoZSBsYXN0IGNvbnRyYWN0aW9uIGR1cmF0aW9uIHZhbHVlLlxuICAgICAqL1xuXHRwdWJsaWMgc2V0TGFzdENvbnRyYWN0aW9uRHVyYXRpb24gPSAoaGlzdG9yeSk6IG51bWJlciA9PiB7XG5cdFx0cmV0dXJuIGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAxXS5kdXJhdGlvbjtcblx0fVxuXG5cdC8qKlxuICAgICAqIFNldHMgdGhlIGxhc3QgY29udHJhY3Rpb24gaW50ZW5zaXR5LlxuICAgICAqL1xuXHRwdWJsaWMgc2V0TGFzdEludGVuc2l0eSA9IChoaXN0b3J5KTogdm9pZCA9PiB7XG5cdFx0cmV0dXJuIGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAxXS5pbnRlbnNpdHk7XG5cdH1cblxuXHQvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBhdmVyYWdlIGludGVuc2l0eS5cbiAgICAgKi9cblx0cHVibGljIGNhbGN1bGF0ZUF2ZXJhZ2VJbnRlbnNpdHkgPSAoaGlzdG9yeSk6IHN0cmluZyA9PiB7XG5cdFx0cmV0dXJuIChoaXN0b3J5LnJlZHVjZSgocCwgYykgPT4gcCArIGMuaW50ZW5zaXR5LCAwKSAvIGhpc3RvcnkubGVuZ3RoKS50b0ZpeGVkKDEpO1xuXHR9XG5cblx0LyoqXG4gICAgICogQ2FsY3VsYXRlIHRoZSB0aW1lIHNpbmNlIGxhc3QgY29udHJhY3Rpb24uXG4gICAgICovXG5cdHB1YmxpYyB0aW1lU2luY2UgPSAoaGlzdG9yeSk6IHN0cmluZyA9PiB7XG5cdFx0aWYgKGhpc3RvcnkubGVuZ3RoID49IDIpIHtcblx0XHRcdGNvbnN0IGNvdW50ID0gaGlzdG9yeS5sZW5ndGggLSAxO1xuXHRcdFx0cmV0dXJuIGhpc3RvcnlbY291bnRdLnN0YXJ0VGltZS5kaWZmKGhpc3RvcnlbY291bnQgLSAxXS5lbmRUaW1lLCAnaG91cnMnKSArICc6JyArIGhpc3RvcnlbY291bnRdLnN0YXJ0VGltZS5kaWZmKGhpc3RvcnlbY291bnQgLSAxXS5lbmRUaW1lLCAnbWludXRlcycpICsgJzonICsgaGlzdG9yeVtjb3VudF0uc3RhcnRUaW1lLmRpZmYoaGlzdG9yeVtjb3VudCAtIDFdLmVuZFRpbWUsICdzZWNvbmRzJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAnMDowMDowMCc7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICAgICogQ2FsY3VsYXRlIHRoZSB0aW1lIGJldHdlZW4gcmVjZW50IGNvbnRyYWN0aW9ucyBhbmQgcmVzdGFydHMgdGhlIGluIGJldHdlZW4gdGltZXIuXG4gICAgICovXG5cdHB1YmxpYyBjYWxjdWxhdGVUaW1lQmV0d2VlbiA9IChjdXJyZW50Q29udHJhY3Rpb24sIGhpc3RvcnkpOiB2b2lkID0+IHtcblx0XHRjb25zdCB0aW1lQmV0d2VlbiA9IChoaXN0b3J5Lmxlbmd0aCA+IDApID8gbW9tZW50KGN1cnJlbnRDb250cmFjdGlvbi5kdXJhdGlvbikuZGlmZihtb21lbnQoaGlzdG9yeVtoaXN0b3J5Lmxlbmd0aCAtIDFdLnN0YXJ0VGltZSkpIDogXy5jbG9uZSh0aGlzLnRpbWVyU3RvcmUuYWN0aXZlVGltZSk7XG5cdFx0dGhpcy50aW1lclN0b3JlLnNldENvbnRyYWN0aW9uUHJvcGVydHkoJ3RpbWVCZXR3ZWVuJywgbW9tZW50LmR1cmF0aW9uKHRpbWVCZXR3ZWVuKS5hc1NlY29uZHMoKSk7XG5cdFx0dGhpcy5zdGFydEluQmV0d2VlblRpbWVyKCk7XG5cdH1cblxuXHQvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBhdmVyYWdlIHRpbWUgYmV0d2VlbiBjb250cmFjdGlvbnMuXG4gICAgICovXG5cdHB1YmxpYyBjYWxjdWxhdGVBdmVyYWdlVGltZSA9IChoaXN0b3J5KTogc3RyaW5nID0+IHtcblx0XHRjb25zdCB0b3RhbFRpbWUgPSBoaXN0b3J5LnJlZHVjZSgoeCwgeSkgPT4geCArIG1vbWVudC5kdXJhdGlvbih5LnRpbWVCZXR3ZWVuKS5hc01pbGxpc2Vjb25kcygpLCAwKSAvIGhpc3RvcnkubGVuZ3RoO1xuXHRcdGNvbnN0IGF2Z1RpbWUgPSBtb21lbnQuZHVyYXRpb24odG90YWxUaW1lKS5hc01pbGxpc2Vjb25kcygpO1xuXHRcdHJldHVybiBtb21lbnQudXRjKGF2Z1RpbWUgKiAxMDAwKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG5cdH1cbn1cbiJdfQ==