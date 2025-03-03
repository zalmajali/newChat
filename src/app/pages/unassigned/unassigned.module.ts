import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnassignedPageRoutingModule } from './unassigned-routing.module';

import { UnassignedPage } from './unassigned.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnassignedPageRoutingModule
  ],
  declarations: [UnassignedPage]
})
export class UnassignedPageModule {}
