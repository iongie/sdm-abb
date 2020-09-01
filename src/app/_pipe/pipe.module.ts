import { NgModule } from '@angular/core';
import { OrderByPipe } from './order-by/order-by.pipe';
import { FilterPipe } from './filter/filter.pipe';
import { SearchPipe } from './search/search.pipe';



@NgModule({
  declarations: [OrderByPipe, FilterPipe, SearchPipe],
  exports: [OrderByPipe, FilterPipe, SearchPipe]
})
export class PipeModule { }
