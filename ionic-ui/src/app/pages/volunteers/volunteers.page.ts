import { Component, OnInit } from '@angular/core';
import { Volunteer } from 'src/app/models/Volunteer';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { Strings } from 'src/app/constants/Strings';
import { AlertController, LoadingController, ToastController, NavController, ModalController } from '@ionic/angular';
import { ProjectsService } from 'src/app/services/projects.service';
import { ModalVolunteerPage } from '../modal-volunteer/modal-volunteer.page';
import { Language } from 'src/app/utilities/Language';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.page.html',
  styleUrls: ['./volunteers.page.scss'],
})
export class VolunteersPage implements OnInit {
  
  volunteersHeader: string = Language.Lang.volunteersHeader;
  volunteersYourVolunteers: string = Language.Lang.volunteersYourVolunteers;
  volunteersAll: string = Language.Lang.volunteersAll;
  volunteersNone: string = Language.Lang.volunteersNone;
  volunteersAnonymousName: string = Language.Lang.volunteersAnonymousName;
  volunteersAnonymousLast: string = Language.Lang.volunteersAnonymousLast;
  volunteersGoBack: string = Language.Lang.volunteersGoBack;

  project: Project;
  volunteers: Volunteer[] = [];
  defaulUrl: string = Strings.Default_Image_Url2;
  defaultName: string = Language.Lang.volunteersAnonymousName + Language.Lang.volunteersAnonymousLast;
  sendName: string;

  constructor(
    private route: ActivatedRoute,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private navCtrl: NavController,
    private modal: ModalController
  ) { }

  ngOnInit() {
    const userId = this.usersService.getTokenId();
    const id = this.route.snapshot.params['id'];
    this.projectsService.getById(id).subscribe(value => {
      this.project = value;
      if (userId == this.project.organizationId) {
        console.log('Savininkas');
      } else {
        this.navCtrl.navigateRoot('not-found').catch(error => console.error(error));
      }
    }, error1 => {
      console.log(error1);
      this.navCtrl.navigateRoot('not-found').catch(error => console.error(error));
    });

    this.projectsService.getVolunteers(id).subscribe(items => {
      this.volunteers = items.map(value => {
        if (value.imageUrl === null || value.imageUrl === '') {
          value.imageUrl = this.defaulUrl;
        }
        if (value.firstName == null || value.lastName == null) {
          value.firstName = this.volunteersAnonymousName;
          value.lastName = this.volunteersAnonymousLast;
        }
        return value;
      });
    }, error1 => {
      console.log(error1);
    })
  }

  //https://www.youtube.com/watch?v=ACYu94hLg4I&fbclid=IwAR3gn6h6aPtArq1OhPTQMLIuB-NiPrgfAuGomAjara2oEvl3RxG1sj3Q--Y
  async onVolunteerClicked(volunteer: Volunteer) {
    console.log(volunteer);
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

  goToProjects() {
    this.navCtrl.back();
  }  
}
