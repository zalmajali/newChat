import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from '@ionic/storage-angular';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import {ChatService} from "../../service/chat.service";
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-fastresponse',
  templateUrl: './fastresponse.component.html',
  styleUrls: ['./fastresponse.component.scss'],
})
export class FastresponseComponent  implements OnInit {
  public genaratedDate:any;
  public year:any;
  public month:any;
  public day:any;
  public mainUserName:any;
  public userName:any;
  public password:any;
  public apiKey:any;
  public sessionLogin:any;
  public returnResultFastResponse:any;
  public returnArrayFastResponseFromServer:any;
  public returnFastResponseArray:any = [];
  public teamFastResponse:any;
  //page setting
  public checkLanguage: any=0;
  public arrow_go:any;
  public language: any;
  public menuDirection: any;
  public menuDirectionTow: any;
  public showPassword: boolean = false;
  constructor(private chatService: ChatService,private popoverController: PopoverController,private globalization: Globalization,private translate: TranslateService,private storage: Storage) { }
  async selectItem(item: any) {
    await this.popoverController.dismiss(item);
  }
  initialiseTranslation(){
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('arrow_go').subscribe((res: string) => {
      this.arrow_go = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
    this.day = currentDate.getDate();
    if(this.month<10)
      this.month = '0'+ this.month;
    if(this.day<10)
      this.day = '0'+ this.day;
    this.genaratedDate = this.year+""+this.month+""+this.day;
    this.mainUserName = await this.storage.get('mainUserName');
    this.userName = await this.storage.get('userName');
    this.password = await this.storage.get('password');
    await this.functionFeachFastData();
  }
  functionFeachFastData(){
    let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
    const md5Hash = CryptoJS.algo.MD5.create();
    md5Hash.update(key);
    this.apiKey = md5Hash.finalize();
    this.apiKey=this.apiKey.toString();
    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey};
    this.chatService.chatFastResponse(sendValues).then(async data=>{
      this.returnResultFastResponse = data;
      let errorData = this.returnResultFastResponse.messageId;
      if(errorData == 1){
        this.returnArrayFastResponseFromServer = this.returnResultFastResponse.data;
        this.returnFastResponseArray=[];
        for(let i = 0; i < this.returnArrayFastResponseFromServer.length;i++) {
          this.returnFastResponseArray[i]=[];
          this.returnFastResponseArray[i]['name'] = this.returnArrayFastResponseFromServer[i].name;
          this.returnFastResponseArray[i]['description'] = this.returnArrayFastResponseFromServer[i].description;
        }
        let countOfData = this.returnFastResponseArray.length;
        if(countOfData == 0)
          this.teamFastResponse = 0;
        else{
          this.teamFastResponse = 1;
        }
      }
    }).catch(error=>{
      this.functionFeachFastData()
    });

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
        if (Val[0] == "ar" ||  Val[0] == "en")
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
}
