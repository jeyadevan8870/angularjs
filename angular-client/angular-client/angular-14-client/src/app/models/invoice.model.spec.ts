import { InvoiceEntity } from './invoice.model';

describe('Invoice', () => {
  it('should create an instance', () => {
    expect(new InvoiceEntity()).toBeTruthy();
  });
});
