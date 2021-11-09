import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from './main-layout/login/login.component';
import { PartsFormComponent } from './main-layout/forms/parts-form/parts-form.component';
import { ProductsFormComponent } from './main-layout/forms/products-form/products-form.component';
import { QuotesFormComponent } from './main-layout/forms/quotes-form/quotes-form.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { GetNewPrtNoDialogComponent } from './main-layout/dialogs/get-new-prt-no-dialog/get-new-prt-no-dialog.component';
import { PartNoSearchDialogComponent } from './main-layout/dialogs/part-no-search-dialog/part-no-search-dialog.component';
import { ProductNoSearchDialogComponent } from './main-layout/dialogs/product-no-search-dialog/product-no-search-dialog.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginComponent,
    PartsFormComponent,
    ProductsFormComponent,
    QuotesFormComponent,
    GetNewPrtNoDialogComponent,
    PartNoSearchDialogComponent,
    ProductNoSearchDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
