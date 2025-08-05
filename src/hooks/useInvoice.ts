import { useState, useEffect } from 'react';
import { Invoice, InvoiceItem, Client, BusinessInfo } from '../types';

export const useInvoice = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    client: {
      name: '',
      email: '',
      address: '',
      phone: ''
    },
    items: [{
      id: '1',
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    total: 0,
    notes: '',
    currency: 'USD'
  });

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const [savedClients, setSavedClients] = useState<Client[]>([]);
  const [showClientSelector, setShowClientSelector] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('invoiceClients');
    if (saved) {
      setSavedClients(JSON.parse(saved));
    }

    const savedBusiness = localStorage.getItem('businessInfo');
    if (savedBusiness) {
      setBusinessInfo(JSON.parse(savedBusiness));
    }
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [invoice.items, invoice.taxRate]);

  const calculateTotals = () => {
    const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (invoice.taxRate / 100);
    const total = subtotal + taxAmount;

    setInvoice(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
    }));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id: string) => {
    if (invoice.items.length > 1) {
      setInvoice(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const saveClient = () => {
    if (invoice.client.name && invoice.client.email) {
      const exists = savedClients.find(c => c.email === invoice.client.email);
      if (!exists) {
        const newClients = [...savedClients, invoice.client];
        setSavedClients(newClients);
        localStorage.setItem('invoiceClients', JSON.stringify(newClients));
      }
    }
  };

  const selectClient = (client: Client) => {
    setInvoice(prev => ({ ...prev, client }));
    setShowClientSelector(false);
  };

  const saveBusiness = () => {
    localStorage.setItem('businessInfo', JSON.stringify(businessInfo));
  };

  const generateNewInvoice = () => {
    setInvoice(prev => ({
      ...prev,
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      client: { name: '', email: '', address: '', phone: '' },
      items: [{
        id: Date.now().toString(),
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
      }],
      notes: ''
    }));
  };

  return {
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
    generateNewInvoice
  };
};