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
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { PopoverController } from '@ionic/angular';
import { PopovercontentComponent } from '../popovercontent/popovercontent.component';
import { FastresponseComponent } from '../fastresponse/fastresponse.component';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import {SubmenuComponent} from "../submenu/submenu.component";
import {TemplateComponent} from "../template/template.component";
import 'emoji-picker-element';
@Component({
  selector: 'app-chatsarchive',
  templateUrl: './chatsarchive.page.html',
  styleUrls: ['./chatsarchive.page.scss'],
})
export class ChatsarchivePage implements OnInit {
@ViewChild('chatList', { read: ElementRef }) private chatList: ElementRef  | any;
public arrow_back:any;
public arrow_go:any;
public floatD:any;
public returnResultData:any;
public returnChatArray:any = [];
public returnArrayChatFromServer:any;
public returnResultDataByNumber:any;
public returnArrayChatDataByNumberFromServer:any;
public chatVal:any = 2;
public send_image:any;
public selectNumber:any;
public chatSessionId:any;
public chatSessionIdAr:any;
public returnResultDataBySession:any;
public returnArrayChatSessionFromServer:any;
public counter:any;
public returnDataFromPop:any;
public view_contact:any;
public close_chat:any;
public assign_to:any;
public archives:any;
public mute_chat:any;
public span_menue:any;
//message
public toggled = false;
public allMasseges:any=[];
public onMessage:any="";
public chat_class_one:any;
public chat_class_tow:any;
public chat_class_three:any;
public chat_class_fore:any;
public chat_class_five:any;
public chat_class_six:any;
public chat_class_seven:any;
public message_text:any;
public filedata:any;
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
public isScroolTo:any=2;
public countOfNewMsg:any=0;
//page setting
public checkLanguage: any=0;
public language: any;
public menuDirection: any;
public menuDirectionTow: any;
public showPassword: boolean = false;
public dbInstance!: SQLiteObject;
  constructor(private transfer: FileTransfer,private camera: Camera,private http: HttpClient,private chooser: Chooser,private popoverCtrl: PopoverController,private mediaPlugin: Media,private file: File,private activaterouter : ActivatedRoute,private databaseService: DatabaseService,private router: Router,private chatService: ChatService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
    });
    this.menu.enable(false,"sideMenu");
    setTimeout(() => {
      const chatListElement = this.chatList.nativeElement as HTMLElement;
      chatListElement.scrollTop = 50000;
  }, 100);
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
    this.translate.get('chat_class_one').subscribe((res: string) => {
      this.chat_class_one = res;
    });
    this.translate.get('chat_class_tow').subscribe((res: string) => {
      this.chat_class_tow = res;
    });
    this.translate.get('chat_class_three').subscribe((res: string) => {
      this.chat_class_three = res;
    });
    this.translate.get('chat_class_fore').subscribe((res: string) => {
      this.chat_class_fore = res;
    });
    this.translate.get('chat_class_five').subscribe((res: string) => {
      this.chat_class_five = res;
    });
    this.translate.get('chat_class_six').subscribe((res: string) => {
      this.chat_class_six = res;
    });
    this.translate.get('chat_class_seven').subscribe((res: string) => {
      this.chat_class_seven = res;
    });
    this.translate.get('send_image').subscribe((res: string) => {
      this.send_image = res;
    });
    this.translate.get('message_text').subscribe((res: string) => {
      this.message_text = res;
    });

    this.translate.get('view_contact').subscribe((res: string) => {
      this.view_contact = res;
    });
    this.translate.get('close_chat').subscribe((res: string) => {
      this.close_chat = res;
    });
    this.translate.get('assign_to').subscribe((res: string) => {
      this.assign_to = res;
    });
    this.translate.get('archives').subscribe((res: string) => {
      this.archives = res;
    });
    this.translate.get('mute_chat').subscribe((res: string) => {
      this.mute_chat = res;
    });
    this.translate.get('span_menue').subscribe((res: string) => {
      this.span_menue = res;
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
      }
      if(params['chatSessionId']!="" && params['chatSessionId']!=null && params['chatSessionId']!=undefined && params['chatSessionId']!=0){
        this.chatSessionId = params['chatSessionId'];
        await this.storage.set('selectedChatSessionId',this.chatSessionId);
      }
      if(params['chatSessionIdAr']!="" && params['chatSessionIdAr']!=null && params['chatSessionIdAr']!=undefined && params['chatSessionIdAr']!=0){
        this.chatSessionIdAr = params['chatSessionIdAr'];
      }
      await this.functionFeachData(this.selectNumber,this.chatSessionIdAr);
      await this.functionChaeckSession(this.selectNumber,this.chatSessionId);
    });
    // Load initial messages if any
  }
  functionSendFile(){
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
    let date = this.year+"/"+this.month+"/"+this.day;
    let typeTime =  this.hour >= 12 ? 'PM' : 'AM';
    let time = this.hour+":"+this.minutes+" "+typeTime;
    const fileTransfer: FileTransferObject = this.transfer.create();
    this.chooser.getFile().then(async (file) =>{
      this.filedata = file;
      if(this.filedata!=undefined && this.filedata!=null && this.filedata!=""){
        let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'mobile':this.selectNumber,'sessionLogin':this.sessionLogin};
        const jsonData = JSON.stringify(sendValues);
        let options: FileUploadOptions = {
          fileKey: 'chatFile',
          fileName:this.filedata.name,
          mimeType:this.filedata.mediaType,
          chunkedMode:false,
          params: sendValues,
          headers: {}
        }
          fileTransfer.upload(this.filedata.uri, "https://api.taqnyat.sa/chatSendFile.php", options)
          .then(async(data) => {
            this.navCtrl.navigateRoot(['/chats', {number:this.selectNumber,chatSessionId:this.chatSessionId}]);
          }, (err) => {
            
        })
      }
  })
  .catch((error: any) => {});
  this.toggled = false;
  }  
  functionSendImage(){
    const optionsD: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    const fileTransfer: FileTransferObject = this.transfer.create();
    const formData = new FormData();
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
    let date = this.year+"/"+this.month+"/"+this.day;
    let typeTime =  this.hour >= 12 ? 'PM' : 'AM';
    let time = this.hour+":"+this.minutes+" "+typeTime;
    this.camera.getPicture(optionsD).then(async(imageData) => {
      let imageName = imageData.substring(imageData.lastIndexOf('/') + 1);
      let imageExtension = imageData.split('.').pop().toLowerCase();
      let imagemimeType: string="";
      if (imageExtension === 'jpg' || imageExtension === 'jpeg') {
        imagemimeType = "image/jpeg";
      } else if (imageExtension === 'png') {
        imagemimeType = "image/png";
      }
      else if (imageExtension === 'gif') {
        imagemimeType = "image/gif";
      }
      if(imageData!=undefined && imageData!=null && imageData!=""){
        let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'mobile':this.selectNumber,'sessionLogin':this.sessionLogin};
        const jsonData = JSON.stringify(sendValues);
        let options: FileUploadOptions = {
          fileKey: 'chatFile',
          fileName:imageName,
          mimeType: imagemimeType,
          chunkedMode:false,
          params: sendValues,
          headers: {}
        }
          fileTransfer.upload(imageData, "https://api.taqnyat.sa/chatSendFile.php", options)
          .then(async(data) => {
            this.navCtrl.navigateRoot(['/chats', {number:this.selectNumber,chatSessionId:this.chatSessionId}]);
            this.onMessage = "";
          }, (err) => {
           
        })
      }
    }, (err) => {
    });
    this.toggled = false;
  }  
  functionSelectEmoji(event:any){
    this.onMessage += ' ' + event.emoji.unicode;
  }

functionChaeckSession(numberUser:any,chatSessionId:any){
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
  let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'mobile':numberUser,'sessionLogin':this.sessionLogin,'chatSessionId':chatSessionId};
  this.chatService.chatGetDataByNumber(sendValues).then(async dataHist=>{
    this.returnResultDataBySession = dataHist;
    let errorDataSession = this.returnResultDataBySession.messageId;
    if(errorDataSession != 1){
      this.navCtrl.navigateRoot('home');
    }
  });
}
  async functionFeachData(numberUser:any,chatSessionId:any){
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
    let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'mobile':numberUser,'sessionLogin':this.sessionLogin,'chatSessionId':chatSessionId};
    this.chatService.chatGetDataByNumber(sendValues).then(async dataHist=>{
      this.returnResultDataBySession = dataHist;
      let errorDataSession = this.returnResultDataBySession.messageId;
      if(errorDataSession == 1){
        this.allMasseges = [];
        this.returnArrayChatSessionFromServer = this.returnResultDataBySession.data.process;
        this.counter = 0;
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
            let session_id = chatSessionId;
            let private_note = 0;
            ++this.counter;
            this.allMasseges.push({
                    msgId: msgIdid,
                    number: numberSR,
                    msg: msg,
                    time: time,
                    date: date,
                    dateId: dateId,
                    from: from,
                    filePath: filePath,
                    msg_status: msg_status,
                    session_id: session_id,
                    private_note: private_note
            });
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
            let session_id = chatSessionId;
            let private_note = chat[jj].privateNote;

            this.allMasseges.push({
              msgId: msgIdid,
              number: numberSR,
              msg: msg,
              time: time,
              date: date,
              dateId: dateId,
              from: from,
              filePath: filePath,
              msg_status: msg_status,
              session_id: session_id,
              private_note: private_note
           });
          }
        }
      }
    })
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
  functionBackHome(){
    this.navCtrl.navigateRoot('home');
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
  scrollToBottom() {
    setTimeout(() => {
        const chatListElement = this.chatList.nativeElement as HTMLElement;
        chatListElement.scrollTop = 50000;
    }, 50);
  }
  async addMessage() { 
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
    let date = this.year+"/"+this.month+"/"+this.day;
    let typeTime =  this.hour >= 12 ? 'PM' : 'AM';
    let time = this.hour+":"+this.minutes+" "+typeTime;
    if (this.onMessage.trim()) {
      let sendValues = {'mainUserName':this.mainUserName,'userName':this.userName,'password':this.password,'apiKey':this.apiKey,'mobile':this.selectNumber,'sessionLogin':this.sessionLogin,'chatTxt':this.onMessage};
      this.chatService.sendMessage(sendValues).then(async dataHist=>{
        this.returnResultDataBySession = dataHist;
        let errorDataSession = this.returnResultDataBySession.messageId;
        if(errorDataSession == 1){
          this.navCtrl.navigateRoot(['/chats', {number:this.selectNumber,chatSessionId:this.chatSessionId}]);
        }
      })
    }
    this.toggled = false;
  }
  onScroll(event:any){
    const scrollElement = event.target as HTMLElement;
    if (scrollElement.scrollTop) {
     this.isScroolTo = 0;
    }
    const scrollHeight = scrollElement.scrollHeight;
    const scrollTop = scrollElement.scrollTop;
    const offsetHeight = scrollElement.offsetHeight;
    if (scrollTop + offsetHeight >= scrollHeight) {
      this.isScroolTo = 1;
      this.countOfNewMsg=0;
    }
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopovercontentComponent,
      event: ev,
      animated:true,
      translucent: true,
      showBackdrop:false,
    });
    await popover.present();
    this.returnDataFromPop = await popover.onWillDismiss();
    if(this.returnDataFromPop!=undefined && this.returnDataFromPop!=0 && this.returnDataFromPop!=null){
      let data = this.returnDataFromPop.data;
      if(data == 1){
        this.functionSendFile();
      }else if(data == 2){
        this.functionSendImage();
      }else if(data == 3){
        this.functionSendFile();
      }else if(data == 4){
        this.functionMenueTemp();
      }else if(data == 5){
        this.fastresponse(ev);
      }
    }
  }
  async fastresponse(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: FastresponseComponent,
      event: ev,
      animated:true,
      translucent: true,
      showBackdrop:false,
    });
    await popover.present();
    this.returnDataFromPop = await popover.onWillDismiss();
    if(this.returnDataFromPop!=undefined && this.returnDataFromPop!=0 && this.returnDataFromPop!=null){
      let data = this.returnDataFromPop.data;
      this.onMessage = data;
    }
  }
  functionContact(){
    this.navCtrl.navigateRoot('contacts');
  }
  functionArchive(number:any,chatSessionId:any){
    this.navCtrl.navigateRoot(['/archive', {number:number,chatSessionId:chatSessionId}]);
  }
  async functionMenueformation(type:any){
    this.modalController.dismiss({});
    let model = await this.modalController.create({
      component:SubmenuComponent,
      animated:true,
      componentProps:{type:type,number:this.selectNumber},
      cssClass:"my-custom-modal"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async functionMenueTemp(){
    this.modalController.dismiss({});
    let model = await this.modalController.create({
      component:TemplateComponent,
      animated:true,
      componentProps:{},
      cssClass:"my-custom-modal-temp"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  functionCloseMenu(){
    this.modalController.dismiss({});
  }
  
}
