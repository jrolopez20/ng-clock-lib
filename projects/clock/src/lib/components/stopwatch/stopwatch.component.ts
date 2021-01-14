import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BehaviorSubject, interval, merge, of, Subject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'lib-stopwatch',
    templateUrl: './stopwatch.component.html',
    styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit, AfterViewInit {
    isRunning$ = new Subject<boolean | null>();
    toggle$: BehaviorSubject<boolean>;
    intervalObs$;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.toggle$ = new BehaviorSubject(false);

        this.intervalObs$ = merge(this.isRunning$).pipe(
            switchMap(isCounting => {
                if (isCounting === null) {
                    return of(null);
                }
                return isCounting ? interval(100) : of();
            }),
            map(x => {
                return Math.floor(x / 600) + ':' + Math.floor((x / 10) % 60) + ':' + (x % 100);
            })
        );
    }

    start(): void {
        this.isRunning$.next(true);
    }

    stop(): void {
        this.isRunning$.next(false);
    }

    restart(): void {
        this.isRunning$.next(null);
    }
}
