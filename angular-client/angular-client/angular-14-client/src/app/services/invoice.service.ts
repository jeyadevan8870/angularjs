import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InvoiceEntity } from '../models/invoice.model';
import { User } from '../components/invoice/invoice.component';
import { StorageService } from './storage.service';










const baseUrl1 = 'http://localhost:8080/api';
const update = 'http://localhost:8080/api/updateInvoice';
const baseUrl = 'http://localhost:8080/api/createInvoice';

const baseUrl2 = 'http://localhost:8080/api/vendor';
const baseUrl13 = 'http://localhost:8080/api/getInvocieDetails';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl2 = 'http://localhost:8080/api';
  private baseUrl3 = 'http://localhost:8080/api/getInvocieDetails';

  constructor(private http: HttpClient, private storageService: StorageService) { }
 
  createInvoice(data: any): Observable<any> {
    const user = this.storageService.getUser();
    console.log(user);
    console.log("save reqest"+data);


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });

    const requestOptions = { headers: headers };
    return this.http.post(baseUrl, data, requestOptions);
  }



  getAllInvoice(): Observable<InvoiceEntity[]> {
    const user = this.storageService.getUser();
    console.log(user)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });

    const requestOptions = { headers: headers };
    return this.http.get<InvoiceEntity[]>(baseUrl1, requestOptions);

  }

  getInvoices(): Observable<InvoiceEntity[]> {
    const user = this.storageService.getUser();
    console.log(user)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });

    const requestOptions = { headers: headers };
    return this.http.get<InvoiceEntity[]>(this.baseUrl2, requestOptions);
  }

  findBypartName(partName: any): Observable<User[]> {
    const user = this.storageService.getUser();
    console.log(user)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });

    const requestOptions = { headers: headers };
    return this.http.get<User[]>(`${baseUrl2}?${partName}`, requestOptions);
  }

  getInvoiceDetails(invoiceNumber: any): Observable<any> {
    const user = this.storageService.getUser();
    console.log(user)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });

    const requestOptions = { headers: headers };
    return this.http.post(this.baseUrl3, { invoiceNumber },requestOptions);
  }
  update( data: any): Observable<any> {
    const user = this.storageService.getUser();
    console.log(user)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });
    console.log("update Post Data"+data)
    const requestOptions = { headers: headers };
    return this.http.post(`${update}`, data,requestOptions);
  }

 
 
  getInvoice(invoiceNumber: any): Observable<any> {
    const user = this.storageService.getUser();
    
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });
  
    const requestOptions = { headers: headers };
    return this.http.get(`${this.baseUrl3}/${invoiceNumber}`,requestOptions);
  }
 

}

