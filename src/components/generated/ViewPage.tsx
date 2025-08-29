import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { RFIRFQData } from './ProcureApp';
import { Eye, Calendar, Users, FileText, MessageSquare, ArrowLeft, Send } from 'lucide-react';
interface ViewPageProps {
  rfirfqData: RFIRFQData[];
  onSelectRFIRFQ: (id: string) => void;
  mpid?: string;
}

// @component: ViewPage
export const ViewPage = ({
  rfirfqData,
  onSelectRFIRFQ
}: ViewPageProps) => {
  const [selectedItem, setSelectedItem] = useState<RFIRFQData | null>(null);
  const [activeTab, setActiveTab] = useState<'questions' | 'quotations'>('questions');
  const [questionResponse, setQuestionResponse] = useState('');
  const mockQuestions = [{
    id: '1',
    vendor: 'TechCorp Solutions',
    question: 'What is the expected timeline for implementation?',
    timestamp: '2024-01-15 10:30 AM',
    mpid: "d97784ba-9d17-475f-8538-8392da4ca011"
  }, {
    id: '2',
    vendor: 'Digital Innovations',
    question: 'Are there any specific compliance requirements we should be aware of?',
    timestamp: '2024-01-15 2:15 PM',
    mpid: "dd75dbd2-52d3-4bf8-96b0-35bc7be89107"
  }, {
    id: '3',
    vendor: 'CloudTech Partners',
    question: 'What is the budget range for this project?',
    timestamp: '2024-01-16 9:45 AM',
    mpid: "059b7eaf-9b02-4804-8182-fab460eee721"
  }] as any[];
  const mockQuotations = [{
    id: '1',
    vendor: 'TechCorp Solutions',
    fileName: 'TechCorp_Proposal_2024.pdf',
    fileSize: '2.4 MB',
    submittedDate: '2024-01-16',
    status: 'Submitted',
    mpid: "7b069351-cf33-407e-8ab9-cfe4f883179d"
  }, {
    id: '2',
    vendor: 'Digital Innovations',
    fileName: 'Digital_Quote_Final.pdf',
    fileSize: '1.8 MB',
    submittedDate: '2024-01-17',
    status: 'Submitted',
    mpid: "a33bcad2-3f40-4ff3-ae3f-548a152c2b05"
  }] as any[];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Sent':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Awarded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    // @return
    return <SortableContainer dndKitId="163b608d-2aba-48ec-ba30-e9fda3d2c19f" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="0" data-magicpath-path="ViewPage.tsx">
        <SortableContainer dndKitId="2c9e8f6e-ab9b-47a2-8d02-eff05f870b05" containerType="regular" prevTag="div" className="max-w-6xl mx-auto" data-magicpath-id="1" data-magicpath-path="ViewPage.tsx">
          <SortableContainer dndKitId="41ab59c8-024d-4409-a317-d7184d9690f5" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl" data-magicpath-id="2" data-magicpath-path="ViewPage.tsx">
            <SortableContainer dndKitId="d4261cb1-d5ff-4111-8f61-f897e38b8a69" containerType="regular" prevTag="div" className="p-8 border-b border-slate-200" data-magicpath-id="3" data-magicpath-path="ViewPage.tsx">
              <SortableContainer dndKitId="f386e66a-b4e5-43e1-bbcd-eb9aebfadf22" containerType="regular" prevTag="div" className="flex items-center justify-between mb-6" data-magicpath-id="4" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="20671a6d-a9c3-4b4c-b755-df2afe49ebe1" containerType="regular" prevTag="button" onClick={handleBackClick} className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors" data-magicpath-id="5" data-magicpath-path="ViewPage.tsx">
                  <ArrowLeft className="w-5 h-5" data-magicpath-id="6" data-magicpath-path="ViewPage.tsx" />
                  <span data-magicpath-id="7" data-magicpath-path="ViewPage.tsx">Back to List</span>
                </SortableContainer>
                
                <SortableContainer dndKitId="b21f22dd-27e3-46c1-9fd0-1251fa339dea" containerType="regular" prevTag="button" onClick={handleScoreClick} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium" data-magicpath-id="8" data-magicpath-path="ViewPage.tsx">
                  <span data-magicpath-id="9" data-magicpath-path="ViewPage.tsx">Score Responses</span>
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="24cdf84b-1326-469c-95cd-2cbac5bd5a22" containerType="regular" prevTag="div" className="flex items-center space-x-4 mb-4" data-magicpath-id="10" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="7a0c0188-594a-4dbf-8117-ef635c7cf9db" containerType="regular" prevTag="div" className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-id="11" data-magicpath-path="ViewPage.tsx">
                  <FileText className="w-6 h-6 text-blue-600" data-magicpath-id="12" data-magicpath-path="ViewPage.tsx" />
                </SortableContainer>
                <SortableContainer dndKitId="4fc63083-ef1b-4f06-8027-238d6df07560" containerType="regular" prevTag="div" data-magicpath-id="13" data-magicpath-path="ViewPage.tsx">
                  <h1 className="text-2xl font-bold text-slate-800" data-magicpath-id="14" data-magicpath-path="ViewPage.tsx">
                    <span data-magicpath-id="15" data-magicpath-path="ViewPage.tsx">{selectedItem.id}</span>
                  </h1>
                  <p className="text-slate-600" data-magicpath-id="16" data-magicpath-path="ViewPage.tsx">
                    <span data-magicpath-id="17" data-magicpath-path="ViewPage.tsx">{selectedItem.title}</span>
                  </p>
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="da8c41d7-df3f-47df-aee7-2f0524ca9f8c" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm" data-magicpath-id="18" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="57b7f0d3-0f3e-49c7-9255-95606097baf0" containerType="regular" prevTag="div" data-magicpath-id="19" data-magicpath-path="ViewPage.tsx">
                  <span className="text-slate-500 block" data-magicpath-id="20" data-magicpath-path="ViewPage.tsx">Type</span>
                  <span className="font-medium text-slate-800" data-magicpath-id="21" data-magicpath-path="ViewPage.tsx">{selectedItem.type}</span>
                </SortableContainer>
                <SortableContainer dndKitId="712fa184-d741-4787-85ed-7a5cc44eb527" containerType="regular" prevTag="div" data-magicpath-id="22" data-magicpath-path="ViewPage.tsx">
                  <span className="text-slate-500 block" data-magicpath-id="23" data-magicpath-path="ViewPage.tsx">Status</span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`} data-magicpath-id="24" data-magicpath-path="ViewPage.tsx">
                    {selectedItem.status}
                  </span>
                </SortableContainer>
                <SortableContainer dndKitId="92733c46-3045-490d-8bb4-e823b600b0c8" containerType="regular" prevTag="div" data-magicpath-id="25" data-magicpath-path="ViewPage.tsx">
                  <span className="text-slate-500 block" data-magicpath-id="26" data-magicpath-path="ViewPage.tsx">Vendors</span>
                  <span className="font-medium text-slate-800" data-magicpath-id="27" data-magicpath-path="ViewPage.tsx">{selectedItem.vendorCount}</span>
                </SortableContainer>
                <SortableContainer dndKitId="32975161-13c4-4e43-b284-1bdab96f4ca8" containerType="regular" prevTag="div" data-magicpath-id="28" data-magicpath-path="ViewPage.tsx">
                  <span className="text-slate-500 block" data-magicpath-id="29" data-magicpath-path="ViewPage.tsx">End Date</span>
                  <span className="font-medium text-slate-800" data-magicpath-id="30" data-magicpath-path="ViewPage.tsx">{selectedItem.endDate}</span>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="7c2c7f10-7543-400d-9ccd-00d7667f75ac" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="31" data-magicpath-path="ViewPage.tsx">
              <SortableContainer dndKitId="e102fdf7-3878-4a50-8d82-523fb6cf9f84" containerType="collection" prevTag="div" className="flex space-x-1 mb-6 border-b border-slate-200" data-magicpath-id="32" data-magicpath-path="ViewPage.tsx">
                {[{
                id: 'questions',
                label: 'Questions',
                icon: MessageSquare,
                mpid: "6a2e458a-09d7-4ca6-8fd4-698db7f2309b"
              }, {
                id: 'quotations',
                label: 'Quotations',
                icon: FileText,
                mpid: "4be27c25-c403-4299-a284-d9e8176851bb"
              }].map(tab => {
                const Icon = tab.icon;
                return <button key={tab.id} onClick={() => setActiveTab(tab.id as 'questions' | 'quotations')} className={`
                        px-4 py-2 font-medium text-sm rounded-t-lg transition-colors flex items-center space-x-2
                        ${activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}
                      `} data-magicpath-uuid={(tab as any)["mpid"] ?? "unsafe"} data-magicpath-id="33" data-magicpath-path="ViewPage.tsx">
                      <Icon className="w-4 h-4" data-magicpath-uuid={(tab as any)["mpid"] ?? "unsafe"} data-magicpath-id="34" data-magicpath-path="ViewPage.tsx" />
                      <span data-magicpath-uuid={(tab as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="35" data-magicpath-path="ViewPage.tsx">{tab.label}</span>
                    </button>;
              })}
              </SortableContainer>

              {activeTab === 'questions' && <SortableContainer dndKitId="7f3c4fa8-a2e4-4bb9-bc08-45df0ffa5e66" containerType="regular" prevTag="div" className="space-y-6" data-magicpath-id="36" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="d8b84e60-5fcf-4638-b0ec-15cf2df47558" containerType="collection" prevTag="div" className="space-y-4" data-magicpath-id="37" data-magicpath-path="ViewPage.tsx">
                    {mockQuestions.map(question => <div key={question.id} className="bg-slate-50 rounded-lg p-4" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="38" data-magicpath-path="ViewPage.tsx">
                        <div className="flex justify-between items-start mb-2" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="ViewPage.tsx">
                          <h3 className="font-medium text-slate-800" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="ViewPage.tsx">
                            <span data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendor:unknown" data-magicpath-id="41" data-magicpath-path="ViewPage.tsx">{question.vendor}</span>
                          </h3>
                          <span className="text-xs text-slate-500" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-field="timestamp:unknown" data-magicpath-id="42" data-magicpath-path="ViewPage.tsx">{question.timestamp}</span>
                        </div>
                        <p className="text-slate-700 mb-4" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="ViewPage.tsx">
                          <span data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-field="question:unknown" data-magicpath-id="44" data-magicpath-path="ViewPage.tsx">{question.question}</span>
                        </p>
                        <div className="space-y-2" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="45" data-magicpath-path="ViewPage.tsx">
                          <textarea placeholder="Type your response..." className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" rows={3} value={questionResponse} onChange={e => setQuestionResponse(e.target.value)} data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="46" data-magicpath-path="ViewPage.tsx" />
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="47" data-magicpath-path="ViewPage.tsx">
                            <Send className="w-4 h-4" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="48" data-magicpath-path="ViewPage.tsx" />
                            <span data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="49" data-magicpath-path="ViewPage.tsx">Send Response</span>
                          </button>
                        </div>
                      </div>)}
                  </SortableContainer>
                </SortableContainer>}

              {activeTab === 'quotations' && <SortableContainer dndKitId="6ebd0bb5-c5fc-4993-b46c-9e25917bb5e2" containerType="collection" prevTag="div" className="space-y-4" data-magicpath-id="50" data-magicpath-path="ViewPage.tsx">
                  {mockQuotations.map(quotation => <div key={quotation.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="51" data-magicpath-path="ViewPage.tsx">
                      <div className="flex items-center justify-between" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="52" data-magicpath-path="ViewPage.tsx">
                        <div className="flex items-center space-x-3" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="53" data-magicpath-path="ViewPage.tsx">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="54" data-magicpath-path="ViewPage.tsx">
                            <FileText className="w-5 h-5 text-blue-600" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="55" data-magicpath-path="ViewPage.tsx" />
                          </div>
                          <div data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="56" data-magicpath-path="ViewPage.tsx">
                            <h3 className="font-medium text-slate-800" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="57" data-magicpath-path="ViewPage.tsx">
                              <span data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendor:unknown" data-magicpath-id="58" data-magicpath-path="ViewPage.tsx">{quotation.vendor}</span>
                            </h3>
                            <p className="text-sm text-slate-600" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="59" data-magicpath-path="ViewPage.tsx">
                              <span data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="fileName:unknown,fileSize:unknown" data-magicpath-id="60" data-magicpath-path="ViewPage.tsx">{quotation.fileName} • {quotation.fileSize}</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="61" data-magicpath-path="ViewPage.tsx">
                          <p className="text-sm text-slate-600" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="62" data-magicpath-path="ViewPage.tsx">
                            <span data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="submittedDate:unknown" data-magicpath-id="63" data-magicpath-path="ViewPage.tsx">Submitted: {quotation.submittedDate}</span>
                          </p>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="64" data-magicpath-path="ViewPage.tsx">
                            {quotation.status}
                          </span>
                        </div>
                      </div>
                    </div>)}
                </SortableContainer>}
            </SortableContainer>
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>;
  }

  // @return
  return <SortableContainer dndKitId="6e33bb8a-ec15-4ae3-8b18-f6ae0964c83d" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="65" data-magicpath-path="ViewPage.tsx">
      <SortableContainer dndKitId="168ef842-b16f-454f-a36d-118019e25598" containerType="regular" prevTag="div" className="max-w-7xl mx-auto" data-magicpath-id="66" data-magicpath-path="ViewPage.tsx">
        <SortableContainer dndKitId="49d55f1e-cc65-47c6-901c-6e04895c157d" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8" data-magicpath-id="67" data-magicpath-path="ViewPage.tsx">
          <SortableContainer dndKitId="e6db1966-b0fc-49b4-8662-41e59ecfdd30" containerType="regular" prevTag="div" className="flex items-center space-x-3 mb-8" data-magicpath-id="68" data-magicpath-path="ViewPage.tsx">
            <SortableContainer dndKitId="62c25a85-1676-450d-933b-336de7167289" containerType="regular" prevTag="div" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-id="69" data-magicpath-path="ViewPage.tsx">
              <Eye className="w-5 h-5 text-blue-600" data-magicpath-id="70" data-magicpath-path="ViewPage.tsx" />
            </SortableContainer>
            <h1 className="text-3xl font-bold text-slate-800" data-magicpath-id="71" data-magicpath-path="ViewPage.tsx">
              <span data-magicpath-id="72" data-magicpath-path="ViewPage.tsx">Active Requests</span>
            </h1>
          </SortableContainer>

          {rfirfqData.length === 0 ? <SortableContainer dndKitId="48cc8523-4e9b-467c-b1f6-103306e0be6f" containerType="regular" prevTag="div" className="text-center py-12" data-magicpath-id="73" data-magicpath-path="ViewPage.tsx">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" data-magicpath-id="74" data-magicpath-path="ViewPage.tsx" />
              <h3 className="text-lg font-medium text-slate-600 mb-2" data-magicpath-id="75" data-magicpath-path="ViewPage.tsx">
                <span data-magicpath-id="76" data-magicpath-path="ViewPage.tsx">No requests yet</span>
              </h3>
              <p className="text-slate-500" data-magicpath-id="77" data-magicpath-path="ViewPage.tsx">
                <span data-magicpath-id="78" data-magicpath-path="ViewPage.tsx">Create your first RFI or RFQ to get started</span>
              </p>
            </SortableContainer> : <SortableContainer dndKitId="3642eb24-f266-4aa8-a505-e5c6df61c3ec" containerType="regular" prevTag="div" className="overflow-x-auto" data-magicpath-id="79" data-magicpath-path="ViewPage.tsx">
              <table className="w-full" data-magicpath-id="80" data-magicpath-path="ViewPage.tsx">
                <thead data-magicpath-id="81" data-magicpath-path="ViewPage.tsx">
                  <tr className="border-b border-slate-200" data-magicpath-id="82" data-magicpath-path="ViewPage.tsx">
                    <th className="text-left py-4 px-4 font-medium text-slate-700" data-magicpath-id="83" data-magicpath-path="ViewPage.tsx">
                      <span data-magicpath-id="84" data-magicpath-path="ViewPage.tsx">ID</span>
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-700" data-magicpath-id="85" data-magicpath-path="ViewPage.tsx">
                      <span data-magicpath-id="86" data-magicpath-path="ViewPage.tsx">Title</span>
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-700" data-magicpath-id="87" data-magicpath-path="ViewPage.tsx">
                      <span data-magicpath-id="88" data-magicpath-path="ViewPage.tsx">Type</span>
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-700" data-magicpath-id="89" data-magicpath-path="ViewPage.tsx">
                      <span data-magicpath-id="90" data-magicpath-path="ViewPage.tsx">Status</span>
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-700" data-magicpath-id="91" data-magicpath-path="ViewPage.tsx">
                      <span data-magicpath-id="92" data-magicpath-path="ViewPage.tsx">Vendors</span>
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-700" data-magicpath-id="93" data-magicpath-path="ViewPage.tsx">
                      <span data-magicpath-id="94" data-magicpath-path="ViewPage.tsx">End Date</span>
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-700" data-magicpath-id="95" data-magicpath-path="ViewPage.tsx">
                      <span data-magicpath-id="96" data-magicpath-path="ViewPage.tsx">Created</span>
                    </th>
                  </tr>
                </thead>
                <tbody data-magicpath-id="97" data-magicpath-path="ViewPage.tsx">
                  {rfirfqData.map(item => <tr key={item.id} onClick={() => handleRowClick(item)} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="98" data-magicpath-path="ViewPage.tsx">
                      <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="99" data-magicpath-path="ViewPage.tsx">
                        <span className="font-medium text-blue-600" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="100" data-magicpath-path="ViewPage.tsx">{item.id}</span>
                      </td>
                      <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="101" data-magicpath-path="ViewPage.tsx">
                        <span className="text-slate-800" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="title:unknown" data-magicpath-id="102" data-magicpath-path="ViewPage.tsx">{item.title}</span>
                      </td>
                      <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="103" data-magicpath-path="ViewPage.tsx">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="type:unknown" data-magicpath-id="104" data-magicpath-path="ViewPage.tsx">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="105" data-magicpath-path="ViewPage.tsx">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="106" data-magicpath-path="ViewPage.tsx">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="107" data-magicpath-path="ViewPage.tsx">
                        <div className="flex items-center space-x-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="108" data-magicpath-path="ViewPage.tsx">
                          <Users className="w-4 h-4 text-slate-400" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="109" data-magicpath-path="ViewPage.tsx" />
                          <span className="text-slate-700" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendorCount:unknown" data-magicpath-id="110" data-magicpath-path="ViewPage.tsx">{item.vendorCount}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="111" data-magicpath-path="ViewPage.tsx">
                        <div className="flex items-center space-x-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="112" data-magicpath-path="ViewPage.tsx">
                          <Calendar className="w-4 h-4 text-slate-400" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="113" data-magicpath-path="ViewPage.tsx" />
                          <span className="text-slate-700" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="endDate:unknown" data-magicpath-id="114" data-magicpath-path="ViewPage.tsx">{item.endDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="115" data-magicpath-path="ViewPage.tsx">
                        <span className="text-slate-600" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="createdDate:unknown" data-magicpath-id="116" data-magicpath-path="ViewPage.tsx">{item.createdDate}</span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </SortableContainer>}
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};