import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {

  id: number;
  public onEditForm: FormGroup;
  public imgForm: FormGroup;
  role: number = 1;
  constructor(private projectsService: ProjectsService,
    private location: Location,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public alertCtrl: AlertController
  ) {
  }
  project: Project = new Project();

  ngOnInit() {
 
    this.id = this.route.snapshot.params['id'];
    this.projectsService.getById(this.id).subscribe(value => {
      this.project = value;
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
      'imageUrl': [this.project.imageUrl, Validators.compose([
        /*   Validators.minLength(5),
           Validators.required*/
         ])],
      'description': [null/*this.project.description*/, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'start':this.project.start,
      'end': this.project.end,

      'organizationId': this.usersService.getTokenId(),

      'location': [/*this.project.location*/null, Validators.compose([
        Validators.required
      ])],
      'website': [/*this.project.website*/null, Validators.compose([
        Validators.required,
       Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ])],
      'email': [/*this.project.email*/null, Validators.compose([
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
    location.assign('projects/type/created');
      console.log(value);
    }, error1 => {
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
}
