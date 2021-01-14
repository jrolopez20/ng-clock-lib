import {Directive} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Directive({
    selector: '[libInputToTimer]'
})
export class InputToTimerDirective {

    private state = new BehaviorSubject({
        seconds: 0,
        minutes: 0,
        hours: 0,
        totalTime: 0
    });
    public obs$ = this.state.asObservable();

    updateState(value, command): void {
        let valToNumber = Number(value);
        if (valToNumber < 0) {
            valToNumber = 0;
        }
        const update = this.state.value;
        if (command === 'seconds') {
            update.seconds = valToNumber;
        }
        if (command === 'minutes') {
            update.minutes = valToNumber;
        }
        if (command === 'hours') {
            update.hours = valToNumber;
        }
        update.totalTime = this.calculateSeconds(update);
        this.state.next(update);
    }

    calculateSeconds(update): number {
        let totalTime = update.seconds;
        totalTime += update.minutes * 60;
        totalTime += (update.hours * 60) * 60;
        return totalTime;
    }

    constructor() {
    }

    getSeconds(): number {
        return this.state.value.seconds;
    }

    getMinutes(): number {
        return this.state.value.minutes;
    }

    getHours(): number {
        return this.state.value.hours;
    }

    getTotalSeconds(): number {
        return this.state.value.totalTime;
    }
}
