import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() { }

  nextYear(dateStr, format = 'DD/MM/YYYY') {
    // const date = new Date(dateStr);
    // date.setFullYear(date.getFullYear() + 1);
    // return date.toLocaleDateString();

    return moment(dateStr).add(1, 'years').local().format(format);
  }

  format(dateStr, format = 'DD/MM/YYYY') {
    return moment(dateStr).local().format(format);
  }

  backToPeriods(dateStr, periods = 30, format = 'DD/MM/YYYY') {
    return moment(dateStr).subtract(periods, 'days').local().format(format);
  }
}
