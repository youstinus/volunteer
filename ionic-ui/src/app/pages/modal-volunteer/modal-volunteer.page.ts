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

  constructor(
    private navParms: NavParams,
    private modalCtrl: ModalController
  
  ) { }

  ngOnInit() {
    console.log('pateko');
    console.log(this.volname);
    console.log(this.volphone);
    console.log(this.volemail);
    console.log(this.voldescrip);

  }

  ionViewWillLoad(){

  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
