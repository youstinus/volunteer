import {Component, OnInit} from '@angular/core';
import {Project} from 'src/app/models/Project';
import {ProjectsService} from '../../services/projects.service';
import {ActivatedRoute} from '@angular/router';

import { NavController, IonButton } from '@ionic/angular';
import { Button } from 'protractor';
import {Strings} from '../../constants/Strings';
// import { Clipboard } from '@ionic-native/clipboard/ngx';
@Component({
    selector: 'app-project',
    templateUrl: './project.page.html',
    styleUrls: ['./project.page.scss'],
})

export class ProjectPage implements OnInit {

    project: Project = {
        id: 1,
        title: 'VšĮ Pagirk',
        description: 'Kviečiami savanoriai įvairiems pagalbiniams darbams atlikti:•gyvūnų priežiūrai•aplinkos tvarkymui Lietuvos zoologijos sode;•pagalbai ruošiantis renginiams (dekoracijų gaminimas, idėjų generavimas, veiklų koordinavimas ir vykdymas renginio dieną, gyvūnų pristatymas',
        email: 'email@test.com',
        organizationId: 5,
        phone: '866666666',
        picturesIds: [1],
        start: new Date('2019-05-01'),
        end: new Date('2019-05-01'),
        volunteersIds: [2],
        website: 'https://www.vdu.lt/en/studies/international-student-handbook/volunteering/',
        imageUrl: Strings.Default_Image_Url,
        location: 'lietuva, kaunas'
    };

    constructor(private projectsService: ProjectsService, private route: ActivatedRoute, public navCtrl: NavController) {

        
    }
    onSourceClicked(source: string){
      window.open(source, '_system')
    }
    btnActivate(ionicButton) {
        if(ionicButton.color === 'dark')
          ionicButton.color =  'success';
        else if(ionicButton.color == 'success')
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
    btnClicked()
    {
        alert("This page successfully saved");
        
    }
     
    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        this.projectsService.getById(id).subscribe(value => {
            this.project = value;
        }, error1 => {
            console.log(error1);
        });
    }
    labClick()
    {

    }

    onVolunteersNavigate() {
      this.navCtrl.navigateForward('volunteers/project/'+this.project.id).catch(reason => console.log(reason));
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
            event.target.className =event.target.className.replace('button-md-' + prevColor, 'button-md-' + this.color);
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
