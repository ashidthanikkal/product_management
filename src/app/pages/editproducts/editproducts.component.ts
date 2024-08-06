import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/productService/product.service';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css']
})
export class EditproductsComponent implements OnInit {

  productId:any=""
  singleProduct:any={}


  constructor(private fb:FormBuilder, private ps:ProductService, private route:ActivatedRoute,private ro:Router){}
  editForm=this.fb.group({
    name:['',Validators.required],
    brand:['',Validators.required],
    category:['',Validators.required],
    price:['',Validators.required],
    description:['',Validators.required],
    image:['',Validators.required]

  })


  ngOnInit() {
    this.route.params.subscribe((params:any) => {
       this.productId = params['id'];
      // console.log(prodId);
    })
    this.ps.getSingleProductsApi(this.productId).subscribe((result)=>{
      // console.log(result);
      this.singleProduct=result
    })
  }

  editProducts(){
    if(this.editForm.valid){
      this.ps.editProductsApi(this.productId,this.editForm.value).subscribe((result:any)=>{
        // console.log(result);
        alert('Product Updated successfully')
        this.ro.navigateByUrl('/allproducts')
      })
    }
    else{
      alert('Please fill all datas')
    }
  }



}
