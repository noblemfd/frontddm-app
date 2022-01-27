import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mandateStatus'
})
export class MandateStatusPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 0) {
        return 'Pending';
    }
    if (value == 1) {
      return 'Failed';
    }
    if (value == 2) {
      return 'Processed';
    }
    return 'Processed';
  }
}
