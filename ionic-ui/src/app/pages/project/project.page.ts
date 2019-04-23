import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonButton } from '@ionic/angular';
import { Button } from 'protractor';
import { Strings } from '../../constants/Strings';
// import { Clipboard } from '@ionic-native/clipboard/ngx';
@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})

export class ProjectPage implements OnInit {

  project: Project = new Project();
  newUrl = '';

  constructor(private projectsService: ProjectsService, private route: ActivatedRoute, public navCtrl: NavController) {


  }
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

  btnActivate(ionicButton) {
    if (ionicButton.color === 'dark')
      ionicButton.color = 'success';
    else if (ionicButton.color == 'success')
      ionicButton.color = 'dark';
    else
      ionicButton.color = "success";

    console.log(ionicButton);
  }

  isSelected(event) {
    console.log(event);
    return 'primary';
    // event.target.getAttribute('selected') ? 'primary' : '';
  }
  btnClicked() {
    alert("This page successfully saved");
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.projectsService.getById(id).subscribe(value => {
      this.project = value;
      this.stringparse();
    }, error1 => {
      console.log(error1);
    });
  }
  labClick() {

  }
  onEditNavigate() {
    this.navCtrl.navigateForward('project-edit/' + this.project.id).catch(reason => console.log(reason));
  }
  onVolunteersNavigate() {
    this.navCtrl.navigateForward('volunteers/project/' + this.project.id).catch(reason => console.log(reason));
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
