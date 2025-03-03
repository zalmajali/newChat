import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueuedPage } from './queued.page';

const routes: Routes = [
  {
    path: '',
    component: QueuedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueuedPageRoutingModule {}
