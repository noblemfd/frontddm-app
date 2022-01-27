import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chargeMode'
})
export class ChargeModePipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
        return 'Fixed';
    }
    if (value == 2) {
      return 'Percentage';
    }
    return 'Fixed';
  }
}
