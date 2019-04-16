import {Picture} from '../models/Picture';
import {Strings} from './Strings';
import {Project} from '../models/Project';
import {Organization} from '../models/Organization';
import { Volunteer } from '../models/Volunteer';

export class Objects {
    public static Empty_Organization = {
        userId: null,
        description: null,
        email: null,
        imageUrl: null,
        phone: null,
        projectsIds: [],
        id: null,
        address: null,
        picturesIds: [],
        title: null,
        website: null
    };

    public static Empty_Volunteer = {
        userId: null,
        description: null,
        email: null,
        firstName: null,
        imageUrl: null,
        lastName: null,
        phone: null,
        pictureId: null,
        projectsIds: [],
        reviewsIds: [],
        id: null
    };

    public static Empty_Project = {
        id: null,
        title: null,
        description: null,
        email: null,
        organizationId: null,
        phone: null,
        picturesIds: null,
        start: null,
        end: null,
        volunteersIds: null,
        website: null,
        imageUrl: null
      };

      public static Empty_Volunteer_Arr : Volunteer[] = [{
        userId: null,
        description: null,
        email: null,
        firstName: null,
        imageUrl: null,
        lastName: null,
        phone: null,
        pictureId: null,
        projectsIds: [],
        reviewsIds: [],
        id: null
      }];

    public static Default_Picture: Picture = {
        volunteerId: 0,
        url: Strings.Default_Image_Url,
        title: 'Default',
        projectId: 0,
        organizationId: 0,
        id: 0
    };

    public static Four_Test_Projects: Project[] = [
        {
            id: 1,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-02-05'),
            title: 'Conservation Work in the Himalayas in Nepal',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 2,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-04-05'),
            title: 'Shark Conservation Volunteering in Fiji',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 3,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-02-05'),
            title: 'Marine Conservation Volunteering in Thailand',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 4,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-02-05'),
            title: 'Conservation Volunteering in the Galapagos Islands',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }
    ];

    public static Four_Test_Organizations: Organization[] = [
        {
            id: 1,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            address: '',
            userId: 0,
            phone: '866666666',
            picturesIds: [],
            title: 'AIESEC',
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url,
            projectsIds: []
        }, {
            id: 2,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            address: '',
            userId: 0,
            phone: '866666666',
            picturesIds: [],
            title: 'Habitat for Humanity',
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url,
            projectsIds: []
        }, {
            id: 3,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            address: '',
            userId: 0,
            phone: '866666666',
            picturesIds: [],
            title: 'United Nations Volunteers',
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url,
            projectsIds: []
        }, {
            id: 4,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            address: '',
            userId: 0,
            phone: '866666666',
            picturesIds: [],
            title: 'Peace Corps',
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url,
            projectsIds: []
        }
    ];

    public static Test_Projects: Project[] = [
        {
            id: 1,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-02-05'),
            title: 'Volunteer Conservation Work in the Himalayas in Nepal',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 2,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-04-05'),
            title: 'Shark Conservation Volunteering in Fiji',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 3,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-02-05'),
            title: 'Marine Conservation Volunteering in Thailand',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 4,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2019-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2018-03-02'),
            title: 'Conservation Volunteering in the Galapagos Islands',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 5,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Volunteer with Children in Ghana',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 6,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Volunteer Teaching English in Costa Rica',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 7,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Volunteer with Children in Nepal as a Teenager',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 8,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Volunteer in the Amazon Rainforest in Peru',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 9,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2019-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Incan and Wari Archaeology Volunteering in Peru',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 10,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Conservation Volunteering in the Galapagos Islands',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 11,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Volunteer with Children in Ghana',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 12,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Volunteer Teaching English in Costa Rica',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 13,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Medical Internships in Ghana for Teenagers',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 14,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Medicine Internship in Tanzania',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 15,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Law and Human Rights Internship in South Africa',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 16,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Medical Internships in Vietnam',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 17,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Volunteer with Children in Nepal as a Teenager',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 18,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Medicine Internship in Sri Lanka',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 19,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Incan and Wari Archaeology Volunteering in Peru',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 20,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Public Health Internship in Belize',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 21,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Volunteer in the Amazon Rainforest in Peru',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 22,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Physiotherapy Internship in Nepal',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 23,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Nutrition Internships in Fiji',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 24,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Medical Internship for High School Students in Tanzania',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 25,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Live and Work with Nomads in Mongolia',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 26,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Medical Internship in Peru',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 27,
            description: 'Volunteer description',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Volunteering with Children in Argentina',
            volunteersIds: [],
            website: 'Volunteer.com',
            imageUrl: Strings.Default_Image_Url
        }
    ];
}
