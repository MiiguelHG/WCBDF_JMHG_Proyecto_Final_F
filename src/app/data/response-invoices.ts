import { Invoice } from "./invoice";

export interface InvoicesResponse {
    status: number,
    message: string,
    data: Invoice[],
    links: [
        {
            rel: string,
            href: string
        }
    ]
}