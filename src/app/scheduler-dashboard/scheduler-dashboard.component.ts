import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-scheduler-dashboard',
  templateUrl: './scheduler-dashboard.component.html',
  styleUrls: ['./scheduler-dashboard.component.scss']
})
export class SchedulerDashboardComponent implements OnInit {

  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  options: any;
  @Input() events: any[];
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  targetEvent: any;

  constructor() { }

  ngOnInit() {
    this.options = {
      aspectRatio: 0.5,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      contentHeight: 380,
      editable: true,
      selectable: true,
      selectMirror: true,
      selectOverlap: false,
      timeZone: 'local',
      themeSystem: 'bootstrap',
      nowIndicator: true,
      navLinks: true,
      eventLimit: true, // when too many events in a day, show the popover
      header: {
        left: 'dayGridMonth,timeGridWeek,timeGridDay,timeGridFiveDay',
        center: 'title',
        right: 'prevYear,prev,next,nextYear'
      },
      footer: {
        left: 'listDay,listWeek,listMonth',
        right: 'save cancel'
      },
      views: {
        listDay: { buttonText: 'list day' },
        listWeek: { buttonText: 'list week' },
        listMonth: { buttonText: 'list month' },
        timeGridFiveDay: {
          type: 'timeGrid',
          duration: { days: 5 },
          buttonText: '5 day'
        }
      },
      dateClick: function(info) {
        if (info.view.type === 'dayGridMonth') {
          this.changeView('timeGridDay');
          this.gotoDate(info.dateStr);
        }
      },
      customButtons: {
        save: {
          text: 'Save',
          click: this.save
        },
        cancel: {
          text: 'Cancel',
          click: this.cancel
        }
      },
      eventTimeFormat: {
        // like '14:30:00'
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: true,
        meridiem: 'short'
      },
      events: this.events,
      select: this.selectEvent
    };
  }

  readonly cancel = () => {
    this.onCancel.emit(true);
  }

  readonly save = () => {
    if (this.targetEvent) {
      this.onSave.emit(this.targetEvent);
    }
  }

  readonly selectEvent = info => {
    if (info.view.type !== 'dayGridMonth') {
      this.targetEvent = {
        start: info.start,
        end: info.end,
        allDay: info.allDay
      };
    }
  };
}
