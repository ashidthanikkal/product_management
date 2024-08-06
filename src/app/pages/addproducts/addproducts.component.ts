import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/productService/product.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent {

  constructor(private fb:FormBuilder, private ps:ProductService, private ro:Router){}
  addForm=this.fb.group({
    name:['',Validators.required],
    brand:['',Validators.required],
    category:['',Validators.required],
    price:['',Validators.required],
    description:['',Validators.required],
    image:['',Validators.required]

  })

  addProduct(){
    if(this.addForm.valid){
      var path=this.addForm.value
      this.ps.addProductsApi({name:path.name,brand:path.brand,category:path.category,description:path.description,price:path.price,image:path.image})
      .subscribe((result)=>{
        console.log(result);
        alert('product added successfully')
        this.ro.navigateByUrl('/allproducts')
      })
    }

    else{
      alert('please fill all datas')
    }
  }

}
