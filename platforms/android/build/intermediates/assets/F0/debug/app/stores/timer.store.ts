import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class TimerStore {
	constructor(){}
	public activeTime = 0;
    public contractionTime = '00:00:00';
    public startTime;
    public contractions:number = 0;
    public contractionHistory: any[] = [];
    public contracting: boolean = false;
    public contraction: any = {};
    public timers = {};
    public lastContractionDuration = 'N/A';
    public timeSinceLast = 'N/A';
    public averageTimeBetween = 'N/A';
    public lastIntensity = 0;
    public averageIntensity= 0;

    public setDetail = (detail, value) => {
        if(!_.isUndefined(this[detail])) {
            this[detail] = value
        }
    }

    public setContractionDetail = (detail, value) => {
        this.contraction[detail] = value;
    }

}
