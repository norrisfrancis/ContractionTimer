import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Contraction} from './Timer.type';
@Injectable()
export class TimerStore {
	constructor() {}
	public activeTime: string|number = 0;
    public contractionTime: string = '00:00:00';
    public startTime: Date;
    public contractions: number = 0;
    public contractionHistory: Contraction[] = [];
    public contracting: boolean = false;
    public contraction: Contraction = {};
    public timers = {};
    public lastContractionDuration: string = 'N/A';
    public timeSinceLast: string = 'N/A';
    public averageTimeBetween: string = 'N/A';
    public lastIntensity: number = 0;
    public averageIntensity: number = 0;

    /**
     * Sets timer properties
     * @param {string} detail - The name of the property.
     * @param {(number|string|Object)} value - The value being set.
     */
    public setTimerProperty = (detail: string, value: any) => {
        if (!_.isUndefined(this[detail])) {
            this[detail] = value;
        }
    }

    /**
     * Sets contraction properties
     * @param {string} detail - The name of the property.
     * @param {(number|string|Object)} value - The value being set.
     */
    public setContractionProperty = (detail: string, value: any) => {
        this.contraction[detail] = value;
    }

}
