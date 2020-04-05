import { Injectable } from '@angular/core';
import uuid from 'uuid/v4';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentApi: string;
  private therapyApi: string;

  constructor(private http: HttpClient) {
    this.studentApi = `${environment.rootApi}/students`;
    this.therapyApi = `${environment.rootApi}/therapy`;
  }

  getStudentsWithNotes(n: number = 100) {
    const students = [];
    let notes = null;
    for (let i = 0; i < n; i++) {
      notes = [];
      for (let j = 0; j < i % 10; j++) {
        notes.push({
          id: uuid(),
          date: `${i % 15 + j}/${i % 12 + 1}/2020`,
          content: 'back, shoulder, chest is recovered'
        })
      }

      students.push({
        id: 1000 + i,
        fullname: 'Nguyễn Minh Dũng',
        birthday: `${i % 28 + 1}/${i % 12 + 1}/1995`,
        phone: '123456789XXX',
        address: `66/72/${i} Orchird Road, P21, Q Bình Thạnh`,
        gender: i % 2 ? 'M' : 'F',
        notes: notes
      })
    }

    return students;
  }

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.studentApi);
  }

  addStudent(student): Observable<any> {
    return this.http.post<any>(this.studentApi, student);
  }

  deleteStudent(studentId): Observable<any> {
    return this.http.delete<any>(this.studentApi + `/${studentId}`);
  }

  updateStudent(student): Observable<any> {
    return this.http.put<any>(this.studentApi + `/${student.id}`, student);
  }

  isFingerprintRegistered(studentId): Observable<any> {
    return this.http.get<boolean>(this.studentApi + `/${studentId}/fingerPrint/isExists`);
  }

  saveNote(studentId: any, { id, content }: any): Observable<any> {
    return this.http.post<any>(this.studentApi + `/${studentId}/notes`, { noteId: id, content: content });
  }

  registerMembership(studentId: any): Observable<any> {
    return this.http.post<any>(this.studentApi + `/${studentId}/membership`, {});
  }

  bookTherapyDate(studentId: any, therapyId, start, end): Observable<any> {
    return this.http.put<any>(this.studentApi + `/${studentId}/membership/therapy/${therapyId}/book`, { start, end });
  }

  cancelTherapyDate(studentId: any, therapyId): Observable<any> {
    return this.http.put<any>(this.studentApi + `/${studentId}/membership/therapy/${therapyId}/cancel`, { });
  }

  completeTherapyDate(studentId: any, therapyId): Observable<any> {
    return this.http.put<any>(this.studentApi + `/${studentId}/membership/therapy/${therapyId}/complete`, { });
  }

  getAllTherapyDates(): Observable<any[]> {
    return this.http.get<any[]>(this.therapyApi);
  }
}
