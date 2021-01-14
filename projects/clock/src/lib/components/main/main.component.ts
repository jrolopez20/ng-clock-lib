import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'lib-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    @Output() time = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    timeChange(value): void {
        this.time.emit(value);
    }
}
