import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ProfileComponent } from './profile/profile.component';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';
import { InvoiceUpdateDetailsComponent } from './invoice-update-details/invoice-update-details.component';


@NgModule({
  declarations: [
    AppComponent,
    VendorComponent,
    InvoiceComponent,
    VendorListComponent,
    InvoiceListComponent,
    VendorDetailsComponent,
    LoginComponent,
    RegisterComponent,
    
    ProfileComponent,
          VendorDetailsComponent,
          InvoiceUpdateDetailsComponent,
   
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
