import { Invoice } from "./invoice";

export interface InvoiceResponse {
    status: number,
    message: string,
    data: Invoice,
    links: [
        {
            rel: string,
            href: string
        }
    ]
}