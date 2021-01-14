import {AfterViewInit, Component, OnInit} from '@angular/core';
import {interval, merge, of, Subject} from 'rxjs';
import {mapTo, scan, switchMap} from 'rxjs/operators';
import {InputToTimerDirective} from '../../directives/input-to-timer.directive';

@Component({
    selector: 'lib-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit {
    isRunning$ = new Subject<boolean | null>();
    intervalObs$;
    min = 0;
    max = 0;

    constructor(public d: InputToTimerDirective) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.init();
    }

    init(): void {
        const zero$ = new Subject();

        const stateChange$ = this.d.obs$.pipe(mapTo(null));

        this.intervalObs$ = merge(this.isRunning$, stateChange$, zero$).pipe(
            switchMap(isCounting => {
                if (isCounting === null) {
                    return of(null);
                }
                return isCounting ? interval(1000) : of();
            }),
            scan<number>((accumulatedValue, currentValue) => {
                if (accumulatedValue === 0 && currentValue !== null) {
                    zero$.next(null);
                    return accumulatedValue;
                }
                if (currentValue === null || !accumulatedValue) {
                    return this.d.getTotalSeconds();
                }
                return --accumulatedValue;
            })
        );


        merge(this.isRunning$, zero$).pipe(
            switchMap(isCounting => {
                const random = () => {
                    const value = (this.min * 1000) + (Math.floor((Math.random() * (this.max + 1 - this.min))) * 1000);
                    return value;
                };
                if (isCounting === null) {
                    return of(null);
                }
                return isCounting ? interval(1000) : of();
            }),
        ).subscribe(console.log);
    }

    start(): void {
        this.isRunning$.next(true);
    }

    pause(): void {
        this.isRunning$.next(false);
    }

    restart(): void {
        this.isRunning$.next(null);
    }

}
