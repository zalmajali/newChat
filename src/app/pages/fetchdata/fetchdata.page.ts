import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {ChatService} from "../../service/chat.service";
import {DatabaseService} from "../../service/database.service";
import * as CryptoJS from 'crypto-js';
import { ActivatedRoute,Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
@Component({
  selector: 'app-fetchdata',
  templateUrl: './fetchdata.page.html',
  styleUrls: ['./fetchdata.page.scss'],
})
export class FetchdataPage implements OnInit {
  public arrow_back:any;
public arrow_go:any;
public floatD:any;
public returnResultData:any;
public returnResultDataBySession:any;
public returnChatArray:any = [];
public returnArrayChatFromServer:any;
public returnArrayChatSessionFromServer:any;
public returnResultDataByNumber:any;
public returnArrayChatDataByNumberFromServer:any;
public chatVal:any = 2;
public selectNumber:any;
public countDataSession:any;
//check login
public genaratedFullDate:any;
public genaratedDate:any;
public year:any;
public month:any;
public day:any;
public hour:any;
public minutes:any;
public seconds:any;
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
public dbInstance!: SQLiteObject;
constructor(private databaseService: DatabaseService,private activaterouter : ActivatedRoute,private router: Router,private chatService: ChatService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
}
 async ngOnInit() {
  await this.getDeviceLanguage();
  await this.checkLoginUser();
    this.mainUserName = await this.storage.get('mainUserName');
    this.userName = await this.storage.get('userName');
    this.password = await this.storage.get('password');
    this.apiKey = await this.storage.get('apiKey');
    this.sessionLogin = await this.storage.get('sessionLogin');
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
    this.day = currentDate.getDate();
    this.hour = currentDate.getHours();
    this.minutes  = currentDate.getMinutes();
    this.seconds = currentDate.getSeconds();
    if(this.month<10)
      this.month = '0'+ this.month;
    if(this.day<10) 
      this.day = '0'+ this.day;
    if(this.hour<10) 
      this.hour = '0'+ this.hour;
    if(this.minutes<10) 
      this.minutes = '0'+ this.minutes;
    if(this.seconds<10) 
      this.seconds = '0'+ this.seconds;
    this.genaratedDate = this.year+""+this.month+""+this.day;
    this.genaratedFullDate = this.year+""+this.month+""+this.day+this.hour+this.minutes+this.seconds; 
    await this.activaterouter.params.subscribe(async (params:any) => {
      if(params['number']!="" && params['number']!=null && params['number']!=undefined && params['number']!=0){
        this.selectNumber = params['number'];
        await this.storage.set('selectedNumber',this.selectNumber);
        await this.functionReturnData(this.selectNumber);
      }
    });
  }
  async functionReturnData(numberUser:any){
    let key = this.mainUserName+this.userName+this.password+"(OLH)"+this.genaratedDate;
    const md5Hash = CryptoJS.algo.MD5.create();
    md5Hash.update(key);
    this.apiKey = md5Hash.finalize();
    this.apiKey=this.apiKey.toString();
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
    this.day = currentDate.getDate();
    this.hour = currentDate.getHours();
    this.minutes  = currentDate.getMinutes();
    this.seconds = currentDate.getSeconds();
    if(this.month<10)
      this.month = '0'+ this.month;
    if(this.day<10) 
      this.day = '0'+ this.day;
    if(this.hour<10)   
      this.hour = '0'+ this.hour;
    if(this.minutes<10) 
      this.minutes = '0'+ this.minutes;
    if(this.seconds<10) 
      this.seconds = '0'+ this.seconds;
    this.genaratedFullDate = this.year+""+this.month+""+this.day+this.hour+this.minutes+this.seconds;
    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'dataSearch':numberUser};
    this.chatService.chatHisByNumber(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.messageId;
      if(errorData == 1){
        this.returnChatArray=[];
        let counter = 0;
        let countOfData = 0;
        this.returnArrayChatFromServer = this.returnResultData.data.searchList[0].chatHistory;
        if(this.returnArrayChatFromServer.length!=0){
          this.countDataSession = 0;
          for(let i = 0; i < 3;i++) {
            ++this.countDataSession;
            if(this.returnArrayChatFromServer[i].chatSessionId.length > 27){
                await this.databaseService.selectItems('msg','session_id = ?',['${this.returnArrayChatFromServer[i].chatSessionId}'])
                .then((data:any) => {
                  if(data.rows.length==0){
                    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'mobile':numberUser,'sessionLogin':this.sessionLogin,'chatSessionId':this.returnArrayChatFromServer[i].chatSessionId};
                    this.chatService.chatGetDataByNumber(sendValues).then(async dataHist=>{
                      this.returnResultDataBySession = dataHist;
                      let errorDataSession = this.returnResultDataBySession.messageId;
                      if(errorDataSession == 1){
                        this.returnArrayChatSessionFromServer = this.returnResultDataBySession.data.process;
                        if(typeof this.returnArrayChatSessionFromServer[0].chatBot!== 'undefined'){
                          let chatBot = this.returnArrayChatSessionFromServer[0].chatBot;
                          for(let j = 0; j < chatBot.length;j++) {
                            let msgIdid = chatBot[j].id;
                            let numberSR = numberUser;
                            let msg = chatBot[j].txt;
                            let string = "<i class='material-icons medium'       style=cursor:default;color:#000000;>insert_drive_file </i>";
                            if (chatBot[j].txt.includes(string)) {
                              msg = chatBot[j].txt.replace(string, "<img src=\"../../assets/images/file.png\">");
                            } 
                            let time = chatBot[j].time;
                            let date = chatBot[j].date;
                            let dateId = chatBot[j].dateId;
                            let from = chatBot[j].support;
                            let filePath = 0;
                            let msg_status = 0;
                            let session_id = this.returnArrayChatFromServer[i].chatSessionId;
                            let private_note = 0;
                            await this.databaseService.insertItem('msg', '`msgId`,`numberSend`,`msg`,`time`,`date`,`dateId`,`from`,`filePath`,`msg_status`,`session_id`,`private_note`',
                              [msgIdid,numberSR,msg,time,date,dateId,from,filePath,msg_status,session_id,private_note])
                              .then((data:any) => {
                              }).catch(error =>console.log("no db"));
                            }
                        }
                        if(typeof this.returnArrayChatSessionFromServer[0].chat!== 'undefined'){
                          let chat = this.returnArrayChatSessionFromServer[0].chat;
                          for(let jj = 0; jj < chat.length;jj++) {
                            let msgIdid = chat[jj].id;
                            let numberSR = numberUser;
                            let msg = chat[jj].txt;
                            let string = "<i class='material-icons medium'       style=cursor:default;color:#000000;>insert_drive_file </i>";
                            if (chat[jj].txt.includes(string)) {
                              msg = chat[jj].txt.replace(string, "<img src=\"../../assets/images/file.png\">");
                            } 
                            let time = chat[jj].time;
                            let date = chat[jj].date;
                            let dateId = chat[jj].dateId;
                            let from = chat[jj].support;
                            let filePath = chat[jj].filePath;
                            let msg_status = chat[jj].msgStatus;
                            let session_id = this.returnArrayChatFromServer[i].chatSessionId;
                            let private_note = chat[jj].privateNote;
                            await this.databaseService.insertItem('msg', '`msgId`,`numberSend`,`msg`,`time`,`date`,`dateId`,`from`,`filePath`,`msg_status`,`session_id`,`private_note`',
                             [msgIdid,numberSR,msg,time,date,dateId,from,filePath,msg_status,session_id,private_note])
                             .then((data:any) => {
                             }).catch(error =>console.log("no db"));
                          }
                        }
                      }
                    })
                  }
                }).catch(error =>console.log("no db"));
            }else{
            }
          }
        }
      }
      setTimeout(() => {
        this.navCtrl.navigateRoot(['/chats', {number:numberUser}]);
    }, 1000);
    }).catch(error=>{
      this.functionReturnData(numberUser);
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
