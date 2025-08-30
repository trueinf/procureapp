import React, { useEffect, useState } from 'react';
import { TopNavBar } from './TopNavBar';
import { InitiatePage } from './InitiatePage';
import { ViewPage } from './ViewPage';
import { ScorePage } from './ScorePage';
import { CheckCircle } from 'lucide-react';
import { SuppliersPage } from './SuppliersPage';
export type NavigationTab =
  | 'suppliers'
  | 'suppliers-segmentation'
  | 'suppliers-recommendation'
  | 'suppliers-heatmap'
  | 'initiate'
  | 'view'
  | 'score'
  | 'award';
export interface RFIRFQData {
  id: string;
  type: 'RFI' | 'RFQ';
  status: 'Draft' | 'Sent' | 'In Progress' | 'Completed' | 'Awarded';
  title: string;
  startDate: string;
  endDate: string;
  vendorCount: number;
  createdDate: string;
  documents: File[];
  coverLetter: string;
  vendors: string[];
  scoringCriteria?: Array<{ criterion: string; weight: number }>;
  // Additional fields captured on Initiate
  businessUnit?: string;
  owner?: string;
  supplierEligibility?: string[];
  serviceCategory?: string;
  requiredSkills?: string[];
  teamSize?: string;
  workLocation?: string;
  expectedOutputs?: string;
  startDateMilestones?: string;
  toolPreferences?: string[];
  pricingModel?: string;
  budgetEstimate?: string;
  paymentTerms?: string;
  responseDeadline?: string;
  bidValidity?: string;
  ndaRequired?: boolean;
  approvers?: string[];
  internalNotes?: string;
}
export interface VendorResponse {
  id: string;
  vendorName: string;
  rfirfqId: string;
  documents: File[];
  score?: number;
  questions: Array<{
    id: string;
    question: string;
    response: string;
  }>;
  submittedDate: string;
}

// @component: ProcureApp
export const ProcureApp = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('initiate');
  const [rfirfqData, setRfirfqData] = useState<RFIRFQData[]>([]);
  const [vendorResponses, setVendorResponses] = useState<VendorResponse[]>([]);
  const [selectedRFIRFQ, setSelectedRFIRFQ] = useState<string | null>(null);
  const [awardedVendor, setAwardedVendor] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Load persisted requests
  useEffect(() => {
    try {
      const raw = localStorage.getItem('rfirfqData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setRfirfqData(parsed);
      }
    } catch {}
  }, []);

  // Persist requests (omit File objects for safety)
  useEffect(() => {
    try {
      const sanitized = rfirfqData.map((item) => ({
        ...item,
        documents: [],
      }));
      localStorage.setItem('rfirfqData', JSON.stringify(sanitized));
    } catch {}
  }, [rfirfqData]);
  const handleCreateRFIRFQ = (data: Omit<RFIRFQData, 'id' | 'status' | 'createdDate'>) => {
    const newRFIRFQ: RFIRFQData = {
      ...data,
      id: `RFQ-${Date.now()}`,
      status: 'Sent',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setRfirfqData(prev => [...prev, newRFIRFQ]);
    const vendorCount = data.vendorCount ?? (data.vendors ? data.vendors.length : 0);
    setNotice(`Request "${data.title}" sent to ${vendorCount || 1} vendor${(vendorCount || 1) === 1 ? '' : 's'}. Status: Sent`);
    setTimeout(() => setNotice(null), 3000);
    setActiveTab('view');
  };
  const handleSelectRFIRFQ = (id: string) => {
    setSelectedRFIRFQ(id);
    setActiveTab('score');
  };
  const handleAwardVendor = (vendorName: string) => {
    setAwardedVendor(vendorName);
    setActiveTab('award');
  };
  const renderAwardPage = () => <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">
            <span>Award Contract</span>
          </h1>
          
          {awardedVendor && <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                <span>Selected Vendor</span>
              </h2>
              <p className="text-green-700 text-lg">
                <span>{awardedVendor}</span>
              </p>
            </div>}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <span>Purchase Order Number</span>
              </label>
              <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="PO-2024-001" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <span>Contract Value</span>
              </label>
              <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="$50,000" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <span>Contract Duration</span>
              </label>
              <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="12 months" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <span>Special Terms</span>
              </label>
              <textarea rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter any special terms or conditions..." />
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              <span>Send for Approval</span>
            </button>
          </div>
        </div>
      </div>
    </div>;

  // @return
  return <div className="min-h-screen bg-slate-50">
      <TopNavBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {(activeTab === 'suppliers' || activeTab === 'suppliers-segmentation' || activeTab === 'suppliers-recommendation' || activeTab === 'suppliers-heatmap') && (
        <SuppliersPage
          rfirfqData={rfirfqData}
          view={activeTab === 'suppliers' ? 'segmentation' : (activeTab.replace('suppliers-', '') as 'segmentation'|'recommendation'|'heatmap')}
        />
      )}

      {activeTab === 'initiate' && <InitiatePage onCreateRFIRFQ={handleCreateRFIRFQ} />}
      
      {activeTab === 'view' && <ViewPage rfirfqData={rfirfqData} onSelectRFIRFQ={handleSelectRFIRFQ} />}
      
      {activeTab === 'score' && <ScorePage selectedRFIRFQ={selectedRFIRFQ} rfirfqData={rfirfqData} onAwardVendor={handleAwardVendor} />}
      
      {activeTab === 'award' && renderAwardPage()}

      {notice && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
          <CheckCircle className="w-5 h-5" />
          <span>{notice}</span>
        </div>
      )}
    </div>;
};
