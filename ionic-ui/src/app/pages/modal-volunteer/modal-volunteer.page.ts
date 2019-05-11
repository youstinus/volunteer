import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ViewController } from '@ionic/core/dist/types/components/nav/nav-interface';
import { Volunteer } from 'src/app/models/Volunteer';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-modal-volunteer',
  templateUrl: './modal-volunteer.page.html',
  styleUrls: ['./modal-volunteer.page.scss'],
})
export class ModalVolunteerPage implements OnInit {
  @Input("volname") volname;
  @Input("volphone") volphone;
  @Input("volemail") volemail;
  @Input("voldescrip") voldescrip;
  @Input("volPic") volPic;
  defaulUrl: string = 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png';

  constructor(
    private navParms: NavParams,
    private modalCtrl: ModalController
  
  ) { }

  ngOnInit() {

  }

  ionViewWillLoad(){

  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
