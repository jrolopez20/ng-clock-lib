import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() {
    }

    formatDisplayTime(date: Date): string {
        return this.addLeadingZero(date.getHours()) +
            ':' +
            this.addLeadingZero(date.getMinutes()) +
            ':' +
            this.addLeadingZero(date.getSeconds());
    }

    private addLeadingZero(nr: number): string {
        let ret = '';
        if (nr < 10) {
            ret = '0';
        }

        ret += nr.toString();
        return ret;
    }
}
