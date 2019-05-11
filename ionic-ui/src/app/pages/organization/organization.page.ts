import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/Organization';
import {Volunteer} from '../../models/Volunteer';
import {ActivatedRoute} from '@angular/router';
import {OrganizationsService} from '../../services/organizations.service';
import {Project} from '../../models/Project';
import {AlertController, NavController} from '@ionic/angular';
import {Review} from '../../models/Review';
import {ReviewsService} from '../../services/reviews.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
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
    address: 'test g. 696',
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
  constructor(
      private organizationsService: OrganizationsService,
      private usersService: UsersService,
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private reviewsService: ReviewsService,
      private formBuilder: FormBuilder,
      public alertCtrl: AlertController
  ) {}
  createReview: Review = new Review();

  ngOnInit() {
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

      ])],
      'volunteerId': this.usersService.getId(),

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



  // consider transfering whole object to project page to reduce time
  onProjectClicked(id: number) {
    this.navCtrl.navigateForward('projects/' + id).catch(reason => console.log(reason));
  }

  onWebClicked(website: string) {
    window.open('//' + website, '_blank');
  }

  on5StarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(5);
  }

  on4halfStarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(4.5);
  }
  on4StarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(4);
  }
  on3halfStarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(3.5);
  }
  on3StarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(3);
  }
  on2halfStarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(2.5);
  }
  on2StarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(2);
  }
  on1halfStarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(1.5);
  }
  on1StarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(1);
  }
  onhalfStarClicked()
  {
    this.onCreateForm.controls['grade'].setValue(0.5);
  }


}


