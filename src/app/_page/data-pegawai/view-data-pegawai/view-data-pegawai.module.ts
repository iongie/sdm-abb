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
import { ViewRewardModule } from '../../reward/view-reward/view-reward.module';
import { ViewReimbursementModule } from '../../reimbursement/view-reimbursement/view-reimbursement.module';
import { ViewPunismentModule } from '../../punisment/view-punisment/view-punisment.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
    TabsModule.forRoot(),
    NgxDatatableModule,
    ViewPunismentModule,
    ViewRewardModule,
    ViewReimbursementModule
  ],
  providers: [
    DatePipe
  ]
})
export class ViewDataPegawaiModule { }
