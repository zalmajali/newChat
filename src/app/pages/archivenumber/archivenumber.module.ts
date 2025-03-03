import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivenumberPageRoutingModule } from './archivenumber-routing.module';

import { ArchivenumberPage } from './archivenumber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivenumberPageRoutingModule
  ],
  declarations: [ArchivenumberPage]
})
export class ArchivenumberPageModule {}
