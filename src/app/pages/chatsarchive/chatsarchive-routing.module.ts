import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsarchivePage } from './chatsarchive.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsarchivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsarchivePageRoutingModule {}
