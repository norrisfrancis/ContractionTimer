import {Injectable} from '@angular/core';
import {TimerStore} from '../stores/timer.store';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class TimerService {
	constructor(public timerStore: TimerStore){

	}

	/**
     * Start a timer and execute a callback
     * @param {string} name - The name of the timer.
     * @callback cb - callback function to invoke.
     */
    public createTimer = (name, cb) => {
        let start = moment();
        this.timerStore.timers[name] = setInterval(() => {
            // Get todays date and time
            let now = moment();

            // Find the distance between now an the count down date
            let timer = this.convertDuration(now.diff(start));
            cb(timer);

        }, 1000)
    };

    /**
     * Stop a timer and execute a callback
     * @param {string} timer - The name of the timer.
     * @callback callback - callback function to invoke.
     */
    public stopTimer = (timer, callback?) => {
        if (!_.isUndefined(this.timerStore.timers[timer])) {
            clearInterval(this.timerStore.timers[timer]);
        }

        if(!_.isUndefined(callback)) {
            callback();
        }
    };

    /**
     * Create a  contraction timer and execute a callback
     */
    public startContractionTimer = () => {
        this.createTimer('contraction', (c) => {
            this.timerStore.setDetail('contractionTime', c);
        });
    }

    /**
     * Create a time between timer and execute a callback
     */
    public startInBetweenTimer = () => {
        this.createTimer('between', (c) => {
            this.timerStore.setDetail('timeSinceLast', c);
        });
    }

    /**
     * Create the active time timer and execute a callback
     */
    public startActiveTime = () => {
        this.createTimer('active', (c) => {
            this.timerStore.setDetail('activeTime', c);
        });
    }

    /**
     * Stop a timer and execute a callback
     * @param {string} timer - The name of the timer.
     * @callback callback - callback function to invoke.
     */
    public convertDuration = (durations) => {
    	console.log(durations, typeof durations)
        return moment.utc(moment.duration(durations).asMilliseconds()).format("HH:mm:ss");
    }

    /**
     * Initializes the contraction timer / store
     */
    public initializeTimer = () => {
    	this.timerStore.setDetail('startTime', moment().format('MM-DD-YY h:mm A'));
    	this.startActiveTime();
    	//this.startInBetweenTimer();
    }

    /**
     * Start a new contraction and update associated timer data
     */
    public startContraction = () => {
        this.startContractionTimer();
        this.stopTimer('between');
        this.calculateTimeBetween();
        this.timerStore.setContractionDetail('startTime', moment());
    }

    /**
     * Stop a contraction and update associated timer data
     */
    public endContractionTimer = () => {
        this.stopTimer('contraction');
        this.timerStore.setContractionDetail('time', this.timerStore.contractionTime);
        this.timerStore.setContractionDetail('endTime', moment());
    }

    /**
     * End a contraction
     * @param {boolean} canceled - determines if the currenct contraction has been canceled or is completed.
     */
    public endContraction = (canceled = false) => {
    	//If the timer was not canceled then process the current contraction.
    	if (!canceled) {
        	this.addToHistory(this.timerStore.contraction);
        	this.updateHistoryDetails();
    	}
        this.resetContraction();
    }

    /**
     * Add a contraction to the history of contractions
     * @param {Object} contraction - The contraction being added to the history.
     */
    public addToHistory = (contraction) => {
        this.timerStore.contractionHistory.push(contraction);
    }

    /**
     * Resets the contraction time when canceled.
     */
    public resetContraction = () => {
        this.stopTimer('contraction');
        this.timerStore.setDetail('contracting', false);
        this.timerStore.setDetail('intensity', false);
        this.timerStore.setDetail('contraction', {});
        this.timerStore.setDetail('contractionTime', '00:00:00');
    }


    public setIntensity = (intensity) => {
        this.timerStore.setContractionDetail('intensity', intensity);
        this.endContraction();
    }

    public updateHistoryDetails = () => {
        this.setLastContractionDuration()
        this.setLastIntensity();
        this.calculateAverageIntensity();
        this.timeSince();
        this.calculateAverageTime();
    };

    public setLastContractionDuration = () => {
        this.timerStore.setDetail('lastContractionDuration',this.timerStore.contractionHistory[this.timerStore.contractionHistory.length - 1].time);
    }

    public setLastIntensity = () => {
    	this.timerStore.setDetail('lastIntensity', this.timerStore.contractionHistory[this.timerStore.contractionHistory.length - 1].intensity)
    }

    public calculateAverageIntensity = () => {
        let avgIntensity = this.timerStore.contractionHistory.reduce( ( p, c ) => p + c.intensity, 0 ) / this.timerStore.contractionHistory.length;
        this.timerStore.setDetail('averageIntensity', (avgIntensity / this.timerStore.contractionHistory.length).toFixed(1) )
    }

    public timeSince = () => {
        if (this.timerStore.contractionHistory.length >= 2) {
        let tempHistory: any = this.timerStore.contractionHistory;
        let count = this.timerStore.contractionHistory.length - 1;
            this.timerStore.setDetail('timeSinceLast', tempHistory[count].startTime.diff(tempHistory[count - 1].endTime, 'hours') +':'+ tempHistory[count].startTime.diff(tempHistory[count - 1].endTime, 'minutes') +':'+ tempHistory[count].startTime.diff(tempHistory[count - 1].endTime, 'seconds'));
        }
    }

    public calculateTimeBetween = () => {
        let timeBetween =  (this.timerStore.contractionHistory.length > 0) ? moment(this.timerStore.contraction.Time).diff(moment(this.timerStore.contractionHistory[this.timerStore.contractionHistory.length - 1].startTime)) : _.clone(this.timerStore.activeTime);
        this.timerStore.setContractionDetail('between', moment.duration(timeBetween).asSeconds());
        this.startInBetweenTimer();
    }

    public calculateAverageTime = () => {
        let totalTime;
        let avgTime;
        // totalTime = this.timerStore.contractionHistory.reduce((x,y) => { moment.duration(x).asMilliseconds() + moment.duration(y.between).asMilliseconds()}, 0) / this.timerStore.contractionHistory.length;
        totalTime = this.timerStore.contractionHistory.reduce((x,y) => x + moment.duration(y.between).asMilliseconds(), 0)  / this.timerStore.contractionHistory.length;
        console.log('at', totalTime);
        avgTime = moment.duration(totalTime).asMilliseconds();
        this.timerStore.setDetail('averageTimeBetween',moment.utc(avgTime*1000).format('HH:mm:ss'));
    }


}
