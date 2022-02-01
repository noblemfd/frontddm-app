import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationRequired'
})
export class NotificationRequiredPipe implements PipeTransform {

  transform(value: any): string {
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
        return "True";
      default:
        return "False";
    }
  }

}
