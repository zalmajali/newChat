import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FetchdataPage } from './fetchdata.page';

const routes: Routes = [
  {
    path: '',
    component: FetchdataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FetchdataPageRoutingModule {}
