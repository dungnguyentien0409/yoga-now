import { Component, ViewChild } from '@angular/core';
import { StudentService } from 'app/services/student.service';
import { StudentCols, Genders, StudentDisplayCols } from './student-dashboard.config';
import { cloneDeep } from 'lodash';
import { LoggerService } from 'app/services/logger.service';
import { DeviceService } from 'app/services/device.service';
import { map, switchMap } from 'rxjs/operators';
import { Subject, combineLatest, Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent } from 'app/layouts/admin-layout/base.component';
import { environment } from 'environments/environment';
import { MomentService } from 'app/services/moment.service';
import { CourseService } from 'app/services/course.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
  providers: [ConfirmationService, MessageService],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class StudentDashBoardComponent extends BaseComponent {

  cols = StudentCols;
  genders = Genders;
  displayCols = StudentDisplayCols;
  mode = 'Normal';

  displayDialog: boolean = false;
  displayNoteDialog: boolean = false;
  displayMembershipDialog: boolean = false;
  displayRegisterCourseDialog: boolean = false;
  displayCourseDialog: boolean = false;

  students = [];
  courses = [];
  targetStudent: any;
  students$: Subject<any[]> = new Subject();
  forceReload$: Subject<boolean> = new Subject();

  @ViewChild('dt', { static: false }) studentTable: Table;

  constructor(private studentService: StudentService,
    private courseService: CourseService,
    private momentService: MomentService,
    logger: LoggerService,
    deviceService: DeviceService,
    confirmationService: ConfirmationService,
    messageService: MessageService) {
    super(logger, deviceService, confirmationService, messageService);
  }

  onInit() {
    if (this.deviceService.isMobile()) {
      this.cols.pop();
    }

    this.logger.prefix = 'Student Dashboard';
    const subscription = this.loadData(this.forceReload$);
    this.subscriptions.push(subscription);
    this.forceReload$.next(true);
  }

  onRowSelect() {
    // this.isNewStudent = false;
    // this.targetStudent = cloneDeep(event.data);
    // this.displayDialog = true;
    // this.logger.log('On selecting student', this.targetStudent);
  }

  readonly getInitData = (): Observable<[any[], any[]]> => {
    return combineLatest([
      this.studentService.getStudents(),
      this.courseService.getAllCourses()
    ])
  }

  readonly extractInitData = ([students, courses]) => {
    students.forEach((student) => {
      student.notes.forEach(note => {
        note.date = this.momentService.format(note.createdAt);
      });

      student.registeredMembership = student.membership !== null;
      student.membershipExpire = student.registeredMembership ? this.momentService.nextYear(student.membership.createdAt) : null;
      student.registeredCourse = student.course !== null;
      student.courseExpire = student.registeredCourse && student.course.expireDate
        ? this.momentService.format(student.course.expireDate) : null;
    });

    return [students, courses];
  }

  loadData(source$: Subject<boolean>) {
    this.showWaiting();
    return source$.pipe(
      switchMap(this.getInitData),
      map(this.extractInitData),
    ).subscribe(([students, courses]) => {
      this.students = students;
      this.courses = courses;
      this.displayDialog = false;
      this.students$.next(this.students);
      setTimeout(() => {
        this.hideWaiting();
      }, 1000);
    }, (error) => {
      this.hideWaiting();
      this.handleError(error);
    });
  }

  addStudent(student) {
    this.showWaiting();
    const subscription = this.studentService.addStudent(student).subscribe(res => {
      this.students = [...this.students, res];
      this.displayDialog = false;
      this.students$.next(this.students);
      this.alignScrollHeader(this.studentTable, this.students);
      this.targetStudent = {};
      setTimeout(() => {
        this.hideWaiting();
        this.showSuccess('Add student successfully');
      }, 1000);
    }, (error) => {
      this.hideWaiting();
      this.handleError(error);
    });
    this.subscriptions.push(subscription);
  }

  deleteStudent(student) {
    this.confirmOperation(
      'Are you sure that you want to delete student permanently?',
      'Delete Confirmation',
      () => {
        this.showWaiting();
        const subscription = this.studentService.deleteStudent(student.id).subscribe(() => {
          this.students = this.students.filter(s => s.id !== student.id);
          this.students$.next(this.students);
          this.alignScrollHeader(this.studentTable, this.students);
          this.targetStudent = {};
          setTimeout(() => {
            this.hideWaiting();
            this.showSuccess('Delete student successfully');
          }, 1000);
        }, (error) => {
          this.hideWaiting();
          this.handleError(error);
        });
        this.subscriptions.push(subscription);
      }
    );
  }

  updateStudent(student) {
    this.showWaiting();
    this.studentService.updateStudent(student).subscribe(() => {
      this.forceReload$.next(true);
      this.displayDialog = false;
      this.targetStudent = {};
      this.showSuccess('Update student successfully');
    }, (error) => {
      this.hideWaiting();
      this.handleError(error);
    });
  }

  registerMembership(student) {
    this.confirmOperation(
      'Are you sure that you want to register membership for this student?',
      'Membership Confirmation',
      () => {
        this.showWaiting();
        const subscription = this.studentService.registerMembership(student.id).subscribe(res => {
          this.students.filter(s => s.id === student.id).forEach(s => {
            s.registeredMembership = true;
            s.membershipExpire = this.momentService.nextYear(res.membership.createdAt),
            s.therapyDates = res.therapyDates,
            s.membership = res.membership
          });
          this.students$.next(this.students);
          this.alignScrollHeader(this.studentTable, this.students);
          setTimeout(() => {
            this.hideWaiting();
            this.showSuccess('Register membership for student successfully');
          }, 1000);
        }, (error) => {
          this.hideWaiting();
          this.handleError(error);
        });
        this.subscriptions.push(subscription);
      }
    );
  }

  addNote(note) {
    this.showWaiting();
    const subscription = this.studentService.saveNote(this.targetStudent.id, note).subscribe((res) => {
      this.students.filter(s => s.id === this.targetStudent.id).forEach((s) => {
        res.date = this.momentService.format(res.createdAt);
        s.notes.push(res);
      });
      this.targetStudent = {};
      this.displayNoteDialog = false;
      setTimeout(() => {
        this.hideWaiting();
        this.showSuccess('Save notes for student successfully');
      }, 1000);
    }, (error) => {
      this.hideWaiting();
      this.handleError(error);
    });
    this.subscriptions.push(subscription);
  }

  updateNote(note) {
    this.showWaiting();
    const subscription = this.studentService.saveNote(this.targetStudent.id, note).subscribe((res) => {
      this.students.filter(s => s.id === this.targetStudent.id).forEach((s) => {
        s.notes.filter(n => n.id === res.id).forEach(n => {
          n.content = res.content;
        });
      });
      this.targetStudent = {};
      this.displayNoteDialog = false;
      setTimeout(() => {
        this.hideWaiting();
        this.showSuccess('Save notes for student successfully');
      }, 1000);
    }, (error) => {
      this.hideWaiting();
      this.handleError(error);
    });
    this.subscriptions.push(subscription);
  }

  registerFingerprint(student, times = environment.fingerprintRetryTimes) {
    if (times > 0) {
      this.showWaiting();
      setTimeout(() => {
        this.logger.log('Register Fingerprint', times);
        const subscription = this.studentService.isFingerprintRegistered(student.id).subscribe((data) => {
          if (!data) {
            this.registerFingerprint(student, --times);
          } else {
            this.hideWaiting();
            student.registeredFingerprint = true;
            this.targetStudent = {};
            this.showSuccess('Register fingerprint successfully');
          }
        }, (error) => {
          this.hideWaiting();
          this.handleError(error);
        });
        this.subscriptions.push(subscription);
      }, 10000);
    } else {
      this.hideWaiting();
      this.showError('Register fingerprint operation is time out! Try again');
    }
  }

  registerCourse({courseId, studentId}) {
    this.confirmOperation(
      'Are you sure that you want to register course for this student?',
      'Course Confirmation',
      () => {
        this.showWaiting();
        const subscription = this.courseService.registerCourse(courseId, studentId).subscribe(res => {
          this.students.filter(s => s.id === studentId).forEach(s => {
            s.registeredCourse = true;
            s.courseExpire = res.expireDate ? this.momentService.format(res.expireDate) : null;
            s.course = res;
          });
          this.students$.next(this.students);
          this.alignScrollHeader(this.studentTable, this.students);
          this.targetStudent = {};
          this.displayRegisterCourseDialog = false;
          setTimeout(() => {
            this.hideWaiting();
            this.showSuccess('Register course for student successfully');
          }, 1000);
        }, (error) => {
          this.hideWaiting();
          this.handleError(error);
        });

        this.subscriptions.push(subscription);
      }
    );
  }

  updateTherapyDate(studentId, res) {
    this.students.filter(s => s.id === studentId).forEach(s => {
      s.therapyDates.filter(d => d.id === res.id).forEach(d => {
        d.status = res.status;
        d.start = res.start;
        d.end = res.end;
        d.updatedAt = res.updatedAt;
      });
      this.targetStudent.therapyDates = [... s.therapyDates];
    });
    this.students$.next(this.students);
  }

  bookTherapyDate(data) {
    this.showWaiting();
    const subscription = this.studentService.bookTherapyDate(data.studentId, data.therapyId, data.start, data.end).subscribe((res) => {
      this.updateTherapyDate(data.studentId, res);
      setTimeout(() => {
        this.hideWaiting();
        this.showSuccess('Booked successfully');
      }, 1000);
    }, (error) => {
      this.hideWaiting();
      this.handleError(error);
    });

    this.subscriptions.push(subscription);
  }

  cancelTherapyDate(data) {
    this.showWaiting();
    const subscription = this.studentService.cancelTherapyDate(data.studentId, data.therapyId).subscribe((res) => {
      this.updateTherapyDate(data.studentId, res);
      setTimeout(() => {
        this.hideWaiting();
        this.showSuccess('Cancel successfully');
      }, 1000);
    }, (error) => {
      this.hideWaiting();
      this.handleError(error);
    });

    this.subscriptions.push(subscription);
  }

  completeTherapyDate(data) {
    this.showWaiting();
    const subscription = this.studentService.completeTherapyDate(data.studentId, data.therapyId).subscribe((res) => {
      this.updateTherapyDate(data.studentId, res);
      setTimeout(() => {
        this.hideWaiting();
        this.showSuccess('Complete successfully');
      }, 1000);
    }, (error) => {
      this.hideWaiting();
      this.handleError(error);
    });

    this.subscriptions.push(subscription);
  }

  noteTherapyDate(data) {
    this.showError('This feature is not impplemented yet');
  }

  showDialogToEdit(student) {
    this.targetStudent = cloneDeep(student);
    this.displayDialog = true;
    this.logger.log('Open dialog for editing student', this.targetStudent);
  }

  showDialogToAdd() {
    this.targetStudent = environment.initialNewStudent;
    this.displayDialog = true;
    this.logger.log('Open dialog for adding student', this.targetStudent);
  }

  showDialogToNote(student) {
    this.targetStudent = cloneDeep(student);
    this.displayNoteDialog = true;
    this.logger.log('Open dialog for noting about student', this.targetStudent);
  }

  showDialogToRegisterCourse(student) {
    this.targetStudent = cloneDeep(student);
    this.displayRegisterCourseDialog = true;
    this.logger.log('Open dialog for registering course', this.targetStudent);
  }

  showDialogToViewCourseInfo(student) {
    this.targetStudent = cloneDeep(student);
    this.displayCourseDialog = true;
    this.logger.log('Open dialog for viewing course info', this.targetStudent);
  }

  showDialogToViewMembershipInfo(student) {
    this.targetStudent = cloneDeep(student);
    this.displayMembershipDialog = true;
    this.logger.log('Open dialog for viewing membership info', this.targetStudent);
  }
}
