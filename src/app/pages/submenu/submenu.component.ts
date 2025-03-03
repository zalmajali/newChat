import { Component, OnInit,Input } from '@angular/core';
import {AlertController,LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UserService} from "../../service/user.service";
import {ChatService} from "../../service/chat.service";
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent  implements OnInit {
  @Input() type: string | any;
  @Input() number: string | any;
  public returnResultTeamData:any;
  public returnArrayTeamFromServer:any;
  public returnTeamArray:any = [];
  public teamVal:any; 
  public returnResultDepartData:any;
  public returnArrayDepartFromServer:any;
  public returnDepartArray:any = [];
  public departVal:any;
  public solved:any;
  public move_to_ticket:any;
  public lost_connection:any;
  public returnResultChatClose:any;
  public close_error_one:any;
  public close_error_tow:any;
  public assign_error_one:any;
  public assign_error_tow:any;
//check login
public genaratedDate:any;
public year:any;
public month:any;
public day:any;
public mainUserName:any;
public userName:any;
public password:any;
public apiKey:any;
public sessionLogin:any;
public department:any;
public supervisor:any;
public name:any;
//page setting
public checkLanguage: any=0;
public language: any;
public menuDirection: any;
public menuDirectionTow: any;
public showPassword: boolean = false;
constructor(private chatService: ChatService,private alertController:AlertController,private router: Router,private userService: UserService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
  this.platform.backButton.subscribeWithPriority(10, () => {
    this.modalController.dismiss({})
  });
}
async initialiseTranslation(){
  this.translate.get('menuDirection').subscribe((res: string) => {
    this.menuDirection = res;
  });
  this.translate.get('menuDirectionTow').subscribe((res: string) => {
    this.menuDirectionTow = res;
  });
  this.translate.get('solved').subscribe((res: string) => {
    this.solved = res;
  });
  this.translate.get('move_to_ticket').subscribe((res: string) => {
    this.move_to_ticket = res;
  });
  this.translate.get('lost_connection').subscribe((res: string) => {
    this.lost_connection = res;
  });
  this.translate.get('close_error_one').subscribe((res: string) => {
    this.close_error_one = res;
  });
  this.translate.get('close_error_tow').subscribe((res: string) => {
    this.close_error_tow = res;
  });
  this.translate.get('assign_error_one').subscribe((res: string) => {
    this.assign_error_one = res;
  });
  this.translate.get('assign_error_tow').subscribe((res: string) => {
    this.assign_error_tow = res;
  });
}
async ngOnInit() {
  await this.getDeviceLanguage();
  await this.checkLoginUser();
  let currentDate = new Date();
  this.year = currentDate.getFullYear();
  this.month = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
  this.day = currentDate.getDate();
  if(this.month<10)
    this.month = '0'+ this.month;
  if(this.day<10)
    this.day = '0'+ this.day;
  this.genaratedDate = this.year+""+this.month+""+this.day;
  this.functiongetTeamUsers();
  this.functionGetDepartment();
}
functiongetTeamUsers(){
  let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
  const md5Hash = CryptoJS.algo.MD5.create();
  md5Hash.update(key);
  this.apiKey = md5Hash.finalize();
  this.apiKey=this.apiKey.toString();
  let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey};
  this.userService.chatGetUser(sendValues).then(async data=>{
    this.returnResultTeamData = data;
    let errorData = this.returnResultTeamData.messageId;
    if(errorData == 1){
      this.returnArrayTeamFromServer = this.returnResultTeamData.users;
      this.returnTeamArray=[];
      for(let i = 0; i < this.returnArrayTeamFromServer.length;i++) {
        this.returnTeamArray[i]=[];
        this.returnTeamArray[i]['userName'] = this.returnArrayTeamFromServer[i].userName;
        this.returnTeamArray[i]['online'] = this.returnArrayTeamFromServer[i].online;
      }
      let countOfData = this.returnTeamArray.length;
      if(countOfData == 0)
        this.teamVal = 0;
      else{
        this.teamVal = 1;
      }
    }
  }).catch(error=>{
    this.functiongetTeamUsers()
  });
}
functionGetDepartment(){
  let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
  const md5Hash = CryptoJS.algo.MD5.create();
  md5Hash.update(key);
  this.apiKey = md5Hash.finalize();
  this.apiKey=this.apiKey.toString();
  let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey};
  this.userService.chatGetDepartment(sendValues).then(async data=>{
    this.returnResultDepartData = data;
    let errorData = this.returnResultDepartData.messageId;
    if(errorData == 1){
      await this.storage.get('checkLanguage').then(async checkLanguage=>{
        this.checkLanguage = checkLanguage
      });
      if(this.checkLanguage){
        this.language = this.checkLanguage;
        if(this.language == 'ar')
          this.returnArrayDepartFromServer = this.returnResultDepartData.departmentAr;
        else
          this.returnArrayDepartFromServer = this.returnResultDepartData.departmentEn;
      }else{
        if (window.Intl && typeof window.Intl === 'object') {
          let Val  = navigator.language.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0] == "ar" || Val[0] == "en")
            this.language = Val[0];
          else
            this.language = 'en';
            if(this.language == 'ar')
              this.returnArrayDepartFromServer = this.returnResultDepartData.departmentAr;
            else
              this.returnArrayDepartFromServer = this.returnResultDepartData.departmentEn;
        }
        else{
          this.globalization.getPreferredLanguage().then(res => {
            let Val  = res.value.split("-");
            this.translate.setDefaultLang(Val[0]);
            if (Val[0] == "ar" || Val[0] == "en")
              this.language = Val[0];
            else
              this.language = 'en';
              if(this.language == 'ar')
                this.returnArrayDepartFromServer = this.returnResultDepartData.departmentAr;
              else
                this.returnArrayDepartFromServer = this.returnResultDepartData.departmentEn;
          }).catch(e => {
            this.returnArrayDepartFromServer = this.returnResultDepartData.departmentEn;
          });
        }
      }
      this.returnDepartArray=[];
      let count = 0;
      for (let key in this.returnArrayDepartFromServer) {
        this.returnDepartArray[count]=[];
        if (this.returnArrayDepartFromServer.hasOwnProperty(key)) {
          this.returnDepartArray[count]['userName'] = this.returnArrayDepartFromServer[key];
        }
        count++;
      }
      let countOfData = this.returnDepartArray.length;
      if(countOfData == 0)
        this.departVal = 0;
      else{
        this.departVal = 1;
      }
    }
  }).catch(error=>{
    this.functiongetTeamUsers()
  });
}
async checkLoginUser(){
  this.mainUserName = await this.storage.get('mainUserName');
  this.userName = await this.storage.get('userName');
  this.password = await this.storage.get('password');
  this.apiKey = await this.storage.get('apiKey');
  this.sessionLogin = await this.storage.get('sessionLogin');
  this.department = await this.storage.get('department');
  this.supervisor = await this.storage.get('supervisor');
  this.name = await this.storage.get('name');
  if(this.mainUserName == null || this.userName == null || this.password == null || this.apiKey == null || this.sessionLogin == null || this.department == null || this.supervisor == null || this.name == null){
    this.storage.remove('mainUserName');
    this.storage.remove('userName');
    this.storage.remove('password');
    this.storage.remove('apiKey');
    this.storage.remove('sessionLogin');
    this.storage.remove('department');
    this.storage.remove('supervisor');
    this.storage.remove('name');
    this.navCtrl.navigateRoot('login');
  }
}
async getDeviceLanguage() {
  await this.storage.get('checkLanguage').then(async checkLanguage=>{
    this.checkLanguage = checkLanguage
  });
  if(this.checkLanguage){
    this.translate.setDefaultLang(this.checkLanguage);
    this.language = this.checkLanguage;
    this.translate.use(this.language);
    this.initialiseTranslation();
  }else{
    if (window.Intl && typeof window.Intl === 'object') {
      let Val  = navigator.language.split("-");
      this.translate.setDefaultLang(Val[0]);
      if (Val[0] == "ar" || Val[0] == "en")
        this.language = Val[0];
      else
        this.language = 'en';
      this.translate.use(this.language);
      this.initialiseTranslation();
    }
    else{
      this.globalization.getPreferredLanguage().then(res => {
        let Val  = res.value.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0] == "ar" || Val[0] == "en")
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        this.initialiseTranslation();
      }).catch(e => {console.log(e);});
    }
  }
}
  functionClosePage(){
    this.modalController.dismiss({})
  }
  functionCloseTo(type:any,number:any){
    let val="";
    if(type == 1)
        val="Solved";
    if(type == 2)
      val="MoveToTicket";
    if(type == 3)
      val="LostConnection";
    let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
    const md5Hash = CryptoJS.algo.MD5.create();
    md5Hash.update(key);
    this.apiKey = md5Hash.finalize();
    this.apiKey=this.apiKey.toString();
    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'note':val,'mobile':number};
    this.chatService.chatClose(sendValues).then(async data=>{
      this.returnResultChatClose = data;
      let errorData = this.returnResultChatClose.messageId;
      if(errorData == 1){
        this.displayResult(this.close_error_one);
        this.modalController.dismiss({})
        this.navCtrl.navigateRoot('home');
      }else{
        this.displayResult(this.close_error_tow);
        this.modalController.dismiss({})
      }
    }).catch(error=>{
    });
  }
  functionAssignTo(userName:any,type:any,number:any){
    let val = 0;
    if(type == 1)
      val = userName;
    else
    val = userName+1;
    let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
    const md5Hash = CryptoJS.algo.MD5.create();
    md5Hash.update(key);
    this.apiKey = md5Hash.finalize();
    this.apiKey=this.apiKey.toString();
    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'assignTo':val,'mobile':number};
    this.chatService.chatAssign(sendValues).then(async data=>{
      this.returnResultChatClose = data;
      let errorData = this.returnResultChatClose.messageId;
      if(errorData == 1){
        this.displayResult(this.assign_error_one);
        this.modalController.dismiss({})
        this.navCtrl.navigateRoot('home');
      }else{
        this.displayResult(this.assign_error_tow);
        this.modalController.dismiss({})
      }
    }).catch(error=>{
    });
  }
  async displayResult(message:any){
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 4500,
      position: 'bottom',
      cssClass:"toastStyle",
      color:""
    });
    await toast.present();
  }
}
