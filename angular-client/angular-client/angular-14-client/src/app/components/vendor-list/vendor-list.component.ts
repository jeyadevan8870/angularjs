import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/models/vendor.model';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  vendor?: Vendor[];
  currentVendor: Vendor = {};
  currentIndex = -1;
  vendorName = '';
  message = ''


  constructor(private vendorService: VendorService) { }

  ngOnInit(): void {
    this.retrieveVendor();

  }
  retrieveVendor(): void {
    this.vendorService.getAll()
      .subscribe({
        next: (data) => {
          this.vendor = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveVendor();
    this.currentVendor = {};
    this.currentIndex = -1;
  }

  setActiveVendor(vendor: Vendor, index: number): void {
    this.currentVendor = vendor;
    this.currentIndex = index;
  }

  removeAllVendor(): void {
    this.vendorService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchTitle(): void {
    this.currentVendor = {};
    this.currentIndex = -1;

    this.vendorService.findByVendor(this.vendorName)
      .subscribe({
        next: (data) => {
          this.vendor = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateVendor(): void {
    this.message = '';

    this.vendorService.update(this.currentVendor.id, this.currentVendor)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Vendor was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }


}
