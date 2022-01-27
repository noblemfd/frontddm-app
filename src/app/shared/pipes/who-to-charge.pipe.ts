import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whoToCharge'
})
export class WhoToChargePipe implements PipeTransform {

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
    if (value == 3) {
      return 'Both';
    }
    return 'Merchant';
  }
}
