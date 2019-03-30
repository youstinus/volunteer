import { Component, OnInit } from '@angular/core';
import { Volunteer } from 'src/app/models/Volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { Strings } from 'src/app/constants/Strings';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.page.html',
  styleUrls: ['./volunteers.page.scss'],
})
export class VolunteersPage implements OnInit {

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
    website: 'https://volunteering.com',
    imageUrl: Strings.Default_Image_Url
};

  volunteers: Volunteer[]= [
    {
    id: 1,
    firstName: 'Petriukas',
    lastName: 'Pavarde1',
    phone : '860298***',
    email: 'susieikti@gmail.com',
    description: 'Dirba ir labai gerai',
    pictureId: 21,
    userId: 11,
    projectsIds: [1],
    imageUrl:'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTUzMzQzOTkxMDAwMDgxNzA2/jason-statham-attends-the-press-conference-of-director-f-gary-grays-film-the-fate-of-the-furious-on-march-23-2017-in-beijing-china-photo-by-vcg_vcg-via-getty-images-square.jpg',
    reviewsIds: [2],
},   {
  id: 2,
  firstName: 'Petras',
  lastName: 'Pavarde2',
  phone : '860298***',
  email: 'susieikti@gmail.com',
  description: 'Dirba bet nelabai gerai',
  pictureId: 21,
  userId: 11,
  projectsIds: [1],
  imageUrl:'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTUzMzQzOTkxMDAwMDgxNzA2/jason-statham-attends-the-press-conference-of-director-f-gary-grays-film-the-fate-of-the-furious-on-march-23-2017-in-beijing-china-photo-by-vcg_vcg-via-getty-images-square.jpg',
  reviewsIds: [2],
},   {
  id: 3,
  firstName: 'Petraitis',
  lastName: 'Pavarde3',
  phone : '860298***',
  email: 'susieikti@gmail.com',
  description: 'Nedirba ir tikrai nelabai gerai',
  pictureId: 21,
  userId: 11,
  projectsIds: [1],
  imageUrl:'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTUzMzQzOTkxMDAwMDgxNzA2/jason-statham-attends-the-press-conference-of-director-f-gary-grays-film-the-fate-of-the-furious-on-march-23-2017-in-beijing-china-photo-by-vcg_vcg-via-getty-images-square.jpg',
  reviewsIds: [2],
}];

  constructor(private organizationsService: VolunteersService, private route: ActivatedRoute) { }

  ngOnInit() {

  }
  onVolunteerClicked(Volunteer:Volunteer){
    console.log('paspaude');
  }
}
