import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationType'
})
export class NotificationTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
