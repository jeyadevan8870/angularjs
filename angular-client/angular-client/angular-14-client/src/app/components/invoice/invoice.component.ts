import { Component, Input, OnInit } from '@angular/core';
import { InvoiceEntity } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Particular } from './particular';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, retry, startWith } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
export interface User {
  vendorName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  contry: string;
  pinCode: string;
  phoneNumber: string;
  panNo: string;
  gstNo: string;
  id: any;
}
export interface InvoiceVendor {

  vendorName: string;
  panNo: string;
  gstNo: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  contry: string;
  pinCode: string;
  phoneNumber: string;
  id: any;
}
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  myControl = new FormControl<string | User>('');
  filteredOptions!: Observable<User[]>;
  invoiceList: Array<Particular> = [];
  newDynamic: any = {};

  invoiceNumber = "";



  invoice: InvoiceEntity = {
    id: '',
    invoiceNumber: '',
    invoiceDate: '',
    totalAmount: 0.00,
    cgst: 9,
    sgst: 9,

  };
  invoiceVendor: InvoiceVendor = {

    vendorName: '',
    gstNo: '',
    panNo: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pinCode: '',
    contry: '',
    phoneNumber: '',
    id: 0,
  }
  submitted = false;
  options: User[] = [];
  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.getInvoice(this.route.snapshot.params["invoiceNumber"]);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.vendorName;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );


  }

  addRow() {
    this.newDynamic = {
      quantity: 0, rate: 0, item: "", hsnsac: "", totalPrice: 0
    };
    this.invoiceList.push(this.newDynamic);
    return true;

  }


  deleteRow(index: number) {
    if (this.invoiceList.length == 1) {

      return false;
    } else {
      this.invoiceList.splice(index, 1);

      return true;
    }
  }


  saveInvoice(): void {

    const data = {
      id: this.invoice.id,
      invoiceNumber: this.invoice.invoiceNumber,
      invoiceDate: this.invoice.invoiceDate,
      totalAmount: this.invoice.totalAmount,
      cgst: this.invoice.cgst,
      sgst: this.invoice.sgst,
      particulars: this.invoiceList,
      tax: this.invoice.tax,

    };
    this.invoiceService.createInvoice(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  newInvoice(): void {
    this.submitted = false;
    this.invoice = {
      id: '',
      invoiceNumber: '',
      invoiceDate: '',
      totalAmount: 0.00,
      cgst: 9,
      sgst: 9,
      tax: 0
    };
  }

  calculatePrice(invoiceList: any) {
    if (invoiceList.quantity != undefined && invoiceList.rate != undefined)
      invoiceList.totalPrice = invoiceList.quantity * invoiceList.rate;
  }



  calculateTotal() {
    var subtotal = 0;
    for (var invoice of this.invoiceList) {
      if (invoice.rate != undefined) {
        subtotal = Number(subtotal || 0) + Number(invoice.totalPrice || 0)
      }
    }
    this.invoice.cgst = subtotal * 9 / 100;
    this.invoice.sgst = subtotal * 9 / 100;
    this.invoice.tax = this.invoice.cgst + this.invoice.sgst;
    this.invoice.totalAmount = this.invoice.tax + subtotal;
    return subtotal;
  }




  printPage() {
    window.print();
  }
  printMode: boolean = false;
  displayFn(user: User): string {
    return user && user.vendorName ? user.vendorName : '';
  }


  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    this.getVendorList();

    return this.options.filter(option => option.vendorName.toLowerCase().includes(filterValue));
  }
  getVendorDetails(user: User) {
    console.log(user.address1);
    this.invoiceVendor.vendorName = user.vendorName;
    this.invoiceVendor.address1 = user.address1;
    this.invoiceVendor.address2 = user.address2;
    this.invoiceVendor.city = user.city;
    this.invoiceVendor.state = user.state;
    this.invoiceVendor.contry = user.contry;
    this.invoiceVendor.pinCode = user.pinCode;
    this.invoiceVendor.phoneNumber = user.phoneNumber;
    this.invoiceVendor.panNo = user.panNo;
    this.invoiceVendor.gstNo = user.gstNo;
    this.invoiceVendor.id = user.id;
    console.log(user.id);

  }

  getVendorList(): any {
    const val = this.invoiceVendor.vendorName;
    console.log(val)
    this.invoiceService.findBypartName(val)
      .subscribe(data => {
        console.log(data)
        this.options = data;
      }
      );
  }
  
  getInvoice(invoiceNumber: any): void {
    this.invoiceService.getInvoiceDetails(invoiceNumber)
      .subscribe({
        next: (data) => {
          this.invoice.invoiceDate=data.invoiceDate;    
          this.invoice.invoiceNumber=data.invoiceNumber;   
           
           for(var i=0;i<=data.particulars.length;i++){
            
            this.addDataRow(data.particulars[i].quantity,data.particulars[i].rate,data.particulars[i].item,data.particulars[i].hsnsac,data.particulars[i].totalPrice);
        } 
        console.log(JSON.stringify(data.particulars))

         for(var i=0;i<=this.newDynamic.length;i++){
         }
         
        
        },
        error: (e) => console.error(e)
      });
  } 
  addDataRow(quantity:string,rate:string,item:string,hsnsac:string,totalPrice:string) {
    this.newDynamic = {
      quantity: quantity, rate: rate, item: item, hsnsac: hsnsac, totalPrice: totalPrice
    };
    this.invoiceList.push(this.newDynamic);
    return true;

  }
}

