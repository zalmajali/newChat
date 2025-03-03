import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'addcontact',
    loadChildren: () => import('./pages/addcontact/addcontact.module').then( m => m.AddcontactPageModule)
  },
  {
    path: 'editcontact',
    loadChildren: () => import('./pages/editcontact/editcontact.module').then( m => m.EditcontactPageModule)
  },
  {
    path: 'chatbot',
    loadChildren: () => import('./pages/chatbot/chatbot.module').then( m => m.ChatbotPageModule)
  },
  {
    path: 'queued',
    loadChildren: () => import('./pages/queued/queued.module').then( m => m.QueuedPageModule)
  },
  {
    path: 'unassigned',
    loadChildren: () => import('./pages/unassigned/unassigned.module').then( m => m.UnassignedPageModule)
  },
  {
    path: 'archive',
    loadChildren: () => import('./pages/archive/archive.module').then( m => m.ArchivePageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./pages/chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'fetchdata',
    loadChildren: () => import('./pages/fetchdata/fetchdata.module').then( m => m.FetchdataPageModule)
  },
  {
    path: 'chatsarchive',
    loadChildren: () => import('./pages/chatsarchive/chatsarchive.module').then( m => m.ChatsarchivePageModule)
  },
  {
    path: 'archivenumber',
    loadChildren: () => import('./pages/archivenumber/archivenumber.module').then( m => m.ArchivenumberPageModule)
  },
  {
    path: 'chatsarchivenew',
    loadChildren: () => import('./pages/chatsarchivenew/chatsarchivenew.module').then( m => m.ChatsarchivenewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
