import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from '@ionic/storage-angular';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
@Component({
  selector: 'app-popovercontent',
  templateUrl: './popovercontent.component.html',
  styleUrls: ['./popovercontent.component.scss'],
})
export class PopovercontentComponent  implements OnInit {

  public document: any;
  public image: any;
  public audio: any;
  public template: any;
  public fast_response: any;
  public dir: any;
  //page setting
  public checkLanguage: any=0;
  public language: any;
  public menuDirection: any;
  public menuDirectionTow: any;
  public showPassword: boolean = false;
  constructor(private popoverController: PopoverController,private globalization: Globalization,private translate: TranslateService,private storage: Storage) { }
  async selectItem(item: any) {
    await this.popoverController.dismiss(item);
  }
  initialiseTranslation(){
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('document').subscribe((res: string) => {
      this.document = res;
    });
    this.translate.get('image').subscribe((res: string) => {
      this.image = res;
    });
    this.translate.get('audio').subscribe((res: string) => {
      this.audio = res;
    });
    this.translate.get('template').subscribe((res: string) => {
      this.template = res;
    });
    this.translate.get('fast_response').subscribe((res: string) => {
      this.fast_response = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
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
