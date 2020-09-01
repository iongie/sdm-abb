import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRkpComponent } from './view-rkp.component';
import { Routes, RouterModule } from '@angular/router';
import { PipeModule } from 'src/app/_pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

export const routes: Routes = [
  {
    path: '',
    component: ViewRkpComponent,
  },
];

@NgModule({
  declarations: [ViewRkpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PipeModule,
    NgbModule,
    NgSelectModule
  ]
})
export class ViewRkpModule { }
