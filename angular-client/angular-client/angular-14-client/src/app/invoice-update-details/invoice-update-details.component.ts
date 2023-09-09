import { Component, Input, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceEntity } from '../models/invoice.model';
import { Particular } from '../models/particular.model';


@Component({
  selector: 'app-invoice-update-details',
  templateUrl: './invoice-update-details.component.html',
  styleUrls: ['./invoice-update-details.component.css']
})
export class InvoiceUpdateDetailsComponent implements OnInit {

  invoiceNumber = "";
  invoiceList: Array<Particular> = [];
  newDynamic: any = {};
  currentIndex = -1;

  submitted = false;
  @Input() viewMode = false;

  @Input() currentInvoice: InvoiceEntity = {

  };

  message = '';
  constructor(private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getInvoice(this.route.snapshot.params["invoiceNumber"]);
    }

  }

  getInvoice(invoiceNumber: any): void {
    this.invoiceService.getInvoiceDetails(invoiceNumber)
      .subscribe({
        next: (data) => {
          this.currentInvoice.invoiceDate = data.invoiceDate;
          this.currentInvoice.invoiceNumber = data.invoiceNumber;

          for (var i = 0; i <= data.particulars.length; i++) {

            this.addDataRow(data.particulars[i].quantity, data.particulars[i].rate, data.particulars[i].item, data.particulars[i].hsnsac, data.particulars[i].totalPrice);
          }
          console.log(JSON.stringify(data.particulars))

          for (var i = 0; i <= this.newDynamic.length; i++) {
          }


        },
        error: (e) => console.error(e)
      });
  }


  updateTutorial(): void {
    this.message = '';
    console.log("Particular Length " + this.invoiceList.length);
    const data2 = {

      invoiceNumber: this.currentInvoice.invoiceNumber,
      invoiceDate: this.currentInvoice.invoiceDate,
      totalAmount: this.currentInvoice.totalAmount,
      cgst: this.currentInvoice.cgst,
      sgst: this.currentInvoice.sgst,
      tax: this.currentInvoice.tax,
      particulars: this.invoiceList,


    };

    this.invoiceService.update(data2)
      .subscribe({
        next: (data2) => {

          this.message = data2.message ? data2.message : 'This invoice was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  calculatePrice(invoiceList: any) {
    if (invoiceList.quantity != undefined && invoiceList.rate != undefined)
      invoiceList.totalPrice = invoiceList.quantity * invoiceList.rate;
  }



  calculateTotal() {
    var subtotal = 0;
    for (var currentInvoice of this.invoiceList) {
      if (currentInvoice.rate != undefined) {
        subtotal = Number(subtotal || 0) + Number(currentInvoice.totalPrice || 0)
      }
    }
    this.currentInvoice.cgst = subtotal * 9 / 100;
    this.currentInvoice.sgst = subtotal * 9 / 100;
    this.currentInvoice.tax = this.currentInvoice.cgst + this.currentInvoice.sgst;
    this.currentInvoice.totalAmount = this.currentInvoice.tax + subtotal;
    return subtotal;
  }
  deleteRow(index: number) {
    if (this.invoiceList.length == 1) {

      return false;
    } else {
      this.invoiceList.splice(index, 1);

      return true;
    }
  }
  addRow() {
    this.newDynamic = {
      quantity: 0, rate: 0, particulars: "", hsnsac: "", totalPrice: 0
    };
    this.invoiceList.push(this.newDynamic);
    return true;

  }

  addDataRow(quantity: string, rate: string, item: string, hsnsac: string, totalPrice: string) {
    this.newDynamic = {
      quantity: quantity, rate: rate, item: item, hsnsac: hsnsac, totalPrice: totalPrice
    };
    this.invoiceList.push(this.newDynamic);
    return true;

  }




}
