import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Project } from 'src/app/models/Project';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonButton } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})
export class NewProjectPage implements OnInit {

  id: number;
  public onCreateForm: FormGroup;
  private role: number = 0;
  
  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private formBuilder: FormBuilder
  ) { }

  createProject: Project = new Project();

  ngOnInit() {
    
    console.log(this.usersService.getRole());
    this.id = this.usersService.getId();
    // this.id = this.route.snapshot.params['id'];
    // this.projectsService.getById(this.id).subscribe(value => {
    //   this.createProject = value;
    // }, error1 => {
    //   console.log(error1);
    // });

    this.onCreateForm = this.formBuilder.group({
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
      'organizationId': [this.id , Validators.compose([
        Validators.required
      ])],

      'location': [null, Validators.compose([
        Validators.required
      ])],
      'website': [null, Validators.compose([
        Validators.required
      ])],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'phone': [null, Validators.compose([
        Validators.required
      ])],
    });
  }
  async onCreate()
  {
    console.log(this.onCreateForm.value);
    //this.projectsService.update(this.id, this.project).subscribe(value => { this.onEditForm.value
    this.projectsService.create(this.onCreateForm.value).subscribe(value => {
     
      console.log(value);
      this.createProject = value;
      // this.navCtrl.navigateForward('../project/' + this.id).catch(reason => console.log(reason));
    }, error1 => {
      console.log(error1);
    });
  }
  getId(){
    const id = this.usersService.getId();
    return id;
  }
}
