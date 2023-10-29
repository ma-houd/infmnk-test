import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  transform(text: string): string {
    return text.charAt(0).toUpperCase() + text.substring(1);
  }
}
