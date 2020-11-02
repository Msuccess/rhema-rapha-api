import { PipeTransform } from '@nestjs/common';
import * as moment from 'moment';

export class DatePipe implements PipeTransform {
  private buildDateTimeObject(time: string, date: Date) {
    const d = moment(date)
      .format('YYYY-MM-DD')
      .split('-')
      .map(i => +i);
    let t = [];
    if (time.includes('PM')) {
      t = time
        .replace('PM', '')
        .trim()
        .split(':')
        .map(i => +i);
      t[0] = t[0] + 12;
    } else {
      t = time
        .replace('AM', '')
        .trim()
        .split(':')
        .map(i => +i);
    }

    const dt = new Date(d[0], d[1] - 1, d[2], t[0], t[1]);
    return dt;
  }

  transform(value: any) {
    if (value.date) {
      value.date = this.buildDateTimeObject(value.appointmentTime, value.date);
      return value;
    }
    return value;
  }
}
