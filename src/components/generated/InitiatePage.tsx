import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { RFIRFQData } from './ProcureApp';
import { Upload, Calendar, Users, FileText, Send, CheckCircle } from 'lucide-react';
interface InitiatePageProps {
  onCreateRFIRFQ: (data: Omit<RFIRFQData, 'id' | 'status' | 'createdDate'>) => void;
  mpid?: string;
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
  return <SortableContainer dndKitId="1c068fcc-b452-4af2-96c0-0d479c31a201" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="0" data-magicpath-path="InitiatePage.tsx">
      <SortableContainer dndKitId="f71c1b75-1a68-4c62-b1a1-1520328bccb2" containerType="regular" prevTag="div" className="max-w-4xl mx-auto" data-magicpath-id="1" data-magicpath-path="InitiatePage.tsx">
        <SortableContainer dndKitId="374fffa2-9345-4d94-a926-a73d52478f17" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8" data-magicpath-id="2" data-magicpath-path="InitiatePage.tsx">
          <SortableContainer dndKitId="e5d612b4-1fa7-4d20-bc74-3ce7b49e4ec7" containerType="regular" prevTag="div" className="flex items-center space-x-3 mb-8" data-magicpath-id="3" data-magicpath-path="InitiatePage.tsx">
            <SortableContainer dndKitId="8b7d4a64-25f7-4825-8ad4-84ce21582649" containerType="regular" prevTag="div" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-id="4" data-magicpath-path="InitiatePage.tsx">
              <FileText className="w-5 h-5 text-blue-600" data-magicpath-id="5" data-magicpath-path="InitiatePage.tsx" />
            </SortableContainer>
            <h1 className="text-3xl font-bold text-slate-800" data-magicpath-id="6" data-magicpath-path="InitiatePage.tsx">
              <span data-magicpath-id="7" data-magicpath-path="InitiatePage.tsx">Initiate New Request</span>
            </h1>
          </SortableContainer>

          <SortableContainer dndKitId="853e02f3-732d-4c78-a75b-cfc1684d1e82" containerType="regular" prevTag="form" onSubmit={handleSubmit} className="space-y-8" data-magicpath-id="8" data-magicpath-path="InitiatePage.tsx">
            <SortableContainer dndKitId="9e655619-a33d-4aea-9d32-a77e97b9b0f2" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 gap-6" data-magicpath-id="9" data-magicpath-path="InitiatePage.tsx">
              <SortableContainer dndKitId="948f4558-0d95-41f6-81ab-c0f77f8a8d30" containerType="regular" prevTag="div" data-magicpath-id="10" data-magicpath-path="InitiatePage.tsx">
                <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="11" data-magicpath-path="InitiatePage.tsx">
                  <span data-magicpath-id="12" data-magicpath-path="InitiatePage.tsx">Request Type</span>
                </label>
                <div className="flex space-x-4" data-magicpath-id="13" data-magicpath-path="InitiatePage.tsx">
                  {['RFI', 'RFQ'].map(type => <label key={type} className="flex items-center space-x-2 cursor-pointer" data-magicpath-id="14" data-magicpath-path="InitiatePage.tsx">
                      <input type="radio" name="type" value={type} checked={formData.type === type} onChange={e => setFormData(prev => ({
                    ...prev,
                    type: e.target.value as 'RFI' | 'RFQ'
                  }))} className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" data-magicpath-id="15" data-magicpath-path="InitiatePage.tsx" />
                      <span className="text-slate-700 font-medium" data-magicpath-id="16" data-magicpath-path="InitiatePage.tsx">{type}</span>
                    </label>)}
                </div>
              </SortableContainer>

              <SortableContainer dndKitId="efbb0bdf-0947-45df-8987-da9feb7546f6" containerType="regular" prevTag="div" data-magicpath-id="17" data-magicpath-path="InitiatePage.tsx">
                <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="18" data-magicpath-path="InitiatePage.tsx">
                  <span data-magicpath-id="19" data-magicpath-path="InitiatePage.tsx">Number of Vendors</span>
                </label>
                <select value={formData.vendorCount} onChange={e => setFormData(prev => ({
                ...prev,
                vendorCount: parseInt(e.target.value)
              }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-magicpath-id="20" data-magicpath-path="InitiatePage.tsx">
                  {[3, 5, 7, 10].map(num => <option key={num} value={num} data-magicpath-id="21" data-magicpath-path="InitiatePage.tsx">{num} vendors</option>)}
                </select>
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="a842244b-a055-4baa-b272-990db737a125" containerType="regular" prevTag="div" data-magicpath-id="22" data-magicpath-path="InitiatePage.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="23" data-magicpath-path="InitiatePage.tsx">
                <span data-magicpath-id="24" data-magicpath-path="InitiatePage.tsx">Request Title</span>
              </label>
              <input type="text" value={formData.title} onChange={e => setFormData(prev => ({
              ...prev,
              title: e.target.value
            }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="IT Infrastructure Services RFQ" required data-magicpath-id="25" data-magicpath-path="InitiatePage.tsx" />
            </SortableContainer>

            <SortableContainer dndKitId="52486fa7-7cef-4f9b-bcc1-6433c97c371e" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 gap-6" data-magicpath-id="26" data-magicpath-path="InitiatePage.tsx">
              <SortableContainer dndKitId="addbdba3-cfe3-4e73-afef-97684872743e" containerType="regular" prevTag="div" data-magicpath-id="27" data-magicpath-path="InitiatePage.tsx">
                <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="28" data-magicpath-path="InitiatePage.tsx">
                  <span data-magicpath-id="29" data-magicpath-path="InitiatePage.tsx">Start Date</span>
                </label>
                <SortableContainer dndKitId="48c72e92-c4ac-404a-ad16-603aa01ae85d" containerType="regular" prevTag="div" className="relative" data-magicpath-id="30" data-magicpath-path="InitiatePage.tsx">
                  <input type="date" value={formData.startDate} onChange={e => setFormData(prev => ({
                  ...prev,
                  startDate: e.target.value
                }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required data-magicpath-id="31" data-magicpath-path="InitiatePage.tsx" />
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" data-magicpath-id="32" data-magicpath-path="InitiatePage.tsx" />
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="ce52a2c7-da3a-4f07-b1c3-1458b2065bf1" containerType="regular" prevTag="div" data-magicpath-id="33" data-magicpath-path="InitiatePage.tsx">
                <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="34" data-magicpath-path="InitiatePage.tsx">
                  <span data-magicpath-id="35" data-magicpath-path="InitiatePage.tsx">End Date</span>
                </label>
                <SortableContainer dndKitId="9c6e3ed4-f547-46d1-8760-88888287a03a" containerType="regular" prevTag="div" className="relative" data-magicpath-id="36" data-magicpath-path="InitiatePage.tsx">
                  <input type="date" value={formData.endDate} onChange={e => setFormData(prev => ({
                  ...prev,
                  endDate: e.target.value
                }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required data-magicpath-id="37" data-magicpath-path="InitiatePage.tsx" />
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" data-magicpath-id="38" data-magicpath-path="InitiatePage.tsx" />
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="e62fee5e-a070-4925-aec8-77c381be228d" containerType="regular" prevTag="div" data-magicpath-id="39" data-magicpath-path="InitiatePage.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="40" data-magicpath-path="InitiatePage.tsx">
                <span data-magicpath-id="41" data-magicpath-path="InitiatePage.tsx">Vendor List</span>
              </label>
              <SortableContainer dndKitId="165efe8b-7941-4fbb-8d46-d2a50e4652d5" containerType="regular" prevTag="div" className="flex space-x-2 mb-3" data-magicpath-id="42" data-magicpath-path="InitiatePage.tsx">
                <input type="text" value={vendorInput} onChange={e => setVendorInput(e.target.value)} className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter vendor name" onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addVendor())} data-magicpath-id="43" data-magicpath-path="InitiatePage.tsx" />
                <SortableContainer dndKitId="f2af9e28-ffd8-4513-ae1f-c807497b2fb7" containerType="regular" prevTag="button" type="button" onClick={addVendor} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-magicpath-id="44" data-magicpath-path="InitiatePage.tsx">
                  <Users className="w-5 h-5" data-magicpath-id="45" data-magicpath-path="InitiatePage.tsx" />
                </SortableContainer>
              </SortableContainer>
              <div className="flex flex-wrap gap-2" data-magicpath-id="46" data-magicpath-path="InitiatePage.tsx">
                {formData.vendors.map(vendor => <span key={vendor} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800" data-magicpath-id="47" data-magicpath-path="InitiatePage.tsx">
                    <span data-magicpath-id="48" data-magicpath-path="InitiatePage.tsx">{vendor}</span>
                    <button type="button" onClick={() => removeVendor(vendor)} className="ml-2 text-blue-600 hover:text-blue-800" data-magicpath-id="49" data-magicpath-path="InitiatePage.tsx">
                      ×
                    </button>
                  </span>)}
              </div>
            </SortableContainer>

            <SortableContainer dndKitId="50845272-9636-4b0e-a5cf-401eb2fd66bb" containerType="regular" prevTag="div" data-magicpath-id="50" data-magicpath-path="InitiatePage.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="51" data-magicpath-path="InitiatePage.tsx">
                <span data-magicpath-id="52" data-magicpath-path="InitiatePage.tsx">Upload Documents</span>
              </label>
              <SortableContainer dndKitId="9d9bd324-0292-4d98-8f48-2a4d47727102" containerType="regular" prevTag="div" className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors" data-magicpath-id="53" data-magicpath-path="InitiatePage.tsx">
                <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" data-magicpath-id="54" data-magicpath-path="InitiatePage.tsx" />
                <label htmlFor="file-upload" className="cursor-pointer" data-magicpath-id="55" data-magicpath-path="InitiatePage.tsx">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" data-magicpath-id="56" data-magicpath-path="InitiatePage.tsx" />
                  <p className="text-slate-600" data-magicpath-id="57" data-magicpath-path="InitiatePage.tsx">
                    <span data-magicpath-id="58" data-magicpath-path="InitiatePage.tsx">Click to upload or drag and drop</span>
                  </p>
                  <p className="text-sm text-slate-500" data-magicpath-id="59" data-magicpath-path="InitiatePage.tsx">
                    <span data-magicpath-id="60" data-magicpath-path="InitiatePage.tsx">PDF, DOC, DOCX up to 10MB</span>
                  </p>
                </label>
              </SortableContainer>
              {formData.documents.length > 0 && <div className="mt-3 space-y-2" data-magicpath-id="61" data-magicpath-path="InitiatePage.tsx">
                  {formData.documents.map((file, index) => <SortableContainer dndKitId="300e7ab6-89c7-431b-a8a6-4ceb3395225b" containerType="regular" prevTag="div" key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded" data-magicpath-id="62" data-magicpath-path="InitiatePage.tsx">
                      <span className="text-sm text-slate-700" data-magicpath-id="63" data-magicpath-path="InitiatePage.tsx">{file.name}</span>
                      <span className="text-xs text-slate-500" data-magicpath-id="64" data-magicpath-path="InitiatePage.tsx">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </SortableContainer>)}
                </div>}
            </SortableContainer>

            <SortableContainer dndKitId="8cb9a620-1f28-4b03-9b24-69b1364ce6f1" containerType="regular" prevTag="div" data-magicpath-id="65" data-magicpath-path="InitiatePage.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="66" data-magicpath-path="InitiatePage.tsx">
                <span data-magicpath-id="67" data-magicpath-path="InitiatePage.tsx">Cover Letter</span>
              </label>
              <textarea value={formData.coverLetter} onChange={e => setFormData(prev => ({
              ...prev,
              coverLetter: e.target.value
            }))} rows={6} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Dear Vendors,&#10;&#10;We are seeking proposals for..." data-magicpath-id="68" data-magicpath-path="InitiatePage.tsx" />
            </SortableContainer>

            <SortableContainer dndKitId="2a8ccceb-b7b4-430e-9e28-8540e7af9095" containerType="regular" prevTag="button" type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2" data-magicpath-id="69" data-magicpath-path="InitiatePage.tsx">
              <Send className="w-5 h-5" data-magicpath-id="70" data-magicpath-path="InitiatePage.tsx" />
              <span data-magicpath-id="71" data-magicpath-path="InitiatePage.tsx">Send Request</span>
            </SortableContainer>
          </SortableContainer>

          {showSuccess && <SortableContainer dndKitId="9a014a8d-b4f5-47b1-96b0-e7ba4b88e9ad" containerType="regular" prevTag="div" className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50" data-magicpath-id="72" data-magicpath-path="InitiatePage.tsx">
              <CheckCircle className="w-5 h-5" data-magicpath-id="73" data-magicpath-path="InitiatePage.tsx" />
              <span data-magicpath-id="74" data-magicpath-path="InitiatePage.tsx">Request sent successfully!</span>
            </SortableContainer>}
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};