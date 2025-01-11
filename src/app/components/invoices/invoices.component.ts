import { Component, inject } from '@angular/core';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { Invoice } from '../../data/invoice';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-invoices',
  imports: [FormsModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {
  InvoiceService = inject(InvoiceService);

  invoicesList: Invoice[] = [];

  currentInvoice: Invoice = {
    id: 0,
    invoiceDate: new Date(),
    amount: 0,
    customerId: 0
  }

  newInvoice: Invoice = {
    invoiceDate: new Date(),
    amount: 0,
    customerId: 0
  }

  errorMessage: string = 'No tienes los permisos para realizar esta acción';

  constructor() {
    this.cargarInvoices();
  }

  // Cargar todas las facturas
  cargarInvoices() {
    this.InvoiceService.getAllInvoices().subscribe({
      next: (response) => {
        if (response.status === 1) {
          this.invoicesList = response.data;
        } else {
          this.openErrorModal();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message || 'Error desconocido');
      }
    })
  }

  // Obtener una factura por id
  ObtenerInvoicePorId(id: number) {
    this.InvoiceService.getInvoiceById(id).subscribe({
      next: (response) => {
        if (response.status === 1) {
          this.currentInvoice = response.data;
        } else {
          this.openErrorModal();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.openErrorModal();
      }
    })
  }

  // Crear una factura
  crearInvoice() {
    if (this.newInvoice.amount != 0 && this.newInvoice.customerId != 0) {
      this.InvoiceService.createInvoice(this.newInvoice).subscribe({
        next: (response) => {
          if (response.status === 1) {
            this.newInvoice = {
              invoiceDate: new Date(),
              amount: 0,
              customerId: 0
            }
            this.cargarInvoices();
          } else {
            this.openErrorModal();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.openErrorModal();
        }
      })
    }
  }

  // actualizar una factura
  actualizarInvoice(id: number) {
    this.InvoiceService.updateInvoice(id, this.currentInvoice).subscribe({
      next: (response) => {
        if (response.status === 1) {
          this.cargarInvoices();
        } else {
          this.openErrorModal();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.openErrorModal();
      }
    })
  }

  // Eliminar una factura
  eliminarInvoice(id: number) {
    this.InvoiceService.deleteInvoice(id).subscribe({
      next: (response) => {
        if (response.status === 1) {
          this.cargarInvoices();
        } else {
          this.openErrorModal();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.openErrorModal();
      }
    })
  }

  // Mostrar el modal de error
  openErrorModal() {
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
  }


}
