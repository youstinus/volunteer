import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, Events } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Language } from 'src/app/utilities/Language';
import { Strings } from 'src/app/constants/Strings';
import { ToastService } from 'src/app/shared/toast.service';

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
  toastDeletedSuccessfuly = Language.Lang.toastDeletedSuccessfuly;
  toastFailedToDelete = Language.Lang.toastFailedToDelete;
  toastUpdatedSuccessfuly = Language.Lang.toastUpdatedSuccessfuly;
  toastFailedToUpdate = Language.Lang.toastFailedToUpdate;

  project: Project;
  backupImageUrl: string = Strings.Default_Image_Url3;
  public onEditForm: FormGroup;
  defaulUrl: string = Strings.Default_Image_Url3;

  constructor(
    private events: Events,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private alertCtrl: AlertController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    
    this.getProject(id);

    /*this.onEditForm.get('start').setValue(this.project.start);
    this.onEditForm.get('end').setValue(this.project.end);*/
  }

  getProject(id: number) {
    this.projectsService.getById(id).subscribe(value => {
      this.editForm(value);
      this.project = value;
      this.backupImageUrl = this.project.imageUrl;
      const userId = this.usersService.getTokenId();
      if (userId != this.project.organizationId) {
        this.navCtrl.navigateRoot('not-found').catch(error => console.error(error));
      }
    }, error1 => {
      this.navCtrl.navigateRoot('not-found').catch(error => console.error(error));
    });
  }

  editForm(project: Project) {
    this.onEditForm = this.formBuilder.group({
      'title': [project.title, Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.maxLength(64)
      ])],
      'imageUrl': [project.imageUrl, Validators.compose([
        Validators.nullValidator
      ])],
      'description': [project.description, Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])],
      'start': [project.start, Validators.compose([
        Validators.required
      ])],
      'end': [project.end, Validators.compose([
        Validators.required
      ])],
      'organizationId': this.usersService.getTokenId(),
      'location': [project.location, Validators.compose([
      ])],
      'website': [project.website, Validators.compose([
        Validators.pattern(Strings.Website_Pattern)
      ])],
      'email': [project.email, Validators.compose([
        Validators.required,
        Validators.pattern(Strings.Email_Pattern)
      ])],
      'phone': [project.phone, Validators.compose([
        Validators.required,
        Validators.pattern(Strings.Phone_Number_Pattern)
      ])]
    });
  }

  onSaved() {
    this.projectsService.update(this.project.id, this.onEditForm.value).subscribe(value => {
      this.toastService.presentToast(this.toastUpdatedSuccessfuly, Strings.Color_Success);
      this.events.publish('user:updated', this.onEditForm.value);
    }, error1 => {
      this.toastService.presentToast(this.toastFailedToUpdate, Strings.Color_Danger);
    });
  }

  goToProjects() {
    this.events.publish('returnedFromEdit');
    this.navCtrl.back();
  }

  async onDeleteConfirmation() {
    const alert = await this.alertCtrl.create({
      header: this.areYouSure,
      buttons: [{
        text: this.eYes, handler: () => {
          alert.dismiss().then(() => {
            this.deleteProject();
          })
        }
      }, this.eNo]
    });
    await alert.present();
  }

  deleteProject() {
    this.projectsService.delete(this.project.id).subscribe(value => {
      this.toastService.presentToast(this.toastDeletedSuccessfuly, Strings.Color_Success);
      this.navCtrl.navigateRoot('projects/type/created').catch(error => console.error(error));
    }, error1 => {
      this.toastService.presentToast(this.toastFailedToDelete, Strings.Color_Danger);
    });
  }

  updateUrl() {
    this.backupImageUrl = this.defaulUrl;
  }

  updateUrl2() {
    this.backupImageUrl = this.project.imageUrl;
  }

  updateIMG(searchValue: string) {
    this.project.imageUrl = searchValue;
    this.backupImageUrl = searchValue;
  }

  onSearchChange(searchValue: string) {
    this.updateIMG(searchValue);
  }
}
