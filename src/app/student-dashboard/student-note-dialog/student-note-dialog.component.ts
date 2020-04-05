import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NoteCols } from '../student-dashboard.config';

@Component({
  selector: 'app-student-note-dialog',
  templateUrl: './student-note-dialog.component.html',
  styleUrls: ['./student-note-dialog.component.scss']
})
export class StudentNoteDialogComponent implements OnInit {

  noteCols = NoteCols;
  @Input() studentId: string;
  note: any = {};

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

  private _notes: any[];
  get notes() {
    return this._notes;
  }

  @Input()
  set notes(value: any[]) {
    this._notes = value ? value : [];
    this.notes.sort((a, b) => this.getTime(b.createdAt) - this.getTime(a.createdAt));

    this.note = {};
    if (this.notes.length > 0) {
      const todayNotes = this.notes.filter(n => this.isToday(n.date));
      if (todayNotes.length > 0) {
        this.note = todayNotes[0];
      }
    }
    console.log(this.note);
  }

  @Output() onAddNote: EventEmitter<any> = new EventEmitter<any>();
  @Output() onUpdateNote: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.onAddNote.emit(this.note);
  }

  save() {
    this.onUpdateNote.emit(this.note);
  }

  isToday(dateStr: string): boolean {
    return dateStr === (new Date()).toLocaleDateString();
  }

  private getTime(dateStr?: Date) {
    return dateStr != null ? (new Date(dateStr)).getTime() : 0;
  }
}
