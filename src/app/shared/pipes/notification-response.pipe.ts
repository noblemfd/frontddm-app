import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationResponse'
})
export class NotificationResponsePipe implements PipeTransform {

  transform(value: number): string {
    if (value == 0) {
        return 'None';
    }
    if (value == 1) {
      return 'Rejected';
    }
    if (value == 2) {
      return 'Accepted';
    }
    return 'None';
  }
}
