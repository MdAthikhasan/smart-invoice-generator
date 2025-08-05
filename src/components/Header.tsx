import React from 'react';
import { FileText, Plus, Download } from 'lucide-react';

interface HeaderProps {
  onNewInvoice: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewInvoice, onPrint }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Smart Invoice Generator</h1>
              <p className="text-xs sm:text-sm text-gray-600">Professional invoices in minutes</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={onNewInvoice}
              className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1 sm:space-x-2 flex-1 sm:flex-none justify-center"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm sm:text-base">New Invoice</span>
            </button>
            <button
              onClick={onPrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1 sm:space-x-2 flex-1 sm:flex-none justify-center"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm sm:text-base">Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};