import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullComponent } from './full.component';
import { FullRoutingModule } from './full-routing';
import { ComponentModule } from '../../_component/component.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FullComponent],
  imports: [
    CommonModule,
    FullRoutingModule,
    ComponentModule,
    NgbModule,
    FormsModule
  ]
})
export class FullModule { }
