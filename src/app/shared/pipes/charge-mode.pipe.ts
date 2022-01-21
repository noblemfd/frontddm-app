import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chargeMode'
})
export class ChargeModePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
