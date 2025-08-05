import React from 'react';
import { Edit3 } from 'lucide-react';
import { BusinessInfo } from '../types';

interface BusinessInfoFormProps {
  businessInfo: BusinessInfo;
  onUpdate: (businessInfo: BusinessInfo) => void;
  onSave: () => void;
}

export const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({
  businessInfo,
  onUpdate,
  onSave
}) => {
  const handleChange = (field: keyof BusinessInfo, value: string) => {
    onUpdate({ ...businessInfo, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Edit3 className="h-5 w-5 mr-2 text-blue-600" />
        Your Business
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Business Name"
          value={businessInfo.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={onSave}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={businessInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={onSave}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <textarea
          placeholder="Business Address"
          value={businessInfo.address}
          onChange={(e) => handleChange('address', e.target.value)}
          onBlur={onSave}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={businessInfo.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          onBlur={onSave}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};