import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EditRkpComponent } from './edit-rkp.component';
import { Routes, RouterModule } from '@angular/router';
import { PipeModule } from 'src/app/_pipe/pipe.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const routes: Routes = [
  {
    path: '',
    component: EditRkpComponent,
  },
];

@NgModule({
  declarations: [EditRkpComponent],
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
export class EditRkpModule { }
