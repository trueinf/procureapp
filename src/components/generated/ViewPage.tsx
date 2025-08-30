import React, { useMemo, useState } from 'react';
import { RFIRFQData } from './ProcureApp';
import { Eye, Calendar, Users, FileText, MessageSquare, ArrowLeft, Send, Building2, DollarSign, Clock, MapPin, Phone, Mail, Download, Star, CheckCircle, AlertCircle, Package, Truck, Shield, BarChart3 } from 'lucide-react';
interface ViewPageProps {
  rfirfqData: RFIRFQData[];
  onSelectRFIRFQ: (id: string) => void;
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
  vendors: ['AWS Enterprise', 'Microsoft Azure', 'Google Cloud Platform', 'IBM Cloud', 'Oracle Cloud']
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
  vendors: ['CyberGuard Pro', 'SecureNet Solutions', 'DefenseFirst Technologies']
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
  vendors: ['OfficeMax Business', 'Herman Miller', 'Steelcase', 'Humanscale']
}, {
  id: 'RFP-2024-004',
  type: 'RFI',
  status: 'Draft',
  title: 'Enterprise Data Analytics Platform',
  startDate: '2024-02-01',
  endDate: '2024-03-01',
  vendorCount: 4,
  createdDate: '2024-01-25',
  documents: [],
  coverLetter: 'Seeking information and capabilities for a scalable analytics platform with BI and real-time reporting.',
  vendors: ['Snowflake Partners', 'Databricks Pro', 'Google Cloud Platform', 'Microsoft Azure']
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
  timestamp: '2024-01-16 10:30 AM'
}, {
  id: '2',
  vendor: 'Microsoft Azure',
  question: 'Can you provide detailed pricing for different usage tiers?',
  response: 'Our pricing model includes pay-as-you-go options starting at $0.10/hour with enterprise discounts available.',
  timestamp: '2024-01-16 2:15 PM'
}, {
  id: '3',
  vendor: 'AWS Enterprise',
  question: 'What compliance certifications do you maintain?',
  response: 'We maintain SOC 2 Type II, ISO 27001, FedRAMP High, and HIPAA compliance certifications.',
  timestamp: '2024-01-17 9:45 AM'
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
  deliveryTime: '4-6 weeks'
}, {
  id: '2',
  vendor: 'Microsoft Azure',
  fileName: 'Azure_Cloud_Solution_Quote.pdf',
  fileSize: '2.8 MB',
  submittedDate: '2024-01-19',
  status: 'Submitted',
  totalValue: '$118,500',
  validUntil: '2024-03-20',
  deliveryTime: '3-5 weeks'
}, {
  id: '3',
  vendor: 'Google Cloud Platform',
  fileName: 'GCP_Enterprise_Proposal.pdf',
  fileSize: '2.1 MB',
  submittedDate: '2024-01-20',
  status: 'Under Review',
  totalValue: '$132,000',
  validUntil: '2024-03-10',
  deliveryTime: '5-7 weeks'
}] as any[];
export const ViewPage = ({
  rfirfqData,
  onSelectRFIRFQ
}: ViewPageProps) => {
  const [selectedItem, setSelectedItem] = useState<RFIRFQData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'questions' | 'quotations' | 'criteria'>('overview');
  const [questionResponse, setQuestionResponse] = useState('');

  // Always show prefilled samples plus any newly submitted requests
  const displayData = [...sampleRFIRFQData, ...rfirfqData];
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

  // Derived, simulated data for the selected item
  const dynamicQuestions = useMemo(() => {
    if (!selectedItem) return sampleQuestions;
    const vendors = selectedItem.vendors && selectedItem.vendors.length > 0 ? selectedItem.vendors : ['Vendor A', 'Vendor B'];
    const title = selectedItem.title || 'the request';
    const category = (selectedItem.serviceCategory || '').toLowerCase();
    const topics =
      category.includes('it') || category.includes('tech')
        ? ['security & compliance posture', 'SLAs and uptime guarantees', 'integration and API strategy', 'data migration plan', 'support and escalation process']
        : category.includes('consult')
        ? ['scope of work breakdown', 'deliverable acceptance criteria', 'resource mix and seniority', 'timeline & milestones', 'knowledge transfer plan']
        : category.includes('construction')
        ? ['site safety measures', 'permits and compliance', 'materials specification', 'project schedule buffer', 'warranty terms']
        : ['scope details', 'key dates and milestones', 'commercial/payment terms', 'acceptance criteria', 'change control'];
    const refs = ['Expected Outputs', 'Start Date & Milestones', 'Payment Terms', 'Compliance', 'Service Category'];
    const now = new Date();
    return Array.from({ length: 10 }).map((_, i) => {
      const vendor = vendors[i % vendors.length];
      const ts = new Date(now.getTime() - (i * 36e5)).toISOString().replace('T', ' ').slice(0, 16);
      const topic = topics[i % topics.length];
      const ref = refs[i % refs.length];
      return {
        id: `${selectedItem.id}-q${i + 1}`,
        vendor,
        question: `For "${title}", can you clarify ${topic}?`,
        response: `Thanks ${vendor}. For "${title}", please refer to the ${ref} section. We can provide deeper detail during clarification calls.`,
        timestamp: ts
      };
    });
  }, [selectedItem]);

  const dynamicQuotations = useMemo(() => {
    if (!selectedItem) return sampleQuotations;
    const vendors = selectedItem.vendors && selectedItem.vendors.length > 0 ? selectedItem.vendors : ['Vendor A', 'Vendor B'];
    const sanitize = (s: string) => s.replace(/\s+/g, '_');
    const today = new Date();
    return vendors.map((vendor, i) => {
      const fileName = `${sanitize(vendor)}_${sanitize(selectedItem.title || 'Proposal')}.pdf`;
      const fileSize = `${(2 + (i % 4) + Math.random()).toFixed(1)} MB`;
      const submittedDate = today.toISOString().split('T')[0];
      const validUntil = new Date(today.getTime() + 45 * 24 * 3600 * 1000).toISOString().split('T')[0];
      const base = 90000 + (i * 12000) + Math.floor(Math.random() * 10000);
      const totalValue = `$${base.toLocaleString()}`;
      const deliveryTime = `${3 + (i % 4)}-${5 + (i % 5)} weeks`;
      return {
        id: `${selectedItem.id}-quote-${i + 1}`,
        vendor,
        fileName,
        fileSize,
        submittedDate,
        status: 'Submitted',
        totalValue,
        validUntil,
        deliveryTime
      } as any;
    });
  }, [selectedItem]);
  if (selectedItem) {
    const currentVendors = selectedItem.vendors || Object.keys(vendorDetails).slice(0, selectedItem.vendorCount);
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 mb-6">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <button onClick={handleBackClick} className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-200 group w-fit">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="font-medium">Back to Requests</span>
                </button>
                
                <button onClick={handleScoreClick} disabled={!selectedItem} className={`px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg transform ${selectedItem ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                  <span>Score Responses</span>
                </button>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                    {selectedItem.id}
                  </h1>
                  <p className="text-lg text-slate-600 mb-4">
                    {selectedItem.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(selectedItem.status)}`}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {selectedItem.status}
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      <Package className="w-4 h-4 mr-2" />
                      {selectedItem.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200/50">
                  <div className="flex items-center space-x-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Vendors</p>
                      <p className="text-xl font-bold text-blue-800">{selectedItem.vendorCount}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200/50">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-8 h-8 text-emerald-600" />
                    <div>
                      <p className="text-sm text-emerald-600 font-medium">Timeline</p>
                      <p className="text-lg font-bold text-emerald-800">31 days</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200/50">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-8 h-8 text-amber-600" />
                    <div>
                      <p className="text-sm text-amber-600 font-medium">Responses</p>
                      <p className="text-xl font-bold text-amber-800">12</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200/50">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Est. Value</p>
                      <p className="text-xl font-bold text-purple-800">$125K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50">
            <div className="border-b border-slate-200">
              <div className="flex overflow-x-auto">
                {[{
                id: 'overview',
                label: 'Overview',
                icon: Eye
              }, {
                id: 'vendors',
                label: 'Vendors',
                icon: Building2
              }, {
                id: 'questions',
                label: 'Q&A',
                icon: MessageSquare
              }, {
                id: 'quotations',
                label: 'Quotations',
                icon: FileText
              }, {
                id: 'criteria',
                label: 'Scoring Criteria',
                icon: Star
              }].map(tab => {
                const Icon = tab.icon;
                return <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-all duration-200 border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'text-blue-600 border-blue-600 bg-blue-50/50' : 'text-slate-600 border-transparent hover:text-blue-600 hover:bg-slate-50'}`}>
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>;
              })}
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-6">Request Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-6 h-6 text-slate-500" />
                          <div>
                            <p className="text-sm text-slate-500 font-medium">Start Date</p>
                            <p className="text-lg font-semibold text-slate-800">{selectedItem.startDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-6 h-6 text-slate-500" />
                          <div>
                            <p className="text-sm text-slate-500 font-medium">End Date</p>
                            <p className="text-lg font-semibold text-slate-800">{selectedItem.endDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-6 h-6 text-slate-500" />
                          <div>
                            <p className="text-sm text-slate-500 font-medium">Created</p>
                            <p className="text-lg font-semibold text-slate-800">{selectedItem.createdDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Project Description</h3>
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/50">
                      <p className="text-slate-700 leading-relaxed">{selectedItem.coverLetter}</p>
                    </div>
                  </div>

                  {/* Additional Details from Initiate */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-base font-semibold text-slate-800">Engagement</h4>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">Business Unit</p>
                        <p className="font-medium text-slate-800">{selectedItem.businessUnit || '-'}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">Owner</p>
                        <p className="font-medium text-slate-800">{selectedItem.owner || '-'}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">Service Category</p>
                        <p className="font-medium text-slate-800">{selectedItem.serviceCategory || '-'}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">Team Size</p>
                        <p className="font-medium text-slate-800">{selectedItem.teamSize || '-'}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">Work Location</p>
                        <p className="font-medium text-slate-800">{selectedItem.workLocation || '-'}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-base font-semibold text-slate-800">Capabilities</h4>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500 mb-2">Required Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {(selectedItem.requiredSkills || []).length > 0 ? (
                            (selectedItem.requiredSkills || []).map((s, i) => (
                              <span key={i} className="px-2 py-1 rounded-md text-xs bg-green-100 text-green-700 border border-green-200">{s}</span>
                            ))
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500 mb-2">Tool Preferences</p>
                        <div className="flex flex-wrap gap-2">
                          {(selectedItem.toolPreferences || []).length > 0 ? (
                            (selectedItem.toolPreferences || []).map((t, i) => (
                              <span key={i} className="px-2 py-1 rounded-md text-xs bg-sky-100 text-sky-700 border border-sky-200">{t}</span>
                            ))
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-base font-semibold text-slate-800">Commercial</h4>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">Pricing Model</p>
                        <p className="font-medium text-slate-800">{selectedItem.pricingModel || '-'}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">Budget Estimate</p>
                        <p className="font-medium text-slate-800">{selectedItem.budgetEstimate || '-'}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">Payment Terms</p>
                        <p className="font-medium text-slate-800">{selectedItem.paymentTerms || '-'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Deliverables & Milestones */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">Expected Outputs</h3>
                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/50">
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedItem.expectedOutputs || '-'}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">Start Date & Milestones</h3>
                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/50">
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedItem.startDateMilestones || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-base font-semibold text-slate-800">Timeline</h4>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">Response Deadline</p>
                        <p className="font-medium text-slate-800">{selectedItem.responseDeadline || '-'}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">Bid Validity (days)</p>
                        <p className="font-medium text-slate-800">{selectedItem.bidValidity || '-'}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-base font-semibold text-slate-800">Compliance</h4>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500">NDA Required</p>
                        <p className="font-medium text-slate-800">{selectedItem.ndaRequired ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500 mb-2">Supplier Eligibility</p>
                        <div className="flex flex-wrap gap-2">
                          {(selectedItem.supplierEligibility || []).length > 0 ? (
                            (selectedItem.supplierEligibility || []).map((se, i) => (
                              <span key={i} className="px-2 py-1 rounded-md text-xs bg-amber-100 text-amber-700 border border-amber-200">{se}</span>
                            ))
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-base font-semibold text-slate-800">Workflow</h4>
                      <div className="bg-slate-50 rounded-xl p-4 border">
                        <p className="text-sm text-slate-500 mb-2">Approvers</p>
                        <div className="flex flex-wrap gap-2">
                          {(selectedItem.approvers || []).length > 0 ? (
                            (selectedItem.approvers || []).map((a, i) => (
                              <span key={i} className="px-2 py-1 rounded-md text-xs bg-purple-100 text-purple-700 border border-purple-200">{a}</span>
                            ))
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}

              {/* Vendors Tab */}
              {activeTab === 'vendors' && <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-slate-800">Participating Vendors</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {currentVendors.map(vendorName => {
                  const vendor = vendorDetails[vendorName as keyof typeof vendorDetails];
                  if (!vendor) {
                    return <div key={vendorName} className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">{vendorName}</h3>
                                <p className="text-slate-600">Invited vendor</p>
                              </div>
                              <div className="flex items-center space-x-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                <Star className="w-4 h-4 text-amber-500" />
                                <span className="text-sm font-semibold text-slate-700">N/A</span>
                              </div>
                            </div>
                            <div className="text-sm text-slate-600">Details will appear as vendors respond.</div>
                          </div>;
                  }
                  return <div key={vendorName} className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-800 mb-1">{vendor.company}</h3>
                              <p className="text-slate-600">{vendor.contact}</p>
                            </div>
                            <div className="flex items-center space-x-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                              <Star className="w-4 h-4 text-amber-500 fill-current" />
                              <span className="text-sm font-semibold text-amber-700">{vendor.rating}</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <Mail className="w-4 h-4" />
                              <span>{vendor.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <Phone className="w-4 h-4" />
                              <span>{vendor.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <MapPin className="w-4 h-4" />
                              <span>{vendor.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <Clock className="w-4 h-4" />
                              <span>{vendor.experience} experience • {vendor.teamSize}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <p className="text-sm font-medium text-slate-700 mb-2">Certifications</p>
                            <div className="flex flex-wrap gap-2">
                              {vendor.certifications.map(cert => <span key={cert} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                  <Shield className="w-3 h-3 mr-1" />
                                  {cert}
                                </span>)}
                            </div>
                          </div>
                        </div>;
                })}
                  </div>
                </div>}

              {/* Questions Tab */}
              {activeTab === 'questions' && <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-800">Vendor Questions & Responses</h2>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {dynamicQuestions.length} questions
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {dynamicQuestions.map(question => <div key={question.id} className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl p-6 border border-slate-200/50 hover:shadow-md transition-all duration-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">{question.vendor}</h3>
                              <p className="text-sm text-slate-500">Vendor Question</p>
                            </div>
                          </div>
                          <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                            {question.timestamp}
                          </span>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-slate-700 font-medium mb-2">Question:</p>
                          <p className="text-slate-600 bg-white rounded-lg p-4 border border-slate-200/50">
                            {question.question}
                          </p>
                        </div>

                        {question.response && <div className="mb-4">
                            <p className="text-slate-700 font-medium mb-2">Response:</p>
                            <p className="text-slate-600 bg-green-50 rounded-lg p-4 border border-green-200/50">
                              {question.response}
                            </p>
                          </div>}

                        {!question.response && <div className="space-y-3">
                            <textarea placeholder="Type your response..." className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none" rows={3} value={questionResponse} onChange={e => setQuestionResponse(e.target.value)} />
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg">
                              <Send className="w-4 h-4" />
                              <span>Send Response</span>
                            </button>
                          </div>}
                      </div>)}
                  </div>
                </div>}

              {/* Quotations Tab */}
              {activeTab === 'quotations' && <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-800">Submitted Quotations</h2>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {dynamicQuotations.length} submissions
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {dynamicQuotations.map(quotation => <div key={quotation.id} className="bg-gradient-to-r from-white to-slate-50/50 rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                              <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-slate-800">{quotation.vendor}</h3>
                              <p className="text-sm text-slate-600">{quotation.fileName} • {quotation.fileSize}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(quotation.status)}`}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              {quotation.status}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-white rounded-lg p-3 border border-slate-200/50">
                            <p className="text-xs text-slate-500 font-medium mb-1">Total Value</p>
                            <p className="text-lg font-bold text-green-600">{quotation.totalValue}</p>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border border-slate-200/50">
                            <p className="text-xs text-slate-500 font-medium mb-1">Delivery</p>
                            <p className="text-sm font-semibold text-slate-700">{quotation.deliveryTime}</p>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border border-slate-200/50">
                            <p className="text-xs text-slate-500 font-medium mb-1">Valid Until</p>
                            <p className="text-sm font-semibold text-slate-700">{quotation.validUntil}</p>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border border-slate-200/50">
                            <p className="text-xs text-slate-500 font-medium mb-1">Submitted</p>
                            <p className="text-sm font-semibold text-slate-700">{quotation.submittedDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-md hover:shadow-lg">
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                          <button className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium border border-slate-200">
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </button>
                        </div>
                      </div>)}
                  </div>
                </div>}

              {/* Scoring Criteria Tab */}
              {activeTab === 'criteria' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-slate-800">Scoring Criteria</h2>
                  {Array.isArray(selectedItem.scoringCriteria) && selectedItem.scoringCriteria.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedItem.scoringCriteria.map((c, idx) => (
                        <div key={idx} className="p-4 rounded-xl border bg-slate-50">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-slate-800">{c.criterion}</div>
                            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                              {c.weight}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-600">No scoring criteria provided for this request.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>;
  }

  // Main list view with enhanced sample data
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 md:p-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  Active Procurement Requests
                </h1>
                <p className="text-slate-300">
                  Monitor and manage your RFI/RFQ submissions
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {displayData.length === 0 ? <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-3">
                  No procurement requests yet
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  Create your first RFI or RFQ to start the procurement process and manage vendor responses.
                </p>
              </div> : <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 font-semibold text-slate-700">Request ID</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700">Title</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700">Type</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700">Vendors</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700">Timeline</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700">Created</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayData.map(item => <tr key={item.id} onClick={() => handleRowClick(item)} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 cursor-pointer transition-all duration-200 group">
                        <td className="py-4 px-4">
                          <span className="font-semibold text-blue-600 group-hover:text-blue-700">
                            {item.id}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-slate-800 font-medium group-hover:text-slate-900">
                            {item.title}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${item.type === 'RFQ' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                            <Package className="w-3 h-3 mr-1" />
                            {item.type}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                            {item.status === 'Completed' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700 font-medium">{item.vendorCount}</span>
                            <span className="text-xs text-slate-500">vendors</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700 font-medium">{item.endDate}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-slate-600">{item.createdDate}</span>
                        </td>
                        <td className="py-4 px-4">
                          <button onClick={e => {
                      e.stopPropagation();
                      onSelectRFIRFQ(item.id);
                    }} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center space-x-2">
                            <BarChart3 className="w-4 h-4" />
                            <span>Score</span>
                          </button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
