import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Language } from 'src/app/utilities/Language';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  menuAboutUs:string=Language.Lang.menuAboutUs;
  aboutTitle: string=Language.Lang.aboutTitle;
  aboutTitle2: string=Language.Lang.aboutTitle2;
  aboutParag1: string=Language.Lang.aboutParag1;
  aboutParag2: string=Language.Lang.aboutParag2;
  aboutParag3: string=Language.Lang.aboutParag3;
  aboutParag4: string=Language.Lang.aboutParag4;
  aboutParag5: string=Language.Lang.aboutParag5;
  aboutParag6: string=Language.Lang.aboutParag6;
  aboutVisit: string=Language.Lang.aboutVisit;
  aboutOpinion: string=Language.Lang.aboutOpinion;
  aboutButtonComment: string=Language.Lang.aboutButtonComment;
  aboutButtonVideo: string=Language.Lang.aboutButtonVideo;
  aboutEnterEmail: string=Language.Lang.aboutEnterEmail;
  aboutFeelFree: string=Language.Lang.aboutFeelFree;
  aboutComment: string=Language.Lang.aboutComment;
  aboutRequired: string=Language.Lang.aboutRequired;


  public commentForm: FormGroup;
  sources: string[];
  public spin = true;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private streamingMediaOriginal: StreamingMedia
  ) { }
  startVideo(){
   let options: StreamingVideoOptions = { 
     successCallback: () => { console.log() },
     errorCallback: () => {console.log() },
     orientation: 'landscape'
   }
   this.streamingMediaOriginal.playVideo('https://drive.google.com/uc?authuser=0&id=1m1CcQUV15qzUJpdmG48rgsTMb-UKUjmN&export=download', options);

  }
  ngOnInit() {

    this.sources =
      [
        'https://www.gvi.co.uk/blog/17-excellent-reasons-to-volunteer/',
        'https://buildabroad.org/2017/10/13/why-is-volunteering-important/',
        'https://www.thebalancesmb.com/unexpected-benefits-of-volunteering-4132453'
      ];

    this.commentForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'text': [null, Validators.compose([
        Validators.required
      ])]
    });
    this.spin=false;
  }

  leaveComment() {
    this.sendEmail();
  }

  async commentResult() {
    const alert = await this.alertCtrl.create({
      header: Language.Lang.aboutAlertCommentHeader,
      message: Language.Lang.aboutAlertCommentMessage,
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
              'text': [null]
            });

          }
        }
      ]
    });
    await alert.present();
  }

  async onSourceClicked(source: string) {
    const alert = await this.alertCtrl.create({
      header: Language.Lang.aboutSourceHeader,
      message: Language.Lang.aboutSourceMessage,
      buttons: [
          {
              text: Language.Lang.alertCancel,
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                  console.log('Confirm Cancel');
              }
          }, {
              text: Language.Lang.alertConfirm,
              handler: () => {
                  console.log('Confirmed');
                  window.open(source, '_system')
                }
              }
      ]
  });

  await alert.present();
  }

  sendEmail() {

    let url = `https://us-central1-volunteer-ui.cloudfunctions.net/sendMail`

    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let params: object = {
      to: 'volunteering.platypus@gmail.com',
      subject: this.commentForm.value.email,
      content: this.commentForm.value.text
    };

    return this.http.post(url, params, { headers: headers })
      .toPromise()
      .then(res => {
        this.commentResult();
      })
      .catch(err => {
        console.log(err) // error popup
      })

  }
}