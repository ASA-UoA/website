import {Component, input, OnInit} from '@angular/core';
import {CountdownComponent, CountdownConfig} from "ngx-countdown";

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [
    CountdownComponent
  ],
  template: '@if (config){<countdown #cd [config]="config" />}',
  styles: ``
})
export class CustomCountdownComponent implements OnInit {
  timeLeft = input.required<number>();

  config?: CountdownConfig;

  ngOnInit() {
    this.config = {
      leftTime: this.timeLeft(),
      format: 'DD HH:mm:ss',
      formatDate: ({date, formatStr}) => {
        let duration = Number(date || 0);

        return CountdownTimeUnits.reduce((current, [name, unit]) => {
          if (current.indexOf(name) !== -1) {
            const v = Math.floor(duration / unit);
            duration -= v * unit;
            return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
              // When days is empty
              if (name === 'D' && v <= 0) {
                return '';
              }
              return v.toString().padStart(match.length, '0');
            });
          }
          return current;
        }, formatStr);
      },
    };
  }

}
