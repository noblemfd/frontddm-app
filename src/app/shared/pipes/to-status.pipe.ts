import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toStatus'
})
export class ToStatusPipe implements PipeTransform {
  transform(value: any): string {
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
        return "Active";
      default:
        return "Inactive";
    }
  }
}
