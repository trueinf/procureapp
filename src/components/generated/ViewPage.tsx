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
  mpid: "cb65ee22-b574-4bd4-9fcb-0ee98dc0b74c"
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
  mpid: "88b07fbd-1657-49b4-9aca-dabcb3e58f6c"
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
  mpid: "36d0edab-07b7-498e-994b-5a5f1dc9b64b"
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
  mpid: "b5b7ed5a-6027-4240-97e7-c7e1c8a7d996"
}, {
  id: '2',
  vendor: 'Microsoft Azure',
  question: 'Can you provide detailed pricing for different usage tiers?',
  response: 'Our pricing model includes pay-as-you-go options starting at $0.10/hour with enterprise discounts available.',
  timestamp: '2024-01-16 2:15 PM',
  mpid: "d6c1fc99-4190-4e6c-b347-5b2e155850f2"
}, {
  id: '3',
  vendor: 'AWS Enterprise',
  question: 'What compliance certifications do you maintain?',
  response: 'We maintain SOC 2 Type II, ISO 27001, FedRAMP High, and HIPAA compliance certifications.',
  timestamp: '2024-01-17 9:45 AM',
  mpid: "d0701ea1-29be-448c-9c46-4b531c0575c0"
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
  mpid: "b4d6855c-e5e3-4b4f-af75-672a60f18ca2"
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
  mpid: "4c9769a3-0a5e-4cc8-a63a-a55378954fa4"
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
  mpid: "a673aa55-9a40-4849-88e5-ed251fb73dba"
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
    return <SortableContainer dndKitId="02995c44-af81-4026-8f40-455c9d1b5109" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6" data-magicpath-id="0" data-magicpath-path="ViewPage.tsx">
        <SortableContainer dndKitId="790b83b5-203b-4e21-b331-9a360567b4da" containerType="regular" prevTag="div" className="max-w-7xl mx-auto" data-magicpath-id="1" data-magicpath-path="ViewPage.tsx">
          {/* Header Section */}
          <SortableContainer dndKitId="89b1e3f3-5471-41b0-9567-0cb66b958a46" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-lg border border-slate-200/50 mb-6" data-magicpath-id="2" data-magicpath-path="ViewPage.tsx">
            <SortableContainer dndKitId="45c9983e-dad6-4145-9a9e-0b570f99b08c" containerType="regular" prevTag="div" className="p-6 md:p-8" data-magicpath-id="3" data-magicpath-path="ViewPage.tsx">
              <SortableContainer dndKitId="417d5cd6-eaa6-4039-ab82-613b676fbf6e" containerType="regular" prevTag="div" className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6" data-magicpath-id="4" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="5584cd44-fdbb-46f3-a1c1-d16dba890fc6" containerType="regular" prevTag="button" onClick={handleBackClick} className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-200 group w-fit" data-magicpath-id="5" data-magicpath-path="ViewPage.tsx">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" data-magicpath-id="6" data-magicpath-path="ViewPage.tsx" />
                  <span className="font-medium" data-magicpath-id="7" data-magicpath-path="ViewPage.tsx">Back to Requests</span>
                </SortableContainer>
                
                <SortableContainer dndKitId="174dec06-e928-4ace-a085-71b0ffd8bbce" containerType="regular" prevTag="button" onClick={handleScoreClick} disabled={!selectedItem} className={`px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg transform ${selectedItem ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-magicpath-id="8" data-magicpath-path="ViewPage.tsx">
                  <span data-magicpath-id="9" data-magicpath-path="ViewPage.tsx">Score Responses</span>
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="c3b3fd2b-e68e-4f61-9070-67f4ceac2caf" containerType="regular" prevTag="div" className="flex items-start space-x-4 mb-6" data-magicpath-id="10" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="ee9e3455-9417-42c4-9956-6ce5ce81f26e" containerType="regular" prevTag="div" className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg" data-magicpath-id="11" data-magicpath-path="ViewPage.tsx">
                  <FileText className="w-8 h-8 text-white" data-magicpath-id="12" data-magicpath-path="ViewPage.tsx" />
                </SortableContainer>
                <SortableContainer dndKitId="925edaad-70c8-4a18-b33b-c96213e22384" containerType="regular" prevTag="div" className="flex-1" data-magicpath-id="13" data-magicpath-path="ViewPage.tsx">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2" data-magicpath-id="14" data-magicpath-path="ViewPage.tsx">
                    {selectedItem.id}
                  </h1>
                  <p className="text-lg text-slate-600 mb-4" data-magicpath-id="15" data-magicpath-path="ViewPage.tsx">
                    {selectedItem.title}
                  </p>
                  <SortableContainer dndKitId="e84d66cc-81ea-4462-ae00-91393a1d7dcf" containerType="regular" prevTag="div" className="flex flex-wrap items-center gap-3" data-magicpath-id="16" data-magicpath-path="ViewPage.tsx">
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
              <SortableContainer dndKitId="89ec245c-a77f-4e3d-b15e-15b18e2b1e72" containerType="regular" prevTag="div" className="grid grid-cols-2 md:grid-cols-4 gap-4" data-magicpath-id="21" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="5266fa72-79c2-434b-bdc7-bd0587047330" containerType="regular" prevTag="div" className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200/50" data-magicpath-id="22" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="86cce59a-7302-49a0-9e60-cd33bb16623c" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="23" data-magicpath-path="ViewPage.tsx">
                    <Users className="w-8 h-8 text-blue-600" data-magicpath-id="24" data-magicpath-path="ViewPage.tsx" />
                    <SortableContainer dndKitId="11e71b16-22ca-427f-ac4d-a9eea7445fb9" containerType="regular" prevTag="div" data-magicpath-id="25" data-magicpath-path="ViewPage.tsx">
                      <p className="text-sm text-blue-600 font-medium" data-magicpath-id="26" data-magicpath-path="ViewPage.tsx">Vendors</p>
                      <p className="text-xl font-bold text-blue-800" data-magicpath-id="27" data-magicpath-path="ViewPage.tsx">{selectedItem.vendorCount}</p>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="10c6d291-bbae-4805-b712-4accedada420" containerType="regular" prevTag="div" className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200/50" data-magicpath-id="28" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="67894b90-4333-41f5-8ebf-6fc3ecd3dbe4" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="29" data-magicpath-path="ViewPage.tsx">
                    <Calendar className="w-8 h-8 text-emerald-600" data-magicpath-id="30" data-magicpath-path="ViewPage.tsx" />
                    <SortableContainer dndKitId="f171fa26-2fa2-4a5a-96eb-30924767d792" containerType="regular" prevTag="div" data-magicpath-id="31" data-magicpath-path="ViewPage.tsx">
                      <p className="text-sm text-emerald-600 font-medium" data-magicpath-id="32" data-magicpath-path="ViewPage.tsx">Timeline</p>
                      <p className="text-lg font-bold text-emerald-800" data-magicpath-id="33" data-magicpath-path="ViewPage.tsx">31 days</p>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="74b18db7-0aa2-47fa-9089-76bc66a1dc9a" containerType="regular" prevTag="div" className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200/50" data-magicpath-id="34" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="c2a005fb-1463-41a8-8c1f-1922d72e987a" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="35" data-magicpath-path="ViewPage.tsx">
                    <MessageSquare className="w-8 h-8 text-amber-600" data-magicpath-id="36" data-magicpath-path="ViewPage.tsx" />
                    <SortableContainer dndKitId="9a2c05e4-db63-470a-9688-039c557183f9" containerType="regular" prevTag="div" data-magicpath-id="37" data-magicpath-path="ViewPage.tsx">
                      <p className="text-sm text-amber-600 font-medium" data-magicpath-id="38" data-magicpath-path="ViewPage.tsx">Responses</p>
                      <p className="text-xl font-bold text-amber-800" data-magicpath-id="39" data-magicpath-path="ViewPage.tsx">12</p>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="89b79492-8a14-4925-b63e-a7c6ec961841" containerType="regular" prevTag="div" className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200/50" data-magicpath-id="40" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="290c84b6-c4f8-40e6-9428-f3fc81ff266a" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="41" data-magicpath-path="ViewPage.tsx">
                    <DollarSign className="w-8 h-8 text-purple-600" data-magicpath-id="42" data-magicpath-path="ViewPage.tsx" />
                    <SortableContainer dndKitId="0264cbaf-9a7c-470b-960e-40eef14c136b" containerType="regular" prevTag="div" data-magicpath-id="43" data-magicpath-path="ViewPage.tsx">
                      <p className="text-sm text-purple-600 font-medium" data-magicpath-id="44" data-magicpath-path="ViewPage.tsx">Est. Value</p>
                      <p className="text-xl font-bold text-purple-800" data-magicpath-id="45" data-magicpath-path="ViewPage.tsx">$125K</p>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>

          {/* Main Content Tabs */}
          <SortableContainer dndKitId="004ffb5e-5dde-47fe-a09f-933234303d21" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-lg border border-slate-200/50" data-magicpath-id="46" data-magicpath-path="ViewPage.tsx">
            <SortableContainer dndKitId="5cc6a90d-1bca-43dc-af7e-bfd790105a8d" containerType="regular" prevTag="div" className="border-b border-slate-200" data-magicpath-id="47" data-magicpath-path="ViewPage.tsx">
              <SortableContainer dndKitId="c387e61c-83bc-42a3-ab94-d8b9970452ee" containerType="collection" prevTag="div" className="flex overflow-x-auto" data-magicpath-id="48" data-magicpath-path="ViewPage.tsx">
                {[{
                id: 'overview',
                label: 'Overview',
                icon: Eye,
                mpid: "50d72f1f-d0c7-4155-bc28-c00c9309af7b"
              }, {
                id: 'vendors',
                label: 'Vendors',
                icon: Building2,
                mpid: "b0767bf5-ad6e-43f2-aa86-068ce1dadf9a"
              }, {
                id: 'questions',
                label: 'Q&A',
                icon: MessageSquare,
                mpid: "b2135df2-9846-431a-a324-225a84c7912b"
              }, {
                id: 'quotations',
                label: 'Quotations',
                icon: FileText,
                mpid: "e7d40111-767f-49c5-84c1-cd2f89e7108f"
              }].map(tab => {
                const Icon = tab.icon;
                return <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-all duration-200 border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'text-blue-600 border-blue-600 bg-blue-50/50' : 'text-slate-600 border-transparent hover:text-blue-600 hover:bg-slate-50'}`} data-magicpath-uuid={(tab as any)["mpid"] ?? "unsafe"} data-magicpath-id="49" data-magicpath-path="ViewPage.tsx">
                      <Icon className="w-4 h-4" data-magicpath-uuid={(tab as any)["mpid"] ?? "unsafe"} data-magicpath-id="50" data-magicpath-path="ViewPage.tsx" />
                      <span data-magicpath-uuid={(tab as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="51" data-magicpath-path="ViewPage.tsx">{tab.label}</span>
                    </button>;
              })}
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="0edc006d-4f3e-4b2c-a5b4-e511f3cf13d7" containerType="regular" prevTag="div" className="p-6 md:p-8" data-magicpath-id="52" data-magicpath-path="ViewPage.tsx">
              {/* Overview Tab */}
              {activeTab === 'overview' && <SortableContainer dndKitId="1dd1f9e5-9960-42d9-9841-affdc1b8c1dc" containerType="regular" prevTag="div" className="space-y-8" data-magicpath-id="53" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="17ea7fc4-56b4-4715-906e-63ee7e39a65c" containerType="regular" prevTag="div" data-magicpath-id="54" data-magicpath-path="ViewPage.tsx">
                    <h2 className="text-xl font-semibold text-slate-800 mb-6" data-magicpath-id="55" data-magicpath-path="ViewPage.tsx">Request Details</h2>
                    <SortableContainer dndKitId="843b1ec3-9283-449a-add9-2ae66599a619" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-magicpath-id="56" data-magicpath-path="ViewPage.tsx">
                      <SortableContainer dndKitId="7dc14181-b542-448c-af46-e95265ee5e61" containerType="regular" prevTag="div" className="bg-slate-50 rounded-xl p-4 border border-slate-200/50" data-magicpath-id="57" data-magicpath-path="ViewPage.tsx">
                        <SortableContainer dndKitId="fc060dd3-e97a-4b27-9bc9-b358f0b36a6b" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="58" data-magicpath-path="ViewPage.tsx">
                          <Calendar className="w-6 h-6 text-slate-500" data-magicpath-id="59" data-magicpath-path="ViewPage.tsx" />
                          <SortableContainer dndKitId="221b2fa4-7a9f-4f76-bcdb-eb9d43cb3587" containerType="regular" prevTag="div" data-magicpath-id="60" data-magicpath-path="ViewPage.tsx">
                            <p className="text-sm text-slate-500 font-medium" data-magicpath-id="61" data-magicpath-path="ViewPage.tsx">Start Date</p>
                            <p className="text-lg font-semibold text-slate-800" data-magicpath-id="62" data-magicpath-path="ViewPage.tsx">{selectedItem.startDate}</p>
                          </SortableContainer>
                        </SortableContainer>
                      </SortableContainer>

                      <SortableContainer dndKitId="0d1559f5-465f-47e7-83db-4fa042d59e9f" containerType="regular" prevTag="div" className="bg-slate-50 rounded-xl p-4 border border-slate-200/50" data-magicpath-id="63" data-magicpath-path="ViewPage.tsx">
                        <SortableContainer dndKitId="12c61a49-7320-4c45-8521-f2edddbebbd8" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="64" data-magicpath-path="ViewPage.tsx">
                          <Clock className="w-6 h-6 text-slate-500" data-magicpath-id="65" data-magicpath-path="ViewPage.tsx" />
                          <SortableContainer dndKitId="7d4933f2-378c-467d-9dc7-5ef3323145a5" containerType="regular" prevTag="div" data-magicpath-id="66" data-magicpath-path="ViewPage.tsx">
                            <p className="text-sm text-slate-500 font-medium" data-magicpath-id="67" data-magicpath-path="ViewPage.tsx">End Date</p>
                            <p className="text-lg font-semibold text-slate-800" data-magicpath-id="68" data-magicpath-path="ViewPage.tsx">{selectedItem.endDate}</p>
                          </SortableContainer>
                        </SortableContainer>
                      </SortableContainer>

                      <SortableContainer dndKitId="7e96db44-740f-439b-a532-e47c8c737d0d" containerType="regular" prevTag="div" className="bg-slate-50 rounded-xl p-4 border border-slate-200/50" data-magicpath-id="69" data-magicpath-path="ViewPage.tsx">
                        <SortableContainer dndKitId="9c07c0bd-dc7c-4ac9-91b6-ac01968e527b" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="70" data-magicpath-path="ViewPage.tsx">
                          <FileText className="w-6 h-6 text-slate-500" data-magicpath-id="71" data-magicpath-path="ViewPage.tsx" />
                          <SortableContainer dndKitId="a27d02da-10cf-4ea4-a93c-1df6a19f2552" containerType="regular" prevTag="div" data-magicpath-id="72" data-magicpath-path="ViewPage.tsx">
                            <p className="text-sm text-slate-500 font-medium" data-magicpath-id="73" data-magicpath-path="ViewPage.tsx">Created</p>
                            <p className="text-lg font-semibold text-slate-800" data-magicpath-id="74" data-magicpath-path="ViewPage.tsx">{selectedItem.createdDate}</p>
                          </SortableContainer>
                        </SortableContainer>
                      </SortableContainer>
                    </SortableContainer>
                  </SortableContainer>

                  <SortableContainer dndKitId="784d2440-a9f7-4228-a34e-6c4f1e401b7e" containerType="regular" prevTag="div" data-magicpath-id="75" data-magicpath-path="ViewPage.tsx">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4" data-magicpath-id="76" data-magicpath-path="ViewPage.tsx">Project Description</h3>
                    <SortableContainer dndKitId="6143d323-afa0-4f3c-b031-b993315f693c" containerType="regular" prevTag="div" className="bg-slate-50 rounded-xl p-6 border border-slate-200/50" data-magicpath-id="77" data-magicpath-path="ViewPage.tsx">
                      <p className="text-slate-700 leading-relaxed" data-magicpath-id="78" data-magicpath-path="ViewPage.tsx">{selectedItem.coverLetter}</p>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>}

              {/* Vendors Tab */}
              {activeTab === 'vendors' && <SortableContainer dndKitId="d32531d2-9b5b-490c-b00f-3f37a6ba43ea" containerType="regular" prevTag="div" className="space-y-6" data-magicpath-id="79" data-magicpath-path="ViewPage.tsx">
                  <h2 className="text-xl font-semibold text-slate-800" data-magicpath-id="80" data-magicpath-path="ViewPage.tsx">Participating Vendors</h2>
                  <SortableContainer dndKitId="26be7c4c-2833-46df-bdb6-63489a73eff1" containerType="collection" prevTag="div" className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-magicpath-id="81" data-magicpath-path="ViewPage.tsx">
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
              {activeTab === 'questions' && <SortableContainer dndKitId="fc2a917b-f81c-45e0-9bef-f968be5147e2" containerType="regular" prevTag="div" className="space-y-6" data-magicpath-id="108" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="7dcfae00-eab0-46b8-b370-1bf315c659d7" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="109" data-magicpath-path="ViewPage.tsx">
                    <h2 className="text-xl font-semibold text-slate-800" data-magicpath-id="110" data-magicpath-path="ViewPage.tsx">Vendor Questions & Responses</h2>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full" data-magicpath-id="111" data-magicpath-path="ViewPage.tsx">
                      {sampleQuestions.length} questions
                    </span>
                  </SortableContainer>
                  
                  <SortableContainer dndKitId="c2b1dcce-5586-4179-802c-6e4d7825eef2" containerType="collection" prevTag="div" className="space-y-4" data-magicpath-id="112" data-magicpath-path="ViewPage.tsx">
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
              {activeTab === 'quotations' && <SortableContainer dndKitId="8b9414c7-26bb-4e00-a823-df9f170e8d37" containerType="regular" prevTag="div" className="space-y-6" data-magicpath-id="133" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="9f175b90-0262-427d-b2e5-3cf4fc0c8a39" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="134" data-magicpath-path="ViewPage.tsx">
                    <h2 className="text-xl font-semibold text-slate-800" data-magicpath-id="135" data-magicpath-path="ViewPage.tsx">Submitted Quotations</h2>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full" data-magicpath-id="136" data-magicpath-path="ViewPage.tsx">
                      {sampleQuotations.length} submissions
                    </span>
                  </SortableContainer>
                  
                  <SortableContainer dndKitId="5637d01f-25c2-4488-b456-953e6766c715" containerType="collection" prevTag="div" className="space-y-4" data-magicpath-id="137" data-magicpath-path="ViewPage.tsx">
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
  return <SortableContainer dndKitId="bc2f28a6-c6de-47c4-ac48-8629bf99d4dd" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6" data-magicpath-id="169" data-magicpath-path="ViewPage.tsx">
      <SortableContainer dndKitId="899462a0-f182-4698-9733-c18385496fc3" containerType="regular" prevTag="div" className="max-w-7xl mx-auto" data-magicpath-id="170" data-magicpath-path="ViewPage.tsx">
        <SortableContainer dndKitId="5b6e58af-4655-486d-9cbf-b745ee762551" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden" data-magicpath-id="171" data-magicpath-path="ViewPage.tsx">
          <SortableContainer dndKitId="98e60a06-eb68-4a2d-aa52-30b03cebf287" containerType="regular" prevTag="div" className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 md:p-8" data-magicpath-id="172" data-magicpath-path="ViewPage.tsx">
            <SortableContainer dndKitId="157c1d32-ab92-432e-841c-5d4d1927a3ab" containerType="regular" prevTag="div" className="flex items-center space-x-4" data-magicpath-id="173" data-magicpath-path="ViewPage.tsx">
              <SortableContainer dndKitId="2da2957b-1ae2-4af6-a296-fc6c8f26caa0" containerType="regular" prevTag="div" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm" data-magicpath-id="174" data-magicpath-path="ViewPage.tsx">
                <Eye className="w-6 h-6 text-white" data-magicpath-id="175" data-magicpath-path="ViewPage.tsx" />
              </SortableContainer>
              <SortableContainer dndKitId="e9b5ffeb-5b1f-4d53-a556-e338d3e41643" containerType="regular" prevTag="div" data-magicpath-id="176" data-magicpath-path="ViewPage.tsx">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1" data-magicpath-id="177" data-magicpath-path="ViewPage.tsx">
                  Active Procurement Requests
                </h1>
                <p className="text-slate-300" data-magicpath-id="178" data-magicpath-path="ViewPage.tsx">
                  Monitor and manage your RFI/RFQ submissions
                </p>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>

          <SortableContainer dndKitId="64e10bca-ddf1-4b1e-9660-ff899a806129" containerType="regular" prevTag="div" className="p-6 md:p-8" data-magicpath-id="179" data-magicpath-path="ViewPage.tsx">
            {displayData.length === 0 ? <SortableContainer dndKitId="9af7689f-103e-46e4-9d55-cef3e0a023d8" containerType="regular" prevTag="div" className="text-center py-16" data-magicpath-id="180" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="2564df89-ba51-4fd4-b7f7-195492c05369" containerType="regular" prevTag="div" className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6" data-magicpath-id="181" data-magicpath-path="ViewPage.tsx">
                  <FileText className="w-10 h-10 text-slate-400" data-magicpath-id="182" data-magicpath-path="ViewPage.tsx" />
                </SortableContainer>
                <h3 className="text-xl font-semibold text-slate-600 mb-3" data-magicpath-id="183" data-magicpath-path="ViewPage.tsx">
                  No procurement requests yet
                </h3>
                <p className="text-slate-500 max-w-md mx-auto" data-magicpath-id="184" data-magicpath-path="ViewPage.tsx">
                  Create your first RFI or RFQ to start the procurement process and manage vendor responses.
                </p>
              </SortableContainer> : <SortableContainer dndKitId="1460b409-ee36-4f87-9249-4c0cab1e0983" containerType="regular" prevTag="div" className="overflow-x-auto" data-magicpath-id="185" data-magicpath-path="ViewPage.tsx">
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