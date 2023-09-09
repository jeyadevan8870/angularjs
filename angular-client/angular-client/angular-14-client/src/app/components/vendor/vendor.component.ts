import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/models/vendor.model';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  vendor: Vendor = {
    vendorName: '',
    gstNo: '',
    panNo: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pinCode: '',
    contry: '',
    phoneNumber: ''
  };
  submitted = false;

  constructor(private vendorService: VendorService) { }

  ngOnInit(): void {

  }
  saveVendor(): void {
    const data = {
      vendorName: this.vendor.vendorName,
      gstNo: this.vendor.gstNo,
      panNo: this.vendor.panNo,
      address1: this.vendor.address1,
      address2: this.vendor.address2,
      city: this.vendor.city,
      state: this.vendor.state,
      pinCode: this.vendor.pinCode,
      contry: this.vendor.contry,
      phoneNumber: this.vendor.phoneNumber
    };
    this.vendorService.createvendor(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
  newVendor(): void {
    this.submitted = false;
    this.vendor = {
      vendorName: '',
      gstNo: '',
      panNo: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      pinCode: '',
      contry: '',
      phoneNumber: ''
    };
  }
}