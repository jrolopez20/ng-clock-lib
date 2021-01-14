import {NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {MainComponent} from './components/main/main.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ClockComponent} from './components/clock/clock.component';
import {StopwatchComponent} from './components/stopwatch/stopwatch.component';
import {CommonModule} from '@angular/common';
import {TimerComponent} from './components/timer/timer.component';
import {TimeFormatPipe} from './pipes/time-format.pipe';
import {InputToTimerDirective} from './directives/input-to-timer.directive';


@NgModule({
  declarations: [
      MainComponent,
      ClockComponent,
      StopwatchComponent,
      TimerComponent,
      TimeFormatPipe,
      InputToTimerDirective
  ],
  imports: [
      CommonModule,
      FlexLayoutModule,
      MaterialModule
  ],
  exports: [MainComponent]
})
export class ClockModule { }
