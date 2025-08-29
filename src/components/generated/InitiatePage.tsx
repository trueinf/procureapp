import React, { useState } from 'react';
import { RFIRFQData } from './ProcureApp';
import { Upload, Calendar, Users, FileText, Send, CheckCircle } from 'lucide-react';
interface InitiatePageProps {
  onCreateRFIRFQ: (data: Omit<RFIRFQData, 'id' | 'status' | 'createdDate'>) => void;
}

// @component: InitiatePage
export const InitiatePage = ({
  onCreateRFIRFQ
}: InitiatePageProps) => {
  const [formData, setFormData] = useState({
    type: 'RFQ' as 'RFI' | 'RFQ',
    title: '',
    vendorCount: 3,
    startDate: '',
    endDate: '',
    coverLetter: '',
    vendors: [] as string[],
    documents: [] as File[]
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [vendorInput, setVendorInput] = useState('');
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };
  const addVendor = () => {
    if (vendorInput.trim() && !formData.vendors.includes(vendorInput.trim())) {
      setFormData(prev => ({
        ...prev,
        vendors: [...prev.vendors, vendorInput.trim()]
      }));
      setVendorInput('');
    }
  };
  const removeVendor = (vendor: string) => {
    setFormData(prev => ({
      ...prev,
      vendors: prev.vendors.filter(v => v !== vendor)
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateRFIRFQ(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData({
      type: 'RFQ',
      title: '',
      vendorCount: 3,
      startDate: '',
      endDate: '',
      coverLetter: '',
      vendors: [],
      documents: []
    });
  };

  // @return
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
              <span>Initiate New Request</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  <span>Request Type</span>
                </label>
                <div className="flex space-x-4">
                  {['RFI', 'RFQ'].map(type => <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="type" value={type} checked={formData.type === type} onChange={e => setFormData(prev => ({
                    ...prev,
                    type: e.target.value as 'RFI' | 'RFQ'
                  }))} className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" />
                      <span className="text-slate-700 font-medium">{type}</span>
                    </label>)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  <span>Number of Vendors</span>
                </label>
                <select value={formData.vendorCount} onChange={e => setFormData(prev => ({
                ...prev,
                vendorCount: parseInt(e.target.value)
              }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {[3, 5, 7, 10].map(num => <option key={num} value={num}>{num} vendors</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <span>Request Title</span>
              </label>
              <input type="text" value={formData.title} onChange={e => setFormData(prev => ({
              ...prev,
              title: e.target.value
            }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="IT Infrastructure Services RFQ" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  <span>Start Date</span>
                </label>
                <div className="relative">
                  <input type="date" value={formData.startDate} onChange={e => setFormData(prev => ({
                  ...prev,
                  startDate: e.target.value
                }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  <span>End Date</span>
                </label>
                <div className="relative">
                  <input type="date" value={formData.endDate} onChange={e => setFormData(prev => ({
                  ...prev,
                  endDate: e.target.value
                }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <span>Vendor List</span>
              </label>
              <div className="flex space-x-2 mb-3">
                <input type="text" value={vendorInput} onChange={e => setVendorInput(e.target.value)} className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter vendor name" onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addVendor())} />
                <button type="button" onClick={addVendor} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Users className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.vendors.map(vendor => <span key={vendor} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    <span>{vendor}</span>
                    <button type="button" onClick={() => removeVendor(vendor)} className="ml-2 text-blue-600 hover:text-blue-800">
                      ×
                    </button>
                  </span>)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <span>Upload Documents</span>
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600">
                    <span>Click to upload or drag and drop</span>
                  </p>
                  <p className="text-sm text-slate-500">
                    <span>PDF, DOC, DOCX up to 10MB</span>
                  </p>
                </label>
              </div>
              {formData.documents.length > 0 && <div className="mt-3 space-y-2">
                  {formData.documents.map((file, index) => <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <span className="text-sm text-slate-700">{file.name}</span>
                      <span className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>)}
                </div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <span>Cover Letter</span>
              </label>
              <textarea value={formData.coverLetter} onChange={e => setFormData(prev => ({
              ...prev,
              coverLetter: e.target.value
            }))} rows={6} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Dear Vendors,&#10;&#10;We are seeking proposals for..." />
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Send Request</span>
            </button>
          </form>

          {showSuccess && <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
              <CheckCircle className="w-5 h-5" />
              <span>Request sent successfully!</span>
            </div>}
        </div>
      </div>
    </div>;
};