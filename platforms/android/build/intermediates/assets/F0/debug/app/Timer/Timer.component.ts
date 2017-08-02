import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash';
import * as moment from 'moment';
import {TimerService} from '../services/timer.service';
import {TimerStore} from '../stores/timer.store';

interface Contraction {
    startTime: number;
    endTime: number;
    duration: number;
}

@Component({
    selector: 'app-Timer',
    templateUrl: 'Timer/Timer.component.html',
    styleUrls: ['Timer/Timer.component.css']
})
export class TimerComponent implements OnInit {
    public isLoading = true
    public contracting: boolean = false;
    public intensity: boolean = false;

    constructor(public timerService: TimerService, public timerStore: TimerStore) { }

    ngOnInit() {
        this.timerService.initializeTimer()
    }

    public startContraction = () => {
        this.contracting = true;
        this.timerService.startContraction();
    }

    public endContractionTimer = () => {
        this.contracting = false;
        this.timerService.endContractionTimer();
        this.showIntensity();
    }

    public endContraction = () => {
        this.intensity = false;
        this.contracting = false;
        this.timerService.endContraction(true);
    }

    public setIntensity = (intensity) => {
        this.timerService.setIntensity(intensity);
        this.intensity = false;
    }

    public showIntensity = () => {
        this.intensity = true;
    }
}
