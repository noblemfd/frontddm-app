import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toBoolean'
})
export class ToBooleanPipe implements PipeTransform {
  transform(value: any): string {
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
        return "Accepted";
      default:
        return "Not Accepted";
    }
  }
}
