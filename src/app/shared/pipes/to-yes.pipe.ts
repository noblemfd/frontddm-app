import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toYes'
})
export class ToYesPipe implements PipeTransform {
  transform(value: any): string {
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
        return "Yes";
      default:
        return "No";
    }
  }
}
