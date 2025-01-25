import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { MenuService } from '../../../PMS_SERVICE/Menu_S/menu.service';
import { Menu } from '../../../PMS_MODEL/Menu/menu';
import { LoadingService } from '../../Loading/loading.service';
import { EnumMenuStatus,EnumStatus } from '../../../PMS_GLOBAL/Enum';
import { GLOBAL } from '../../../PMS_GLOBAL/GLOBAL';
import { NotificationService } from '../../../PMS_SERVICE/Notification_S/notification.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})
export class MenuListComponent implements OnInit{
  constructor( private apiService : ApiService,
    private notification : NotificationService,
    private menuService : MenuService,
    private loading : LoadingService){
    this.apiService.CurrentMenuName = "Menu LIST";
  }

  isShowPopup : boolean = false;
  headerTitle : string = "";
  currentMenu : Menu = new Menu();
  allMenus : Menu[] = [];
  originalMenus : Menu[] = [];
  first = 0; rows = 10;
  searchText : string = "";

  pageChange(event : any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ngOnInit(){
    this.searchText = "";
    this.loading.IsLoginStart = true;
    this.menuService.GetAllMenu().subscribe(
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
  addNew(){
    this.currentMenu = new Menu();
    this.headerTitle = "Add New Menu";
    this.isShowPopup = true;
  }
  editMenu(oMenu : Menu){
    this.currentMenu = oMenu;
    this.isShowPopup = true;
    this.headerTitle = "Edit Menu";
  }
  deleteMenu(oMenu : Menu){
    let confirmationMSG : string = "";
    if(oMenu !== undefined){
      confirmationMSG = this.getConfirmationMSG(oMenu);
      this.notification.ActiveConfirm('Confirmation',confirmationMSG).then((isConfirmed) => {
        if (isConfirmed) {
          this.loading.IsLoginStart = true;
          this.menuService.DeleteMenu(oMenu.id).subscribe(
            (resp: any) => {
            },
            (err: any) => {
              this.loading.IsLoginStart = false;
              this.notification.Error(err.error.message);
            },
            () => {
              this.loading.IsLoginStart = false;
              this.notification.Success("Menu Deleted Successfully");
              this.ngOnInit();
          });
        }
      });
    }
  }
  getConfirmationMSG(oMenu : Menu):string{
    let confirmationMSG : string = "";
    if(oMenu.menuParentID === 0){
      confirmationMSG = "'"+oMenu.menuName+"' "+"this a parent menu.";
    }
    else{
      confirmationMSG = "'"+oMenu.menuName+"' "+"this a child menu.";
    }
    let childMenus : Menu [] = this.allMenus.filter(x => x.menuParentID === oMenu.id);
    if(childMenus.length > 0){
      confirmationMSG += " And has " + childMenus.length + " child menu(s) linked to it. If you delete this menu, all its child menu(s) will be removed as well.";
    }
    else{
      confirmationMSG += " And have no child menu.";
    }
    confirmationMSG += " Are you sure to delete this menu?";
    return confirmationMSG;
  }
  cancel(close: any){
    this.isShowPopup = false;
    this.ngOnInit();
  }
  getMenuStatusColor(status: EnumMenuStatus): string {
    switch (status) {
      case EnumMenuStatus.Active:
        return 'green';
      case EnumMenuStatus.NotYetApprove:
        return 'red';
      case EnumMenuStatus.Locked:
        return 'blue';
      default:
        return 'black';
    }
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
}
