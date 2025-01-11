import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { InvoicesResponse } from '../../data/response-invoices';
import { InvoiceResponse } from '../../data/response-invoice';
import { Invoice } from '../../data/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private urlApi = 'https://wcbdf-jmhg-proyecto-final.onrender.com/api/v1/invoices'

  constructor(private http: HttpClient) { }

  // Crear el header para la autenticacion basica
  private createBasicAuthHeader() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const credenciales =btoa(`${username}:${password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${credenciales}`
    })
  }

  // Obtener todas las facturas
  getAllInvoices(): Observable<InvoicesResponse> {
    return this.http.get<InvoicesResponse>(this.urlApi, {headers: this.createBasicAuthHeader()});
  } 

  // Obtener una factura por id
  getInvoiceById(id: number): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(`${this.urlApi}/${id}`, {headers: this.createBasicAuthHeader()});
  }

  // Crear una factura
  createInvoice(invoice: Invoice): Observable<InvoiceResponse> {
    return this.http.post<InvoiceResponse>(this.urlApi, invoice, {headers: this.createBasicAuthHeader()});
  }

  // Actualizar una factura
  updateInvoice(id: number, invoice: Invoice): Observable<InvoiceResponse> {
    return this.http.put<InvoiceResponse>(`${this.urlApi}/${id}`, invoice, {headers: this.createBasicAuthHeader()});
  }

  // Eliminar una factura
  deleteInvoice(id: number): Observable<InvoiceResponse> {
    return this.http.delete<InvoiceResponse>(`${this.urlApi}/${id}`, {headers: this.createBasicAuthHeader()});
  } 

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
