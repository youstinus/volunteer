import { Component, OnInit } from '@angular/core';
import { Volunteer } from 'src/app/models/Volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { Strings } from 'src/app/constants/Strings';
import { AlertController, LoadingController, ToastController, NavController, ModalController } from '@ionic/angular';
import { ProjectsService } from 'src/app/services/projects.service';
import { ModalVolunteerPage } from '../modal-volunteer/modal-volunteer.page';
import { Objects } from 'src/app/constants/Objects';
import { projection } from '@angular/core/src/render3';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.page.html',
  styleUrls: ['./volunteers.page.scss'],
})
export class VolunteersPage implements OnInit {

  project: Project = Objects.Empty_Project; // Objects.Four_Test_Projects[1];
  //volunteers: Volunteer[] = [];//Objects.Empty_Volunteer_Arr;
  volunteers: Volunteer[] = [];
  constructor(
    private organizationsService: VolunteersService,
    private route: ActivatedRoute,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private projectsService: ProjectsService,
    private navCtrl: NavController,
    private modal: ModalController
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];
    this.projectsService.getById(id).subscribe(value => {
      this.project = value;
      console.log(this.project.description);
    }, error1 => {
      console.log(error1);
    });

    this.projectsService.getVolunteers(id).subscribe(value => {
      this.volunteers = value;
      console.log(value)
    }, error1 => {
      console.log(error1);
    })
  }

  //https://www.youtube.com/watch?v=ACYu94hLg4I&fbclid=IwAR3gn6h6aPtArq1OhPTQMLIuB-NiPrgfAuGomAjara2oEvl3RxG1sj3Q--Y
  async onVolunteerClicked(volunteer: Volunteer) {
    console.log(volunteer)
    const myModal = await this.modal.create({
      component: ModalVolunteerPage,
      componentProps: {
        volname: volunteer.firstName + " " + volunteer.lastName,
        volphone: volunteer.phone,
        volemail: volunteer.email,
        voldescrip: volunteer.description,
        volPic: volunteer.imageUrl
      }
    });
    await myModal.present();
  }

}
