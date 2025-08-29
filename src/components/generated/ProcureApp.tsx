import React, { useState } from 'react';
import { TopNavBar } from './TopNavBar';
import { InitiatePage } from './InitiatePage';
import { ViewPage } from './ViewPage';
import { ScorePage } from './ScorePage';
export type NavigationTab = 'initiate' | 'view' | 'score' | 'award';
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
  const handleCreateRFIRFQ = (data: Omit<RFIRFQData, 'id' | 'status' | 'createdDate'>) => {
    const newRFIRFQ: RFIRFQData = {
      ...data,
      id: `RFQ-${Date.now()}`,
      status: 'Sent',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setRfirfqData(prev => [...prev, newRFIRFQ]);
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
      
      {activeTab === 'initiate' && <InitiatePage onCreateRFIRFQ={handleCreateRFIRFQ} />}
      
      {activeTab === 'view' && <ViewPage rfirfqData={rfirfqData} onSelectRFIRFQ={handleSelectRFIRFQ} />}
      
      {activeTab === 'score' && <ScorePage selectedRFIRFQ={selectedRFIRFQ} rfirfqData={rfirfqData} onAwardVendor={handleAwardVendor} />}
      
      {activeTab === 'award' && renderAwardPage()}
    </div>;
};