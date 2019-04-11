//import {Component, OnInit} from '@angular/core';
//import {Calendar} from '@ionic-native/calendar/ngx';
import {NavController, Platform} from '@ionic/angular';

import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit{

    event =
    {
      title: '',
      desc: '',
      startTime: '',
      endTime: '',
      allDay: false
    }

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  viewTitle = "";

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.resetEvent();

  }
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      // 2019,04,09
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today(){
    this.calendar.currentDate = new Date();
  }
  async  onEventSelected(event) {
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

  onViewTitleChanged(title) {
this.viewTitle = title;
  }
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
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
