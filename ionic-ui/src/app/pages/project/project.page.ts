import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonButton } from '@ionic/angular';
import { Button } from 'protractor';
import { Strings } from '../../constants/Strings';
import { UsersService } from 'src/app/services/users.service';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { Volunteer } from 'src/app/models/Volunteer';
//import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})

export class ProjectPage implements OnInit {

  project: Project = new Project();
  newUrl = '';
  private role: number = 4;
  defaulUrl: string='https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg';
  owner: boolean = false;
  volunteer: Volunteer=new Volunteer();

  constructor(
    private usersService: UsersService,
    private volunteersService: VolunteersService,
    private projectsService: ProjectsService, 
    private route: ActivatedRoute, 
    public navCtrl: NavController
 //   private clipboard: Clipboard
    ) {}

  stringparse() {
    let newurl: string = '';
    newurl += 'https://maps.google.com/maps?q=';
    if (this.project !== null && this.project.location !== null && this.project.location !== '') {
      newurl += this.project.location.replace(' ', '%20').replace(',', '%2C');
    }
    newurl += '&t=&z=13&ie=UTF8&iwloc=&output=embed';
    this.newUrl = newurl;
  }

  onSourceClicked(source: string) {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(source)) {
      url += 'http://';
    }
    url += source;
    window.open(url, '_blank');
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.projectsService.getById(id).subscribe(value => {
      this.project = value;
      this.stringparse();
    }, error1 => {
      console.log(error1);
    });
    this.getRole();
    
    //turim patikrinti ar projekta ziuri organizacija savininke
    //ar user id yra lygus organizacijai ar ne
    if(this.project.organizationId==this.usersService.getId())
    {
      this.owner=true;
    }
  }

  btnActivate(ionicButton) {
    if (ionicButton.color === 'dark')
      ionicButton.color = 'success';
    else if (ionicButton.color == 'success')
      ionicButton.color = 'dark';
    else
      ionicButton.color = "success";
    //console.log(ionicButton);
  }

  //kas cia daryta?
  isSelected(event) {
    console.log(event);
    return 'primary';
    // event.target.getAttribute('selected') ? 'primary' : '';
  }
  
  navigateToEdit() {
    this.navCtrl.navigateForward('project-edit/' + this.project.id).catch(reason => console.log(reason));
  }
  navigateToVolunteers() {
    this.navCtrl.navigateForward('volunteers/project/' + this.project.id).catch(reason => console.log(reason));
  }
  
  getRole() {
    const role = this.usersService.getTokenRole();
    if (role == 'Volunteer') {
        this.role = 2;
    } else if (role == 'Organization') {
        this.role = 3;
    } else if (role == 'Moderator') {
        this.role = 1;            
    } else if (role == 'Admin') {
        this.role = 0;        
    } else {
        this.role = 4;
    }
  }

  onPhoneClicked( phone:string){
    console.log(this.project.phone);
  }

  // kodel grazina undefined jei prisiloginus kaip volunteer
  addToSaveList(){
    const userId=this.usersService.getTokenId();
    console.log('User id '+userId+' update to save list');
  }

  addToSelecteDProjectS(){
    const userId=this.usersService.getTokenId();
    console.log('User id '+userId+' update to selected list');
    
    this.volunteersService.getByUsersId(userId).subscribe(value => {
      this.volunteer = value;
    }, error1 => {
      console.log(error1);
    });
    console.log(this.volunteer.id);
  }
}



export class PopoverComponent {

  public ionicNamedColor: string = 'primary';
  color: any;
  submit(event) {
    let prevColor = this.color;
    if (this.color === 'primary') {
      this.color = 'light'
    } else {
      this.color = 'primary'
    }

    if (event.target.localName === 'button') {
      event.target.className = event.target.className.replace('button-md-' + prevColor, 'button-md-' + this.color);
    } else if (event.target.parentElement.localName === 'button') {
      event.target.parentElement.className = event.target.parentElement.className.replace('button-md-' + prevColor, 'button-md-' + this.color);
    }
  }
  constructor() {
  }

  public toggleNamedColor(): void {
    if (this.ionicNamedColor === 'primary') {
      this.ionicNamedColor = 'light'
    } else {
      this.ionicNamedColor = 'primary'
    }
  }
}
