import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Project } from 'src/app/models/Project';
import { ProjectsService } from '../../services/projects.service';
import { AlertController, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { Language } from 'src/app/utilities/Language';
import { ToastService } from 'src/app/shared/toast.service';
import { Strings } from 'src/app/constants/Strings';
import { DateValidator } from './date.validator';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})
export class NewProjectPage implements OnInit {

  newPojectHeader: string = Language.Lang.newPojectHeader;
  newPojectImage: string = Language.Lang.newPojectImage;
  newPojectTitle: string = Language.Lang.newPojectTitle;
  newPojectEmail: string = Language.Lang.newPojectEmail;
  newPojectPhone: string = Language.Lang.newPojectPhone;
  newPojectWebsite: string = Language.Lang.newPojectWebsite;
  newPojectDescription: string = Language.Lang.newPojectDescription;
  newPojectStart: string = Language.Lang.newPojectStart;
  newPojectEnd: string = Language.Lang.newPojectEnd;
  newPojectLocation: string = Language.Lang.newPojectLocation;
  newPojectCreate: string = Language.Lang.newPojectCreate;
  newPojectAlertNotHeader: string = Language.Lang.newPojectAlertNotHeader;
  newPojectAlertNotMessage: string = Language.Lang.newPojectAlertNotMessage;
  newPojectAlertOk: string = Language.Lang.newPojectAlertOk;
  newProjectFailedDates: string = Language.Lang.newProjectFailedDates;
  toastClose: string = Language.Lang.toastClose;

  id: number;
  public onCreateForm: FormGroup;
  createProject: Project = new Project();

  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private toastService: ToastService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.onCreateForm = this.formBuilder.group({
      'imageUrl': [null, Validators.compose([
      ])],
      'title': [null, Validators.compose([
        Validators.minLength(4),
        Validators.required,
        Validators.maxLength(64)
      ])],
      'description': [null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'start': [null, Validators.compose([
        Validators.required
      ])],
      'end': [null, Validators.compose([Validators.required])],
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
      ])],
    }, {
      validator: DateValidator.CheckDates
    });
  }

  async onCreate() {
    this.projectsService.create(this.onCreateForm.value).subscribe(value => {
      this.createProject = value;
      this.toastService.presentToastClose(this.newPojectAlertOk, Strings.Color_Success, this.toastClose);
      this.navCtrl.navigateRoot('projects/type/created').catch(reason => console.log(reason));
    }, error1 => {
      this.toastService.presentToastClose(this.newPojectAlertNotMessage, Strings.Color_Danger, this.toastClose);
    });
  }

  getId() {
    const id = this.usersService.getTokenId();
    return id;
  }

  async NotCreated() {
    const alert = await this.alertCtrl.create({
      header: this.newPojectAlertNotHeader,
      message: this.newPojectAlertNotMessage,
      buttons: [this.newPojectAlertOk]
    });
    await alert.present();
  }
}
