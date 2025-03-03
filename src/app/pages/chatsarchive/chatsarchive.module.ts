import { NgModule,NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatsarchivePageRoutingModule } from './chatsarchive-routing.module';

import { ChatsarchivePage } from './chatsarchive.page';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsarchivePageRoutingModule
  ],
  declarations: [ChatsarchivePage]
})
export class ChatsarchivePageModule {}
