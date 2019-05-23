import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-moderators-console',
  templateUrl: './moderators-console.page.html',
  styleUrls: ['./moderators-console.page.scss'],
})
export class ModeratorsConsolePage implements OnInit {

  constructor(
    private usersService: UsersService,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    const role = this.usersService.getTokenRole();
    if(role != 1){
      this.navCtrl.navigateRoot('not-found');
    }
  }
}
