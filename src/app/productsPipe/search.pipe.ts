import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productArray:any[],searchString:string): any {
    if(!productArray || !searchString){
      return productArray
    }
    else{
      return productArray.filter((i:any)=>i.name.trim().toLowerCase().includes(
        searchString.trim().toLowerCase()
      ))
    }
  }

}
