import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnassignedPage } from './unassigned.page';

const routes: Routes = [
  {
    path: '',
    component: UnassignedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnassignedPageRoutingModule {}
