import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './components/vendor/vendor.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';
import { InvoiceUpdateDetailsComponent } from './invoice-update-details/invoice-update-details.component';



const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  {path:'vendorList',component: VendorListComponent},
  { path: 'vendor', component: VendorComponent },
  { path: 'invoice', component: InvoiceComponent },
  {path:'invoiceList',component:InvoiceListComponent},
  {path:'reg',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'vendorList/:id',component:VendorDetailsComponent},
  {path:'invoiceList/:invoiceNumber',component:InvoiceUpdateDetailsComponent},
  {path:'invoiceGet/:invoiceNumber',component:InvoiceComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }