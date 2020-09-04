import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewReimbursementComponent } from './view-reimbursement.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/_pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// export const routes: Routes = [
//   {
//     path: '',
//     component: ViewReimbursementComponent,
//   },
// ];

@NgModule({
  declarations: [ViewReimbursementComponent],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule.forChild(routes),
    PipeModule,
    NgbModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    NgxDatatableModule,
  ],
  providers: [
    DatePipe
  ],
  exports: [
    ViewReimbursementComponent
  ]
})
export class ViewReimbursementModule { }
