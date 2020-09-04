import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DatatableLokerComponent } from './datatable-loker.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

export const routes: Routes = [
  {
    path: '',
    component: DatatableLokerComponent,
  },
];

@NgModule({
  declarations: [DatatableLokerComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class DatatableLokerModule { }
