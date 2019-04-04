import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {Calendar} from '@ionic-native/calendar/ngx';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {

    calendars = [];

    constructor(public navCtrl: NavController, private calendar: Calendar, private plt: Platform) {
        this.plt.ready().then(() => {
            this.calendar.listCalendars().then(data => {
                this.calendars = data;
            });
        });
    }

    addEvent(cal) {
        const date = new Date();
        const options = { calendarId: cal.id, calendarName: cal.name, url: 'https://ionicacademy.com', firstReminderMinutes: 15 };

        this.calendar.createEventInteractivelyWithOptions('My new Event', 'Münster', 'Special Notes', date, date, options).then(res => {
        }, err => {
            console.log('err: ', err);
        });
    }

    openCal(cal) {
        this.navCtrl.navigateForward('CalDetailsPage');
    }
}
