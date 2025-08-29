import { SortableContainer } from "@/dnd-kit/SortableContainer";
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
  mpid?: string;
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
  mpid?: string;
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
  const renderAwardPage = () => <SortableContainer dndKitId="83847f14-dd46-4d2e-b3d1-0d0f41899bed" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="0" data-magicpath-path="ProcureApp.tsx">
      <SortableContainer dndKitId="018e6abf-be37-49e3-af06-f7755fe978d2" containerType="regular" prevTag="div" className="max-w-4xl mx-auto" data-magicpath-id="1" data-magicpath-path="ProcureApp.tsx">
        <SortableContainer dndKitId="2edcd9ea-6dee-46af-9b5e-018c65ed9f80" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8" data-magicpath-id="2" data-magicpath-path="ProcureApp.tsx">
          <h1 className="text-3xl font-bold text-slate-800 mb-8" data-magicpath-id="3" data-magicpath-path="ProcureApp.tsx">
            <span data-magicpath-id="4" data-magicpath-path="ProcureApp.tsx">Award Contract</span>
          </h1>
          
          {awardedVendor && <SortableContainer dndKitId="718c9144-f5c9-456d-a7c6-b54ba6c1861c" containerType="regular" prevTag="div" className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8" data-magicpath-id="5" data-magicpath-path="ProcureApp.tsx">
              <h2 className="text-xl font-semibold text-green-800 mb-2" data-magicpath-id="6" data-magicpath-path="ProcureApp.tsx">
                <span data-magicpath-id="7" data-magicpath-path="ProcureApp.tsx">Selected Vendor</span>
              </h2>
              <p className="text-green-700 text-lg" data-magicpath-id="8" data-magicpath-path="ProcureApp.tsx">
                <span data-magicpath-id="9" data-magicpath-path="ProcureApp.tsx">{awardedVendor}</span>
              </p>
            </SortableContainer>}

          <SortableContainer dndKitId="1b9652eb-fe0e-4724-9e24-76eaebaea793" containerType="regular" prevTag="div" className="space-y-6" data-magicpath-id="10" data-magicpath-path="ProcureApp.tsx">
            <SortableContainer dndKitId="d9523330-e448-43e8-9577-3c1c0ea5e777" containerType="regular" prevTag="div" data-magicpath-id="11" data-magicpath-path="ProcureApp.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-2" data-magicpath-id="12" data-magicpath-path="ProcureApp.tsx">
                <span data-magicpath-id="13" data-magicpath-path="ProcureApp.tsx">Purchase Order Number</span>
              </label>
              <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="PO-2024-001" data-magicpath-id="14" data-magicpath-path="ProcureApp.tsx" />
            </SortableContainer>

            <SortableContainer dndKitId="73e40f5d-62d9-4072-be48-581c7fe3cdb1" containerType="regular" prevTag="div" data-magicpath-id="15" data-magicpath-path="ProcureApp.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-2" data-magicpath-id="16" data-magicpath-path="ProcureApp.tsx">
                <span data-magicpath-id="17" data-magicpath-path="ProcureApp.tsx">Contract Value</span>
              </label>
              <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="$50,000" data-magicpath-id="18" data-magicpath-path="ProcureApp.tsx" />
            </SortableContainer>

            <SortableContainer dndKitId="5077dda0-36ae-461f-8b5c-45e1c3c93acf" containerType="regular" prevTag="div" data-magicpath-id="19" data-magicpath-path="ProcureApp.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-2" data-magicpath-id="20" data-magicpath-path="ProcureApp.tsx">
                <span data-magicpath-id="21" data-magicpath-path="ProcureApp.tsx">Contract Duration</span>
              </label>
              <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="12 months" data-magicpath-id="22" data-magicpath-path="ProcureApp.tsx" />
            </SortableContainer>

            <SortableContainer dndKitId="7574a679-fdbc-4dcf-9ea4-8064998a28f6" containerType="regular" prevTag="div" data-magicpath-id="23" data-magicpath-path="ProcureApp.tsx">
              <label className="block text-sm font-medium text-slate-700 mb-2" data-magicpath-id="24" data-magicpath-path="ProcureApp.tsx">
                <span data-magicpath-id="25" data-magicpath-path="ProcureApp.tsx">Special Terms</span>
              </label>
              <textarea rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter any special terms or conditions..." data-magicpath-id="26" data-magicpath-path="ProcureApp.tsx" />
            </SortableContainer>

            <SortableContainer dndKitId="4cb052f6-a99d-4244-9365-a86cbd21c49d" containerType="regular" prevTag="button" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors" data-magicpath-id="27" data-magicpath-path="ProcureApp.tsx">
              <span data-magicpath-id="28" data-magicpath-path="ProcureApp.tsx">Send for Approval</span>
            </SortableContainer>
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;

  // @return
  return <SortableContainer dndKitId="abaf2893-2e67-44eb-8761-e38d282b5521" containerType="regular" prevTag="div" className="min-h-screen bg-slate-50" data-magicpath-id="29" data-magicpath-path="ProcureApp.tsx">
      <TopNavBar activeTab={activeTab} onTabChange={setActiveTab} data-magicpath-id="30" data-magicpath-path="ProcureApp.tsx" />
      
      {activeTab === 'initiate' && <InitiatePage onCreateRFIRFQ={handleCreateRFIRFQ} data-magicpath-id="31" data-magicpath-path="ProcureApp.tsx" />}
      
      {activeTab === 'view' && <ViewPage rfirfqData={rfirfqData} onSelectRFIRFQ={handleSelectRFIRFQ} data-magicpath-id="32" data-magicpath-path="ProcureApp.tsx" />}
      
      {activeTab === 'score' && <ScorePage selectedRFIRFQ={selectedRFIRFQ} rfirfqData={rfirfqData} onAwardVendor={handleAwardVendor} data-magicpath-id="33" data-magicpath-path="ProcureApp.tsx" />}
      
      {activeTab === 'award' && renderAwardPage()}
    </SortableContainer>;
};