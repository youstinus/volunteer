import { Component, OnInit, Input, Directive } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonButton, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { Language } from 'src/app/utilities/Language';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {

  newPojectImage: string = Language.Lang.newPojectImage;
  newPojectEmail: string = Language.Lang.newPojectEmail;
  newPojectPhone: string = Language.Lang.newPojectPhone;
  newPojectWebsite: string = Language.Lang.newPojectWebsite;
  newPojectAlertOk: string = Language.Lang.newPojectAlertOk;
  editProjectDelete: string = Language.Lang.editProjectDelete;
  editProjectAlertEditHeader: string = Language.Lang.editProjectAlertEditHeader;
  editProjectAlertEditMessage: string = Language.Lang.editProjectAlertEditMessage;
  editSuccesfull: string = Language.Lang.editSucesfull;
  areYouSure: string = Language.Lang.editConfirmDelete;
  editHeader: string = Language.Lang.editHeader;
  editTitle: string = Language.Lang.editTitle;
  editDescription: string = Language.Lang.editDescription;
  editChangeStart: string = Language.Lang.editChangeStart;
  editChangeEnd: string = Language.Lang.editChangeEnd;
  changeLocation: string = Language.Lang.changeLocation;
  editSave: string = Language.Lang.editSave;
  projectGoBack: string = Language.Lang.projectGoBack;
  eYes: string = Language.Lang.yes;
  eNo: string = Language.Lang.no;
  project: Project = new Project();
  atsarginisUrl: string = this.project.imageUrl;
  id: number;
  public onEditForm: FormGroup;
  public imgForm: FormGroup;
  role: number = 1;
  owner: boolean = false;
  defaulUrl: string = 'https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg';
  constructor(private projectsService: ProjectsService,
    private location: Location,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.projectsService.getById(this.id).subscribe(value => {
      this.project = value;
      this.atsarginisUrl = this.project.imageUrl;
      this.getRole();
      const userId = this.usersService.getTokenId();
      if (userId == this.project.organizationId) {
        this.owner = true;
        console.log('Savininkas');
      } else {
        this.owner = false;
        this.navCtrl.navigateRoot('not-found').catch(error => console.error(error));
      }
    }, error1 => {
      console.log(error1);
    });

    this.onEditForm = this.formBuilder.group({

      'title': [null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'imageUrl': [null, Validators.compose([
        Validators.nullValidator
      ])],
      'description': [null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],

      'start': '',
      'end': '',

      'organizationId': this.usersService.getTokenId(),

      'location': [null, Validators.compose([
      ])],
      'website': [null, Validators.compose([
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ])],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'phone': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[+0-9. ()-]*$')
      ])]
    });
  }
  getRole() {
    if (this.project.imageUrl == "" || this.project.imageUrl == null) {
      this.role = 0;
    }
  }
  onSaved() {
    this.projectsService.update(this.id, this.onEditForm.value).subscribe(value => {
      this.OnSavePopUp();
    }, error1 => {
      this.NotEdited();
      console.log(error1);
    });

  }
  goToProjects() {
    //this.navCtrl.pop();
    this.navCtrl.back();
  }
  async OnSavePopUp() {
    const alert = await this.alertCtrl.create({
      header: this.editSuccesfull,
      buttons: [{
        text: this.projectGoBack, handler: () => {
          alert.dismiss().then(() => {
            this.navCtrl.back();
          })
        }
      }, this.newPojectAlertOk]
    });
    await alert.present();
  }
  async OnDeletePopUp() {
    const alert = await this.alertCtrl.create({
      header: this.areYouSure,
      buttons: [{
        text: this.eYes, handler: () => {
          alert.dismiss().then(() => {
            this.Delete();
            this.navCtrl.back();
          })
        }
      }, this.eNo]
    });
    await alert.present();
  }
  Delete() {
    this.projectsService.delete(this.id).subscribe(value => {
      console.log(value);
      location.assign('projects/type/created');
    }, error1 => {
      console.log(error1);
    });
    this.navCtrl.navigateForward('projects/').catch(e => console.log(e));
  }

  async NotEdited() {
    const alert = await this.alertCtrl.create({
      header: this.editProjectAlertEditHeader,
      message: this.editProjectAlertEditMessage,
      buttons: [this.newPojectAlertOk]
    });
    await alert.present();
  }

  updateUrl(event) {
    this.atsarginisUrl = this.defaulUrl;
  }
  updateUrl2(event) {
    this.atsarginisUrl = this.project.imageUrl;
  }
  updateIMG(searchValue: string) {
    this.project.imageUrl = searchValue;
    this.atsarginisUrl = searchValue;
  }

  onSearchChange(searchValue: string) {
    this.updateIMG(searchValue);
  }

}
