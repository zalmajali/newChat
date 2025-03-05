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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  template: `
  <audio #audio controls playsinline></audio>
  <button (click)="playAudio()">تشغيل الصوت</button>
`
})
export class ChatsPage implements OnInit {
  audioUrl: string = 'https://dev.taqnyat.sa/testmpz.mp3';

  constructor(private sanitizer: DomSanitizer,private transfer: FileTransfer,private camera: Camera,private http: HttpClient,private chooser: Chooser,private popoverCtrl: PopoverController,private file: File,private activaterouter : ActivatedRoute,private databaseService: DatabaseService,private router: Router,private chatService: ChatService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
    });
  }
  async ngOnInit() {
    this.loadAudio();
  }
  async loadAudio() {
    try {
      const response = await fetch(this.audioUrl);
      if (!response.ok) throw new Error('فشل تحميل الصوت');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const audioElement = document.querySelector('audio') as HTMLAudioElement;
      if (audioElement) {
        audioElement.src = url;
      }
    } catch (error) {
      alert(JSON.stringify(error))
      console.error('حدث خطأ أثناء تحميل الصوت:', error);
    }
  }

  playAudio() {
    const audioElement = document.querySelector('audio') as HTMLAudioElement;
    if (audioElement) {
      audioElement.play().catch(err => console.error('خطأ في تشغيل الصوت:', err));
    }
  }
}
