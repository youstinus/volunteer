import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public commentForm: FormGroup;
  sources: string[];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {

    this.sources=
    [
      'https://www.gvi.co.uk/blog/17-excellent-reasons-to-volunteer/',
      'https://buildabroad.org/2017/10/13/why-is-volunteering-important/'
    ];

    this.commentForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required ,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'text': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  leaveComment(){
    console.log(this.commentForm.value);
    this.commentResult();
  }

  async commentResult() {
    const alert = await this.alertCtrl.create({
      header: 'Thank you',
      message: 'Your email has been submited',
      buttons: [
        {
          text: 'Continue',
          role: 'Continue',
          cssClass: 'secondary',
          handler: () => {
            // noreciau kad duomenys issitrintu?
            console.log('Confirm continue');
            
            this.commentForm.setValue({
              'email': [null],
              'text' : [null]
            });
            
          }
        }
      ]
    });
    await alert.present();
  }

  onSourceClicked(source: string){
    console.log('Gal pavyktu kaip nors cia nauja page atidaryt? ');
    //this.navCtrl.navigateForward(source);
  }

}
