import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courseApi: string;
  private registrationApi: string;

  constructor(private http: HttpClient) {
    this.courseApi = `${environment.rootApi}/courses`;
    this.registrationApi = `${environment.rootApi}/registrations`;
  }

  getAllCourses(): Observable<any[]>  {
    return this.http.get<any[]>(this.courseApi);
  }

  registerCourse(courseId, studentId): Observable<any>  {
    return this.http.post<any>(this.registrationApi, {courseId, studentId});
  }
}
