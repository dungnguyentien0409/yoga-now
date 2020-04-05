import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { CourseService } from 'app/services/course.service';
import { Subject } from 'rxjs';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-register-course-dialog',
  templateUrl: './register-course-dialog.component.html',
  styleUrls: ['./register-course-dialog.component.scss']
})
export class RegisterCourseDialogComponent implements OnInit, OnChanges, AfterViewInit {

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
  @Output() onRegister: EventEmitter<any> = new EventEmitter<any>();
  @Input() student;

  private _courses: any;
  get courses() {
    return this._courses;
  }

  @Input()
  set courses(value: any) {
    this._courses = value ? value : [];
  }

  courses$: Subject<any[]> = new Subject();
  selectedCourse: any;
  @ViewChild(Dialog, { static: false }) dialog;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: any): void {
  }

  ngAfterViewInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    if (this.student && this.student.id) {
      const isMembership = this.student.membership !== null;
      this.selectedCourse = null;
      this.courses$.next(this.courses.filter(c => c.forMembership === isMembership));
      window.setTimeout(() => { this.dialog.center(); });
    }
  }

  save() {
    if (this.selectedCourse) {
      this.onRegister.emit({courseId: this.selectedCourse, studentId: this.student.id});
    }
  }
}
