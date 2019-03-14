import {GradeType} from '../enums/GradeType';

export class Review {
    public id: number;
    public title: string;
    public grade: GradeType;
    public text: string;
    public organizationId: number;
    public volunteerId: number;
}
