import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfAny: any[], term:string): any[] {
    return arrayOfAny.filter( (item) => item.title.toLowerCase().includes( term.toLowerCase() ) );
  }

}
