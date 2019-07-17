import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Language } from 'src/app/utilities/Language';
import { Strings } from 'src/app/constants/Strings';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  menuAboutUs: string = Language.Lang.menuAboutUs;
  aboutTitle: string = Language.Lang.aboutTitle;
  aboutTitle2: string = Language.Lang.aboutTitle2;
  aboutParag1: string = Language.Lang.aboutParag1;
  aboutParag2: string = Language.Lang.aboutParag2;
  aboutParag3: string = Language.Lang.aboutParag3;
  aboutParag4: string = Language.Lang.aboutParag4;
  aboutParag5: string = Language.Lang.aboutParag5;
  aboutParag6: string = Language.Lang.aboutParag6;
  aboutVisit: string = Language.Lang.aboutVisit;
  aboutOpinion: string = Language.Lang.aboutOpinion;
  aboutButtonComment: string = Language.Lang.aboutButtonComment;
  aboutButtonVideo: string = Language.Lang.aboutButtonVideo;
  aboutEnterEmail: string = Language.Lang.aboutEnterEmail;
  aboutFeelFree: string = Language.Lang.aboutFeelFree;
  aboutComment: string = Language.Lang.aboutComment;
  aboutRequired: string = Language.Lang.aboutRequired;
  emailWasNotSent: string = Language.Lang.toastEmailWasNotSent;

  imageSource: string = Strings.About_Page_Image;
  public commentForm: FormGroup;
  public sources: string[] = [
    Strings.About_Page_Source1,
    Strings.About_Page_Source2,
    Strings.About_Page_Source3
  ];
  public spin = true;
  public isMobile = false;

  constructor(
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private streamingMediaOriginal: StreamingMedia,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.initialise();
  }

  initialise() {
    this.isMobile = this.getIsMobile();
    this.commentForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required, Validators.pattern(Strings.Email_Pattern)
      ])],
      'text': [null, Validators.compose([
        Validators.required
      ])]
    });
    this.spin = false;
  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 981;
    return w < breakpoint;
  }

  startVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { },
      errorCallback: () => { },
      orientation: 'landscape'
    }
    this.streamingMediaOriginal.playVideo(Strings.Video_Url_Google_Drive, options);
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
          handler: () => { }
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
          handler: () => { }
        }, {
          text: Language.Lang.alertConfirm,
          handler: () => {
            window.open(source, '_system')
          }
        }
      ]
    });
    await alert.present();
  }

  sendEmail() {
    let url = Strings.Send_Email_Address;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let params: object = {
      to: Strings.Platypus_Email,
      subject: this.commentForm.value.email,
      content: this.commentForm.value.text
    };

    return this.http.post(url, params, { headers: headers })
      .toPromise()
      .then(res => {
        this.commentResult();
        this.commentForm.reset();
      })
      .catch(err => {
        this.toastService.presentToast(this.emailWasNotSent, Strings.Color_Danger);
      })
  }
}