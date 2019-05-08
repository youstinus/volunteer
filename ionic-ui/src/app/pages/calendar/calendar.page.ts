
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../models/Project';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Strings } from '../../constants/Strings';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  projects: Project[];
  events3: Project[];
  private subscription: Subscription;
  private type: String;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  
  eventSource: {title: string,  startTime: Date,  endTime: Date, allDay: boolean }[] = [];
  constructor(private projectsService: ProjectsService, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private route: ActivatedRoute) { }
  ngOnInit() {
    /* this.resetEvent();*/
    this.type = this.route.snapshot.params['type'];
    // this.loadItemsByType();
    //this.loadEvents();
    this.loadexistingEvents();
  }
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }; // these are the variable used by the calendar.
  loadEvents() {
    //this.eventSource = this.createRandomEvents();
    this.eventSource = this.loadexistingEvents1();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }
  subscribeProjects(observable: Observable<Project[]>, ev) {
    return observable.subscribe(items => {
      this.projects = items.map(value => {
        ev.push({
          title: value.title,
          startTime: value.start,//startTime,
          endTime: value.end,
          allDay: true
        });
        return value;
      });

    }, error1 => {
      console.log(error1);
    });
  }
  loadexistingEvents1() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
      }
    }
    return events;
  }
  loadexistingEvents() {
    this.projectsService.get().subscribe(items => {
      this.projects = items;
      items.forEach(value => {
        this.eventSource.push({
          title: value.title,
          startTime: new Date(value.start),
          endTime: new Date(value.end),
          allDay: true
        });
      });
        this.myCal.loadEvents();
    }, error1 => {
      console.log(error1);
    });
    //-----------------------------------------------------------------------------

    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        //  events.push({
        //    title: 'All Day - ' + i,
        //    startTime: startTime,
        //    endTime: endTime,
        //    allDay: true
        //   });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        //events.push({
        //title: 'Event - ' + i,
        // startTime: startTime,
        // endTime: endTime,
        // allDay: false
        // });
      }

    }
    //return events;
  }
    //-----------------------------------------------------------------------------


    //return events;
    //this.subscription = this.subscribeProjects(observable, events);
    // this.subscription = this.projectsService.get().subscribe(items => {
    //   this.projects = items.map(value => {
    //     return value;
    //   })
    // });
    //  console.log('PROJEKTO ILGIS: '+ this.projects[7].title);
    // for (var i = 0; i < this.projects.length; i += 1) {

    //   var date = new Date();
    //   var startTime = this.projects[i].start;
    //   var endTime = this.projects[i].end;

    //   var eventType = Math.floor(Math.random() * 2);
    //   var startDay = new Date(startTime.getTime());//Math.floor(Math.random() * 90) - 45;
    //   var endDay = new Date(endTime.getTime() + startTime.getTime());

    //   if (eventType === 0) {
    //     startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay.getTime()));
    //     if (endDay === startDay) {
    //       endDay = this.addDays(endDay, 1);
    //     }
    //     endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay.getDate()));
    //     events.push({
    //       title: this.projects[i].title,
    //       startTime: this.projects[i].start,//startTime,
    //       endTime: this.projects[i].end,
    //       allDay: true
    //     });
    //   } 
 //   return events;

 // }


addDays(date: Date, days: number): Date {
  date.setDate(date.getDate() + days);
  return date;
}


createRandomEvents() {
  var events = [];
  for (var i = 0; i < 50; i += 1) {
    var date = new Date();
    var eventType = Math.floor(Math.random() * 2);
    var startDay = Math.floor(Math.random() * 90) - 45;
    var endDay = Math.floor(Math.random() * 2) + startDay;
    var startTime;
    var endTime;
    if (eventType === 0) {
      startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
      if (endDay === startDay) {
        endDay += 1;
      }
      endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
      events.push({
        title: 'All Day - ' + i,
        startTime: startTime,
        endTime: endTime,
        allDay: true
      });
    } else {
      var startMinute = Math.floor(Math.random() * 24 * 60);
      var endMinute = Math.floor(Math.random() * 180) + startMinute;
      startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
      endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
      events.push({
        title: 'Event - ' + i,
        startTime: startTime,
        endTime: endTime,
        allDay: false
      });
    }
  }
  return events;
}
onRangeChanged(ev) {
  console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
}

markDisabled = (date: Date) => {
  var current = new Date();
  current.setHours(0, 0, 0);
  return date < current;
};
back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}
  // private subscription: Subscription;
  // projects: Project[];
  // projectsFiltered: Project[] = this.projects;
  // collapseCard = false;
  // private type: String;
  // event =
  //   {
  //     title:'' ,
  //     desc: '',
  //     startTime: '',
  //     endTime: '',
  //     allDay: false
  //   }

  // minDate = new Date().toISOString();

  // eventSource = [];

  // calendar = {
  //   mode: 'month',
  //   currentDate: new Date()
  // }

  // viewTitle = "";

  // @ViewChild(CalendarComponent) myCal: CalendarComponent;



  // loadItemsByType() {
  //   let observable: Observable<Project[]>;
  //   observable = this.projectsService.get();

  //   this.subscription = this.subscribeProjects(observable);
  // }

  // subscribeProjects(observable: Observable<Project[]>) {
  //   return observable.subscribe(items => {
  //     this.projects = items.map(value => {
  //       return value;
  //     });
  //   }, error1 => {
  //     console.log(error1);
  //   });
  // }


  // resetEvent() {
  //   this.event = {
  //     title: '',
  //     desc: '',
  //     startTime: new Date().toISOString(),
  //     endTime: new Date().toISOString(),
  //     allDay: false
  //   };
  // }
  // addEvent() {
  //   let eventCopy = {
  //     title: this.event.title,
  //     startTime: new Date(this.event.startTime),
  //     endTime: new Date(this.event.endTime),
  //     allDay: this.event.allDay,
  //     desc: this.event.desc
  //   }

  //   if (eventCopy.allDay) {
  //     let start = eventCopy.startTime;
  //     let end = eventCopy.endTime;
  //     // 2019,04,09
  //     eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
  //     eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
  //   }
  //   this.eventSource.push(eventCopy);
  //   this.myCal.loadEvents();
  //   this.resetEvent();
  // }
  // changeMode(mode) {
  //   this.calendar.mode = mode;
  // }


  // today() {
  //   this.calendar.currentDate = new Date();
  // }
  // async  onEventSelected(event) {
  //   // Use Angular date pipe for conversion
  //   let start = formatDate(event.startTime, 'medium', this.locale);
  //   let end = formatDate(event.endTime, 'medium', this.locale);
  //   const alert = await this.alertCtrl.create({
  //     header: event.title,
  //     subHeader: event.desc,
  //     message: 'From: ' + start + '<br><br>To: ' + end,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  // onViewTitleChanged(title) {
  //   this.viewTitle = title;
  // }
  // onTimeSelected(ev) {
  //   let selected = new Date(ev.selectedTime);
  //   this.event.startTime = selected.toISOString();
  //   selected.setHours(selected.getHours() + 1);
  //   this.event.endTime = (selected.toISOString());
  // }
  // calendars = [];

  // constructor(public navCtrl: NavController, private calendar: Calendar, private plt: Platform) {
  //     this.plt.ready().then(() => {
  //         this.calendar.listCalendars().then(data => {
  //             this.calendars = data;
  //         });
  //     });
  // }

  // addEvent(cal) {
  //     const date = new Date();
  //     const options = { calendarId: cal.id, calendarName: cal.name, url: 'https://ionicacademy.com', firstReminderMinutes: 15 };

  //     this.calendar.createEventInteractivelyWithOptions('My new Event', 'Münster', 'Special Notes', date, date, options).then(res => {
  //     }, err => {
  //         console.log('err: ', err);
  //     });
  // }

  // openCal(cal) {
  //     this.navCtrl.navigateForward('CalDetailsPage');
  // }
}
