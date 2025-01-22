export class BasicBaseObject {
    constructor(){
        this.id = 0;
        this.createdBy = 0;
        this.CreationDate = new Date();
    }
    id : number;
    createdBy: number;
    CreationDate: Date;
    modifiedBy?: number;
    modifiedDate?: Date;
    statusString : string = "";
    statusColor : string = "";
    createdUser : string = "";
    modifiedUser : string = "";
}