import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_service/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./_layout/content/content.module').then(m => m.ContentModule),
  },
  {
    path: '',
    loadChildren: () => import('./_layout/full/full.module').then(m => m.FullModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}