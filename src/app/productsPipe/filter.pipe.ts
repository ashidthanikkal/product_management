import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(productsArray:any[],filterCategory:string) {
    if(!productsArray || !filterCategory){
      return productsArray
    }
    else{
      return productsArray.filter((item:any)=>item.category==filterCategory)
    }
  
  }

}
