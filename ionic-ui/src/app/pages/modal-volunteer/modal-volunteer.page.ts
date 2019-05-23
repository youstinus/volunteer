import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Language } from 'src/app/utilities/Language';
import { Strings } from 'src/app/constants/Strings';

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

  defaulUrl: string = Strings.Default_Image_Url2;

  modalVAnonymous: string = Language.Lang.modalVAnonymous;
  modalVContatInfo: string = Language.Lang.modalVContatInfo;
  modalNone: string = Language.Lang.modalNone;
  modalVDescription: string = Language.Lang.modalVDescription;
  modalClose: string = Language.Lang.modalClose;

  constructor(
    private modalCtrl: ModalController

  ) { }

  ngOnInit() { }

  ionViewWillLoad() { }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
