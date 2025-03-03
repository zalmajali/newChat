import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UserService} from "../../service/user.service";
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
public pageTitle: any;
public sign_up: any;
public login_button: any;
public isdisabled:boolean=true;
public apiKey: any;
public returnResultData:any;
public login_error_one:any;
public login_error_tow:any;
public login_error_three:any;
public genaratedDate:any;
public year:any;
public month:any;
public day:any;
public contact_label:any;
public contact_link:any;
//mainUserName
public mainUserName: any;
public main_user_name: any;
public errorMainUserName:any="";
public isErrorMainUserName:any = 1;
public main_user_name_error:any;

//UserName
public userName: any;
public user_name: any;
public errorUserName:any="";
public isErrorUserName:any = 1;
public user_name_error:any;

//password
public password: any;
public user_password: any;
public errorUserPassword:any="";
public isErrorUserPassword:any = 1;
public user_Password_error:any;

//page setting
public checkLanguage: any=0;
public language: any;
public menuDirection: any;
public menuDirectionTow: any;
public showPassword: boolean = false;
  constructor(private router: Router,private userService: UserService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/login");
    });
    this.menu.enable(false,"sideMenu");
  }

  initialiseTranslation(){
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('login_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('sign_up').subscribe((res: string) => {
      this.sign_up = res;
    });
    this.translate.get('login_button').subscribe((res: string) => {
      this.login_button = res;
    });
    this.translate.get('main_user_name').subscribe((res: string) => {
      this.main_user_name = res;
    });
    this.translate.get('main_user_name_error').subscribe((res: string) => {
      this.main_user_name_error = res;
    });
    this.translate.get('user_name').subscribe((res: string) => {
      this.user_name = res;
    });
    this.translate.get('user_name_error').subscribe((res: string) => {
      this.user_name_error = res;
    });
    this.translate.get('user_password').subscribe((res: string) => {
      this.user_password = res;
    });
    this.translate.get('user_Password_error').subscribe((res: string) => {
      this.user_Password_error = res;
    });
    this.translate.get('login_error_one').subscribe((res: string) => {
      this.login_error_one = res;
    });
    this.translate.get('login_error_tow').subscribe((res: string) => {
      this.login_error_tow = res;
    });
    this.translate.get('login_error_three').subscribe((res: string) => {
      this.login_error_three = res;
    });
    this.translate.get('contact_link').subscribe((res: string) => {
      this.contact_link = res;
    });
    this.translate.get('contact_label').subscribe((res: string) => {
      this.contact_label = res;
    });
  }
  checkMainUserName(event:any){
    this.mainUserName = event.target.value;
    this.errorMainUserName = "ionItemStyleSuccess";
    this.isErrorMainUserName = 1;
    if(this.mainUserName == "" || this.mainUserName == undefined){
      this.errorMainUserName = "ionItemStyleError";
      this.isErrorMainUserName = 0;
    }else{
      this.isdisabled = true;
    }
  }
  checkUserName(event:any){
    this.errorUserName = "ionItemStyleSuccess";
    this.isErrorUserName = 1;
    this.userName = event.target.value;
    if(this.userName == "" || this.userName == undefined){
      this.errorUserName = "ionItemStyleError";
      this.isErrorUserName = 0;
    }else{
      this.isdisabled = true;
    }
  }
  checkPassword(event:any){
    this.errorUserPassword = "ionItemStyleSuccess";
    this.isErrorUserPassword = 1;
    this.password = event.target.value;
    if(this.password == "" || this.password == undefined){
      this.errorUserPassword = "ionItemStyleError";
      this.isErrorUserPassword = 0;
    }else{
      this.isdisabled = true;
    }
  }
  async ngOnInit() {
    // this.storage.get('email_user_name').then((userName:any)=>{
    //   if(userName!=null && userName!=undefined){
    //     this.emailUserName = userName;
    //   }
    // });
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
    this.day = currentDate.getDate();
    if(this.month<10)
      this.month = '0'+ this.month;
    if(this.day<10)
      this.day = '0'+ this.day;
    this.genaratedDate = this.year+""+this.month+""+this.day;
    await this.getDeviceLanguage();
  }
  async checkUser(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.navCtrl.navigateRoot("/login");
    });
    if((this.mainUserName == undefined || this.mainUserName == "") && (this.userName == undefined || this.userName == "") && (this.password == undefined || this.password == "")){
      this.errorMainUserName = "ionItemStyleError";
      this.isErrorMainUserName = 0;
      this.errorUserName = "ionItemStyleError";
      this.isErrorUserName = 0;
      this.errorUserPassword = "ionItemStyleError";
      this.isErrorUserPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.errorMainUserName == undefined || this.errorMainUserName == ""){
      this.errorMainUserName = "ionItemStyleError";
      this.isErrorMainUserName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.userName == undefined || this.userName == ""){
      this.errorUserName = "ionItemStyleError";
      this.isErrorUserName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.password == undefined || this.password == ""){
      this.errorUserPassword = "ionItemStyleError";
      this.isErrorUserPassword = 0;
      this.isdisabled = false;
      return false;
    }
    let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
    const md5Hash = CryptoJS.algo.MD5.create();
    md5Hash.update(key);
    this.apiKey = md5Hash.finalize();
    this.apiKey=this.apiKey.toString();
    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey};
    const loading = await this.loading.create({
      cssClass: 'custom-spinner',
      message: '',
      duration: 1500,
    });
    this.userService.login(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.messageId;
      if(errorData == 1){
        await this.storage.set('mainUserName',this.mainUserName);
        await this.storage.set('userName',this.userName);
        await this.storage.set('password',this.password);
        await this.storage.set('apiKey',this.apiKey);
        await this.storage.set('sessionLogin',this.returnResultData.sessionLogin);
        await this.storage.set('department',this.returnResultData.department);
        await this.storage.set('supervisor',this.returnResultData.supervisor);
        await this.storage.set('name',this.returnResultData.name);
        this.displayResult(this.login_error_one);
        this.navCtrl.navigateRoot("/home");
        await loading.present();
      }else if(errorData == 2){
        this.displayResult(this.login_error_tow);
        await loading.present();
      }else {
        this.displayResult(this.login_error_three);
        await loading.present();
      }
    }).catch(async error=>{
      this.displayResult(this.login_error_three);
      await loading.present();
    });
    this.isdisabled = true;
    return true;
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
        if (Val[0] == "ar" || Val[0] == "en" || Val[0] == "ur")
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
          if (Val[0] == "ar" || Val[0] == "en" || Val[0] == "ur")
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          this.initialiseTranslation();
        }).catch(e => {console.log(e);});
      }
    }
  }
  async displayResult(message:any){
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass:"toastStyle",
    });
    await toast.present();
  }
  changeInputType(){
    this.showPassword = !this.showPassword;
  }
}
