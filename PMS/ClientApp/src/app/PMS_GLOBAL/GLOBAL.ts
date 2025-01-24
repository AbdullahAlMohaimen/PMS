import { EnumMenuStatus, EnumSortedBy, EnumStatus } from "./Enum";

export class GLOBAL{
    public GETSTATUSSTRING(status: EnumStatus):string{
        let statusString = "";
        switch(status){
            case EnumStatus.None:
                statusString = "None";
                break;
            case EnumStatus.Regardless:
                statusString = "Regardless";
                break;
            case EnumStatus.Active:
                statusString = "Active";
                break;
            case EnumStatus.Inactive:
                statusString = "In-Active";
                break;
            case EnumStatus.Locked:
                statusString = "Locked";
                break;
            case EnumStatus.Pending:
                statusString = "Newly Created But Not Yet Approve";
                break;
            default:
                statusString = "";
                break;
        }
        return statusString;
    }
    public GETSTATUSCOLOR(status: EnumStatus):string{
        let statusString = "";
        switch(status){
            case EnumStatus.None:
                statusString = "black";
                break;
            case EnumStatus.Regardless:
                statusString = "#1A2130";
                break;
            case EnumStatus.Active:
                statusString = "#00712D";
                break;
            case EnumStatus.Inactive:
                statusString = "#F05A7E";
                break;
            case EnumStatus.Locked:
                statusString = "#125B9A";
                break;
            case EnumStatus.Pending:
                statusString = "red";
                break;
            default:
                statusString = "black";
                break;
        }
        return statusString;
    }
    public GETMENUSTATUSSTRING(status: EnumMenuStatus):string{
        let statusString = "";
        switch(status){
            case EnumMenuStatus.Regardless:
                statusString = "Regardless";
                break;
            case EnumMenuStatus.Active:
                statusString = "Active";
                break;
            case EnumMenuStatus.Inactive:
                statusString = "In-Active";
                break;
            case EnumMenuStatus.NotYetApprove:
                statusString = "Not Yet Approve";
                break;
            case EnumMenuStatus.Locked:
                statusString = "Locked";
                break;
            default:
                statusString = "";
                break;
        }
        return statusString;
    }
    public GETMENUSTATUSCOLOR(status: EnumMenuStatus):string{
        let statusString = "";
        switch(status){
            case EnumMenuStatus.Regardless:
                statusString = "black";
                break;
            case EnumMenuStatus.Active:
                statusString = "#25a18e";
                break;
            case EnumMenuStatus.Inactive:
                statusString = "red";
                break;
            case EnumMenuStatus.NotYetApprove:
                statusString = "red";
                break;
            case EnumMenuStatus.Locked:
                statusString = "#03045e";
                break;
            case EnumMenuStatus.Delete:
                statusString = "#03045e";
                break;
            default:
                statusString = "";
                break;
        }
        return statusString;
    }
    public SORT(list : any[]):any{
        list.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
        }); 
        return list;
    }
    public SORTALIST(list: any[], property: string, sortedBy? : EnumSortedBy): any[] {
        return list.sort((a, b) => {
            const valueA = a[property]?.toString().toLowerCase() || '';
            const valueB = b[property]?.toString().toLowerCase() || '';
    
            if (valueA < valueB) {
                return sortedBy === undefined || sortedBy === EnumSortedBy.Ascending ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortedBy === undefined || sortedBy === EnumSortedBy.Ascending ? 1 : -1;
            }
            return 0;
        });
    }
    public FILTER(list: any[], property: string, value: any): any[] {
        return list.filter(item => item[property] === value);
    }
    public GROUP_BY(list: any[], property: string): { [key: string]: any[] } {
        return list.reduce((acc, obj) => {
            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }
    public UNIQUE_VALUES(list: any[], property: string): any[] {
        return [...new Set(list.map(item => item[property]))];
    }
    public MULTI_SORT(list: any[], properties: string[], ascending: boolean[] = []): any[] {
        return list.sort((a, b) => {
            for (let i = 0; i < properties.length; i++) {
                const prop = properties[i];
                const asc = ascending[i] !== undefined ? ascending[i] : true;
                const valueA = a[prop]?.toString().toLowerCase() || '';
                const valueB = b[prop]?.toString().toLowerCase() || '';
    
                if (valueA < valueB) {
                    return asc ? -1 : 1;
                }
                if (valueA > valueB) {
                    return asc ? 1 : -1;
                }
            }
            return 0;
        });
    }
    public GET_DIFFERENCE_BETWEEN_TWO_DATE(fromDate: Date, toDate: Date) {
        if (!(fromDate instanceof Date) || !(toDate instanceof Date)) {
            throw new Error('Invalid date objects provided.');
        }
        const diffInMs = toDate.getTime() - fromDate.getTime();
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        return {
            MilliSeconds: diffInMs,
            Seconds: diffInSeconds,
            Minutes: diffInMinutes,
            Hours: diffInHours,
            Days: diffInDays,
        };
    }
    public CALULATE_AGE(dob: Date): number {
        const today = new Date();
        const birthDate = new Date(dob);
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
    }
    public CHECKEMAILVALIDATE(email: string): boolean {
        return false;
    }
    public GETCOMMASEPERATEDIDS<T extends { id: number | string }>(list: T[]): string {
        return list.map(item => item.id).join(',');
    }
    public ISSAMEDATE(date1: Date, date2: Date): boolean {
        return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
        );
    }
}