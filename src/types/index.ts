export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Client {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface Invoice {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  client: Client;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string;
  currency: string;
}

export interface BusinessInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}