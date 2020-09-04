import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddInterviewComponent } from './add-interview.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/_pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule, TimepickerConfig, TimepickerActions } from 'ngx-bootstrap/timepicker';

export const routes: Routes = [
  {
    path: '',
    component: AddInterviewComponent,
  },
];

@NgModule({
  declarations: [AddInterviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipeModule,
    NgbModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule
  ],
  providers: [
    DatePipe,
    TimepickerConfig,
    TimepickerActions
  ]
})
export class AddInterviewModule { }
