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

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {

  id: number;
  public onEditForm: FormGroup;
  public imgForm: FormGroup;

  constructor(private projectsService: ProjectsService,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    
    public alertCtrl: AlertController
  ) {
  }
  project: Project = new Project();

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.projectsService.getById(this.id).subscribe(value => {
      this.project = value;
    }, error1 => {
      console.log(error1);
    });

    this.onEditForm = this.formBuilder.group({
      'imageUrl': [null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'title': [null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'description': [null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'start': [null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'end': [null, Validators.compose([
        Validators.required
      ])],
      'organizationId': [null, Validators.compose([
        Validators.required
      ])],

      'location': [null, Validators.compose([
        Validators.required
      ])],
      'website': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'phone': [null, Validators.compose([
        Validators.required
      ])]
    });

    // this.onEditForm = this.formBuilder.group({
    //   'imageUrl': [null, Validators.compose([
    //     Validators.minLength(5),
    //     Validators.required
    //   ])],
    //   'title': ['', Validators.compose([
    //     Validators.required,
    //   ])],
    //   'description': [null, Validators.compose([
    //     Validators.minLength(5),
    //     Validators.required
    //   ])],
    //   'start': [null, Validators.compose([
    //     Validators.minLength(5),
    //     Validators.required
    //   ])],
    //   'end': [null, Validators.compose([
    //     Validators.required
    //   ])]

    // });

  }
  onSaved() {
    console.log(this.onEditForm.value);
    //this.projectsService.update(this.id, this.project).subscribe(value => { this.onEditForm.value
    this.projectsService.update(this.id, this.onEditForm.value).subscribe(value => {
      console.log(value);
      this.navCtrl.navigateForward('../project/' + this.id).catch(reason => console.log(reason));
    }, error1 => {
      console.log(error1);
    });
    
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
      inputs : [
        {
          name: 'URL',
          type: 'text',
          placeholder: ''
        }
       ]
    });

    await alert.present();
  }

}
