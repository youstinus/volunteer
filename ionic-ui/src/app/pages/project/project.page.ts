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
import { Organization } from 'src/app/models/Organization';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';
import { User } from 'src/app/models/User';
import { userInfo } from 'os';
import { OrganizationsService } from 'src/app/services/organizations.service';
import { Language } from 'src/app/utilities/Language';
//import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})

export class ProjectPage implements OnInit {

  projectTitle: string = Language.Lang.projectHeader;
  projectEdit: string = Language.Lang.projectEdit;
  projectVolunteers: string = Language.Lang.projectVolunteers;
  projectFind: string = Language.Lang.projectFind;
  projectSaved: string = Language.Lang.projectSaved;
  projectsYouVolunteer: string = Language.Lang.projectsYouVolunteer;
  projectSave: string = Language.Lang.projectSave;
  projectsToVolunteer: string = Language.Lang.projectsToVolunteer;
  projectStart: string = Language.Lang.projectStart;
  projectEnd: string = Language.Lang.projectEnd;
  projectGoBack: string = Language.Lang.projectGoBack;

  user: User = new User();
  project: Project = new Project();
  volunteer: Volunteer = new Volunteer();
  organization: Organization = new Organization();
  newUrl = '';
  role: number = 4;
  defaulUrl: string = 'https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg';
  owner: boolean = false;
  saved: boolean = false;
  selected: boolean = false;
  id: number;

  constructor(
    private usersService: UsersService,
    private volunteersService: VolunteersService,
    private projectsService: ProjectsService,
    private organizationService: OrganizationsService,
    private route: ActivatedRoute,
    public navCtrl: NavController
    //   private clipboard: Clipboard
  ) { }

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
    this.id = id;
    this.projectsService.getById(id).subscribe(value => {
      this.project = value;
      this.stringparse();
      this.getRole();
      if (this.role == 2) {
        this.setVolunteer();
        this.checkForProjects();
      }
      const userId = this.usersService.getTokenId();
      if (userId == this.project.organizationId) {
        this.owner = true;
        console.log('Savininkas');
      } else {
        this.owner = false;
      }
    }, error1 => {
      console.log(error1);
    });
  }

  checkForProjects() {
    //turetu patikrint ar jau pasirinkes projekta ar pridejes prie saved, kad matytusi lange
    this.selected = false;
    this.saved = false;
    const id = this.usersService.getTokenId();
    if (this.project.savedVolunteersIds.indexOf(+id) > -1) {
      this.saved = true;
    }
    if (this.project.volunteersIds.indexOf(+id) > -1) {
      this.selected = true;
    }
  }

  btnActivate(ionicButton) {
    if (ionicButton.color === 'dark')
      ionicButton.color = 'success';
    else if (ionicButton.color == 'success')
      ionicButton.color = 'dark';
    else
      ionicButton.color = "success";
  }

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

  onPhoneClicked(phone: string) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (phone));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  onEmailClicked(email: string) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (email));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  addToSaveList() {
    //const userId = this.usersService.getTokenId();
    this.projectsService.addSavedProject(this.id).subscribe(value => {
      this.saved = true;
    }, error => {
      console.log(error);
    });
  }

  removeFromSaveList() {
    this.projectsService.removeSavedProject(this.id).subscribe(value => {
      this.saved = false;
    }, error => {
      console.log(error);
    });
  }

  addToSelecteDProjectS() {
    this.projectsService.addSelectedProject(this.id).subscribe(value => {
      this.selected = true;
    }, error => {
      console.log(error);
    });
    //const userId = this.usersService.getTokenId();
    //this.selected=true;
    //console.log('User id ' + userId + ' update to selected list');
    //console.log('Volunteer id '+this.volunteer.id);
  }

  removeFromSelectedProjectS() {
    this.projectsService.removeSelectedProject(this.id).subscribe(value => {
      this.selected = false;
    }, error => {
      console.log(error);
    });
  }

  setVolunteer() {
    const userId = this.usersService.getTokenId();
    this.volunteersService.getByUsersId(userId).subscribe(value => {
      this.volunteer = value;
    }, error1 => {
      console.log(error1);
    });
  }
  updateUrl(event) {
    this.project.imageUrl = Strings.Default_Image_Url;//this.defaulUrl;
  }
  goToProjects() {
    this.navCtrl.pop();
    //    this.navCtrl.back();
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
