import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/models/vendor.model';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentVendor: Vendor = {
    vendorName: '',

  };

  message = '';

  constructor(
    private vendorService: VendorService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
  }

  getTutorial(id: string): void {
    this.vendorService.getVendorId(id)
      .subscribe({
        next: (data) => {
          this.currentVendor = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateTutorial(): void {
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
