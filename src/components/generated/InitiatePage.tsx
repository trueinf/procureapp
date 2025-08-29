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
  return <SortableContainer dndKitId="c289a1a2-7377-4aab-8977-388f0fb97add" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="0" data-magicpath-path="InitiatePage.tsx">
      <SortableContainer dndKitId="0110fbe4-95da-43e7-9f3a-b1281c85e2d8" containerType="regular" prevTag="div" className="max-w-4xl mx-auto" data-magicpath-id="1" data-magicpath-path="InitiatePage.tsx">
        <SortableContainer dndKitId="3eb5211c-50e1-432b-bab3-890fa0b898a9" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8" data-magicpath-id="2" data-magicpath-path="InitiatePage.tsx">
          <SortableContainer dndKitId="81af8ce8-163e-4924-9451-204fe1aec04e" containerType="regular" prevTag="div" className="flex items-center space-x-3 mb-8" data-magicpath-id="3" data-magicpath-path="InitiatePage.tsx">
            <SortableContainer dndKitId="bca1e37e-fbfc-4469-8e34-dab3f1f99d55" containerType="regular" prevTag="div" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-id="4" data-magicpath-path="InitiatePage.tsx">
              <FileText className="w-5 h-5 text-blue-600" data-magicpath-id="5" data-magicpath-path="InitiatePage.tsx" />
            </SortableContainer>
            <h1 className="text-3xl font-bold text-slate-800" data-magicpath-id="6" data-magicpath-path="InitiatePage.tsx">
              <span data-magicpath-id="7" data-magicpath-path="InitiatePage.tsx">Initiate New Request</span>
            </h1>
          </SortableContainer>

          <SortableContainer dndKitId="281aa6cd-b0bf-4893-9209-2d457a93f442" containerType="regular" prevTag="form" onSubmit={handleSubmit} className="space-y-8" data-magicpath-id="8" data-magicpath-path="InitiatePage.tsx">
            <SortableContainer dndKitId="d25ff6e4-ed5f-492c-b96c-5c6725368b56" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 gap-6" data-magicpath-id="9" data-magicpath-path="InitiatePage.tsx">
              <SortableContainer dndKitId="4680cd87-5edc-4381-b44f-4484ec12bd06" containerType="regular" prevTag="div" data-magicpath-id="10" data-magicpath-path="InitiatePage.tsx">
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

              <SortableContainer dndKitId="1aee3060-e8c3-4739-a278-0feb5a3ba1c9" containerType="regular" prevTag="div" data-magicpath-id="17" data-magicpath-path="InitiatePage.tsx">
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

            <SortableContainer dndKitId="246a8b2c-95bb-4206-9a49-e08773935c2a" containerType="regular" prevTag="div" data-magicpath-id="22" data-magicpath-path="InitiatePage.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="23" data-magicpath-path="InitiatePage.tsx">
                <span data-magicpath-id="24" data-magicpath-path="InitiatePage.tsx">Request Title</span>
              </label>
              <input type="text" value={formData.title} onChange={e => setFormData(prev => ({
              ...prev,
              title: e.target.value
            }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="IT Infrastructure Services RFQ" required data-magicpath-id="25" data-magicpath-path="InitiatePage.tsx" />
            </SortableContainer>

            <SortableContainer dndKitId="c20cf8fe-eb60-426f-9161-33efb0bb698f" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 gap-6" data-magicpath-id="26" data-magicpath-path="InitiatePage.tsx">
              <SortableContainer dndKitId="ab2e588a-02fc-458f-9e4d-ba2c202ff1b8" containerType="regular" prevTag="div" data-magicpath-id="27" data-magicpath-path="InitiatePage.tsx">
                <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="28" data-magicpath-path="InitiatePage.tsx">
                  <span data-magicpath-id="29" data-magicpath-path="InitiatePage.tsx">Start Date</span>
                </label>
                <SortableContainer dndKitId="50f4c207-192e-489f-9fd0-1a51039b120c" containerType="regular" prevTag="div" className="relative" data-magicpath-id="30" data-magicpath-path="InitiatePage.tsx">
                  <input type="date" value={formData.startDate} onChange={e => setFormData(prev => ({
                  ...prev,
                  startDate: e.target.value
                }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required data-magicpath-id="31" data-magicpath-path="InitiatePage.tsx" />
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" data-magicpath-id="32" data-magicpath-path="InitiatePage.tsx" />
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="bcb98364-8203-497a-8bb9-cd3d807cfe94" containerType="regular" prevTag="div" data-magicpath-id="33" data-magicpath-path="InitiatePage.tsx">
                <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="34" data-magicpath-path="InitiatePage.tsx">
                  <span data-magicpath-id="35" data-magicpath-path="InitiatePage.tsx">End Date</span>
                </label>
                <SortableContainer dndKitId="6c808f39-75f2-4009-973b-9a622af6e5fc" containerType="regular" prevTag="div" className="relative" data-magicpath-id="36" data-magicpath-path="InitiatePage.tsx">
                  <input type="date" value={formData.endDate} onChange={e => setFormData(prev => ({
                  ...prev,
                  endDate: e.target.value
                }))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required data-magicpath-id="37" data-magicpath-path="InitiatePage.tsx" />
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" data-magicpath-id="38" data-magicpath-path="InitiatePage.tsx" />
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="ce64359b-08ef-419a-8d1d-ded0974934c5" containerType="regular" prevTag="div" data-magicpath-id="39" data-magicpath-path="InitiatePage.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="40" data-magicpath-path="InitiatePage.tsx">
                <span data-magicpath-id="41" data-magicpath-path="InitiatePage.tsx">Vendor List</span>
              </label>
              <SortableContainer dndKitId="4bee303e-4f09-4e02-b579-e6ea20f83ff8" containerType="regular" prevTag="div" className="flex space-x-2 mb-3" data-magicpath-id="42" data-magicpath-path="InitiatePage.tsx">
                <input type="text" value={vendorInput} onChange={e => setVendorInput(e.target.value)} className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter vendor name" onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addVendor())} data-magicpath-id="43" data-magicpath-path="InitiatePage.tsx" />
                <SortableContainer dndKitId="502a58cf-81a8-4935-8d9e-4fdd90a47e71" containerType="regular" prevTag="button" type="button" onClick={addVendor} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-magicpath-id="44" data-magicpath-path="InitiatePage.tsx">
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

            <SortableContainer dndKitId="7ac42c09-4014-4f5a-afb6-657dab2f5010" containerType="regular" prevTag="div" data-magicpath-id="50" data-magicpath-path="InitiatePage.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="51" data-magicpath-path="InitiatePage.tsx">
                <span data-magicpath-id="52" data-magicpath-path="InitiatePage.tsx">Upload Documents</span>
              </label>
              <SortableContainer dndKitId="c646a2b5-c0b0-42cc-840e-34dca7edde92" containerType="regular" prevTag="div" className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors" data-magicpath-id="53" data-magicpath-path="InitiatePage.tsx">
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
                  {formData.documents.map((file, index) => <SortableContainer dndKitId="98df5a2c-028b-49fc-b26d-94c2c58c4308" containerType="regular" prevTag="div" key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded" data-magicpath-id="62" data-magicpath-path="InitiatePage.tsx">
                      <span className="text-sm text-slate-700" data-magicpath-id="63" data-magicpath-path="InitiatePage.tsx">{file.name}</span>
                      <span className="text-xs text-slate-500" data-magicpath-id="64" data-magicpath-path="InitiatePage.tsx">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </SortableContainer>)}
                </div>}
            </SortableContainer>

            <SortableContainer dndKitId="d050d12d-f3ae-45ae-bd7c-24ccd9bf2423" containerType="regular" prevTag="div" data-magicpath-id="65" data-magicpath-path="InitiatePage.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-3" data-magicpath-id="66" data-magicpath-path="InitiatePage.tsx">
                <span data-magicpath-id="67" data-magicpath-path="InitiatePage.tsx">Cover Letter</span>
              </label>
              <textarea value={formData.coverLetter} onChange={e => setFormData(prev => ({
              ...prev,
              coverLetter: e.target.value
            }))} rows={6} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Dear Vendors,&#10;&#10;We are seeking proposals for..." data-magicpath-id="68" data-magicpath-path="InitiatePage.tsx" />
            </SortableContainer>

            <SortableContainer dndKitId="24cc5c03-857e-4c92-bdbd-e05b36619a7e" containerType="regular" prevTag="button" type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2" data-magicpath-id="69" data-magicpath-path="InitiatePage.tsx">
              <Send className="w-5 h-5" data-magicpath-id="70" data-magicpath-path="InitiatePage.tsx" />
              <span data-magicpath-id="71" data-magicpath-path="InitiatePage.tsx">Send Request</span>
            </SortableContainer>
          </SortableContainer>

          {showSuccess && <SortableContainer dndKitId="2bb69002-101f-4fe3-aa98-7bd5de68b9cf" containerType="regular" prevTag="div" className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50" data-magicpath-id="72" data-magicpath-path="InitiatePage.tsx">
              <CheckCircle className="w-5 h-5" data-magicpath-id="73" data-magicpath-path="InitiatePage.tsx" />
              <span data-magicpath-id="74" data-magicpath-path="InitiatePage.tsx">Request sent successfully!</span>
            </SortableContainer>}
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};