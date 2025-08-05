import React from "react";
import { Header } from "./components/Header";
import { BusinessInfoForm } from "./components/BusinessInfoForm";
import { ClientInfoForm } from "./components/ClientInfoForm";
import { InvoiceSettings } from "./components/InvoiceSettings";
import { InvoicePreview } from "./components/InvoicePreview";
import { useInvoice } from "./hooks/useInvoice";
import { currencies } from "./constants/currencies";

function App() {
  const {
    invoice,
    setInvoice,
    businessInfo,
    setBusinessInfo,
    savedClients,
    showClientSelector,
    setShowClientSelector,
    addItem,
    removeItem,
    updateItem,
    saveClient,
    selectClient,
    saveBusiness,
    generateNewInvoice,
  } = useInvoice();

  const currentCurrency =
    currencies.find((c) => c.code === invoice.currency) || currencies[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header onNewInvoice={generateNewInvoice} onPrint={handlePrint} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <BusinessInfoForm
              businessInfo={businessInfo}
              onUpdate={setBusinessInfo}
              onSave={saveBusiness}
            />

            <ClientInfoForm
              client={invoice.client}
              savedClients={savedClients}
              showClientSelector={showClientSelector}
              onClientUpdate={(client) =>
                setInvoice((prev) => ({ ...prev, client }))
              }
              onToggleClientSelector={() =>
                setShowClientSelector(!showClientSelector)
              }
              onSelectClient={selectClient}
              onSaveClient={saveClient}
            />

            <InvoiceSettings
              date={invoice.date}
              dueDate={invoice.dueDate}
              currency={invoice.currency}
              taxRate={invoice.taxRate}
              notes={invoice.notes}
              onDateChange={(date) => setInvoice((prev) => ({ ...prev, date }))}
              onDueDateChange={(dueDate) =>
                setInvoice((prev) => ({ ...prev, dueDate }))
              }
              onCurrencyChange={(currency) =>
                setInvoice((prev) => ({ ...prev, currency }))
              }
              onTaxRateChange={(taxRate) =>
                setInvoice((prev) => ({ ...prev, taxRate }))
              }
              onNotesChange={(notes) =>
                setInvoice((prev) => ({ ...prev, notes }))
              }
            />
          </div>

          {/* Invoice Preview */}
          <div className="lg:col-span-2">
            <InvoicePreview
              invoice={invoice}
              businessInfo={businessInfo}
              currentCurrency={currentCurrency}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateItem={updateItem}
            />
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:border-none {
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
