import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationRequired'
})
export class NotificationRequiredPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
