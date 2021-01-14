import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {UtilService} from '../../services/util.service';

@Component({
    selector: 'lib-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
    @Output() time = new EventEmitter<string>();
    public displayTime: string;
    private subscription: Subscription;


    constructor(private utilService: UtilService) {
    }

    ngOnInit(): void {
        const source$ = interval(1000);
        this.subscription = source$.subscribe(() => {
            this.setTime();
        });
    }

    private setTime(): void {
        const now = new Date();
        this.displayTime = this.utilService.formatDisplayTime(now);
        this.time.emit(this.displayTime);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
