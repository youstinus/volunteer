import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/Organization';
import {Volunteer} from '../../models/Volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';
import {ActivatedRoute} from '@angular/router';
import {OrganizationsService} from '../../services/organizations.service';
import {AlertController, NavController} from '@ionic/angular';
import {Review} from '../../models/Review';
import {ReviewsService} from '../../services/reviews.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import {User} from "../../models/User";
import {Strings} from "../../constants/Strings";
import { Language } from 'src/app/utilities/Language';
import { Project } from 'src/app/models/Project';
import { ProjectsService } from '../../services/projects.service';



@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {

  orgsHeader: string = Language.Lang.orgHeader;
  orgGoToProject: string = Language.Lang.orgGoToProject;
  orgClipBoard: string = Language.Lang.orgClipBoard;
  orgFindUs: string = Language.Lang.orgFindUs;
  orgComment: string = Language.Lang.orgComment;
  orgComments: string = Language.Lang.orgComments;
  orgDelteComment : string = Language.Lang.orgDelComment;
  orgProjects : string = Language.Lang.orgProjects;

  userId: number;
  id: number;
  reviews: Review[];
  createReview: Review = new Review();
  sum: number;
  average: number;
  names : string;
  volunteers: Volunteer[];
  projects: Project[];
  public onCreateForm: FormGroup;
  user: User = new User();
  owner: boolean = false;
  currentUser: number;
  volunteer: Volunteer;
  organization: Organization = new Organization();
  newUrl = '';
  role: number = 4;
  defaulUrl: string = 'https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg';

  constructor(
      private organizationsService: OrganizationsService,
      private usersService: UsersService,
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private reviewsService: ReviewsService,
      private formBuilder: FormBuilder,
      private volunteersService: VolunteersService,
      public alertCtrl: AlertController,
      public    projectService: ProjectsService,
  ) {
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

  ngOnInit() {
    this.getRole();
    this.getVolunteer(18);
    console.log(this.volunteers);
    const id = this.route.snapshot.params['id'];
    this.id = id;


    this.organizationsService.getById(id).subscribe(value => {
      this.organization = value;
      this.userId = this.organization.userId;

      this.stringparse();
    }, error1 => {
      console.log(error1);
    });

    this.reviewsService.get().subscribe(value1 => {

      this.reviews = value1;//.find(val1 => val1.organizationId ===this.id);
      this.currentUser = this.usersService.getTokenId();

      this.del();
      this.isOwner();
      console.log(this.owner);
      console.log(this.reviews);
      console.log(this.id);
    }, error1 => {
      console.log(error1);
    });

    this.projectService.get().subscribe(value => {
      this.projects = value.filter(val => val.organizationId === this.userId);

      console.log(this.projects);
      console.log(this.userId);
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
      'organizationId': this.id,

      'volunteerId': this.userId


    });


  }

  async onCreate() {
    console.log(this.onCreateForm.value);
    this.reviewsService.create(this.onCreateForm.value).subscribe(value => {
      console.log(value);
      this.createReview = value;

    }, error1 => {
      console.log(error1);

    });
  }

  onProjectClicked(id: number) {
    this.navCtrl.navigateForward('projects/' + id).catch(reason => console.log(reason));
  }


  on5StarClicked() {
    this.onCreateForm.controls['grade'].setValue(5);
  }

  on4StarClicked() {
    this.onCreateForm.controls['grade'].setValue(4);
  }

  on3StarClicked() {
    this.onCreateForm.controls['grade'].setValue(3);
  }

  on2StarClicked() {
    this.onCreateForm.controls['grade'].setValue(2);
  }

  on1StarClicked() {
    this.onCreateForm.controls['grade'].setValue(1);
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
    this.organization.imageUrl = Strings.Default_Image_Url;//this.defaulUrl;
  }

  getRole() {
    const role = this.usersService.getTokenRole();
    if (role === 'Volunteer') {
      this.role = 2;
    } else if (role === 'Organization') {
      this.role = 3;
    } else if (role === 'Moderator') {
      this.role = 1;
    } else if (role === 'Admin') {
      this.role = 0;
    } else {
      this.role = 4;
    }
  }

  checkRole() {
    if (this.role === 4)
      return 1;
  }


  getAverage() {
    if (this.reviews !== undefined && this.reviews !== null) {
      const sum = this.reviews.filter(item => item.grade && item.organizationId === this.organization.id)
          .reduce((sum, current) => sum + current.grade, 0);
      const count = this.reviews.filter((x) => {
        return x.organizationId === this.organization.id;
      });
      var lngth = count.length;
      //console.log(sum);
      return sum / lngth;
    } else {
      return 0;
    }
  }

  del() {
    for (var i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].organizationId != this.id) {
        this.reviews.splice(i, 1);
        i--;
      }
    }
  }

  isOwner() {

    for (var i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].volunteerId == this.currentUser) {
        this.owner = true;
        break;
      }
    }
  }

  delReview(id)
  {
    this.reviewsService.delete(id).subscribe(value => {
      console.log(value);

    },
        error1 => {
          console.log(error1);
        });

  }

  getVolunteer(id)
  {




  }

}





