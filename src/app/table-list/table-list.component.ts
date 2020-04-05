import { Component, OnInit } from '@angular/core';
import { StudentsService } from './students.service';
import {cloneDeep} from 'lodash';
declare const $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  cols = [
    { field: 'id', header: 'Id', width: '10%' },
    { field: 'fullname', header: 'Fullname', width: '21%' },
    { field: 'birthday', header: 'DOB', width: '11%' },
    { field: 'phone', header: 'Phone', width: '13%' },
    { field: 'address', header: 'Address', width: '37%' },
    { field: 'gender', header: 'Sex', width: '8%' },
  ];

  noteCols = [
    { field: 'date', header: 'Date', width: '25%' },
    { field: 'content', header: 'Content', width: '75%' }
  ]

  genders = [
    { label: 'All', value: null },
    { label: 'M', value: 'M' },
    { label: 'F', value: 'F' }
  ];

  students = [];
  notes = [
    { date: '23/12/2019', content: 'back is healed'},
    { date: '23/11/2019', content: 'pain in back'},
    { date: '23/10/2019', content: 'pain in back & shoulder'},
    { date: '23/10/2019', content: 'pain in back & shoulder'},
    { date: '23/10/2019', content: 'pain in back & shoulder'},
    { date: '23/10/2019', content: 'pain in back & shoulder \n sdfsfsdfsdfsdfs \n sdfsdfdfdfdfdfdfdfdfdf'},
  ];
  selectedStudent: any = null;

  isNewStudent: boolean;
  targetStudent: any;
  displayDialog: boolean;

  constructor(private service: StudentsService) { }

  ngOnInit() {
    this.students = this.service.getStudents();

    if (this.isMobileMenu()) {
      this.cols.pop();
    }
  }

  onRowSelect(event) {
    this.isNewStudent = false;
    this.targetStudent = cloneDeep(event.data);
    this.displayDialog = true;
    console.log('select', this.targetStudent)
  }

  showDialogToAdd() {
    this.isNewStudent = true;
    this.targetStudent = {};
    this.displayDialog = true;
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};
}
