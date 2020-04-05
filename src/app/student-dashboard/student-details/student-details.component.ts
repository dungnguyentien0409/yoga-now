import { Component, OnInit, Input } from '@angular/core';
import { NoteCols, Genders } from '../student-dashboard.config';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  noteCols = NoteCols;
  genders = Genders;

  @Input() student: any;

  constructor() { }

  ngOnInit() {
  }
}
