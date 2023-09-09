import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Observable, Observer, map, startWith } from 'rxjs';
import { InvoiceEntity } from '../models/invoice.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})


export class InvoiceListComponent implements OnInit{
  myControl = new FormControl<string | InvoiceEntity>('');
  filteredOptions!: Observable<InvoiceEntity[]>;
  invoiceNumber = '';
  invoice: any;
  options: InvoiceEntity[] = [];
invoices?:InvoiceEntity[];

  currentInvoice: InvoiceEntity = {};
  currentIndex = -1;

  message = ''
  invoiceVendor: InvoiceEntity = {

    invoiceNumber: ''}
  constructor(private invoiceService: InvoiceService, private router: Router) { }
ngOnInit(): void {
 
}

  getInvoiceDetails() {
    this.invoiceService.getInvoiceDetails(this.invoiceNumber)
      .subscribe({
        next: response => {
          this.invoice = response;
          this.options = response;
        },
        error: error => {
          console.error('Error retrieving invoice details:', error);
        },
        complete: () => {
          console.log('Observable completed');
        }
      } as Observer<any>);
  }
  setActiveInvoice(invoice: InvoiceEntity, index: number): void {
    this.currentInvoice = invoice;
    this.currentIndex = index;
  }

  updateEmployee(invoiceNumber: number) {
    this.router.navigate(['invoiceList', invoiceNumber]);
  }
  Invoice(invoiceNumber: number) {
    this.router.navigate(['invoiceGet', invoiceNumber]);
  }

}





