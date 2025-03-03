import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from '@angular/router';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-editcontact',
  templateUrl: './editcontact.page.html',
  styleUrls: ['./editcontact.page.scss'],
})
export class EditcontactPage implements OnInit {
  public arrow_back:any;
  public arrow_go:any;
  public floatD:any;
  public add_contacts:any;
  public select_key:any;
  public edit_number_butt:any;
  public isdisabled:boolean=true;
  public returnSetMobileData:any;
  public contact_add_error_one:any;
  public contact_add_error_tow:any;
  public contact_add_error_three:any;
  public returnResultContactData:any;
  public returnArrayContactFromServer:any;
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
  //name
  public contactName:any;
  public contact_name:any;
  //notes
  public contactNotes:any;
  public contact_note:any;

  //email
  public email:any;
  public email_contact:any;
  //email
  public customerId:any;
  public contact_customer_id:any;
  //tags
  public tags:any;
  public tagOne:any;
  public tagTow:any;
  public tagThree:any; 
  //number
  public number:any;
  public number_contact:any;
  public number_contact_error:any;
  public errorNumber:any="";
  public isErrorNumber:any = 1;
  //page setting
  public checkLanguage: any=0;
  public language: any;
  public menuDirection: any;
  public menuDirectionTow: any;
  public showPassword: boolean = false;
  constructor(private activaterouter : ActivatedRoute,private router: Router,private userService: UserService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('email_contact').subscribe((res: string) => {
      this.email_contact = res;
    });
    this.translate.get('contact_note').subscribe((res: string) => {
      this.contact_note = res;
    });
    this.translate.get('contact_name').subscribe((res: string) => {
      this.contact_name = res;
    });
    this.translate.get('number_contact').subscribe((res: string) => {
      this.number_contact = res;
    });
    this.translate.get('number_contact_error').subscribe((res: string) => {
      this.number_contact_error = res;
    });
    this.translate.get('contact_customer_id').subscribe((res: string) => {
      this.contact_customer_id = res;
    });
    this.translate.get('tags').subscribe((res: string) => {
      this.tags = res;
    });
    this.translate.get('edit_number_butt').subscribe((res: string) => {
      this.edit_number_butt = res;
    });
    this.translate.get('contact_add_error_one').subscribe((res: string) => {
      this.contact_add_error_one = res;
    });
    this.translate.get('contact_add_error_tow').subscribe((res: string) => {
      this.contact_add_error_tow = res;
    });
    this.translate.get('contact_add_error_three').subscribe((res: string) => {
      this.contact_add_error_three = res;
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
    this.activaterouter.params.subscribe(async (params:any) => {
      if(params['numberInfo']!="" && params['numberInfo']!=null && params['numberInfo']!=undefined && params['numberInfo']!=0){
        this.number = params['numberInfo'];
      }
      this.functionChatGetMobileInfo(this.number);
    });
  }
  functionCheckNumber(event:any){
    this.number = event.target.value;
    this.errorNumber = "ionInputStyleSuccess";
    this.isErrorNumber = 1;
    if(this.number == "" || this.number == undefined){
      this.errorNumber = "ionInputStyleError";
      this.isErrorNumber = 0;
    }else{
      this.isdisabled = true;
    }
  }
  functionChatGetMobileInfo(number:any){
    let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
    const md5Hash = CryptoJS.algo.MD5.create();
    md5Hash.update(key);
    this.apiKey = md5Hash.finalize();
    this.apiKey=this.apiKey.toString();
    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'mobile':number};
    this.userService.chatGetMobileInfo(sendValues).then(async data=>{
      this.returnResultContactData = data;
      let errorData = this.returnResultContactData.messageId;
      if(errorData == 1){
        this.returnArrayContactFromServer = this.returnResultContactData.info;
        this.contactName = this.returnArrayContactFromServer[0].name;
        this.email = this.returnArrayContactFromServer[0].email;
        this.contactNotes = this.returnArrayContactFromServer[0].note;
        this.customerId = this.returnArrayContactFromServer[0].clientId;
        let tag = this.returnArrayContactFromServer[0].tag;
        if(tag.length!=0){
          if(tag.length == 1){
            if(tag[0]!='' && tag[0]!=undefined && tag[0]!=''){
              let newStr = tag[0].replaceAll("'", '');
              this.tagOne = newStr;
            }
          }
          if(tag.length == 2){
            if(tag[0]!='' && tag[0]!=undefined && tag[0]!=''){
              let newStr = tag[0].replaceAll("'", '');
              this.tagOne = newStr;
            }
            if(tag[1]!='' && tag[1]!=undefined && tag[1]){
              let newStr = tag[1].replaceAll("'", '');
              this.tagTow = newStr;
            }
          }
          if(tag.length == 3){
            if(tag[0]!='' && tag[0]!=undefined && tag[0]!=''){
              let newStr = tag[0].replaceAll("'", '');
              this.tagOne = newStr;
            }
            if(tag[1]!='' && tag[1]!=undefined && tag[1]!=''){
              let newStr = tag[1].replaceAll("'", '');
              this.tagTow = newStr;
            }
            if(tag[2]!='' && tag[2]!=undefined && tag[2]!=''){
              let newStr = tag[2].replaceAll("'", '');
              this.tagThree = newStr;
            }
          }
        }
      }
    }).catch(error=>{
      this.functionChatGetMobileInfo(number)
    });
  }

   async editPhoneNumber(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.navCtrl.navigateRoot("/login");
    });
    if((this.number == undefined || this.number == "")){
      this.errorNumber = "ionInputStyleError";
      this.isErrorNumber = 0;
      this.isdisabled = false;
      return false;
    }
    let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
    const md5Hash = CryptoJS.algo.MD5.create();
    md5Hash.update(key);
    this.apiKey = md5Hash.finalize();
    this.apiKey=this.apiKey.toString();
    let tag = "";
    if(this.tagOne!=undefined && this.tagOne!=''){}
      tag += "'"+this.tagOne+"',";
    if(this.tagTow!=undefined && this.tagTow!='')
      tag += "'"+this.tagTow+"',";
    if(this.tagThree!=undefined && this.tagThree!='')
      tag += "'"+this.tagThree+"'";
    tag+="";
    let num = this.number;
    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'mobile':num,'name':this.contactName,'number':num,'email':this.email,'note':this.contactNotes,'clientId':this.customerId,'clientType':'','tag':tag};
    const loading = await this.loading.create({
      cssClass: 'custom-spinner',
      message: '',
      duration: 1500,
    });
    this.userService.chatSetMobileInfo(sendValues).then(async data=>{
      this.returnSetMobileData = data;
      let errorData = this.returnSetMobileData.messageId;
      if(errorData == 1){
        this.displayResult(this.contact_add_error_one);
        this.navCtrl.navigateRoot("/contacts");
        await loading.present();
      }else if(errorData == 2){
        this.displayResult(this.contact_add_error_tow);
        await loading.present();
      }else {
        this.displayResult(this.contact_add_error_three);
        await loading.present();
      }
    });
    this.isdisabled = true;
    return true;
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
  functionBackContact(){
    this.navCtrl.navigateRoot('/contacts');
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
