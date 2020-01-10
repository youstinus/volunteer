import { Component, OnInit, SkipSelf } from '@angular/core';
import { Organization } from '../../models/Organization';
import { OrganizationsService } from '../../services/organizations.service';
import { NavController } from '@ionic/angular';

import { Strings } from '../../constants/Strings';
import { ReviewsService } from '../../services/reviews.service';
import { Language } from '../../utilities/Language';

@Component({
    selector: 'app-organizations',
    templateUrl: './organizations.page.html',
    styleUrls: ['./organizations.page.scss'],
})
export class OrganizationsPage implements OnInit {
    orgsHeader: string = Language.Lang.orgsHeader;
    defaulUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
    public spin = true;
    organizations: Organization[];

    constructor(private organizationsService: OrganizationsService, private navCtrl: NavController, private reviewsService: ReviewsService) {
    }

    ngOnInit() {
        this.organizationsService.get().subscribe(items => {
            this.organizations = items.filter(function (value) {
                if (value.imageUrl != null && value.imageUrl != '' && value.email != null && value.title != null) {
                    return true;
                } else { false; }
            }).map(function (value) { return value; });
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
