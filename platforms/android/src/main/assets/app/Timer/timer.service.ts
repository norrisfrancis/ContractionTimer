import { Injectable } from '@angular/core';
import { TimerStore } from './timer.store';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Contraction } from './Timer.type';

@Injectable()
export class TimerService {
	constructor(public timerStore: TimerStore) {

	}

	/**
	 * Start a timer and execute a callback
	 * @param {string} name - The name of the timer.
	 * @callback cb - callback function to invoke.
	 */
	public createTimer = (name: string, cb): void => {
		const start = moment();
		this.timerStore.timers[name] = setInterval(() => {
			// Get todays date and time
			const now = moment();

			// Find the distance between now an the count down date
			const timer = this.convertDuration(now.diff(start));
			cb(timer);

		}, 1000);
	}

    /**
     * Stop a timer and execute a callback
     * @param {string} timer - The name of the timer.
     * @callback callback - callback function to invoke.
     */
	public stopTimer = (timer: string, callback?): void => {
		if (!_.isUndefined(this.timerStore.timers[timer])) {
			clearInterval(this.timerStore.timers[timer]);
		}

		if (!_.isUndefined(callback)) {
			callback();
		}
	}

    /**
     * Create a  contraction timer and execute a callback
     */
	public startContractionTimer = (): void => {
		this.createTimer('contraction', (c): void => {
			this.timerStore.setTimerProperty('contractionTime', c);
		});
	}

    /**
     * Create a time between timer and execute a callback
     */
	public startInBetweenTimer = (): void => {
		this.createTimer('between', (c): void => {
			this.timerStore.setTimerProperty('timeSinceLast', c);
		});
	}

    /**
     * Create the active time timer and execute a callback
     */
	public startActiveTime = (): void => {
		this.createTimer('active', (c): void => {
			this.timerStore.setTimerProperty('activeTime', c);
		});
	}

    /**
     * Stop a timer and execute a callback
     * @param {string} timer - The name of the timer.
     * @callback callback - callback function to invoke.
     */
	public convertDuration = (durations: number): string => {
		return moment.utc(moment.duration(durations).asMilliseconds()).format('HH:mm:ss');
	}

    /**
     * Initializes the contraction timer / store
     */
	public initializeTimer = (): void => {
		this.timerStore.setTimerProperty('startTime', moment().format('MM-DD-YY h:mm A'));
		this.startActiveTime();
		this.startInBetweenTimer();
	}

    /**
     * Start a new contraction and update associated timer data
     */
	public startContraction = (): void => {
		this.startContractionTimer();
		this.stopTimer('between');
		this.calculateTimeBetween(this.timerStore.contraction, this.timerStore.contractionHistory);
		this.timerStore.setContractionProperty('startTime', moment());
	}

    /**
     * Stop a contraction and update associated timer data
     */
	public endContractionTimer = (): void => {
		this.stopTimer('contraction');
		this.timerStore.setContractionProperty('duration', this.timerStore.contractionTime);
		this.timerStore.setContractionProperty('endTime', moment());
	}

    /**
     * End a contraction
     * @param {boolean} canceled - determines if the currenct contraction has been canceled or is completed.
     */
	public endContraction = (canceled: boolean = false): void => {
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
	public addToHistory = (contraction: Contraction): void => {
		this.timerStore.contractionHistory.push(contraction);
	}

    /**
     * Resets the contraction time when canceled.
     */
	public resetContraction = (): void => {
		this.stopTimer('contraction');
		this.timerStore.setTimerProperty('contracting', false);
		this.timerStore.setTimerProperty('intensity', false);
		this.timerStore.setTimerProperty('contraction', {});
		this.timerStore.setTimerProperty('contractionTime', '00:00:00');
	}

	/**
     * Sets the contraction intensity then ends the contraction.
     */
	public setIntensity = (intensity): void => {
		this.timerStore.setContractionProperty('intensity', intensity);
		this.endContraction();
	}

	/**
     * Udpates the history and sets additional values
     */
	public updateHistoryDetails = (): void => {
		this.timerStore.setTimerProperty('lastContractionDuration', this.setLastContractionDuration(this.timerStore.contractionHistory));
		this.timerStore.setTimerProperty('lastIntensity', this.setLastIntensity(this.timerStore.contractionHistory))
		this.timerStore.setTimerProperty('averageIntensity', this.calculateAverageIntensity(this.timerStore.contractionHistory));
		this.timerStore.setTimerProperty('timeSinceLast', this.timeSince(this.timerStore.contractionHistory));
		this.timerStore.setTimerProperty('averageTimeBetween', this.calculateAverageTime(this.timerStore.contractionHistory));
	}

	/**
     * Sets the last contraction duration value.
     */
	public setLastContractionDuration = (history): number => {
		return history[history.length - 1].duration;
	}

	/**
     * Sets the last contraction intensity.
     */
	public setLastIntensity = (history): void => {
		return history[history.length - 1].intensity;
	}

	/**
     * Calculates the average intensity.
     */
	public calculateAverageIntensity = (history): string => {
		return (history.reduce((p, c) => p + c.intensity, 0) / history.length).toFixed(1);
	}

	/**
     * Calculate the time since last contraction.
     */
	public timeSince = (history): string => {
		if (history.length >= 2) {
			const count = history.length - 1;
			return history[count].startTime.diff(history[count - 1].endTime, 'hours') + ':' + history[count].startTime.diff(history[count - 1].endTime, 'minutes') + ':' + history[count].startTime.diff(history[count - 1].endTime, 'seconds');
		} else {
			return '0:00:00';
		}
	}

	/**
     * Calculate the time between recent contractions and restarts the in between timer.
     */
	public calculateTimeBetween = (currentContraction, history): void => {
		const timeBetween = (history.length > 0) ? moment(currentContraction.duration).diff(moment(history[history.length - 1].startTime)) : _.clone(this.timerStore.activeTime);
		this.timerStore.setContractionProperty('timeBetween', moment.duration(timeBetween).asSeconds());
		this.startInBetweenTimer();
	}

	/**
     * Calculates the average time between contractions.
     */
	public calculateAverageTime = (history): string => {
		const totalTime = history.reduce((x, y) => x + moment.duration(y.timeBetween).asMilliseconds(), 0) / history.length;
		const avgTime = moment.duration(totalTime).asMilliseconds();
		return moment.utc(avgTime * 1000).format('HH:mm:ss');
	}
}
