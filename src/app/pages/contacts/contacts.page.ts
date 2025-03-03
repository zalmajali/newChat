import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UserService} from "../../service/user.service";
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import {TemplateComponent} from "../template/template.component";
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  public pageTitle: any;
  public arrow_back:any;
  public arrow_go:any;
  public floatD:any;
  public returnResultContactData:any;
  public returnArrayContactFromServer:any;
  public returnContactArray:any = [];
  public contactVal:any;
  public add_contacts:any;
  public new_contact:any;
  public phone_number_butt:any;
  public view:any;
  public text_align_first:any;
  public existing:any;
  public noExisting:any;
  public countryKey:any=[1,7,20,27,30,31,32,33,34,36,39,40,41,43,44,45,46,47,48,49,51,52,53,54,56,57,58,60,61,62,63,64,65,66,81,82,84,86,90,91,92,94,95,98,211,212,213,216,218,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,261,262,263,264,265,266,267,268,269,290,291,297,298,299,351,352,353,354,355,356,357,358,359,370,371,373,374,376,377,378,379,380,381,382,385,386,387,420,421,423,500,501,502,503,504,505,506,507,508,509,591,592,593,594,595,596,597,598,599,673,674,675,676,677,678,679,680,681,682,683,686,687,688,689,690,850,852,853,855,856,880,886,91,962,963,964,965,966,967,968,970,971,972,973,974,975,976,977,994,995,998];
  public selectedKey:any = '966';
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

  //phoneNumber
  public phoneNumber:any;
  public phone_number: any;
  public errorPhoneNumber:any="";
  public isErrorPhoneNumber:any = 1;
  public add_phone_number:any;
  //page setting
  public checkLanguage: any=0;
  public language: any;
  public menuDirection: any;
  public menuDirectionTow: any;
  public showPassword: boolean = false;
  constructor(private router: Router,private userService: UserService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
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
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('arrow_back').subscribe((res: string) => {
      this.arrow_back = res;
    });
    this.translate.get('arrow_go').subscribe((res: string) => {
      this.arrow_go = res;
    });
    this.translate.get('add_contacts').subscribe((res: string) => {
      this.add_contacts = res;
    });
    this.translate.get('new_contact').subscribe((res: string) => {
      this.new_contact = res;
    });
    this.translate.get('phone_number').subscribe((res: string) => {
      this.phone_number = res;
    });
    this.translate.get('add_phone_number').subscribe((res: string) => {
      this.add_phone_number = res;
    });
    this.translate.get('phone_number_butt').subscribe((res: string) => {
      this.phone_number_butt = res;
    });
    this.translate.get('view').subscribe((res: string) => {
      this.view = res;
    });
    this.translate.get('existing').subscribe((res: string) => {
      this.existing = res;
    });
    this.translate.get('noExisting').subscribe((res: string) => {
      this.noExisting = res;
    });
    this.translate.get('text_align_first').subscribe((res: string) => {
      this.text_align_first = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.mainUserName = await this.storage.get('mainUserName');
    this.userName = await this.storage.get('userName');
    this.password = await this.storage.get('password');
    this.apiKey = await this.storage.get('apiKey');
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
    this.day = currentDate.getDate();
    if(this.month<10)
      this.month = '0'+ this.month;
    if(this.day<10)
      this.day = '0'+ this.day;
    this.genaratedDate = this.year+""+this.month+""+this.day;
    this.functionChatGetMobileInfo();
  }
  functionCountryKey(event:any){
    this.selectedKey = event.target.value;
  }
  functionAddNumber(event:any){
    this.errorPhoneNumber = "ionItemStyleSuccess";
    this.isErrorPhoneNumber = 1;
    this.phoneNumber = event.target.value;
    if(this.phoneNumber == "" || this.phoneNumber == undefined){
      this.errorPhoneNumber = "ionItemStyleError";
      this.isErrorPhoneNumber = 0;
    }
  }
  functionChatGetMobileInfo(){
    let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
    const md5Hash = CryptoJS.algo.MD5.create();
    md5Hash.update(key);
    this.apiKey = md5Hash.finalize();
    this.apiKey=this.apiKey.toString();
    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'allUser':'1'};
    this.userService.chatGetMobileInfo(sendValues).then(async data=>{
      this.returnResultContactData = data;
      let errorData = this.returnResultContactData.messageId;
      if(errorData == 1){
        this.returnArrayContactFromServer = this.returnResultContactData.info;
        this.returnContactArray=[];
        let j = 0;
        for(let i = 0; i < this.returnArrayContactFromServer.length;i++) {
          if(this.returnArrayContactFromServer[i].number!="" && this.returnArrayContactFromServer[i].number!=null && this.returnArrayContactFromServer[i].number!=undefined && this.returnArrayContactFromServer[i].number!=0){
            this.returnContactArray[j]=[];
            this.returnContactArray[j]['name'] = this.returnArrayContactFromServer[i].name;
            if(this.returnArrayContactFromServer[i].name=="" || this.returnArrayContactFromServer[i].name==null || this.returnArrayContactFromServer[i].name==undefined || this.returnArrayContactFromServer[i].name==0)
              this.returnContactArray[j]['name'] = this.returnArrayContactFromServer[i].number;
            this.returnContactArray[j]['number'] = this.returnArrayContactFromServer[i].number;
            j++;
          }
        }
        let countOfData = this.returnContactArray.length;
        if(countOfData == 0)
          this.contactVal = 0;
        else{
          this.contactVal = 1;
        }
      }
    }).catch(error=>{
      this.functionChatGetMobileInfo()
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
  async addPhoneNumber(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/login");
    });
    if(this.phoneNumber == undefined || this.phoneNumber == ""){
      this.errorPhoneNumber = "ionItemStyleError";
      this.isErrorPhoneNumber = 0;
      return false;
    }
    this.navCtrl.navigateRoot(['/addcontact', {key:this.selectedKey,number:this.phoneNumber}]);
    return true;
  }
  functionBackHome(){
    this.navCtrl.navigateRoot('home');
  }
  functionEditcontact(number:any){
    this.navCtrl.navigateRoot(['/editcontact', {numberInfo:number}]);
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
  async functionMenueTemp(number:any){
      this.modalController.dismiss({});
      let model = await this.modalController.create({
        component:TemplateComponent,
        animated:true,
        componentProps:{number:number},
        cssClass:"my-custom-modal-temp"
      });
      model.onDidDismiss().then((data):any=>{
        if(data.data.key!=undefined && data.data.key==1 && data.data.key!=null){
          this.navCtrl.navigateRoot("/home");
        }
      });
      await model.present();
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
