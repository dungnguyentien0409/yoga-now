import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MomentService } from 'app/services/moment.service';
import * as moment from 'moment';

@Component({
  selector: 'app-student-course-dialog',
  templateUrl: './student-course-dialog.component.html',
  styleUrls: ['./student-course-dialog.component.scss']
})
export class StudentCourseDialogComponent implements OnInit {

  private _visible: boolean;
  get visible() {
    return this._visible;
  }

  @Input()
  set visible(value: boolean) {
    this._visible = value;
    this.visibleChanged.next(value);
  }

  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() course: any;
  @Input() sessions: any;

  sessionCols = [
    { field: 'No', header: 'No', width: '10%' },
    { field: 'Date', header: 'Date', width: '30%' },
    { field: 'Period', header: 'Period', width: '30%' },
    { field: 'Check-in', header: 'Check-in', width: '30%' },
  ];

  constructor(private momentService: MomentService) { }

  ngOnInit() {
    this.sessions = [];
    for (let i = 0; i < 8; i++) {
      this.sessions.push({
        date: moment().subtract(i, 'days').local().format('DD/MM/YYYY'),
        startTime: moment().subtract(i, 'days').subtract(1, 'hours').local().format('hh:mm a'),
        endTime: moment().subtract(i, 'days').local().format('hh:mm a'),
        checkinTime: moment().subtract(i, 'days').subtract(1, 'hours').local().format('hh:mm a')
      });
    }
  }

  get expireDate() {
    return this.course && this.course.expireDate ? this.momentService.format(this.course.expireDate) : 'Not yet';
  }

  get remainDays() {
    const usedDays = this.sessions ? this.sessions.length : 0;
    return this.course.isUnlimited ? 'Unlimited' : this.course.noOfDays - usedDays;
  }

  get totalDays() {
    return this.course.isUnlimited ? 'Unlimited' : this.course.noOfDays;
  }

  get firstCheckin() {
    return this.course && this.course.expireDate
      ? this.momentService.backToPeriods(this.course.expireDate, this.course.duration, 'DD/MM/YYYY hh:mm a') : 'Not yet';
  }

  get registerDate() {
    return this.momentService.format(this.course.createdAt);
  }

  get periods() {
    return  this.course.isUnlimited
      ? `Unlimited / ${this.course.duration} days` : `${this.course.noOfDays} ps / ${this.course.duration} days`;
  }
}
