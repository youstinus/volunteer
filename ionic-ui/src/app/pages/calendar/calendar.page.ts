
import { AlertController, NavController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Subscription } from 'rxjs';
import { Project } from '../../models/Project';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';

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

  eventSource: { title: string, startTime: Date, endTime: Date, id: number }[] = [];
  constructor(public navCtrl: NavController, private projectsService: ProjectsService, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private route: ActivatedRoute) { }
  ngOnInit() {
    this.type = this.route.snapshot.params['type'];
    this.loadexistingEvents();
  }
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()// these are the variable used by the calendar.
  };

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
      message: 'Nuo: ' + start + '<br><br>Iki: ' + end,
      buttons: [{
        text: "Details",
        handler: () => {
          alert.dismiss().then(() => {
            this.navCtrl.navigateForward('projects/' + event.id).catch(e => console.log(e));
          })
        }
      }, 'OK']
    });
    alert.present();
  }
  // Mode change is meant for changing Month/Week/Day calendar view
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

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  loadexistingEvents() {
    this.projectsService.get().subscribe(items => {
      this.projects = items;
      items.forEach(value => {
        this.eventSource.push({
          title: value.title,
          startTime: new Date(value.start),
          endTime: new Date(value.start), // #EDITED TO START BECAUSE THERE IS TOO MUCH OF SPAM IN CALENDAR
          id: value.id
        });
      });
      this.myCal.loadEvents();
    }, error1 => {
      console.log(error1);
    });
  }
}
