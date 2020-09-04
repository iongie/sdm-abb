import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DatatablePunismentComponent } from './datatable-punisment.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

export const routes: Routes = [
  {
    path: '',
    component: DatatablePunismentComponent,
  },
];

@NgModule({
  declarations: [DatatablePunismentComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
  ],
  providers: [
    DatePipe
  ]
})
export class DatatablePunismentModule { }
