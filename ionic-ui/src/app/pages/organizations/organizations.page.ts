import {Component, OnInit} from '@angular/core';
import {Organization} from '../../models/Organization';
import {OrganizationsService} from '../../services/organizations.service';
import {NavController} from '@ionic/angular';

import {Strings} from '../../constants/Strings';
import {ReviewsService} from '../../services/reviews.service';
import {Language} from '../../utilities/Language';

@Component({
    selector: 'app-organizations',
    templateUrl: './organizations.page.html',
    styleUrls: ['./organizations.page.scss'],
})
export class OrganizationsPage implements OnInit {
    orgsHeader: string = Language.Lang.orgsHeader;
    defaulUrl: string = 'https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg';
    public spin = true;
    organizations: Organization[];

    constructor(private organizationsService: OrganizationsService, private navCtrl: NavController, private reviewsService: ReviewsService) {
    }

    ngOnInit() {
        this.organizationsService.get().subscribe(items => {
            this.organizations = items;
            this.spin = false;
            },
            error1 => {
                console.log(error1);
            });
    }


    onOrganizationClicked(organization: Organization) {
        this.navCtrl.navigateForward('organizations/' + organization.id).catch(reason => console.log(reason));
    }

    updateUrl(organization: Organization) {
        organization.imageUrl = Strings.Default_Image_Url;
    }
}
