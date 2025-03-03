import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchivenumberPage } from './archivenumber.page';

const routes: Routes = [
  {
    path: '',
    component: ArchivenumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchivenumberPageRoutingModule {}
