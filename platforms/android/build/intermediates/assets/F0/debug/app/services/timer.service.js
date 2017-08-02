"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var timer_store_1 = require("../stores/timer.store");
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
                _this.timerStore.setDetail('contractionTime', c);
            });
        };
        /**
         * Create a time between timer and execute a callback
         */
        this.startInBetweenTimer = function () {
            _this.createTimer('between', function (c) {
                _this.timerStore.setDetail('timeSinceLast', c);
            });
        };
        /**
         * Create the active time timer and execute a callback
         */
        this.startActiveTime = function () {
            _this.createTimer('active', function (c) {
                _this.timerStore.setDetail('activeTime', c);
            });
        };
        /**
         * Stop a timer and execute a callback
         * @param {string} timer - The name of the timer.
         * @callback callback - callback function to invoke.
         */
        this.convertDuration = function (durations) {
            console.log(durations, typeof durations);
            return moment.utc(moment.duration(durations).asMilliseconds()).format("HH:mm:ss");
        };
        /**
         * Initializes the contraction timer / store
         */
        this.initializeTimer = function () {
            _this.timerStore.setDetail('startTime', moment().format('MM-DD-YY h:mm A'));
            _this.startActiveTime();
            //this.startInBetweenTimer();
        };
        /**
         * Start a new contraction and update associated timer data
         */
        this.startContraction = function () {
            _this.startContractionTimer();
            _this.stopTimer('between');
            _this.calculateTimeBetween();
            _this.timerStore.setContractionDetail('startTime', moment());
        };
        /**
         * Stop a contraction and update associated timer data
         */
        this.endContractionTimer = function () {
            _this.stopTimer('contraction');
            _this.timerStore.setContractionDetail('time', _this.timerStore.contractionTime);
            _this.timerStore.setContractionDetail('endTime', moment());
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
            _this.timerStore.setDetail('contracting', false);
            _this.timerStore.setDetail('intensity', false);
            _this.timerStore.setDetail('contraction', {});
            _this.timerStore.setDetail('contractionTime', '00:00:00');
        };
        this.setIntensity = function (intensity) {
            _this.timerStore.setContractionDetail('intensity', intensity);
            _this.endContraction();
        };
        this.updateHistoryDetails = function () {
            _this.setLastContractionDuration();
            _this.setLastIntensity();
            _this.calculateAverageIntensity();
            _this.timeSince();
            _this.calculateAverageTime();
        };
        this.setLastContractionDuration = function () {
            _this.timerStore.setDetail('lastContractionDuration', _this.timerStore.contractionHistory[_this.timerStore.contractionHistory.length - 1].time);
        };
        this.setLastIntensity = function () {
            _this.timerStore.setDetail('lastIntensity', _this.timerStore.contractionHistory[_this.timerStore.contractionHistory.length - 1].intensity);
        };
        this.calculateAverageIntensity = function () {
            var avgIntensity = _this.timerStore.contractionHistory.reduce(function (p, c) { return p + c.intensity; }, 0) / _this.timerStore.contractionHistory.length;
            _this.timerStore.setDetail('averageIntensity', (avgIntensity / _this.timerStore.contractionHistory.length).toFixed(1));
        };
        this.timeSince = function () {
            if (_this.timerStore.contractionHistory.length >= 2) {
                var tempHistory = _this.timerStore.contractionHistory;
                var count = _this.timerStore.contractionHistory.length - 1;
                _this.timerStore.setDetail('timeSinceLast', tempHistory[count].startTime.diff(tempHistory[count - 1].endTime, 'hours') + ':' + tempHistory[count].startTime.diff(tempHistory[count - 1].endTime, 'minutes') + ':' + tempHistory[count].startTime.diff(tempHistory[count - 1].endTime, 'seconds'));
            }
        };
        this.calculateTimeBetween = function () {
            var timeBetween = (_this.timerStore.contractionHistory.length > 0) ? moment(_this.timerStore.contraction.Time).diff(moment(_this.timerStore.contractionHistory[_this.timerStore.contractionHistory.length - 1].startTime)) : _.clone(_this.timerStore.activeTime);
            _this.timerStore.setContractionDetail('between', moment.duration(timeBetween).asSeconds());
            _this.startInBetweenTimer();
        };
        this.calculateAverageTime = function () {
            var totalTime;
            var avgTime;
            // totalTime = this.timerStore.contractionHistory.reduce((x,y) => { moment.duration(x).asMilliseconds() + moment.duration(y.between).asMilliseconds()}, 0) / this.timerStore.contractionHistory.length;
            totalTime = _this.timerStore.contractionHistory.reduce(function (x, y) { return x + moment.duration(y.between).asMilliseconds(); }, 0) / _this.timerStore.contractionHistory.length;
            console.log('at', totalTime);
            avgTime = moment.duration(totalTime).asMilliseconds();
            _this.timerStore.setDetail('averageTimeBetween', moment.utc(avgTime * 1000).format('HH:mm:ss'));
        };
    }
    return TimerService;
}());
TimerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [timer_store_1.TimerStore])
], TimerService);
exports.TimerService = TimerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMscURBQWlEO0FBQ2pELDBCQUE0QjtBQUM1QiwrQkFBaUM7QUFHakMsSUFBYSxZQUFZO0lBQ3hCLHNCQUFtQixVQUFzQjtRQUF6QyxpQkFFQztRQUZrQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSXpDOzs7O1dBSU07UUFDSSxnQkFBVyxHQUFHLFVBQUMsSUFBSSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUM7WUFDckIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDO2dCQUN2QywyQkFBMkI7Z0JBQzNCLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDO2dCQUVuQix1REFBdUQ7Z0JBQ3ZELElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFZCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDWixDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0ksY0FBUyxHQUFHLFVBQUMsS0FBSyxFQUFFLFFBQVM7WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxhQUFhLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBRUQsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsUUFBUSxFQUFFLENBQUM7WUFDZixDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBRUY7O1dBRUc7UUFDSSwwQkFBcUIsR0FBRztZQUMzQixLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxVQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBRUQ7O1dBRUc7UUFDSSx3QkFBbUIsR0FBRztZQUN6QixLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVEOztXQUVHO1FBQ0ksb0JBQWUsR0FBRztZQUNyQixLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVEOzs7O1dBSUc7UUFDSSxvQkFBZSxHQUFHLFVBQUMsU0FBUztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLFNBQVMsQ0FBQyxDQUFBO1lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEYsQ0FBQyxDQUFBO1FBRUQ7O1dBRUc7UUFDSSxvQkFBZSxHQUFHO1lBQ3hCLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzNFLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2Qiw2QkFBNkI7UUFDOUIsQ0FBQyxDQUFBO1FBRUQ7O1dBRUc7UUFDSSxxQkFBZ0IsR0FBRztZQUN0QixLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLEtBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFBO1FBRUQ7O1dBRUc7UUFDSSx3QkFBbUIsR0FBRztZQUN6QixLQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUE7UUFFRDs7O1dBR0c7UUFDSSxtQkFBYyxHQUFHLFVBQUMsUUFBZ0I7WUFBaEIseUJBQUEsRUFBQSxnQkFBZ0I7WUFDeEMscUVBQXFFO1lBQ3JFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQ2hDLENBQUM7WUFDRSxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUE7UUFFRDs7O1dBR0c7UUFDSSxpQkFBWSxHQUFHLFVBQUMsV0FBVztZQUM5QixLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUE7UUFFRDs7V0FFRztRQUNJLHFCQUFnQixHQUFHO1lBQ3RCLEtBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDOUIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0MsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFBO1FBR00saUJBQVksR0FBRyxVQUFDLFNBQVM7WUFDNUIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0QsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQTtRQUVNLHlCQUFvQixHQUFHO1lBQzFCLEtBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFBO1lBQ2pDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUM7UUFFSywrQkFBMEIsR0FBRztZQUNoQyxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hKLENBQUMsQ0FBQTtRQUVNLHFCQUFnQixHQUFHO1lBQ3pCLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3hJLENBQUMsQ0FBQTtRQUVNLDhCQUF5QixHQUFHO1lBQy9CLElBQUksWUFBWSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFFLFVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBTSxPQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFmLENBQWUsRUFBRSxDQUFDLENBQUUsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztZQUMzSSxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFBO1FBQ3pILENBQUMsQ0FBQTtRQUVNLGNBQVMsR0FBRztZQUNmLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELElBQUksV0FBVyxHQUFRLEtBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUM7Z0JBQzFELElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDdEQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFFLEdBQUcsR0FBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsR0FBRSxHQUFHLEdBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqUyxDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBRU0seUJBQW9CLEdBQUc7WUFDMUIsSUFBSSxXQUFXLEdBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlQLEtBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUMxRixLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMvQixDQUFDLENBQUE7UUFFTSx5QkFBb0IsR0FBRztZQUMxQixJQUFJLFNBQVMsQ0FBQztZQUNkLElBQUksT0FBTyxDQUFDO1lBQ1osdU1BQXVNO1lBQ3ZNLFNBQVMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQS9DLENBQStDLEVBQUUsQ0FBQyxDQUFDLEdBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7WUFDaEssT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0IsT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsQ0FBQyxDQUFBO0lBckxKLENBQUM7SUF3TEYsbUJBQUM7QUFBRCxDQUFDLEFBM0xELElBMkxDO0FBM0xZLFlBQVk7SUFEeEIsaUJBQVUsRUFBRTtxQ0FFbUIsd0JBQVU7R0FEN0IsWUFBWSxDQTJMeEI7QUEzTFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaW1lclN0b3JlfSBmcm9tICcuLi9zdG9yZXMvdGltZXIuc3RvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUaW1lclNlcnZpY2Uge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdGltZXJTdG9yZTogVGltZXJTdG9yZSl7XG5cblx0fVxuXG5cdC8qKlxuICAgICAqIFN0YXJ0IGEgdGltZXIgYW5kIGV4ZWN1dGUgYSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHRpbWVyLlxuICAgICAqIEBjYWxsYmFjayBjYiAtIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlVGltZXIgPSAobmFtZSwgY2IpID0+IHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gbW9tZW50KCk7XG4gICAgICAgIHRoaXMudGltZXJTdG9yZS50aW1lcnNbbmFtZV0gPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBHZXQgdG9kYXlzIGRhdGUgYW5kIHRpbWVcbiAgICAgICAgICAgIGxldCBub3cgPSBtb21lbnQoKTtcblxuICAgICAgICAgICAgLy8gRmluZCB0aGUgZGlzdGFuY2UgYmV0d2VlbiBub3cgYW4gdGhlIGNvdW50IGRvd24gZGF0ZVxuICAgICAgICAgICAgbGV0IHRpbWVyID0gdGhpcy5jb252ZXJ0RHVyYXRpb24obm93LmRpZmYoc3RhcnQpKTtcbiAgICAgICAgICAgIGNiKHRpbWVyKTtcblxuICAgICAgICB9LCAxMDAwKVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTdG9wIGEgdGltZXIgYW5kIGV4ZWN1dGUgYSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lciAtIFRoZSBuYW1lIG9mIHRoZSB0aW1lci5cbiAgICAgKiBAY2FsbGJhY2sgY2FsbGJhY2sgLSBjYWxsYmFjayBmdW5jdGlvbiB0byBpbnZva2UuXG4gICAgICovXG4gICAgcHVibGljIHN0b3BUaW1lciA9ICh0aW1lciwgY2FsbGJhY2s/KSA9PiB7XG4gICAgICAgIGlmICghXy5pc1VuZGVmaW5lZCh0aGlzLnRpbWVyU3RvcmUudGltZXJzW3RpbWVyXSkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lclN0b3JlLnRpbWVyc1t0aW1lcl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIV8uaXNVbmRlZmluZWQoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhICBjb250cmFjdGlvbiB0aW1lciBhbmQgZXhlY3V0ZSBhIGNhbGxiYWNrXG4gICAgICovXG4gICAgcHVibGljIHN0YXJ0Q29udHJhY3Rpb25UaW1lciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVUaW1lcignY29udHJhY3Rpb24nLCAoYykgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lclN0b3JlLnNldERldGFpbCgnY29udHJhY3Rpb25UaW1lJywgYyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHRpbWUgYmV0d2VlbiB0aW1lciBhbmQgZXhlY3V0ZSBhIGNhbGxiYWNrXG4gICAgICovXG4gICAgcHVibGljIHN0YXJ0SW5CZXR3ZWVuVGltZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY3JlYXRlVGltZXIoJ2JldHdlZW4nLCAoYykgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lclN0b3JlLnNldERldGFpbCgndGltZVNpbmNlTGFzdCcsIGMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIGFjdGl2ZSB0aW1lIHRpbWVyIGFuZCBleGVjdXRlIGEgY2FsbGJhY2tcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhcnRBY3RpdmVUaW1lID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZVRpbWVyKCdhY3RpdmUnLCAoYykgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lclN0b3JlLnNldERldGFpbCgnYWN0aXZlVGltZScsIGMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9wIGEgdGltZXIgYW5kIGV4ZWN1dGUgYSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lciAtIFRoZSBuYW1lIG9mIHRoZSB0aW1lci5cbiAgICAgKiBAY2FsbGJhY2sgY2FsbGJhY2sgLSBjYWxsYmFjayBmdW5jdGlvbiB0byBpbnZva2UuXG4gICAgICovXG4gICAgcHVibGljIGNvbnZlcnREdXJhdGlvbiA9IChkdXJhdGlvbnMpID0+IHtcbiAgICBcdGNvbnNvbGUubG9nKGR1cmF0aW9ucywgdHlwZW9mIGR1cmF0aW9ucylcbiAgICAgICAgcmV0dXJuIG1vbWVudC51dGMobW9tZW50LmR1cmF0aW9uKGR1cmF0aW9ucykuYXNNaWxsaXNlY29uZHMoKSkuZm9ybWF0KFwiSEg6bW06c3NcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbnRyYWN0aW9uIHRpbWVyIC8gc3RvcmVcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdGlhbGl6ZVRpbWVyID0gKCkgPT4ge1xuICAgIFx0dGhpcy50aW1lclN0b3JlLnNldERldGFpbCgnc3RhcnRUaW1lJywgbW9tZW50KCkuZm9ybWF0KCdNTS1ERC1ZWSBoOm1tIEEnKSk7XG4gICAgXHR0aGlzLnN0YXJ0QWN0aXZlVGltZSgpO1xuICAgIFx0Ly90aGlzLnN0YXJ0SW5CZXR3ZWVuVGltZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBhIG5ldyBjb250cmFjdGlvbiBhbmQgdXBkYXRlIGFzc29jaWF0ZWQgdGltZXIgZGF0YVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGFydENvbnRyYWN0aW9uID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0Q29udHJhY3Rpb25UaW1lcigpO1xuICAgICAgICB0aGlzLnN0b3BUaW1lcignYmV0d2VlbicpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRpbWVCZXR3ZWVuKCk7XG4gICAgICAgIHRoaXMudGltZXJTdG9yZS5zZXRDb250cmFjdGlvbkRldGFpbCgnc3RhcnRUaW1lJywgbW9tZW50KCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3AgYSBjb250cmFjdGlvbiBhbmQgdXBkYXRlIGFzc29jaWF0ZWQgdGltZXIgZGF0YVxuICAgICAqL1xuICAgIHB1YmxpYyBlbmRDb250cmFjdGlvblRpbWVyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3BUaW1lcignY29udHJhY3Rpb24nKTtcbiAgICAgICAgdGhpcy50aW1lclN0b3JlLnNldENvbnRyYWN0aW9uRGV0YWlsKCd0aW1lJywgdGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uVGltZSk7XG4gICAgICAgIHRoaXMudGltZXJTdG9yZS5zZXRDb250cmFjdGlvbkRldGFpbCgnZW5kVGltZScsIG1vbWVudCgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbmQgYSBjb250cmFjdGlvblxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2FuY2VsZWQgLSBkZXRlcm1pbmVzIGlmIHRoZSBjdXJyZW5jdCBjb250cmFjdGlvbiBoYXMgYmVlbiBjYW5jZWxlZCBvciBpcyBjb21wbGV0ZWQuXG4gICAgICovXG4gICAgcHVibGljIGVuZENvbnRyYWN0aW9uID0gKGNhbmNlbGVkID0gZmFsc2UpID0+IHtcbiAgICBcdC8vSWYgdGhlIHRpbWVyIHdhcyBub3QgY2FuY2VsZWQgdGhlbiBwcm9jZXNzIHRoZSBjdXJyZW50IGNvbnRyYWN0aW9uLlxuICAgIFx0aWYgKCFjYW5jZWxlZCkge1xuICAgICAgICBcdHRoaXMuYWRkVG9IaXN0b3J5KHRoaXMudGltZXJTdG9yZS5jb250cmFjdGlvbik7XG4gICAgICAgIFx0dGhpcy51cGRhdGVIaXN0b3J5RGV0YWlscygpO1xuICAgIFx0fVxuICAgICAgICB0aGlzLnJlc2V0Q29udHJhY3Rpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBjb250cmFjdGlvbiB0byB0aGUgaGlzdG9yeSBvZiBjb250cmFjdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29udHJhY3Rpb24gLSBUaGUgY29udHJhY3Rpb24gYmVpbmcgYWRkZWQgdG8gdGhlIGhpc3RvcnkuXG4gICAgICovXG4gICAgcHVibGljIGFkZFRvSGlzdG9yeSA9IChjb250cmFjdGlvbikgPT4ge1xuICAgICAgICB0aGlzLnRpbWVyU3RvcmUuY29udHJhY3Rpb25IaXN0b3J5LnB1c2goY29udHJhY3Rpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgY29udHJhY3Rpb24gdGltZSB3aGVuIGNhbmNlbGVkLlxuICAgICAqL1xuICAgIHB1YmxpYyByZXNldENvbnRyYWN0aW9uID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3BUaW1lcignY29udHJhY3Rpb24nKTtcbiAgICAgICAgdGhpcy50aW1lclN0b3JlLnNldERldGFpbCgnY29udHJhY3RpbmcnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudGltZXJTdG9yZS5zZXREZXRhaWwoJ2ludGVuc2l0eScsIGZhbHNlKTtcbiAgICAgICAgdGhpcy50aW1lclN0b3JlLnNldERldGFpbCgnY29udHJhY3Rpb24nLCB7fSk7XG4gICAgICAgIHRoaXMudGltZXJTdG9yZS5zZXREZXRhaWwoJ2NvbnRyYWN0aW9uVGltZScsICcwMDowMDowMCcpO1xuICAgIH1cblxuXG4gICAgcHVibGljIHNldEludGVuc2l0eSA9IChpbnRlbnNpdHkpID0+IHtcbiAgICAgICAgdGhpcy50aW1lclN0b3JlLnNldENvbnRyYWN0aW9uRGV0YWlsKCdpbnRlbnNpdHknLCBpbnRlbnNpdHkpO1xuICAgICAgICB0aGlzLmVuZENvbnRyYWN0aW9uKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUhpc3RvcnlEZXRhaWxzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldExhc3RDb250cmFjdGlvbkR1cmF0aW9uKClcbiAgICAgICAgdGhpcy5zZXRMYXN0SW50ZW5zaXR5KCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQXZlcmFnZUludGVuc2l0eSgpO1xuICAgICAgICB0aGlzLnRpbWVTaW5jZSgpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUF2ZXJhZ2VUaW1lKCk7XG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXRMYXN0Q29udHJhY3Rpb25EdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgdGhpcy50aW1lclN0b3JlLnNldERldGFpbCgnbGFzdENvbnRyYWN0aW9uRHVyYXRpb24nLHRoaXMudGltZXJTdG9yZS5jb250cmFjdGlvbkhpc3RvcnlbdGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeS5sZW5ndGggLSAxXS50aW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TGFzdEludGVuc2l0eSA9ICgpID0+IHtcbiAgICBcdHRoaXMudGltZXJTdG9yZS5zZXREZXRhaWwoJ2xhc3RJbnRlbnNpdHknLCB0aGlzLnRpbWVyU3RvcmUuY29udHJhY3Rpb25IaXN0b3J5W3RoaXMudGltZXJTdG9yZS5jb250cmFjdGlvbkhpc3RvcnkubGVuZ3RoIC0gMV0uaW50ZW5zaXR5KVxuICAgIH1cblxuICAgIHB1YmxpYyBjYWxjdWxhdGVBdmVyYWdlSW50ZW5zaXR5ID0gKCkgPT4ge1xuICAgICAgICBsZXQgYXZnSW50ZW5zaXR5ID0gdGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeS5yZWR1Y2UoICggcCwgYyApID0+IHAgKyBjLmludGVuc2l0eSwgMCApIC8gdGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeS5sZW5ndGg7XG4gICAgICAgIHRoaXMudGltZXJTdG9yZS5zZXREZXRhaWwoJ2F2ZXJhZ2VJbnRlbnNpdHknLCAoYXZnSW50ZW5zaXR5IC8gdGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeS5sZW5ndGgpLnRvRml4ZWQoMSkgKVxuICAgIH1cblxuICAgIHB1YmxpYyB0aW1lU2luY2UgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyU3RvcmUuY29udHJhY3Rpb25IaXN0b3J5Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGxldCB0ZW1wSGlzdG9yeTogYW55ID0gdGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeTtcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgdGhpcy50aW1lclN0b3JlLnNldERldGFpbCgndGltZVNpbmNlTGFzdCcsIHRlbXBIaXN0b3J5W2NvdW50XS5zdGFydFRpbWUuZGlmZih0ZW1wSGlzdG9yeVtjb3VudCAtIDFdLmVuZFRpbWUsICdob3VycycpICsnOicrIHRlbXBIaXN0b3J5W2NvdW50XS5zdGFydFRpbWUuZGlmZih0ZW1wSGlzdG9yeVtjb3VudCAtIDFdLmVuZFRpbWUsICdtaW51dGVzJykgKyc6JysgdGVtcEhpc3RvcnlbY291bnRdLnN0YXJ0VGltZS5kaWZmKHRlbXBIaXN0b3J5W2NvdW50IC0gMV0uZW5kVGltZSwgJ3NlY29uZHMnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsY3VsYXRlVGltZUJldHdlZW4gPSAoKSA9PiB7XG4gICAgICAgIGxldCB0aW1lQmV0d2VlbiA9ICAodGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeS5sZW5ndGggPiAwKSA/IG1vbWVudCh0aGlzLnRpbWVyU3RvcmUuY29udHJhY3Rpb24uVGltZSkuZGlmZihtb21lbnQodGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeVt0aGlzLnRpbWVyU3RvcmUuY29udHJhY3Rpb25IaXN0b3J5Lmxlbmd0aCAtIDFdLnN0YXJ0VGltZSkpIDogXy5jbG9uZSh0aGlzLnRpbWVyU3RvcmUuYWN0aXZlVGltZSk7XG4gICAgICAgIHRoaXMudGltZXJTdG9yZS5zZXRDb250cmFjdGlvbkRldGFpbCgnYmV0d2VlbicsIG1vbWVudC5kdXJhdGlvbih0aW1lQmV0d2VlbikuYXNTZWNvbmRzKCkpO1xuICAgICAgICB0aGlzLnN0YXJ0SW5CZXR3ZWVuVGltZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsY3VsYXRlQXZlcmFnZVRpbWUgPSAoKSA9PiB7XG4gICAgICAgIGxldCB0b3RhbFRpbWU7XG4gICAgICAgIGxldCBhdmdUaW1lO1xuICAgICAgICAvLyB0b3RhbFRpbWUgPSB0aGlzLnRpbWVyU3RvcmUuY29udHJhY3Rpb25IaXN0b3J5LnJlZHVjZSgoeCx5KSA9PiB7IG1vbWVudC5kdXJhdGlvbih4KS5hc01pbGxpc2Vjb25kcygpICsgbW9tZW50LmR1cmF0aW9uKHkuYmV0d2VlbikuYXNNaWxsaXNlY29uZHMoKX0sIDApIC8gdGhpcy50aW1lclN0b3JlLmNvbnRyYWN0aW9uSGlzdG9yeS5sZW5ndGg7XG4gICAgICAgIHRvdGFsVGltZSA9IHRoaXMudGltZXJTdG9yZS5jb250cmFjdGlvbkhpc3RvcnkucmVkdWNlKCh4LHkpID0+IHggKyBtb21lbnQuZHVyYXRpb24oeS5iZXR3ZWVuKS5hc01pbGxpc2Vjb25kcygpLCAwKSAgLyB0aGlzLnRpbWVyU3RvcmUuY29udHJhY3Rpb25IaXN0b3J5Lmxlbmd0aDtcbiAgICAgICAgY29uc29sZS5sb2coJ2F0JywgdG90YWxUaW1lKTtcbiAgICAgICAgYXZnVGltZSA9IG1vbWVudC5kdXJhdGlvbih0b3RhbFRpbWUpLmFzTWlsbGlzZWNvbmRzKCk7XG4gICAgICAgIHRoaXMudGltZXJTdG9yZS5zZXREZXRhaWwoJ2F2ZXJhZ2VUaW1lQmV0d2VlbicsbW9tZW50LnV0YyhhdmdUaW1lKjEwMDApLmZvcm1hdCgnSEg6bW06c3MnKSk7XG4gICAgfVxuXG5cbn1cbiJdfQ==