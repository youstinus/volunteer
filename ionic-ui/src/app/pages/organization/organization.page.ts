import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/Organization';
import {Volunteer} from '../../models/Volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';
import {ActivatedRoute} from '@angular/router';
import {OrganizationsService} from '../../services/organizations.service';
import {Project} from '../../models/Project';
import {AlertController, NavController} from '@ionic/angular';
import {Review} from '../../models/Review';
import {ReviewsService} from '../../services/reviews.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import {User} from "../../models/User";
import {Strings} from "../../constants/Strings";
@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {


  organization: Organization = {
    id: 11,
    projectsIds: [1],
    title: 'VšĮ Pagirk',
    description: 'Kviečiami savanoriai įvairiems pagalbiniams darbams atlikti:•gyvūnų priežiūrai•aplinkos tvarkymui Lietuvos zoologijos sode;•pagalbai ruošiantis renginiams (dekoracijų gaminimas, idėjų generavimas, veiklų koordinavimas ir vykdymas renginio dieną, gyvūnų pristatymas',
    website: 'google.com',
    userId: 5,
    phone: '866666666',
    picturesIds: [1],
    address: 'studentu g.',
    email: 'test@gmail.com',
    imageUrl: ''
  };
  reviews: Review[] = [{
    id: 13,
    title: 'Yaga',
    grade: 5,
    text: 'Yeet skeet, labai gers , labai patiko, skibidy bap bap skrrt',
    organizationId: 11,
    volunteerId: 4
  },
    {
      id: 14,
      title: 'Yeet',
      grade: 5,
      text: 'Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet Yeet YeetYeet Yeet Yeet ',
      organizationId: 11,
      volunteerId: 4
    }

  ];

  volunteers: Volunteer[];
  projects: Project[];



  public onCreateForm: FormGroup;
  user: User = new User();
  project: Project = new Project();
  volunteer: Volunteer = new Volunteer();
  //organization: Organization = new Organization();
  newUrl = '';
  role: number = 4;
  defaulUrl: string = 'https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg';

  id: number;
  constructor(
      private organizationsService: OrganizationsService,
      private usersService: UsersService,
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private reviewsService: ReviewsService,
      private formBuilder: FormBuilder,
      private volunteersService: VolunteersService,
      public alertCtrl: AlertController
  ) {}
  createReview: Review = new Review();

  ngOnInit() {
    this.getRole();
    this.stringparse();
    console.log(this.getRole());
    const id = this.route.snapshot.params['id'];
    this.organizationsService.getById(id).subscribe(value => {
      this.organization = value;
    }, error1 => {
      console.log(error1);
    });

    this.reviewsService.getReviews(id).subscribe(value => {
      this.reviews = value;
      this.reviews.map(value1 => value1.organizationId === this.organization.id);
    }, error1 => {
      console.log(error1);
    });
    this.organizationsService.getProjectsByOrganizationId(id).subscribe(value => {
      this.projects = value;
    }, error1 => {
      console.log(error1);
    });
    this.onCreateForm = this.formBuilder.group({
      'text': [null, Validators.compose([
        Validators.required
      ])],
      'title': [null, Validators.compose([
        Validators.required
      ])],
      'grade': [null, Validators.compose([
          Validators.required

      ])],
      'organizationId': this.organization.id,
      'volunteerId': this.setVolunteer(),

    });

  }
  async onCreate() {
    console.log(this.onCreateForm.value);
    this.reviewsService.create(this.onCreateForm.value).subscribe(value => {
      console.log(value);
      this.createReview = value;
      // location.assign('');
    }, error1 => {
      console.log(error1);
      //this.NotCreated();
    });
  }
    async NotCreated() {
      const alert = await this.alertCtrl.create({
        header: 'Review was not created',
        message: 'Please, fill in required fields',
        buttons: ['OK']
      });
      await alert.present();
    }


  setVolunteer() {
    const userId = this.usersService.getTokenId();
    this.volunteersService.getByUsersId(userId).subscribe(value => {
      this.volunteer = value;
    }, error1 => {
      console.log(error1);
    });
  }
  // consider transfering whole object to project page to reduce time
  onProjectClicked(id: number) {
    this.navCtrl.navigateForward('projects/' + id).catch(reason => console.log(reason));
  }



  on5StarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(5);
  }

  on4StarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(4);
  }
  on3StarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(3);
  }
  on2StarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(2);
  }

  on1StarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(1);
  }



  stringparse() {
    let newurl: string = '';
    newurl += 'https://maps.google.com/maps?q=';
    if (this.organization !== null && this.organization.address !== null && this.organization.address !== '') {
      newurl += this.organization.address.replace(' ', '%20').replace(',', '%2C');
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

  updateUrl(event) {
    this.project.imageUrl = Strings.Default_Image_Url;//this.defaulUrl;
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
  checkRole() {
   if( this.role == 4)
     return 1
  }



}


