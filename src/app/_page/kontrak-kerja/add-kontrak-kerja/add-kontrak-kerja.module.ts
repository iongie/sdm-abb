import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddKontrakKerjaComponent } from './add-kontrak-kerja.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/_pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

export const routes: Routes = [
  {
    path: '',
    component: AddKontrakKerjaComponent,
  },
];

@NgModule({
  declarations: [AddKontrakKerjaComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipeModule,
    NgbModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgxDatatableModule
  ],
  providers: [
    DatePipe
  ]
})
export class AddKontrakKerjaModule { }
