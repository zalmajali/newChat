import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FetchdataPageRoutingModule } from './fetchdata-routing.module';

import { FetchdataPage } from './fetchdata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FetchdataPageRoutingModule
  ],
  declarations: [FetchdataPage]
})
export class FetchdataPageModule {}
