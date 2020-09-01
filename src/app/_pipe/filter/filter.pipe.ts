import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter(item => {
        return JSON.stringify(item).toLowerCase().includes(args);
    });

    // TODO : *ngFor="let item of data | filter: '1'"
}

}