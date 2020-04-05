import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { MomentService } from 'app/services/moment.service';
import { Dialog } from 'primeng/dialog';
import { StudentService } from 'app/services/student.service';

@Component({
  selector: 'app-student-membership-dialog',
  templateUrl: './student-membership-dialog.component.html',
  styleUrls: ['./student-membership-dialog.component.scss']
})
export class StudentMembershipDialogComponent implements OnInit {

  private _visible: boolean;
  get visible() {
    return this._visible;
  }

  @Input()
  set visible(value: boolean) {
    this._visible = value;
    this.visibleChanged.next(value);
  }

  colors = [
    { label: 'Default', value: '#116fbf' },
    { label: '#55efc4', value: '#55efc4' },
    { label: '#81ecec', value: '#81ecec' },
    { label: '#74b9ff', value: '#74b9ff' },
    { label: '#00b894', value: '#00b894' },
    { label: '#00cec9', value: '#00cec9' },
    { label: '#0984e3', value: '#0984e3' },
    { label: '#a29bfe', value: '#a29bfe' },
    { label: '#6c5ce7', value: '#6c5ce7' },
    { label: '#ffeaa7', value: '#ffeaa7' },
    { label: '#fdcb6e', value: '#fdcb6e' },
    { label: '#b2bec3', value: '#b2bec3' },
    { label: '#fab1a0', value: '#fab1a0' },
    { label: '#e17055', value: '#e17055' },
    { label: '#d63031', value: '#d63031' }
  ];

  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() membership: any;
  @Output() onBookDate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancelDate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCompleteDate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onNoteDate: EventEmitter<any> = new EventEmitter<any>();
  showCalendar = false;
  bookedTheparyDates = [];
  targetTherapyDateId: string;
  events = [];
  isLoading = false;
  @ViewChild(Dialog, { static: false }) dialog;

  private _therapyDates: any[];
  get therapyDates() {
    return this._therapyDates;
  }

  @Input()
  set therapyDates(value: any[]) {
    console.log(value)
    this._therapyDates = value ? value : [];
    this.therapyDates.forEach(d => {
      d.start = d.start ? new Date(d.start) : null;
      d.end = d.end ? new Date(d.end) : null;
    });
  }

  constructor(private momentService: MomentService,
    private studenService: StudentService) { }

  ngOnInit() {
  }

  get expireDate() {
    return this.momentService.nextYear(this.membership.createdAt);
  }

  get remainDates() {
    return this.therapyDates.filter(d => d.status !== 'Done').length;
  }

  saveBookDate({start, end}) {
    this.showCalendar = false;
    this.onBookDate.emit({
      studentId: this.membership.studentId,
      therapyId: this.targetTherapyDateId,
      start: start.toISOString(),
      end: end.toISOString()
    });
    this.targetTherapyDateId = null;
  }

  bookDate(therapyDate) {
    this.targetTherapyDateId = therapyDate.id;
    this.isLoading = true;
    this.studenService.getAllTherapyDates().subscribe((res) => {
      this.bookedTheparyDates = res;
      const groupColors = {};
      this.events = res.map(r => {
        if (!groupColors[r.membershipId]) {
          groupColors[r.membershipId] = this.colors[Math.floor(Math.random() * (this.colors.length - 1))].value;
        }

        return {
          id: r.id,
          editable: false,
          start: r.start,
          end: r.end,
          groupId: r.membershipId,
          title: r.fullname + '\n' + r.phone,
          borderColor: groupColors[r.membershipId],
          backgroundColor: groupColors[r.membershipId]
        }
      });
      this.showCalendar = true;
      setTimeout(() => { this.dialog.center(); });
      this.isLoading = false;
    });
    // this.onBookDate.emit({
    //   studentId: this.membership.studentId,
    //   therapyId: therapyDate.id,
    //   start: moment().add(2, 'days').toISOString(),
    //   end: moment().add(2, 'days').add(2, 'hours').toISOString()
    // });
  }

  cancelDate(therapyDate) {
    this.onCancelDate.emit({
      studentId: this.membership.studentId,
      therapyId: therapyDate.id
    });
  }

  completeDate(therapyDate) {
    this.onCompleteDate.emit({
      studentId: this.membership.studentId,
      therapyId: therapyDate.id
    });
  }

  noteDate(therapyDate) {
    this.onNoteDate.emit({
      studentId: this.membership.studentId,
      therapyId: therapyDate.id
    });
  }
}
