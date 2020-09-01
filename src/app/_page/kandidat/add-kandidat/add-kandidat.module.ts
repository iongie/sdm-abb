import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddKandidatComponent } from './add-kandidat.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/_pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ArchwizardModule } from 'angular-archwizard';

export const routes: Routes = [
  {
    path: '',
    component: AddKandidatComponent,
  },
];

@NgModule({
  declarations: [AddKandidatComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipeModule,
    // ArchwizardModule,
    NgbModule,
    NgSelectModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class AddKandidatModule { }
