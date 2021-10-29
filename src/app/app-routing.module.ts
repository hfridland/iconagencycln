import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartsFormComponent } from './main-layout/forms/parts-form/parts-form.component';
import { ProductsFormComponent } from './main-layout/forms/products-form/products-form.component';
import { QuotesFormComponent } from './main-layout/forms/quotes-form/quotes-form.component';
import { LoginComponent } from './main-layout/login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'parts', component: PartsFormComponent },
      { path: 'products', component: ProductsFormComponent },
      { path: 'quotes', component: QuotesFormComponent },
      { path: 'login', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
