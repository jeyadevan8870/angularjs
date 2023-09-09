import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceUpdateDetailsComponent } from './invoice-update-details.component';

describe('InvoiceUpdateDetailsComponent', () => {
  let component: InvoiceUpdateDetailsComponent;
  let fixture: ComponentFixture<InvoiceUpdateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceUpdateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
