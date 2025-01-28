import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { NotificationService } from '../../../PMS_SERVICE/Notification_S/notification.service';
import { MenuService } from '../../../PMS_SERVICE/Menu_S/menu.service';
import { Menu } from '../../../PMS_MODEL/Menu/menu';
import { LoadingService } from '../../Loading/loading.service';
import { EnumMenuStatus } from '../../../PMS_GLOBAL/Enum';
import { GLOBAL } from '../../../PMS_GLOBAL/GLOBAL';
import { User } from '../../../PMS_MODEL/Users/User';
import { AuthenticationService } from '../../../PMS_SERVICE/Authentication_S/authentication.service';

@Component({
  selector: 'app-menu-approval',
  templateUrl: './menu-approval.component.html',
  styleUrl: './menu-approval.component.scss'
})
export class MenuApprovalComponent implements OnInit{
  constructor( private apiService : ApiService,
    private notification : NotificationService,
    private menuService : MenuService,
    private loading : LoadingService,private authenticationService : AuthenticationService){
    this.apiService.CurrentMenuName = "Menu Approval";
  }

  isShowPopup : boolean = false;
  headerTitle : string = "";
  currentMenu : Menu = new Menu();
  allMenus : Menu[] = [];
  approveDisapproveMenus : Menu[] = [];
  originalMenus : Menu[] = [];
  first = 0; rows = 10;
  searchText : string = "";

  selectedMenu : Menu [] = [];
  oCurrentUser : User = new User();

  pageChange(event : any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ngOnInit(){
    this.loadPendingMenu();
  }
  loadPendingMenu(){
    this.searchText = "";
    this.selectedMenu = [];
    this.approveDisapproveMenus = [];
    this.loading.IsLoginStart = true;
    this.menuService.GetAllMenuByStatus(EnumMenuStatus.NotYetApprove).subscribe(
      (resp: any) => {
        this.allMenus = resp;
      },
      (err: any) => {
        this.loading.IsLoginStart = false;
        this.notification.Error(err.error.message);
      },
      () => {
        this.loading.IsLoginStart = false;
        if(this.allMenus.length > 0){
          this.allMenus.forEach(x=>{
            x.customMenuName = x.menuKey + " - " + x.menuName;
            x.menuStatusString = new GLOBAL().GETMENUSTATUSSTRING(x.menuStatus);
            x.menuStatusColor = new GLOBAL().GETMENUSTATUSCOLOR(x.menuStatus);
          });
          this.originalMenus = this.allMenus;
        }
    });
  }
  applyFilter(event: any) {
    const value = event.target.value.toLowerCase();
    if (value) {
      this.allMenus = this.originalMenus.filter(menu => {
        return (
          menu.menuName.toLowerCase().startsWith(value) ||
          menu.menuIcon.toLowerCase().startsWith(value) ||
          menu.menuPath.toLowerCase().startsWith(value) ||
          menu.menuKey.toLowerCase().startsWith(value)  ||
          menu.menuStatusString.toLowerCase().startsWith(value)
        );
      });
    } else {
      this.allMenus = [...this.originalMenus];
    }
  }
  approve(oMenu : Menu){
    if(oMenu != undefined){
      this.notification.ActiveConfirm('Confirmation',"Are you sure to approve this menu?").then((isConfirmed) => {
        if (isConfirmed) {
          oMenu.menuStatus = EnumMenuStatus.Active;
          this.approveDisapproveMenus.push(oMenu);
          this.MenuApproveOrDisApprove(EnumMenuStatus.Active);
        }
      });
    }
  }
  disApprove(oMenu : Menu){
    if(oMenu != undefined){
      this.notification.ActiveConfirm('Confirmation',"Are you sure to disapprove this menu?").then((isConfirmed) => {
        if (isConfirmed) {
          oMenu.menuStatus = EnumMenuStatus.Inactive;
          this.approveDisapproveMenus.push(oMenu);
          this.MenuApproveOrDisApprove(EnumMenuStatus.Inactive);
        }
      });
    }
  }
  approveAll(){
    this.approveDisapproveMenus = [];
    if(this.allMenus.length === 0){
      this.notification.Warning("There are no pending menus for approval.","Warning!");
      return;
    }
    this.notification.ActiveConfirm('Confirmation',"Are you sure to approve all menu?").then((isConfirmed) => {
      if (isConfirmed) {
        this.allMenus.forEach(oMenu=>{
          oMenu.menuStatus = EnumMenuStatus.Active;
          this.approveDisapproveMenus.push(oMenu);
        });
        this.MenuApproveOrDisApprove(EnumMenuStatus.Active);
      }
    });
  }
  approveSelected(){
    this.approveDisapproveMenus = [];
    if(this.selectedMenu.length === 0){
      this.notification.Warning("Please select atleast one menu.","Warning!");
      return;
    }
    this.notification.ActiveConfirm('Confirmation',"Are you sure to approve those selected menu?").then((isConfirmed) => {
      if (isConfirmed) {
        this.selectedMenu.forEach(oMenu=>{
          oMenu.menuStatus = EnumMenuStatus.Active;
          this.approveDisapproveMenus.push(oMenu);
        });
        this.MenuApproveOrDisApprove(EnumMenuStatus.Active);
      }
    });
  }
  MenuApproveOrDisApprove(approveStatus : EnumMenuStatus){
    if(this.approveDisapproveMenus.length > 0){
      this.loading.IsLoginStart = true;
      this.menuService.MenuApproveOrDisApprove(this.approveDisapproveMenus).subscribe(
        (resp: any) => {
          
        },
        (err: any) => {
          this.loading.IsLoginStart = false;
          this.notification.Error(err.error.message);
        },
        () => {
          this.loading.IsLoginStart = false;
          if(approveStatus === EnumMenuStatus.Active){
            this.notification.Success("All menus approved successfully.");
          }
          if(approveStatus === EnumMenuStatus.Inactive){
            this.notification.Success("All menus disapproved successfully.");
          }
          this.loadPendingMenu();
      });
    }
  }
}
