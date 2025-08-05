import React from 'react';
import { Users } from 'lucide-react';
import { Client } from '../types';

interface ClientInfoFormProps {
  client: Client;
  savedClients: Client[];
  showClientSelector: boolean;
  onClientUpdate: (client: Client) => void;
  onToggleClientSelector: () => void;
  onSelectClient: (client: Client) => void;
  onSaveClient: () => void;
}

export const ClientInfoForm: React.FC<ClientInfoFormProps> = ({
  client,
  savedClients,
  showClientSelector,
  onClientUpdate,
  onToggleClientSelector,
  onSelectClient,
  onSaveClient
}) => {
  const handleChange = (field: keyof Client, value: string) => {
    onClientUpdate({ ...client, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Users className="h-5 w-5 mr-2 text-green-600" />
          Client Details
        </h3>
        {savedClients.length > 0 && (
          <button
            onClick={onToggleClientSelector}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Select Saved Client
          </button>
        )}
      </div>

      {showClientSelector && (
        <div className="mb-4 max-h-32 overflow-y-auto border border-gray-200 rounded-lg">
          {savedClients.map((savedClient, index) => (
            <button
              key={index}
              onClick={() => onSelectClient(savedClient)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">{savedClient.name}</div>
              <div className="text-sm text-gray-600">{savedClient.email}</div>
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Client Name"
          value={client.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={onSaveClient}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <input
          type="email"
          placeholder="Client Email"
          value={client.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={onSaveClient}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <textarea
          placeholder="Client Address"
          value={client.address}
          onChange={(e) => handleChange('address', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <input
          type="tel"
          placeholder="Client Phone"
          value={client.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
    </div>
  );
};