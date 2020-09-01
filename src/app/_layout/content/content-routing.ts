import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { Routes, RouterModule } from '@angular/router';
import { DisableLoginGuard } from '../../_service/disable-login/disable-login.guard';

export const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path:'login',
        loadChildren: () => import('../../_page/login/login.module').then(m => m.LoginModule),
        canActivate: [DisableLoginGuard]
      },
      {
        path:'register',
        loadChildren: () => import('../../_page/register/register.module').then(m => m.RegisterModule),
      },
      {
        path:'forgot-password',
        loadChildren: () => import('../../_page/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
      },
      {
        path:'error',
        loadChildren: () => import('../../_page/error/error.module').then(m => m.ErrorModule),
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ContentRoutingModule {}