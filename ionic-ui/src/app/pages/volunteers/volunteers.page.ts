import { Component, OnInit } from '@angular/core';
import { Volunteer } from 'src/app/models/Volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { Strings } from 'src/app/constants/Strings';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.page.html',
  styleUrls: ['./volunteers.page.scss'],
})
export class VolunteersPage implements OnInit {

  project: Project = {
    id: 1,
    title: 'VSI projektas',
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
    firstName: 'Petriuke',
    lastName: 'Pavarde1',
    phone : '860298***',
    email: 'susieikti@gmail.com',
    description: 'Dirba ir labai gerai',
    pictureId: 21,
    userId: 11,
    projectsIds: [1],
    imageUrl:'https://www.ableto.com/wp-content/uploads/2018/02/7-Mental-Health-Benefits-of-Volunteering-664x443px.jpg',
    reviewsIds: [2],
},   {
  id: 2,
  firstName: 'Petras',
  lastName: 'Pavarde2',
  phone : '860298***',
  email: 'susieikti@gmail.com',
  description: 'Dirba bet nelabai gerai, daugiau informacijos net negu mes tikimes.Dirba bet nelabai gerai, daugiau informacijos net negu mes tikimes.Dirba bet nelabai gerai, daugiau informacijos net negu mes tikimes.Dirba bet nelabai gerai, daugiau informacijos net negu mes tikimes',
  pictureId: 21,
  userId: 11,
  projectsIds: [1],
  imageUrl:'https://qph.fs.quoracdn.net/main-qimg-73f94b1a6a02e2f70be80489a8526ad1.webp',
  reviewsIds: [2],
},   {
  id: 3,
  firstName: 'Petraitien',
  lastName: 'Pavarde3',
  phone : '860298***',
  email: 'susieikti@gmail.com',
  description: 'Nedirba ir tikrai nelabai gerai',
  pictureId: 21,
  userId: 11,
  projectsIds: [1],
  imageUrl:'https://kbsei3h2g2poy8x12ia6346k-wpengine.netdna-ssl.com/wp-content/uploads/2015/04/smiling-fountain-of-youth-1024x935.jpg',
  reviewsIds: [2],
}];

  constructor(
    private organizationsService: VolunteersService, 
    private route: ActivatedRoute,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    ) { }

  ngOnInit() {

  }
  onVolunteerClicked(volunteer:Volunteer){
    console.log('paspaude');
    console.log(volunteer.firstName);
    this.showVolunteerInfo(volunteer);
  }
  async showVolunteerInfo(volunteer:Volunteer) {
    const alert = await this.alertCtrl.create({
      header: 'More about '+volunteer.firstName,
      subHeader: 'Contact: '+volunteer.phone +' or '+ volunteer.email,
      message: volunteer.description,
      buttons: [
        /*{
          //https://www.freakyjolly.com/ionic-4-how-to-call-a-number-directly-from-ionic-4-native-application/
          text: 'Go to users page',
         //'Tokio lyg ir neturim, tai nezinau ar ir reika'
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });
        */
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }
}
