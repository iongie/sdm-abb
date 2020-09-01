import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EditInterviewComponent } from './edit-interview.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/_pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

export const routes: Routes = [
  {
    path: '',
    component: EditInterviewComponent,
  },
];

@NgModule({
  declarations: [EditInterviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipeModule,
    NgbModule,
    NgSelectModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class EditInterviewModule { }
