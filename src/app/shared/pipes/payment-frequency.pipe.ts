import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentFrequency'
})
export class PaymentFrequencyPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
        return 'Monthly';
    }
    if (value == 2) {
      return 'Quarterly';
    }
    if (value == 3) {
      return 'Yearly';
    }
    return 'Monthly';
  }
}
