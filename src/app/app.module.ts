import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AddproductsComponent } from './pages/addproducts/addproducts.component';
import { ProductsComponent } from './pages/products/products.component';
import { EditproductsComponent } from './pages/editproducts/editproducts.component';
import { FilterPipe } from './productsPipe/filter.pipe';
import { SearchPipe } from './productsPipe/search.pipe';
import { ChartComponent } from './pages/chart/chart.component';
import { CalanderComponent } from './pages/calander/calander.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { HighchartsChartModule } from 'highcharts-angular';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AddproductsComponent,
    ProductsComponent,
    EditproductsComponent,
    FilterPipe,
    SearchPipe,
    ChartComponent,
    CalanderComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HighchartsChartModule
        ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
