import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Invoice, InvoiceItem, BusinessInfo, Currency } from '../types';

interface InvoicePreviewProps {
  invoice: Invoice;
  businessInfo: BusinessInfo;
  currentCurrency: Currency;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: string, value: string | number) => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoice,
  businessInfo,
  currentCurrency,
  onAddItem,
  onRemoveItem,
  onUpdateItem
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 print:shadow-none print:border-0" id="invoice-preview">
      <div className="p-8 print:p-0">
        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
            <div className="text-gray-600">
              <p className="font-medium">Invoice #: {invoice.invoiceNumber}</p>
              <p>Date: {new Date(invoice.date).toLocaleDateString()}</p>
              <p>Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {currentCurrency.symbol}{invoice.total.toFixed(2)}
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium text-blue-600">Total Amount</span>
            </div>
          </div>
        </div>

        {/* Business and Client Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">From:</h3>
            <div className="text-gray-700">
              {businessInfo.name && <p className="font-medium">{businessInfo.name}</p>}
              {businessInfo.email && <p>{businessInfo.email}</p>}
              {businessInfo.address && <p className="whitespace-pre-line">{businessInfo.address}</p>}
              {businessInfo.phone && <p>{businessInfo.phone}</p>}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">To:</h3>
            <div className="text-gray-700">
              {invoice.client.name && <p className="font-medium">{invoice.client.name}</p>}
              {invoice.client.email && <p>{invoice.client.email}</p>}
              {invoice.client.address && <p className="whitespace-pre-line">{invoice.client.address}</p>}
              {invoice.client.phone && <p>{invoice.client.phone}</p>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 w-20">Qty</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 w-28">Rate</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 w-28">Amount</th>
                  <th className="px-4 py-3 w-10 print:hidden"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoice.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                        className="w-full border-0 bg-transparent focus:ring-0 print:border-none"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full text-center border-0 bg-transparent focus:ring-0 print:border-none"
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end">
                        <span className="text-gray-500 mr-1">{currentCurrency.symbol}</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => onUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className="w-20 text-right border-0 bg-transparent focus:ring-0 print:border-none"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {currentCurrency.symbol}{item.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 print:hidden">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        disabled={invoice.items.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={onAddItem}
            className="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium print:hidden"
          >
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="space-y-2">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{currentCurrency.symbol}{invoice.subtotal.toFixed(2)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax ({invoice.taxRate}%):</span>
                  <span className="font-medium">{currentCurrency.symbol}{invoice.taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-blue-600">{currentCurrency.symbol}{invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Notes:</h4>
            <p className="text-gray-700 whitespace-pre-line">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};