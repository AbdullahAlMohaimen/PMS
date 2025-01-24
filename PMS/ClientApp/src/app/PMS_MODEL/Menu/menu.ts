import { EnumMenuStatus } from "../../PMS_GLOBAL/Enum";
import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Menu extends BasicBaseObject{
    constructor(){
        super();
        this.menuName = "";
        this.menuIcon = "";
        this.menuPath = "";
        this.menuKey = "";
        this.menuParentID = 0;
        this.menuStatus = EnumMenuStatus.NotYetApprove;
    }
    menuName : string;
    menuIcon : string;
    menuPath : string;
    menuKey : string;
    menuParentID : number;
    menuStatus : EnumMenuStatus;
    menuStatusString : string = "";
    menuStatusColor : string = "";
    customMenuName : string = "";
    statusChangedBy? : number;
    approveDisApproveBy? : number;
}

export class MenuItem{
    id : number = 0;
    parentID : number = 0;
    key : string = "";
    label : string = "";
    icon : string = "";
    route : string = "";
    items : MenuItem [] = [];
}
