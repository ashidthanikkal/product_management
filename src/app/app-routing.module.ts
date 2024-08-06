import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { AddproductsComponent } from './pages/addproducts/addproducts.component';
import { EditproductsComponent } from './pages/editproducts/editproducts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'dashboard',component:DashboardComponent },
  { path: 'allproducts',component:ProductsComponent},
  { path: 'addproducts',component:AddproductsComponent},
  { path: 'editproducts/:id',component:EditproductsComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
