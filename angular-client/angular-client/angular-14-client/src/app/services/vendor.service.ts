import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../models/vendor.model';
import { StorageService } from './storage.service';

const baseUrl = 'http://localhost:8080/api/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private baseUrl = 'http://localhost:8080/api/vendor';

  constructor(private http: HttpClient,private storageService: StorageService) { }

  createvendor(data: any): Observable<any> {
    const user = this.storageService.getUser();
    console.log(user)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });
    
  const requestOptions = { headers: headers };
    return this.http.post(baseUrl, data,requestOptions);
  }
  getAll(): Observable<Vendor[]> {
    const user = this.storageService.getUser();
    console.log(user)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });
    
  const requestOptions = { headers: headers };
    return this.http.get<Vendor[]>(baseUrl,requestOptions);
  }

  getVendorId(id: any): Observable<Vendor> {
    const user = this.storageService.getUser();
    console.log(user);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });
  
    const requestOptions = { headers: headers };
    return this.http.get<Vendor>(`${baseUrl}/${id}`, requestOptions);
  }
  

  update(Id: any, data: any): Observable<any> {
    const user = this.storageService.getUser();
    console.log(user)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });
    
  const requestOptions = { headers: headers };
    return this.http.put(`${baseUrl}/${Id}`, data,requestOptions);
  }

  delete(Id: any): Observable<any> {
    const user = this.storageService.getUser();
    console.log(user)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });
    
  const requestOptions = { headers: headers };
    return this.http.delete(`${baseUrl}/${Id}`);
  }

  deleteAll(): Observable<any> {
    const user = this.storageService.getUser();
    console.log(user)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });
    
  const requestOptions = { headers: headers };
    return this.http.delete(baseUrl,requestOptions);
  }

  findByVendor(vendorName: any): Observable<Vendor[]> {
    const user = this.storageService.getUser();
    console.log(user)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });
    
  const requestOptions = { headers: headers };
    return this.http.get<Vendor[]>(`${baseUrl}?vendorName=${vendorName}`,requestOptions);
  }
  getAllVendors(): Observable<Vendor[]> {
    const user = this.storageService.getUser();
    console.log(user)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    });
    
  const requestOptions = { headers: headers };
    return this.http.get<Vendor[]>(`${this.baseUrl}/vendor`,requestOptions);
  }
}