import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl="https://product-management-server-o799.onrender.com"

  constructor(private http:HttpClient) { }

  addProductsApi(bodyData:any){
   return this.http.post(`${this.baseUrl}/products`,bodyData)
  }

  getProductsApi(){
    return this.http.get(`${this.baseUrl}/products`)
   }

   deleteProductsApi(id:any){
    return this.http.delete(`${this.baseUrl}/products/${id}`)
   }

   editProductsApi(id:any,bodyData:any){
    return this.http.put(`${this.baseUrl}/products/${id}`,bodyData)
   }

   getSingleProductsApi(id:any){
    return this.http.get(`${this.baseUrl}/products/${id}`)
   }


 
}
