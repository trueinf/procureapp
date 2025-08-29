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
    mpid: "afa3f89c-879f-433b-9f8f-098fd624052b"
  }, {
    id: '2',
    vendor: 'Digital Innovations',
    question: 'Are there any specific compliance requirements we should be aware of?',
    timestamp: '2024-01-15 2:15 PM',
    mpid: "c4dc162c-b203-4177-9630-d5fe1de64cf1"
  }, {
    id: '3',
    vendor: 'CloudTech Partners',
    question: 'What is the budget range for this project?',
    timestamp: '2024-01-16 9:45 AM',
    mpid: "5640f657-f7a3-41f6-9de6-af80fb515566"
  }] as any[];
  const mockQuotations = [{
    id: '1',
    vendor: 'TechCorp Solutions',
    fileName: 'TechCorp_Proposal_2024.pdf',
    fileSize: '2.4 MB',
    submittedDate: '2024-01-16',
    status: 'Submitted',
    mpid: "74597c4f-a86f-4c20-8153-4f9111810c0a"
  }, {
    id: '2',
    vendor: 'Digital Innovations',
    fileName: 'Digital_Quote_Final.pdf',
    fileSize: '1.8 MB',
    submittedDate: '2024-01-17',
    status: 'Submitted',
    mpid: "a711b401-2fa2-4ee5-9dbe-f50c07d9dfd0"
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
    return <SortableContainer dndKitId="32d99fd5-6be4-4334-9ec6-aff01f864e72" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="0" data-magicpath-path="ViewPage.tsx">
        <SortableContainer dndKitId="b627276e-dfab-49e2-8ccc-5ac095e70eed" containerType="regular" prevTag="div" className="max-w-6xl mx-auto" data-magicpath-id="1" data-magicpath-path="ViewPage.tsx">
          <SortableContainer dndKitId="53a6143d-4c7f-4bdc-97a1-05fbfe25a0db" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl" data-magicpath-id="2" data-magicpath-path="ViewPage.tsx">
            <SortableContainer dndKitId="2473225e-c41a-4817-9090-141b1ecf3209" containerType="regular" prevTag="div" className="p-8 border-b border-slate-200" data-magicpath-id="3" data-magicpath-path="ViewPage.tsx">
              <SortableContainer dndKitId="5b583ee9-a9b8-4e93-bb20-c228d49faff0" containerType="regular" prevTag="div" className="flex items-center justify-between mb-6" data-magicpath-id="4" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="b3e42340-0d45-46b1-ae07-3d0f5f48ea2c" containerType="regular" prevTag="button" onClick={handleBackClick} className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors" data-magicpath-id="5" data-magicpath-path="ViewPage.tsx">
                  <ArrowLeft className="w-5 h-5" data-magicpath-id="6" data-magicpath-path="ViewPage.tsx" />
                  <span data-magicpath-id="7" data-magicpath-path="ViewPage.tsx">Back to List</span>
                </SortableContainer>
                
                <SortableContainer dndKitId="07b55d05-2276-4292-9150-e78383b3011b" containerType="regular" prevTag="button" onClick={handleScoreClick} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium" data-magicpath-id="8" data-magicpath-path="ViewPage.tsx">
                  <span data-magicpath-id="9" data-magicpath-path="ViewPage.tsx">Score Responses</span>
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="3d1d857a-fa10-45b3-9459-8b127eca592d" containerType="regular" prevTag="div" className="flex items-center space-x-4 mb-4" data-magicpath-id="10" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="63dc7e5d-e80b-4da5-8659-8fec0a26e375" containerType="regular" prevTag="div" className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-id="11" data-magicpath-path="ViewPage.tsx">
                  <FileText className="w-6 h-6 text-blue-600" data-magicpath-id="12" data-magicpath-path="ViewPage.tsx" />
                </SortableContainer>
                <SortableContainer dndKitId="f5487ee3-4389-4708-9a3b-1cca424c2f2d" containerType="regular" prevTag="div" data-magicpath-id="13" data-magicpath-path="ViewPage.tsx">
                  <h1 className="text-2xl font-bold text-slate-800" data-magicpath-id="14" data-magicpath-path="ViewPage.tsx">
                    <span data-magicpath-id="15" data-magicpath-path="ViewPage.tsx">{selectedItem.id}</span>
                  </h1>
                  <p className="text-slate-600" data-magicpath-id="16" data-magicpath-path="ViewPage.tsx">
                    <span data-magicpath-id="17" data-magicpath-path="ViewPage.tsx">{selectedItem.title}</span>
                  </p>
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="889be11d-e9a5-4894-bccc-c4167dfdd979" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm" data-magicpath-id="18" data-magicpath-path="ViewPage.tsx">
                <SortableContainer dndKitId="100951d1-4b32-48b8-b301-6d50a8e71aa8" containerType="regular" prevTag="div" data-magicpath-id="19" data-magicpath-path="ViewPage.tsx">
                  <span className="text-slate-500 block" data-magicpath-id="20" data-magicpath-path="ViewPage.tsx">Type</span>
                  <span className="font-medium text-slate-800" data-magicpath-id="21" data-magicpath-path="ViewPage.tsx">{selectedItem.type}</span>
                </SortableContainer>
                <SortableContainer dndKitId="9cbe26a4-d3ca-4d64-9c1c-0c4ba0fd107a" containerType="regular" prevTag="div" data-magicpath-id="22" data-magicpath-path="ViewPage.tsx">
                  <span className="text-slate-500 block" data-magicpath-id="23" data-magicpath-path="ViewPage.tsx">Status</span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`} data-magicpath-id="24" data-magicpath-path="ViewPage.tsx">
                    {selectedItem.status}
                  </span>
                </SortableContainer>
                <SortableContainer dndKitId="1dbf53e9-8087-418e-9499-ed4cada7361f" containerType="regular" prevTag="div" data-magicpath-id="25" data-magicpath-path="ViewPage.tsx">
                  <span className="text-slate-500 block" data-magicpath-id="26" data-magicpath-path="ViewPage.tsx">Vendors</span>
                  <span className="font-medium text-slate-800" data-magicpath-id="27" data-magicpath-path="ViewPage.tsx">{selectedItem.vendorCount}</span>
                </SortableContainer>
                <SortableContainer dndKitId="397aea92-58d9-4532-8c00-1c9f3bfe8542" containerType="regular" prevTag="div" data-magicpath-id="28" data-magicpath-path="ViewPage.tsx">
                  <span className="text-slate-500 block" data-magicpath-id="29" data-magicpath-path="ViewPage.tsx">End Date</span>
                  <span className="font-medium text-slate-800" data-magicpath-id="30" data-magicpath-path="ViewPage.tsx">{selectedItem.endDate}</span>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="fd2c9b06-b360-4703-aa6b-aec66c3d8111" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="31" data-magicpath-path="ViewPage.tsx">
              <SortableContainer dndKitId="02e91c31-91f6-4165-b11c-8b09722f0192" containerType="collection" prevTag="div" className="flex space-x-1 mb-6 border-b border-slate-200" data-magicpath-id="32" data-magicpath-path="ViewPage.tsx">
                {[{
                id: 'questions',
                label: 'Questions',
                icon: MessageSquare,
                mpid: "c90d10e8-14d5-43f3-a634-d4722a119a6c"
              }, {
                id: 'quotations',
                label: 'Quotations',
                icon: FileText,
                mpid: "134b6b54-44db-4e94-9bcf-c4569379d5ea"
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

              {activeTab === 'questions' && <SortableContainer dndKitId="d4666adc-0e96-4669-812f-5fb6ced21194" containerType="regular" prevTag="div" className="space-y-6" data-magicpath-id="36" data-magicpath-path="ViewPage.tsx">
                  <SortableContainer dndKitId="1d3a6f8d-dc8f-4ee1-a22f-d74ed90f09db" containerType="collection" prevTag="div" className="space-y-4" data-magicpath-id="37" data-magicpath-path="ViewPage.tsx">
                    {mockQuestions.map(question => <div key={question.id} className="bg-slate-50 rounded-lg p-4" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="38" data-magicpath-path="ViewPage.tsx">
                        <div className="flex justify-between items-start mb-2" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="ViewPage.tsx">
                          <h3 className="font-medium text-slate-800" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="ViewPage.tsx">
                            <span data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendor:string" data-magicpath-id="41" data-magicpath-path="ViewPage.tsx">{question.vendor}</span>
                          </h3>
                          <span className="text-xs text-slate-500" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-field="timestamp:string" data-magicpath-id="42" data-magicpath-path="ViewPage.tsx">{question.timestamp}</span>
                        </div>
                        <p className="text-slate-700 mb-4" data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="ViewPage.tsx">
                          <span data-magicpath-uuid={(question as any)["mpid"] ?? "unsafe"} data-magicpath-field="question:string" data-magicpath-id="44" data-magicpath-path="ViewPage.tsx">{question.question}</span>
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

              {activeTab === 'quotations' && <SortableContainer dndKitId="6f425d45-7d11-45b1-b40f-4e8073f22dfc" containerType="collection" prevTag="div" className="space-y-4" data-magicpath-id="50" data-magicpath-path="ViewPage.tsx">
                  {mockQuotations.map(quotation => <div key={quotation.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="51" data-magicpath-path="ViewPage.tsx">
                      <div className="flex items-center justify-between" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="52" data-magicpath-path="ViewPage.tsx">
                        <div className="flex items-center space-x-3" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="53" data-magicpath-path="ViewPage.tsx">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="54" data-magicpath-path="ViewPage.tsx">
                            <FileText className="w-5 h-5 text-blue-600" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="55" data-magicpath-path="ViewPage.tsx" />
                          </div>
                          <div data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="56" data-magicpath-path="ViewPage.tsx">
                            <h3 className="font-medium text-slate-800" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="57" data-magicpath-path="ViewPage.tsx">
                              <span data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendor:string" data-magicpath-id="58" data-magicpath-path="ViewPage.tsx">{quotation.vendor}</span>
                            </h3>
                            <p className="text-sm text-slate-600" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="59" data-magicpath-path="ViewPage.tsx">
                              <span data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="fileName:string,fileSize:string" data-magicpath-id="60" data-magicpath-path="ViewPage.tsx">{quotation.fileName} • {quotation.fileSize}</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="61" data-magicpath-path="ViewPage.tsx">
                          <p className="text-sm text-slate-600" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-id="62" data-magicpath-path="ViewPage.tsx">
                            <span data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="submittedDate:string" data-magicpath-id="63" data-magicpath-path="ViewPage.tsx">Submitted: {quotation.submittedDate}</span>
                          </p>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800" data-magicpath-uuid={(quotation as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:string" data-magicpath-id="64" data-magicpath-path="ViewPage.tsx">
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
  return <SortableContainer dndKitId="b4aec290-aa50-4271-88b1-862f662dd17c" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="65" data-magicpath-path="ViewPage.tsx">
      <SortableContainer dndKitId="2b234936-7f0d-445f-ad2a-9593070d55c2" containerType="regular" prevTag="div" className="max-w-7xl mx-auto" data-magicpath-id="66" data-magicpath-path="ViewPage.tsx">
        <SortableContainer dndKitId="8888c15a-511f-4e4f-b417-e3c68b564984" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8" data-magicpath-id="67" data-magicpath-path="ViewPage.tsx">
          <SortableContainer dndKitId="9d9ce7f3-516e-4cb0-9539-77a0e17e75dc" containerType="regular" prevTag="div" className="flex items-center space-x-3 mb-8" data-magicpath-id="68" data-magicpath-path="ViewPage.tsx">
            <SortableContainer dndKitId="550fd3f2-d3c4-4a31-b8a3-f7ac7c972e44" containerType="regular" prevTag="div" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-id="69" data-magicpath-path="ViewPage.tsx">
              <Eye className="w-5 h-5 text-blue-600" data-magicpath-id="70" data-magicpath-path="ViewPage.tsx" />
            </SortableContainer>
            <h1 className="text-3xl font-bold text-slate-800" data-magicpath-id="71" data-magicpath-path="ViewPage.tsx">
              <span data-magicpath-id="72" data-magicpath-path="ViewPage.tsx">Active Requests</span>
            </h1>
          </SortableContainer>

          {rfirfqData.length === 0 ? <SortableContainer dndKitId="8ac3498c-0177-4f13-838f-195fec7319b7" containerType="regular" prevTag="div" className="text-center py-12" data-magicpath-id="73" data-magicpath-path="ViewPage.tsx">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" data-magicpath-id="74" data-magicpath-path="ViewPage.tsx" />
              <h3 className="text-lg font-medium text-slate-600 mb-2" data-magicpath-id="75" data-magicpath-path="ViewPage.tsx">
                <span data-magicpath-id="76" data-magicpath-path="ViewPage.tsx">No requests yet</span>
              </h3>
              <p className="text-slate-500" data-magicpath-id="77" data-magicpath-path="ViewPage.tsx">
                <span data-magicpath-id="78" data-magicpath-path="ViewPage.tsx">Create your first RFI or RFQ to get started</span>
              </p>
            </SortableContainer> : <SortableContainer dndKitId="3d998e7b-fd3c-47de-a68b-d48e8a10b090" containerType="regular" prevTag="div" className="overflow-x-auto" data-magicpath-id="79" data-magicpath-path="ViewPage.tsx">
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