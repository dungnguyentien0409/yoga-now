import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getStudents(n: number = 100) {
    const students = [];

    for (let i = 0; i < n; i++) {
      students.push({
        id: 1000 + i,
        fullname: 'Nguyễn Minh Dũng',
        birthday: `${i % 28 + 1}/${i % 12 + 1}/1995`,
        phone: '123456789XXX',
        address: `66/72/${i} Orchird Road, P21, Q Bình Thạnh`,
        gender: i % 2 ? 'M' : 'F'
      })
    }

    return students;
  }



}
