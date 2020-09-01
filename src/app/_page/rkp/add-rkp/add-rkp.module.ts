import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddRkpComponent } from './add-rkp.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/_pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

export const routes: Routes = [
  {
    path: '',
    component: AddRkpComponent,
  },
];

@NgModule({
  declarations: [AddRkpComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipeModule,
    NgbModule,
    NgSelectModule
  ],
  providers: [
    DatePipe
  ]
})
export class AddRkpModule { }
