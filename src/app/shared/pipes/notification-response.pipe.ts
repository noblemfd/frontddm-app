import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationResponse'
})
export class NotificationResponsePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
