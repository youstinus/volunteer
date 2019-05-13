import { Component, OnInit, Input, Directive } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonButton, AlertController } from '@ionic/angular';
import { Strings } from '../../constants/Strings';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { load } from '@angular/core/src/render3';
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
  editHeader: string = Language.Lang.editHeader;
  editTitle: string = Language.Lang.editTitle;
  editDescription: string = Language.Lang.editDescription;
  editChangeStart: string = Language.Lang.editChangeStart;
  editChangeEnd: string = Language.Lang.editChangeEnd;
  changeLocation: string = Language.Lang.changeLocation;
  editSave: string = Language.Lang.editSave;
  
  project: Project = new Project();
  atsarginisUrl: string = this.project.imageUrl;
  id: number;
  public onEditForm: FormGroup;
  public imgForm: FormGroup;
  role: number = 1;
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
      console.log(value)
    }, error1 => {
      console.log(error1);
    });

    this.onEditForm = this.formBuilder.group({

      'title': [/*this.project.title*/ null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'imageUrl': [null, Validators.compose([
        //Validators.minLength(5),
        Validators.nullValidator
      ])],
      'description': [null/*this.project.description*/, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'start': [null, Validators.compose([
        Validators.required])],//this.project.start,
      'end': [null, Validators.compose([
        Validators.required
      ])],//this.project.end,

      'organizationId': this.usersService.getTokenId(),

      'location': [/*this.project.location*/null, Validators.compose([
        /* Validators.required*/
      ])],
      'website': [/*this.project.website*/null, Validators.compose([
        /* Validators.required,*/
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ])],
      'email': [/*this.project.email*/'', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'phone': [null/*this.project.phone*/, Validators.compose([
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
    console.log(this.onEditForm.value);
    this.projectsService.update(this.id, this.onEditForm.value).subscribe(value => {

      this.navCtrl.navigateForward('projects').catch(e => console.log(e));
      // location.assign('projects/type/created');
      console.log(value);
    }, error1 => {
      this.NotEdited();
      console.log(error1);
    });

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
  onChangePic() {
    console.log();
    this.changePic();
  }
  async changePic() {
    const alert = await this.alertCtrl.create({
      header: 'Please enter the url of your image',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirm',
          handler: data => {
            console.log('Confirm');
            this.project.imageUrl = data.URL;
          }
        }
      ],
      inputs: [
        {
          name: 'URL',
          type: 'text',
          placeholder: ''
        }
      ]
    });

    await alert.present();
  }

  load() {
    location.reload()
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
  //this.project.imageUrl= this.project.imageUrl;
  this.atsarginisUrl = this.defaulUrl;
  }
  updateUrl2(event) {
    this.atsarginisUrl = this.project.imageUrl; 
  }
  updateIMG(searchValue: string) {

    this.project.imageUrl = searchValue;//Strings.Default_Image_Url;//
    this.atsarginisUrl = searchValue;

  }

  onSearchChange(searchValue: string) {
    this.updateIMG(searchValue);
  }

}
