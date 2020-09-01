import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewDataPegawaiComponent } from './view-data-pegawai.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/_pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';

export const routes: Routes = [
  {
    path: '',
    component: ViewDataPegawaiComponent,
  },
];

@NgModule({
  declarations: [ViewDataPegawaiComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipeModule,
    NgbModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class ViewDataPegawaiModule { }
