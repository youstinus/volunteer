export class Project {
    public id: number;
    public title: string;
    public description: string;
    public email: string;
    public phone: string;
    public website: string;
    public location: string;
    public start: Date;
    public end: Date;
    public organizationId: number;
    public volunteersIds: number[];
    public savedVolunteersIds: number[];
    public picturesIds: number[];
    public imageUrl: string;
}
