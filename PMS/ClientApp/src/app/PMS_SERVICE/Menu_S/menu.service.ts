import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Menu,MenuItem } from '../../PMS_MODEL/Menu/menu';
import { EnumMenuStatus } from '../../PMS_GLOBAL/Enum';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient,
    public apiService : ApiService,
    private router: Router) { 
  }
  private serviceName : string = "/Menu/";
  GetCurrentUserMenus():any{
    return this.apiService.HttpGet<MenuItem[]>('/Menu/GetCurrentUserMenus');
  }
  GetMenuKey(isParent:boolean, parentID : number):any{
    return this.apiService.HttpGet<any>(this.serviceName+'GetMenuKey'+'/'+isParent+'/'+parentID);
  }
  GetAllMenu():any{
    return this.apiService.HttpGet<Menu[]>(this.serviceName+'GetAllMenu');
  }
  GetAllMenuByStatus(status : EnumMenuStatus):any{
    return this.apiService.HttpGet<Menu[]>(this.serviceName+'GetAllMenuByStatus'+'/'+status);
  }
  MenuApproveOrDisApprove(param : any):any{
    return this.apiService.HttpPost(this.serviceName+'MenuApproveOrDisApprove',param);
  }
  DeleteMenu(menuID: number):any{
    return this.apiService.HttpGet<Menu[]>(this.serviceName+'DeleteMenu'+'/'+menuID);
  }
  SaveMenu(param : any){
    return this.apiService.HttpPost(this.serviceName+'SaveMenu',param);
  }
}
