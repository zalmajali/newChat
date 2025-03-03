import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatsarchivenewPageRoutingModule } from './chatsarchivenew-routing.module';

import { ChatsarchivenewPage } from './chatsarchivenew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsarchivenewPageRoutingModule
  ],
  declarations: [ChatsarchivenewPage]
})
export class ChatsarchivenewPageModule {}
