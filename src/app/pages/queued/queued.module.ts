import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueuedPageRoutingModule } from './queued-routing.module';

import { QueuedPage } from './queued.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QueuedPageRoutingModule
  ],
  declarations: [QueuedPage]
})
export class QueuedPageModule {}
