import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
    /**
     * Transform seconds in a time format
     * @param value Value in seconds
     * @param args
     */
    transform(value: any): string {

        return `${this.getHours(value)}:${this.getMinutes(value)}:${this.getSeconds(value)}`;
    }

    private getHours(value): string {
        const hours = Math.floor((value / 60) / 60);
        return `${this.paddingZero(hours)}${hours}`;
    }

    private getMinutes(value): string {
        const minutes = Math.floor(value / 60) % 60;
        return `${this.paddingZero(minutes)}${minutes}`;
    }

    private getSeconds(value): string {
        const seconds = value % 60;
        return `${this.paddingZero(seconds)}${seconds}`;
    }

    private paddingZero(time): string {
        return time < 10 ? '0' : '';
    }

}
