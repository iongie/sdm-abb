import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewReqKaryawanComponent } from './view-req-karyawan.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PipeModule } from 'src/app/_pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

export const routes: Routes = [
  {
    path: '',
    component: ViewReqKaryawanComponent,
  },
];

@NgModule({
  declarations: [ViewReqKaryawanComponent],
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
export class ViewReqKaryawanModule { }
