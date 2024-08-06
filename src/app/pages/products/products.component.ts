import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/productService/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  allProducts: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchData:any=""

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.ps.getProductsApi().subscribe((result: any) => {
      this.allProducts = result;
      this.filteredProducts = this.allProducts;
      this.getCategories();
    });
  }

  getCategories() {
    this.categories = [...new Set(this.allProducts.map(product => product.category))];
  }

  filterProducts() {
    if (this.selectedCategory) {
      this.filteredProducts = this.allProducts.filter(product => product.category === this.selectedCategory);
    } else {
      this.filteredProducts = this.allProducts;
    }
  }

  deleteProducts(id: any) {
    this.ps.deleteProductsApi(id).subscribe(() => {
      alert('Product deleted');
      this.ps.getProductsApi().subscribe((result: any) => {
        this.allProducts = result;
        this.filterProducts();
      });
    });
  }
}
