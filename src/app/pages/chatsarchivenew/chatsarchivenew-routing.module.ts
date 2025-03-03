import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsarchivenewPage } from './chatsarchivenew.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsarchivenewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsarchivenewPageRoutingModule {}
