import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Genders } from '../student-dashboard.config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'app/services/student.service';
import { LoggerService } from 'app/services/logger.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-student-summary-dialog',
  templateUrl: './student-summary-dialog.component.html',
  styleUrls: ['./student-summary-dialog.component.scss']
})
export class StudentSummaryDialogComponent implements OnInit {

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
  @Output() onAddStudent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onUpdateStudent: EventEmitter<any> = new EventEmitter<any>();

  private _student: any;
  get student() {
    return this._student;
  }

  @Input()
  set student(value: any) {
    this._student = value ? value : {};
    this.createForm();
  }

  genders = Genders;
  studentForm: FormGroup;
  get f() { return this.studentForm.controls; }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  createForm() {
    this.studentForm = this.formBuilder.group({
      'fullname': [this.student.fullname, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      'birthday': [this.student.birthday, [Validators.required]],
      'phone': [this.student.phone, [Validators.required, Validators.maxLength(15)]],
      'address': [this.student.address, [Validators.required, Validators.maxLength(100)]],
      'gender': [this.student.gender, [Validators.required]],
      'email': [this.student.email, [Validators.required, Validators.email]],
    });
  }

  add() {
    if (this.studentForm.valid) {
      const newStudent = cloneDeep(this.student);
      newStudent.birthday = (typeof newStudent.birthday === 'string') ? newStudent.birthday : newStudent.birthday.toLocaleDateString();
      this.onAddStudent.emit(newStudent);
    }
  }

  save() {
    if (this.studentForm.valid) {
      const student = cloneDeep(this.student);
      student.birthday = (typeof student.birthday === 'string') ? student.birthday : student.birthday.toLocaleDateString();
      this.onUpdateStudent.emit(student);
    }
  }
}
