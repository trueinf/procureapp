import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { RFIRFQData } from './ProcureApp';
import { Eye, Calendar, Users, FileText, MessageSquare, ArrowLeft, Send, Building2, DollarSign, Clock, MapPin, Phone, Mail, Download, Star, CheckCircle, AlertCircle, Package, Truck, Shield, BarChart3 } from 'lucide-react';
interface ViewPageProps {
  rfirfqData: RFIRFQData[];
  onSelectRFIRFQ: (id: string) => void;
  mpid?: string;
}

// Sample procurement data with comprehensive fields
const sampleRFIRFQData: RFIRFQData[] = [{
  id: 'RFQ-2024-001',
  type: 'RFQ',
  status: 'In Progress',
  title: 'Enterprise Cloud Infrastructure Services',
  startDate: '2024-01-15',
  endDate: '2024-02-15',
  vendorCount: 5,
  createdDate: '2024-01-10',
  documents: [],
  coverLetter: 'We are seeking a comprehensive cloud infrastructure solution to support our growing enterprise needs.',
  vendors: ['AWS Enterprise', 'Microsoft Azure', 'Google Cloud Platform', 'IBM Cloud', 'Oracle Cloud'],
  mpid: "7554dd12-c983-476f-a63b-d64b98c2a252"
}, {
  id: 'RFI-2024-002',
  type: 'RFI',
  status: 'Completed',
  title: 'Cybersecurity Assessment & Implementation',
  startDate: '2024-01-08',
  endDate: '2024-01-25',
  vendorCount: 3,
  createdDate: '2024-01-05',
  documents: [],
  coverLetter: 'Request for information regarding comprehensive cybersecurity solutions for our organization.',
  vendors: ['CyberGuard Pro', 'SecureNet Solutions', 'DefenseFirst Technologies'],
  mpid: "4218899d-e7d1-4723-b576-aa28f7bc8571"
}, {
  id: 'RFQ-2024-003',
  type: 'RFQ',
  status: 'Sent',
  title: 'Office Equipment & Furniture Procurement',
  startDate: '2024-01-20',
  endDate: '2024-02-20',
  vendorCount: 4,
  createdDate: '2024-01-18',
  documents: [],
  coverLetter: 'Procurement of modern office equipment and ergonomic furniture for our new headquarters.',
  vendors: ['OfficeMax Business', 'Herman Miller', 'Steelcase', 'Humanscale'],
  mpid: "29028b99-e6ff-4fcb-bbc8-f2f45e4653ec"
}];

// Enhanced vendor details with comprehensive information
const vendorDetails = {
  'AWS Enterprise': {
    company: 'Amazon Web Services',
    contact: 'Sarah Johnson',
    email: 'sarah.johnson@aws.amazon.com',
    phone: '+1 (555) 123-4567',
    location: 'Seattle, WA',
    rating: 4.9,
    certifications: ['ISO 27001', 'SOC 2 Type II', 'FedRAMP'],
    experience: '15+ years',
    teamSize: '50+ engineers'
  },
  'Microsoft Azure': {
    company: 'Microsoft Corporation',
    contact: 'David Chen',
    email: 'david.chen@microsoft.com',
    phone: '+1 (555) 234-5678',
    location: 'Redmond, WA',
    rating: 4.8,
    certifications: ['ISO 27001', 'SOC 2', 'HIPAA'],
    experience: '12+ years',
    teamSize: '40+ engineers'
  },
  'CyberGuard Pro': {
    company: 'CyberGuard Professional Services',
    contact: 'Emily Rodriguez',
    email: 'emily.rodriguez@cyberguardpro.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    rating: 4.7,
    certifications: ['CISSP', 'CISM', 'ISO 27001'],
    experience: '8+ years',
    teamSize: '25+ specialists'
  }
};

// Sample questions and responses
const sampleQuestions = [{
  id: '1',
  vendor: 'AWS Enterprise',
  question: 'What is your disaster recovery strategy and RTO/RPO guarantees?',
  response: 'We provide multi-region backup with 99.99% uptime SLA, RTO of 4 hours, and RPO of 1 hour.',
  timestamp: '2024-01-16 10:30 AM',
  mpid: "2d423f9e-c6cf-4f50-ac3b-b13295ff1c30"
}, {
  id: '2',
  vendor: 'Microsoft Azure',
  question: 'Can you provide detailed pricing for different usage tiers?',
  response: 'Our pricing model includes pay-as-you-go options starting at $0.10/hour with enterprise discounts available.',
  timestamp: '2024-01-16 2:15 PM',
  mpid: "2cd8d44b-bd0f-4bf1-ae0c-ae90767d166d"
}, {
  id: '3',
  vendor: 'AWS Enterprise',
  question: 'What compliance certifications do you maintain?',
  response: 'We maintain SOC 2 Type II, ISO 27001, FedRAMP High, and HIPAA compliance certifications.',
  timestamp: '2024-01-17 9:45 AM',
  mpid: "d8d114d8-0327-4d7a-bd8c-58ee2d5b3ad3"
}] as any[];

// Sample quotations with detailed information
const sampleQuotations = [{
  id: '1',
  vendor: 'AWS Enterprise',
  fileName: 'AWS_Enterprise_Proposal_2024.pdf',
  fileSize: '3.2 MB',
  submittedDate: '2024-01-18',
  status: 'Submitted',
  totalValue: '$125,000',
  validUntil: '2024-03-15',
  deliveryTime: '4-6 weeks',
  mpid: "c5216861-263b-46e5-a9d2-35c74e3a119a"
}, {
  id: '2',
  vendor: 'Microsoft Azure',
  fileName: 'Azure_Cloud_Solution_Quote.pdf',
  fileSize: '2.8 MB',
  submittedDate: '2024-01-19',
  status: 'Submitted',
  totalValue: '$118,500',
  validUntil: '2024-03-20',
  deliveryTime: '3-5 weeks',
  mpid: "6efc67c8-6976-49be-a00f-764e8f1b7dd8"
}, {
  id: '3',
  vendor: 'Google Cloud Platform',
  fileName: 'GCP_Enterprise_Proposal.pdf',
  fileSize: '2.1 MB',
  submittedDate: '2024-01-20',
  status: 'Under Review',
  totalValue: '$132,000',
  validUntil: '2024-03-10',
  deliveryTime: '5-7 weeks',
  mpid: "e54a2e54-813e-4693-b339-f52e044b5585"
}] as any[];
export const ViewPage = ({
  rfirfqData,
  onSelectRFIRFQ
}: ViewPageProps) => {
  const [selectedItem, setSelectedItem] = useState<RFIRFQData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'questions' | 'quotations'>('overview');
  const [questionResponse, setQuestionResponse] = useState('');

  // Use sample data if no real data exists
  const displayData = rfirfqData.length > 0 ? rfirfqData : sampleRFIRFQData;
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Sent':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Progress':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Awarded':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Under Review':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };
  const handleRowClick = (item: RFIRFQData) => {
    setSelectedItem(item);
  };
  const handleBackClick = () => {
    setSelectedItem(null);
  };
  const handleScoreClick = () => {
    if (selectedItem) {
      onSelectRFIRFQ(selectedItem.id);
    }
  };
  if (selectedItem) {
    const currentVendors = selectedItem.vendors || Object.keys(vendorDetails).slice(0, selectedItem.vendorCount);
    return <SortableContainer dndKitId="20865ce6-0a1f-4669-889a-ce092283b318" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6" data-magicpath-id="0" data-magicpath-path="ViewPage.tsx">
        <SortableContainer dndKitId="3a59eeb3-a8dd-4195-bcf3-4b70cc3c9a09" containerType="regular" prevTag="div" className="max-w-7xl mx-auto" data-magicpath-id="1" data-magicpath-path="ViewPage.tsx">
          {/* Header Section */}
          <SortableContainer dndKitId="1792868a-9c85-40d0-a88f-2ec3578c1f5e" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-lg border border-slate-200/50 mb-6" data-magicpath-id="2" data-magicpath-path="ViewPage.tsx">
            <SortableContainer dndKitId="1d1ccb61-1966-44e8-9ac7-0276f79fa942" containerType="regular" prevTag="div" className="p-6 md:p-8" data-magicpath-id="3" data-magicpath-path="ViewPage.tsx">
              <SortableContainer dndKitId="a247fbb8-63ad-406c-b514-d67241f239d7" containerType="regular" prevTag="div" className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6" data-magicpath-id="4" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="08404d85-cf2e-445b-8eb2-da7cb3753b8b" containerType="regular" prevTag="button" onClick={handleBackClick} className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-200 group w-fit" data-magicpath-id="5" data-magicpath-path="ViewPage.tsx">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" data-magicpath-id="6" data-magicpath-path="ViewPage.tsx" />
                  <span className="font-medium" data-magicpath-id="7" data-magicpath-path="ViewPage.tsx">Back to Requests</span>
                </SortableContainer>
                
                <SortableContainer dndKitId="acff3159-5960-4132-a513-44f7f5f59e68" containerType="regular" prevTag="button" onClick={handleScoreClick} disabled={!selectedItem} className={`px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg transform ${selectedItem ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-magicpath-id="8" data-magicpath-path="ViewPage.tsx">
                  <span data-magicpath-id="9" data-magicpath-path="ViewPage.tsx">Score Responses</span>
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="16b47756-bef9-442c-ab8a-98331064832c" containerType="regular" prevTag="div" className="flex items-start space-x-4 mb-6" data-magicpath-id="10" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="3c2d5259-914c-494d-8fdb-7c40d7d00540" containerType="regular" prevTag="div" className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg" data-magicpath-id="11" data-magicpath-path="ViewPage.tsx">
                  <FileText className="w-8 h-8 text-white" data-magicpath-id="12" data-magicpath-path="ViewPage.tsx" />
                </SortableContainer>
                <SortableContainer dndKitId="8b2389d3-9a6c-4609-a8b4-436d72036f56" containerType="regular" prevTag="div" className="flex-1" data-magicpath-id="13" data-magicpath-path="ViewPage.tsx">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2" data-magicpath-id="14" data-magicpath-path="ViewPage.tsx">
                    {selectedItem.id}
                  </h1>
                  <p className="text-lg text-slate-600 mb-4" data-magicpath-id="15" data-magicpath-path="ViewPage.tsx">
                    {selectedItem.title}
                  </p>
                  <SortableContainer dndKitId="69dfe5c3-4c4d-4f63-8230-5114d9f9ab2a" containerType="regular" prevTag="div" className="flex flex-wrap items-center gap-3" data-magicpath-id="16" data-magicpath-path="ViewPage.tsx">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(selectedItem.status)}`} data-magicpath-id="17" data-magicpath-path="ViewPage.tsx">
                      <CheckCircle className="w-4 h-4 mr-2" data-magicpath-id="18" data-magicpath-path="ViewPage.tsx" />
                      {selectedItem.status}
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200" data-magicpath-id="19" data-magicpath-path="ViewPage.tsx">
                      <Package className="w-4 h-4 mr-2" data-magicpath-id="20" data-magicpath-path="ViewPage.tsx" />
                      {selectedItem.type}
                    </span>
                  </SortableContainer>
                </SortableContainer>
              </SortableContainer>

              {/* Key Metrics Grid */}
              <SortableContainer dndKitId="3953aa70-ee31-4d34-a15f-6ca7e95eabc4" containerType="regular" prevTag="div" className="grid grid-cols-2 md:grid-cols-4 gap-4" data-magicpath-id="21" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="5cd449fb-c692-4443-8240-6d0e5c6b1622" containerType="regular" prevTag="div" className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200/50" data-magicpath-id="22" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="d9b57374-ba47-4515-b2a2-b88171536482" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="23" data-magicpath-path="ViewPage.tsx">
                    <Users className="w-8 h-8 text-blue-600" data-magicpath-id="24" data-magicpath-path="ViewPage.tsx" />
                    <SortableContainer dndKitId="19bbcd8d-28d1-4f49-b4fd-f16c813b3513" containerType="regular" prevTag="div" data-magicpath-id="25" data-magicpath-path="ViewPage.tsx">
                      <p className="text-sm text-blue-600 font-medium" data-magicpath-id="26" data-magicpath-path="ViewPage.tsx">Vendors</p>
                      <p className="text-xl font-bold text-blue-800" data-magicpath-id="27" data-magicpath-path="ViewPage.tsx">{selectedItem.vendorCount}</p>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="40103874-da47-4a30-987d-a4aa7bf50894" containerType="regular" prevTag="div" className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200/50" data-magicpath-id="28" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="e658534b-57ed-49c6-8e1b-2da986a9590e" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="29" data-magicpath-path="ViewPage.tsx">
                    <Calendar className="w-8 h-8 text-emerald-600" data-magicpath-id="30" data-magicpath-path="ViewPage.tsx" />
                    <SortableContainer dndKitId="808f9bac-b15b-4b17-8bdf-45f98a4c8aa7" containerType="regular" prevTag="div" data-magicpath-id="31" data-magicpath-path="ViewPage.tsx">
                      <p className="text-sm text-emerald-600 font-medium" data-magicpath-id="32" data-magicpath-path="ViewPage.tsx">Timeline</p>
                      <p className="text-lg font-bold text-emerald-800" data-magicpath-id="33" data-magicpath-path="ViewPage.tsx">31 days</p>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="ce5224d8-39b7-4fb4-a2eb-9698f9ce38e4" containerType="regular" prevTag="div" className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200/50" data-magicpath-id="34" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="cfbf0edf-3dbe-4925-8e8f-77cd568ff665" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="35" data-magicpath-path="ViewPage.tsx">
                    <MessageSquare className="w-8 h-8 text-amber-600" data-magicpath-id="36" data-magicpath-path="ViewPage.tsx" />
                    <SortableContainer dndKitId="e6d7d549-3eea-4285-bc7c-e2b4913841f9" containerType="regular" prevTag="div" data-magicpath-id="37" data-magicpath-path="ViewPage.tsx">
                      <p className="text-sm text-amber-600 font-medium" data-magicpath-id="38" data-magicpath-path="ViewPage.tsx">Responses</p>
                      <p className="text-xl font-bold text-amber-800" data-magicpath-id="39" data-magicpath-path="ViewPage.tsx">12</p>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="cc7e3dce-f099-41c3-a25e-cbe8a003b5c7" containerType="regular" prevTag="div" className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200/50" data-magicpath-id="40" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="c29b0ded-9ad0-44e5-8341-3667ace5333e" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="41" data-magicpath-path="ViewPage.tsx">
                    <DollarSign className="w-8 h-8 text-purple-600" data-magicpath-id="42" data-magicpath-path="ViewPage.tsx" />
                    <SortableContainer dndKitId="5dd99e00-21a8-4d27-9fdf-b2ba3865455c" containerType="regular" prevTag="div" data-magicpath-id="43" data-magicpath-path="ViewPage.tsx">
                      <p className="text-sm text-purple-600 font-medium" data-magicpath-id="44" data-magicpath-path="ViewPage.tsx">Est. Value</p>
                      <p className="text-xl font-bold text-purple-800" data-magicpath-id="45" data-magicpath-path="ViewPage.tsx">$125K</p>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>

          {/* Main Content Tabs */}
          <SortableContainer dndKitId="07454073-6f64-4755-b271-d6794e221085" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-lg border border-slate-200/50" data-magicpath-id="46" data-magicpath-path="ViewPage.tsx">
            <SortableContainer dndKitId="0c122c99-102a-48b5-82f6-3ec793ff9912" containerType="regular" prevTag="div" className="border-b border-slate-200" data-magicpath-id="47" data-magicpath-path="ViewPage.tsx">
              <SortableContainer dndKitId="82fde235-c685-4438-8abd-843d039135c6" containerType="collection" prevTag="div" className="flex overflow-x-auto" data-magicpath-id="48" data-magicpath-path="ViewPage.tsx">
                {[{
                id: 'overview',
                label: 'Overview',
                icon: Eye,
                mpid: "7b87dc9a-58b4-44e1-9837-315b2963665e"
              }, {
                id: 'vendors',
                label: 'Vendors',
                icon: Building2,
                mpid: "a686dae1-3d29-4222-885a-7323f8f66254"
              }, {
                id: 'questions',
                label: 'Q&A',
                icon: MessageSquare,
                mpid: "140a851c-7221-4cd6-8d76-a9924273c21c"
              }, {
                id: 'quotations',
                label: 'Quotations',
                icon: FileText,
                mpid: "0f38ce9c-7efe-417a-90f6-1f088ffe976d"
              }].map(tab => {
                const Icon = tab.icon;
                return <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-all duration-200 border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'text-blue-600 border-blue-600 bg-blue-50/50' : 'text-slate-600 border-transparent hover:text-blue-600 hover:bg-slate-50'}`} data-magicpath-uuid={(tab as any)["mpid"] ?? "unsafe"} data-magicpath-id="49" data-magicpath-path="ViewPage.tsx">
                      <Icon className="w-4 h-4" data-magicpath-uuid={(tab as any)["mpid"] ?? "unsafe"} data-magicpath-id="50" data-magicpath-path="ViewPage.tsx" />
                      <span data-magicpath-uuid={(tab as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="51" data-magicpath-path="ViewPage.tsx">{tab.label}</span>
                    </button>;
              })}
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="1f4722b3-2f89-454d-9844-cb2bd4d3052d" containerType="regular" prevTag="div" className="p-6 md:p-8" data-magicpath-id="52" data-magicpath-path="ViewPage.tsx">
              {/* Overview Tab */}
              {activeTab === 'overview' && <SortableContainer dndKitId="0844eb88-10be-4644-800c-01aef78d63ca" containerType="regular" prevTag="div" className="space-y-8" data-magicpath-id="53" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="20cdd9c9-5856-4163-b371-af6db7305281" containerType="regular" prevTag="div" data-magicpath-id="54" data-magicpath-path="ViewPage.tsx">
                    <h2 className="text-xl font-semibold text-slate-800 mb-6" data-magicpath-id="55" data-magicpath-path="ViewPage.tsx">Request Details</h2>
                    <SortableContainer dndKitId="220fc757-bb59-4c97-bdcb-a73f342b66bf" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-magicpath-id="56" data-magicpath-path="ViewPage.tsx">
                      <SortableContainer dndKitId="5134ac46-6021-489d-baa3-04a258f49078" containerType="regular" prevTag="div" className="bg-slate-50 rounded-xl p-4 border border-slate-200/50" data-magicpath-id="57" data-magicpath-path="ViewPage.tsx">
                        <SortableContainer dndKitId="d7318824-2b77-4a91-815a-80695288da3a" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="58" data-magicpath-path="ViewPage.tsx">
                          <Calendar className="w-6 h-6 text-slate-500" data-magicpath-id="59" data-magicpath-path="ViewPage.tsx" />
                          <SortableContainer dndKitId="b43dd65e-76e1-4d65-9550-1524b2eddb55" containerType="regular" prevTag="div" data-magicpath-id="60" data-magicpath-path="ViewPage.tsx">
                            <p className="text-sm text-slate-500 font-medium" data-magicpath-id="61" data-magicpath-path="ViewPage.tsx">Start Date</p>
                            <p className="text-lg font-semibold text-slate-800" data-magicpath-id="62" data-magicpath-path="ViewPage.tsx">{selectedItem.startDate}</p>
                          </SortableContainer>
                        </SortableContainer>
                      </SortableContainer>

                      <SortableContainer dndKitId="26959b29-8856-4227-b192-2254652108ac" containerType="regular" prevTag="div" className="bg-slate-50 rounded-xl p-4 border border-slate-200/50" data-magicpath-id="63" data-magicpath-path="ViewPage.tsx">
                        <SortableContainer dndKitId="e7c8693b-9c0a-4d5f-9e12-fc6ae4cd0201" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="64" data-magicpath-path="ViewPage.tsx">
                          <Clock className="w-6 h-6 text-slate-500" data-magicpath-id="65" data-magicpath-path="ViewPage.tsx" />
                          <SortableContainer dndKitId="625cb4e1-65b4-4099-b136-d3a02a1aec1a" containerType="regular" prevTag="div" data-magicpath-id="66" data-magicpath-path="ViewPage.tsx">
                            <p className="text-sm text-slate-500 font-medium" data-magicpath-id="67" data-magicpath-path="ViewPage.tsx">End Date</p>
                            <p className="text-lg font-semibold text-slate-800" data-magicpath-id="68" data-magicpath-path="ViewPage.tsx">{selectedItem.endDate}</p>
                          </SortableContainer>
                        </SortableContainer>
                      </SortableContainer>

                      <SortableContainer dndKitId="7a9b9ac8-3b20-49d5-88c9-792b94cb1237" containerType="regular" prevTag="div" className="bg-slate-50 rounded-xl p-4 border border-slate-200/50" data-magicpath-id="69" data-magicpath-path="ViewPage.tsx">
                        <SortableContainer dndKitId="debc16ce-594f-4c6a-b2e2-d8e991f88b56" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="70" data-magicpath-path="ViewPage.tsx">
                          <FileText className="w-6 h-6 text-slate-500" data-magicpath-id="71" data-magicpath-path="ViewPage.tsx" />
                          <SortableContainer dndKitId="2c478e1c-4342-4928-9860-932beba06228" containerType="regular" prevTag="div" data-magicpath-id="72" data-magicpath-path="ViewPage.tsx">
                            <p className="text-sm text-slate-500 font-medium" data-magicpath-id="73" data-magicpath-path="ViewPage.tsx">Created</p>
                            <p className="text-lg font-semibold text-slate-800" data-magicpath-id="74" data-magicpath-path="ViewPage.tsx">{selectedItem.createdDate}</p>
                          </SortableContainer>
                        </SortableContainer>
                      </SortableContainer>
                    </SortableContainer>
                  </SortableContainer>

                  <SortableContainer dndKitId="5c06bcb7-ab31-4a3b-9db3-63f0e38b5fb0" containerType="regular" prevTag="div" data-magicpath-id="75" data-magicpath-path="ViewPage.tsx">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4" data-magicpath-id="76" data-magicpath-path="ViewPage.tsx">Project Description</h3>
                    <SortableContainer dndKitId="f0bc5a07-feb4-46f3-a6a2-2489801ef3bc" containerType="regular" prevTag="div" className="bg-slate-50 rounded-xl p-6 border border-slate-200/50" data-magicpath-id="77" data-magicpath-path="ViewPage.tsx">
                      <p className="text-slate-700 leading-relaxed" data-magicpath-id="78" data-magicpath-path="ViewPage.tsx">{selectedItem.coverLetter}</p>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>}

              {/* Vendors Tab */}
              {activeTab === 'vendors' && <SortableContainer dndKitId="fa94d2c4-f128-4492-8633-fd53d39c27bc" containerType="regular" prevTag="div" className="space-y-6" data-magicpath-id="79" data-magicpath-path="ViewPage.tsx">
                  <h2 className="text-xl font-semibold text-slate-800" data-magicpath-id="80" data-magicpath-path="ViewPage.tsx">Participating Vendors</h2>
                  <SortableContainer dndKitId="24c99f9f-e6d9-4011-a627-c958ff86bf97" containerType="collection" prevTag="div" className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-magicpath-id="81" data-magicpath-path="ViewPage.tsx">
                    {currentVendors.map(vendorName => {
                  const vendor = vendorDetails[vendorName as keyof typeof vendorDetails];
                  if (!vendor) return null;
                  return <div key={vendorName} className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-200" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="82" data-magicpath-path="ViewPage.tsx">
                          <div className="flex items-start justify-between mb-4" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="83" data-magicpath-path="ViewPage.tsx">
                            <div data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="84" data-magicpath-path="ViewPage.tsx">
                              <h3 className="text-lg font-semibold text-slate-800 mb-1" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="85" data-magicpath-path="ViewPage.tsx">{vendor.company}</h3>
                              <p className="text-slate-600" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="86" data-magicpath-path="ViewPage.tsx">{vendor.contact}</p>
                            </div>
                            <div className="flex items-center space-x-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-200" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="87" data-magicpath-path="ViewPage.tsx">
                              <Star className="w-4 h-4 text-amber-500 fill-current" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="88" data-magicpath-path="ViewPage.tsx" />
                              <span className="text-sm font-semibold text-amber-700" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="89" data-magicpath-path="ViewPage.tsx">{vendor.rating}</span>
                            </div>
                          </div>

                          <div className="space-y-3" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="90" data-magicpath-path="ViewPage.tsx">
                            <div className="flex items-center space-x-2 text-sm text-slate-600" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="91" data-magicpath-path="ViewPage.tsx">
                              <Mail className="w-4 h-4" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="92" data-magicpath-path="ViewPage.tsx" />
                              <span data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="93" data-magicpath-path="ViewPage.tsx">{vendor.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="94" data-magicpath-path="ViewPage.tsx">
                              <Phone className="w-4 h-4" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="95" data-magicpath-path="ViewPage.tsx" />
                              <span data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="96" data-magicpath-path="ViewPage.tsx">{vendor.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="97" data-magicpath-path="ViewPage.tsx">
                              <MapPin className="w-4 h-4" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="98" data-magicpath-path="ViewPage.tsx" />
                              <span data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="99" data-magicpath-path="ViewPage.tsx">{vendor.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="100" data-magicpath-path="ViewPage.tsx">
                              <Clock className="w-4 h-4" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="101" data-magicpath-path="ViewPage.tsx" />
                              <span data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="102" data-magicpath-path="ViewPage.tsx">{vendor.experience} experience • {vendor.teamSize}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-200" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="103" data-magicpath-path="ViewPage.tsx">
                            <p className="text-sm font-medium text-slate-700 mb-2" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="104" data-magicpath-path="ViewPage.tsx">Certifications</p>
                            <div className="flex flex-wrap gap-2" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="105" data-magicpath-path="ViewPage.tsx">
                              {vendor.certifications.map(cert => <span key={cert} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 border border-green-200" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="106" data-magicpath-path="ViewPage.tsx">
                                  <Shield className="w-3 h-3 mr-1" data-magicpath-uuid={(vendorName as any)["mpid"] ?? "unsafe"} data-magicpath-id="107" data-magicpath-path="ViewPage.tsx" />
                                  {cert}
                                </span>)}
                            </div>
                          </div>
                        </div>;
                })}
                  </SortableContainer>
                </SortableContainer>}

              {/* Questions Tab */}
              {activeTab === 'questions' && <SortableContainer dndKitId="5a7277a0-7ea1-4019-b319-214a491f211b" containerType="regular" prevTag="div" className="space-y-6" data-magicpath-id="108" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="e69ae673-5067-4b78-a04d-1866f0798780" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="109" data-magicpath-path="ViewPage.tsx">
                    <h2 className="text-xl font-semibold text-slate-800" data-magicpath-id="110" data-magicpath-path="ViewPage.tsx">Vendor Questions & Responses</h2>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full" data-magicpath-id="111" data-magicpath-path="ViewPage.tsx">
                      {sampleQuestions.length} questions
                    </span>
                  </SortableContainer>
                  
                  <SortableContainer dndKitId="2a20074c-430c-4f83-ba12-d9ae227d7e5d" containerType="collection" prevTag="div" className="space-y-4" data-magicpath-id="112" data-magicpath-path="ViewPage.tsx">
                    {sampleQuestions.map(question => <div key={question.id} className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl p-6 border border-slate-200/50 hover:shadow-md transition-all duration-200" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="113" data-magicpath-path="ViewPage.tsx">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="114" data-magicpath-path="ViewPage.tsx">
                          <div className="flex items-center space-x-3" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="115" data-magicpath-path="ViewPage.tsx">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="116" data-magicpath-path="ViewPage.tsx">
                              <Building2 className="w-5 h-5 text-blue-600" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="117" data-magicpath-path="ViewPage.tsx" />
                            </div>
                            <div data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="118" data-magicpath-path="ViewPage.tsx">
                              <h3 className="font-semibold text-slate-800" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendor:unknown" data-magicpath-id="119" data-magicpath-path="ViewPage.tsx">{question.vendor}</h3>
                              <p className="text-sm text-slate-500" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="120" data-magicpath-path="ViewPage.tsx">Vendor Question</p>
                            </div>
                          </div>
                          <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-field="timestamp:unknown" data-magicpath-id="121" data-magicpath-path="ViewPage.tsx">
                            {question.timestamp}
                          </span>
                        </div>
                        
                        <div className="mb-4" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="122" data-magicpath-path="ViewPage.tsx">
                          <p className="text-slate-700 font-medium mb-2" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="123" data-magicpath-path="ViewPage.tsx">Question:</p>
                          <p className="text-slate-600 bg-white rounded-lg p-4 border border-slate-200/50" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-field="question:unknown" data-magicpath-id="124" data-magicpath-path="ViewPage.tsx">
                            {question.question}
                          </p>
                        </div>

                        {question.response && <div className="mb-4" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="125" data-magicpath-path="ViewPage.tsx">
                            <p className="text-slate-700 font-medium mb-2" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="126" data-magicpath-path="ViewPage.tsx">Response:</p>
                            <p className="text-slate-600 bg-green-50 rounded-lg p-4 border border-green-200/50" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-field="response:unknown" data-magicpath-id="127" data-magicpath-path="ViewPage.tsx">
                              {question.response}
                            </p>
                          </div>}

                        {!question.response && <div className="space-y-3" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="128" data-magicpath-path="ViewPage.tsx">
                            <textarea placeholder="Type your response..." className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none" rows={3} value={questionResponse} onChange={e => setQuestionResponse(e.target.value)} data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="129" data-magicpath-path="ViewPage.tsx" />
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="130" data-magicpath-path="ViewPage.tsx">
                              <Send className="w-4 h-4" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="131" data-magicpath-path="ViewPage.tsx" />
                              <span data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="132" data-magicpath-path="ViewPage.tsx">Send Response</span>
                            </button>
                          </div>}
                      </div>)}
                  </SortableContainer>
                </SortableContainer>}

              {/* Quotations Tab */}
              {activeTab === 'quotations' && <SortableContainer dndKitId="49a299ba-819b-445e-93cb-ad95c5fcef66" containerType="regular" prevTag="div" className="space-y-6" data-magicpath-id="133" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="bff2261a-c7cf-4b15-8b73-6b2c3d60d68e" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="134" data-magicpath-path="ViewPage.tsx">
                    <h2 className="text-xl font-semibold text-slate-800" data-magicpath-id="135" data-magicpath-path="ViewPage.tsx">Submitted Quotations</h2>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full" data-magicpath-id="136" data-magicpath-path="ViewPage.tsx">
                      {sampleQuotations.length} submissions
                    </span>
                  </SortableContainer>
                  
                  <SortableContainer dndKitId="ad427759-41d2-4124-a314-8a09d1b8a73c" containerType="collection" prevTag="div" className="space-y-4" data-magicpath-id="137" data-magicpath-path="ViewPage.tsx">
                    {sampleQuotations.map(quotation => <div key={quotation.id} className="bg-gradient-to-r from-white to-slate-50/50 rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-200" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="138" data-magicpath-path="ViewPage.tsx">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="139" data-magicpath-path="ViewPage.tsx">
                          <div className="flex items-center space-x-4" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="140" data-magicpath-path="ViewPage.tsx">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="141" data-magicpath-path="ViewPage.tsx">
                              <FileText className="w-6 h-6 text-white" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="142" data-magicpath-path="ViewPage.tsx" />
                            </div>
                            <div data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="143" data-magicpath-path="ViewPage.tsx">
                              <h3 className="text-lg font-semibold text-slate-800" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendor:unknown" data-magicpath-id="144" data-magicpath-path="ViewPage.tsx">{quotation.vendor}</h3>
                              <p className="text-sm text-slate-600" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="fileName:unknown,fileSize:unknown" data-magicpath-id="145" data-magicpath-path="ViewPage.tsx">{quotation.fileName} • {quotation.fileSize}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="146" data-magicpath-path="ViewPage.tsx">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(quotation.status)}`} data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="147" data-magicpath-path="ViewPage.tsx">
                              <CheckCircle className="w-4 h-4 mr-2" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="148" data-magicpath-path="ViewPage.tsx" />
                              {quotation.status}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="149" data-magicpath-path="ViewPage.tsx">
                          <div className="bg-white rounded-lg p-3 border border-slate-200/50" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="150" data-magicpath-path="ViewPage.tsx">
                            <p className="text-xs text-slate-500 font-medium mb-1" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="151" data-magicpath-path="ViewPage.tsx">Total Value</p>
                            <p className="text-lg font-bold text-green-600" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="totalValue:unknown" data-magicpath-id="152" data-magicpath-path="ViewPage.tsx">{quotation.totalValue}</p>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border border-slate-200/50" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="153" data-magicpath-path="ViewPage.tsx">
                            <p className="text-xs text-slate-500 font-medium mb-1" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="154" data-magicpath-path="ViewPage.tsx">Delivery</p>
                            <p className="text-sm font-semibold text-slate-700" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="deliveryTime:unknown" data-magicpath-id="155" data-magicpath-path="ViewPage.tsx">{quotation.deliveryTime}</p>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border border-slate-200/50" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="156" data-magicpath-path="ViewPage.tsx">
                            <p className="text-xs text-slate-500 font-medium mb-1" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="157" data-magicpath-path="ViewPage.tsx">Valid Until</p>
                            <p className="text-sm font-semibold text-slate-700" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="validUntil:unknown" data-magicpath-id="158" data-magicpath-path="ViewPage.tsx">{quotation.validUntil}</p>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border border-slate-200/50" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="159" data-magicpath-path="ViewPage.tsx">
                            <p className="text-xs text-slate-500 font-medium mb-1" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="160" data-magicpath-path="ViewPage.tsx">Submitted</p>
                            <p className="text-sm font-semibold text-slate-700" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="submittedDate:unknown" data-magicpath-id="161" data-magicpath-path="ViewPage.tsx">{quotation.submittedDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="162" data-magicpath-path="ViewPage.tsx">
                          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-md hover:shadow-lg" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="163" data-magicpath-path="ViewPage.tsx">
                            <Download className="w-4 h-4" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="164" data-magicpath-path="ViewPage.tsx" />
                            <span data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="165" data-magicpath-path="ViewPage.tsx">Download</span>
                          </button>
                          <button className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium border border-slate-200" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="166" data-magicpath-path="ViewPage.tsx">
                            <Eye className="w-4 h-4" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="167" data-magicpath-path="ViewPage.tsx" />
                            <span data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="168" data-magicpath-path="ViewPage.tsx">Preview</span>
                          </button>
                        </div>
                      </div>)}
                  </SortableContainer>
                </SortableContainer>}
            </SortableContainer>
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>;
  }

  // Main list view with enhanced sample data
  return <SortableContainer dndKitId="f6858180-4bdc-436d-9d85-d745622a33d9" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6" data-magicpath-id="169" data-magicpath-path="ViewPage.tsx">
      <SortableContainer dndKitId="ad49ac4f-18a5-42d9-8901-d1ee1ebfa89d" containerType="regular" prevTag="div" className="max-w-7xl mx-auto" data-magicpath-id="170" data-magicpath-path="ViewPage.tsx">
        <SortableContainer dndKitId="6239f3ed-8893-4b63-96fa-a66dee649190" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden" data-magicpath-id="171" data-magicpath-path="ViewPage.tsx">
          <SortableContainer dndKitId="ddb9e7b2-ba9c-42fe-b7b7-16548221289c" containerType="regular" prevTag="div" className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 md:p-8" data-magicpath-id="172" data-magicpath-path="ViewPage.tsx">
            <SortableContainer dndKitId="8a8eb0e0-5904-452f-8a96-658a74c9b1aa" containerType="regular" prevTag="div" className="flex items-center space-x-4" data-magicpath-id="173" data-magicpath-path="ViewPage.tsx">
              <SortableContainer dndKitId="5592d76a-d4ec-47cb-a01f-9cd842f5fdad" containerType="regular" prevTag="div" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm" data-magicpath-id="174" data-magicpath-path="ViewPage.tsx">
                <Eye className="w-6 h-6 text-white" data-magicpath-id="175" data-magicpath-path="ViewPage.tsx" />
              </SortableContainer>
              <SortableContainer dndKitId="ea8a9c5d-b2d7-4220-88e1-d3e614cb732b" containerType="regular" prevTag="div" data-magicpath-id="176" data-magicpath-path="ViewPage.tsx">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1" data-magicpath-id="177" data-magicpath-path="ViewPage.tsx">
                  Active Procurement Requests
                </h1>
                <p className="text-slate-300" data-magicpath-id="178" data-magicpath-path="ViewPage.tsx">
                  Monitor and manage your RFI/RFQ submissions
                </p>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>

          <SortableContainer dndKitId="15d4bd7b-452f-4d2e-88d1-34857a1f638e" containerType="regular" prevTag="div" className="p-6 md:p-8" data-magicpath-id="179" data-magicpath-path="ViewPage.tsx">
            {displayData.length === 0 ? <SortableContainer dndKitId="5adafa39-64e6-4ba3-8bd7-d23a9c2caf77" containerType="regular" prevTag="div" className="text-center py-16" data-magicpath-id="180" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="78a2d0f1-0287-4b6b-ad18-95baf5fa46d4" containerType="regular" prevTag="div" className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6" data-magicpath-id="181" data-magicpath-path="ViewPage.tsx">
                  <FileText className="w-10 h-10 text-slate-400" data-magicpath-id="182" data-magicpath-path="ViewPage.tsx" />
                </SortableContainer>
                <h3 className="text-xl font-semibold text-slate-600 mb-3" data-magicpath-id="183" data-magicpath-path="ViewPage.tsx">
                  No procurement requests yet
                </h3>
                <p className="text-slate-500 max-w-md mx-auto" data-magicpath-id="184" data-magicpath-path="ViewPage.tsx">
                  Create your first RFI or RFQ to start the procurement process and manage vendor responses.
                </p>
              </SortableContainer> : <SortableContainer dndKitId="b2c07c7b-f3bf-4000-9529-579d4b7095db" containerType="regular" prevTag="div" className="overflow-x-auto" data-magicpath-id="185" data-magicpath-path="ViewPage.tsx">
                <table className="w-full" data-magicpath-id="186" data-magicpath-path="ViewPage.tsx">
                  <thead data-magicpath-id="187" data-magicpath-path="ViewPage.tsx">
                    <tr className="border-b border-slate-200" data-magicpath-id="188" data-magicpath-path="ViewPage.tsx">
                      <th className="text-left py-4 px-4 font-semibold text-slate-700" data-magicpath-id="189" data-magicpath-path="ViewPage.tsx">Request ID</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700" data-magicpath-id="190" data-magicpath-path="ViewPage.tsx">Title</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700" data-magicpath-id="191" data-magicpath-path="ViewPage.tsx">Type</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700" data-magicpath-id="192" data-magicpath-path="ViewPage.tsx">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700" data-magicpath-id="193" data-magicpath-path="ViewPage.tsx">Vendors</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700" data-magicpath-id="194" data-magicpath-path="ViewPage.tsx">Timeline</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700" data-magicpath-id="195" data-magicpath-path="ViewPage.tsx">Created</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700" data-magicpath-id="196" data-magicpath-path="ViewPage.tsx">Actions</th>
                    </tr>
                  </thead>
                  <tbody data-magicpath-id="197" data-magicpath-path="ViewPage.tsx">
                    {displayData.map(item => <tr key={item.id} onClick={() => handleRowClick(item)} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 cursor-pointer transition-all duration-200 group" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="198" data-magicpath-path="ViewPage.tsx">
                        <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="199" data-magicpath-path="ViewPage.tsx">
                          <span className="font-semibold text-blue-600 group-hover:text-blue-700" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="200" data-magicpath-path="ViewPage.tsx">
                            {item.id}
                          </span>
                        </td>
                        <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="201" data-magicpath-path="ViewPage.tsx">
                          <span className="text-slate-800 font-medium group-hover:text-slate-900" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="title:unknown" data-magicpath-id="202" data-magicpath-path="ViewPage.tsx">
                            {item.title}
                          </span>
                        </td>
                        <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="203" data-magicpath-path="ViewPage.tsx">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${item.type === 'RFQ' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="type:unknown" data-magicpath-id="204" data-magicpath-path="ViewPage.tsx">
                            <Package className="w-3 h-3 mr-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="205" data-magicpath-path="ViewPage.tsx" />
                            {item.type}
                          </span>
                        </td>
                        <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="206" data-magicpath-path="ViewPage.tsx">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="207" data-magicpath-path="ViewPage.tsx">
                            {item.status === 'Completed' ? <CheckCircle className="w-3 h-3 mr-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="208" data-magicpath-path="ViewPage.tsx" /> : <AlertCircle className="w-3 h-3 mr-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="209" data-magicpath-path="ViewPage.tsx" />}
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="210" data-magicpath-path="ViewPage.tsx">
                          <div className="flex items-center space-x-2" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="211" data-magicpath-path="ViewPage.tsx">
                            <Users className="w-4 h-4 text-slate-400" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="212" data-magicpath-path="ViewPage.tsx" />
                            <span className="text-slate-700 font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendorCount:unknown" data-magicpath-id="213" data-magicpath-path="ViewPage.tsx">{item.vendorCount}</span>
                            <span className="text-xs text-slate-500" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="214" data-magicpath-path="ViewPage.tsx">vendors</span>
                          </div>
                        </td>
                        <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="215" data-magicpath-path="ViewPage.tsx">
                          <div className="flex items-center space-x-2" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="216" data-magicpath-path="ViewPage.tsx">
                            <Calendar className="w-4 h-4 text-slate-400" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="217" data-magicpath-path="ViewPage.tsx" />
                            <span className="text-slate-700 font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="endDate:unknown" data-magicpath-id="218" data-magicpath-path="ViewPage.tsx">{item.endDate}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="219" data-magicpath-path="ViewPage.tsx">
                          <span className="text-slate-600" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="createdDate:unknown" data-magicpath-id="220" data-magicpath-path="ViewPage.tsx">{item.createdDate}</span>
                        </td>
                        <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="221" data-magicpath-path="ViewPage.tsx">
                          <button onClick={e => {
                      e.stopPropagation();
                      onSelectRFIRFQ(item.id);
                    }} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center space-x-2" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="222" data-magicpath-path="ViewPage.tsx">
                            <BarChart3 className="w-4 h-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="223" data-magicpath-path="ViewPage.tsx" />
                            <span data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="224" data-magicpath-path="ViewPage.tsx">Score</span>
                          </button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </SortableContainer>}
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};