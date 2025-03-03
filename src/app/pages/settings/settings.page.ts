import { Component, OnInit } from '@angular/core';
import {AlertController,LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UserService} from "../../service/user.service";
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public pageTitle: any;
  public contact_label:any;
  public contact_link:any;
  public floatD:any;
  public arrow_back:any;
  public arrow_go:any;
  public settings:any;
  public accept_chats:any;
  public team:any;
  public notifications:any;
  public live_chate_supports:any;
  public check_for_update:any;
  public languageApp:any;
  public log_out:any;
  public changeStatus:any;
  public returnResultData:any;
  public login_error_tow:any;
  public login_error_three:any;
  public login_error_for:any;
  public floatTow:any;
  public returnResultTeamData:any;
  public isVisible = false;
  public returnArrayTeamFromServer:any;
  public returnTeamArray:any = [];
  public teamVal:any;
  public height:any=0;
  public heightShowTeam:any=0;
  public are_you_sure:any;
  public yes:any;
  public no:any;
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
  
  constructor(private alertController:AlertController,private router: Router,private userService: UserService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
    });
    this.menu.enable(false,"sideMenu");
  }
  async initialiseTranslation(){
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('login_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('contact_link').subscribe((res: string) => {
      this.contact_link = res;
    });
    this.translate.get('contact_label').subscribe((res: string) => {
      this.contact_label = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('arrow_back').subscribe((res: string) => {
      this.arrow_back = res;
    });
    this.translate.get('arrow_go').subscribe((res: string) => {
      this.arrow_go = res;
    });
    this.translate.get('settings').subscribe((res: string) => {
      this.settings = res;
    });
    this.translate.get('accept_chats').subscribe((res: string) => {
      this.accept_chats = res;
    });
    this.translate.get('team').subscribe((res: string) => {
      this.team = res;
    });
    this.translate.get('notifications').subscribe((res: string) => {
      this.notifications = res;
    });
    this.translate.get('live_chate_supports').subscribe((res: string) => {
      this.live_chate_supports = res;
    });
    this.translate.get('check_for_update').subscribe((res: string) => {
      this.check_for_update = res;
    });
    this.translate.get('language').subscribe((res: string) => {
      this.languageApp = res;
    });
    this.translate.get('log_out').subscribe((res: string) => {
      this.log_out = res;
    });
    this.translate.get('login_error_for').subscribe((res: string) => {
      this.login_error_for = res;
    });
    this.translate.get('login_error_tow').subscribe((res: string) => {
      this.login_error_tow = res;
    });
    this.translate.get('login_error_three').subscribe((res: string) => {
      this.login_error_three = res;
    });
    this.translate.get('floatTow').subscribe((res: string) => {
      this.floatTow = res;
    });
   this.translate.get('are_you_sure').subscribe((res: string) => {
      this.are_you_sure = res;
    });
   this.translate.get('yes').subscribe((res: string) => {
      this.yes = res;
    });
    this.translate.get('no').subscribe((res: string) => {
      this.no = res;
    });
  }
  functionToggleDiv() {
    this.isVisible = !this.isVisible;
    if(!this.isVisible)
      this.height = 0+'px';
    else
      this.height = this.heightShowTeam+'px';
  }
  async changeLange(lang:any){
    if(lang == 'ar'){
      this.translate.setDefaultLang('ar');
      await this.translate.use('ar');
      await this.storage.set('checkLanguage','ar');
    }
    else{
      this.translate.setDefaultLang('en');
      await this.storage.set('checkLanguage','en');
      await this.translate.use('en');
    }
    window.location.reload();
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.changeStatus = await this.storage.get('userChatStatus');
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
    this.day = currentDate.getDate();
    if(this.month<10)
      this.month = '0'+ this.month;
    if(this.day<10)
      this.day = '0'+ this.day;
    this.genaratedDate = this.year+""+this.month+""+this.day;
    this.functiongetTeamUsers()
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
        this.heightShowTeam = 0;
        for(let i = 0; i < this.returnArrayTeamFromServer.length;i++) {
          this.returnTeamArray[i]=[];
          this.returnTeamArray[i]['userName'] = this.returnArrayTeamFromServer[i].userName;
          this.returnTeamArray[i]['online'] = this.returnArrayTeamFromServer[i].online;
          this.heightShowTeam = this.heightShowTeam+50;
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
  async functionChangeStatus(event:any){
    if(event.detail.checked){
      this.changeStatus = true;
      let status = 1;
      await this.storage.set('userChatStatus',this.changeStatus);
      this.functionChangeStatusOnline(status);
    }
    else{
      this.changeStatus = false;
      let status = 2;
      await this.storage.set('userChatStatus',this.changeStatus);
      this.functionChangeStatusOnline(status);
    }
    this.ngOnInit();
  }
  functionChangeStatusOnline(status:any){
    let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
    const md5Hash = CryptoJS.algo.MD5.create();
    md5Hash.update(key);
    this.apiKey = md5Hash.finalize();
    this.apiKey=this.apiKey.toString()
    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'status':status};
    this.userService.changeStatus(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.messageId;
      if(errorData == 1){
        this.displayResult(this.login_error_for);
      }else if(errorData == 2){
        this.displayResult(this.login_error_tow);
      }else {
        this.displayResult(this.login_error_three);
      }
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
  functionBackHome(){
    this.navCtrl.navigateRoot('home');
  }
  async functionLogOut(){
    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message:this.are_you_sure,
      buttons: [
        {
          text: this.no,
          cssClass: 'alertButton',
          handler: () => {
          }
        }, {
          text: this.yes,
          cssClass: 'alertButton',
          handler: async () => {
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
      ]
    });
    await alert.present();
  }
  functionSendEmail() {
    window.location.href = "https://taqnyat.sa/ar/contact";
  }
  functionCheckForUpdate(){
    window.open('https://play.google.com/store/apps/details?id=com.Taqnyat.Livechat', '_system');
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
