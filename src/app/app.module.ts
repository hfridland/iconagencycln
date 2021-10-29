import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginComponent,
    PartsFormComponent,
    ProductsFormComponent,
    QuotesFormComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
