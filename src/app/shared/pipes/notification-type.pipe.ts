import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationType'
})
export class NotificationTypePipe implements PipeTransform {

  transform(value: number): string {
    if (value == 0) {
        return 'None';
    }
    if (value == 1) {
      return 'Merchant';
    }
    if (value == 2) {
      return 'Customer';
    }
    return 'None';
  }
}
