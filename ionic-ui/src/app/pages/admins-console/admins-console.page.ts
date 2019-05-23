import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-admins-console',
  templateUrl: './admins-console.page.html',
  styleUrls: ['./admins-console.page.scss'],
})
export class AdminsConsolePage implements OnInit {

  constructor(
    private usersService: UsersService,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    const role = this.usersService.getTokenRole();
    if(role != 0){
      this.navCtrl.navigateRoot('not-found');
    }
  }
}
