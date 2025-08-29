import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { RFIRFQData } from './ProcureApp';
import { BarChart3, FileText, Star, TrendingUp, Award, Brain, CheckCircle, Eye, X, AlertTriangle, DollarSign, Shield, Zap } from 'lucide-react';
interface ScorePageProps {
  selectedRFIRFQ: string | null;
  rfirfqData: RFIRFQData[];
  onAwardVendor: (vendorName: string) => void;
  mpid?: string;
}
interface VendorScore {
  id: string;
  vendorName: string;
  score: number;
  technicalScore: number;
  commercialScore: number;
  complianceScore: number;
  documentName: string;
  aiRecommendation: string;
  strengths: string[];
  weaknesses: string[];
  mpid?: string;
}

// @component: ScorePage
export const ScorePage = ({
  selectedRFIRFQ,
  rfirfqData,
  onAwardVendor
}: ScorePageProps) => {
  const [vendorScores, setVendorScores] = useState<VendorScore[]>([]);
  const [isScoring, setIsScoring] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  // Sample data for when no real data exists
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
    mpid: "2ea5ff0a-d126-4665-bcb8-42d4d47495dc"
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
    mpid: "494af237-ba6e-47db-8790-ca01d5ca7401"
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
    mpid: "56bd5578-b922-4843-9c76-0eeb8f32eef3"
  }];

  // Use sample data if no real data exists, otherwise use real data
  const allRFIRFQData = rfirfqData.length > 0 ? rfirfqData : sampleRFIRFQData;
  const currentRFIRFQ = selectedRFIRFQ ? allRFIRFQData.find(item => item.id === selectedRFIRFQ) || null : null;

  // Generate mock vendor data based on the current RFI/RFQ
  const generateMockVendorData = (rfirfq: RFIRFQData | null): VendorScore[] => {
    if (!rfirfq) return [];

    // Use the vendors from the RFI/RFQ data
    const vendors = rfirfq.vendors || ['TechCorp Solutions', 'Digital Innovations', 'CloudTech Partners'];
    return vendors.slice(0, 3).map((vendorName, index) => ({
      id: (index + 1).toString(),
      vendorName,
      score: 0,
      technicalScore: 80 + Math.floor(Math.random() * 15),
      commercialScore: 75 + Math.floor(Math.random() * 20),
      complianceScore: 85 + Math.floor(Math.random() * 10),
      documentName: `${vendorName.replace(/\s+/g, '_')}_Proposal_2024.pdf`,
      aiRecommendation: `Strong capabilities with competitive approach. ${vendorName} offers excellent value for this procurement.`,
      strengths: ['Advanced technical expertise', 'Strong compliance history', 'Proven track record', 'Competitive pricing model', 'Excellent customer support'].slice(0, 3 + Math.floor(Math.random() * 2)),
      weaknesses: ['Higher pricing than some competitors', 'Limited local presence', 'Longer implementation timeline', 'Requires additional training'].slice(0, 2 + Math.floor(Math.random() * 2)),
      mpid: `vendor-${index + 1}-${Date.now()}`
    }));
  };
  const dynamicMockVendorData = generateMockVendorData(currentRFIRFQ);
  const handleScoreVendor = async (vendorId: string) => {
    setIsScoring(vendorId);
    setTimeout(() => {
      const vendor = dynamicMockVendorData.find(v => v.id === vendorId);
      if (vendor) {
        const overallScore = Math.round((vendor.technicalScore + vendor.commercialScore + vendor.complianceScore) / 3);
        const scoredVendor = {
          ...vendor,
          score: overallScore
        };
        setVendorScores(prev => {
          const existing = prev.find(v => v.id === vendorId);
          if (existing) {
            return prev.map(v => v.id === vendorId ? scoredVendor : v);
          }
          return [...prev, scoredVendor];
        });
      }
      setIsScoring(null);
    }, 2000);
  };
  const handleCompareAll = () => {
    setShowComparison(true);
  };
  const getRecommendedVendor = () => {
    if (vendorScores.length === 0) return null;
    return vendorScores.reduce((prev, current) => prev.score > current.score ? prev : current);
  };
  const handleSelectVendor = (vendorName: string) => {
    setSelectedVendor(vendorName);
    onAwardVendor(vendorName);
  };
  if (!currentRFIRFQ) {
    // @return
    return <SortableContainer dndKitId="d7e8c7a1-0e41-410a-9713-94f693d7cc45" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="0" data-magicpath-path="ScorePage.tsx">
        <SortableContainer dndKitId="667af59f-a7c4-4ecc-9054-ca6e38e18f55" containerType="regular" prevTag="div" className="max-w-4xl mx-auto" data-magicpath-id="1" data-magicpath-path="ScorePage.tsx">
          <SortableContainer dndKitId="5d990157-0356-455a-9afb-aac2d49b993e" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8 text-center" data-magicpath-id="2" data-magicpath-path="ScorePage.tsx">
            <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" data-magicpath-id="3" data-magicpath-path="ScorePage.tsx" />
            <h2 className="text-xl font-semibold text-slate-600 mb-2" data-magicpath-id="4" data-magicpath-path="ScorePage.tsx">
              <span data-magicpath-id="5" data-magicpath-path="ScorePage.tsx">No RFI/RFQ Selected</span>
            </h2>
            <p className="text-slate-500" data-magicpath-id="6" data-magicpath-path="ScorePage.tsx">
              <span data-magicpath-id="7" data-magicpath-path="ScorePage.tsx">Please select an RFI/RFQ from the View page to start scoring vendor responses.</span>
            </p>
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>;
  }

  // @return
  return <SortableContainer dndKitId="0130ca5f-d7b0-4ffb-a13f-dbdb17975536" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="8" data-magicpath-path="ScorePage.tsx">
      <SortableContainer dndKitId="34950e38-d221-4cf0-b3f6-2e017bf52aa5" containerType="regular" prevTag="div" className="max-w-7xl mx-auto" data-magicpath-id="9" data-magicpath-path="ScorePage.tsx">
        <SortableContainer dndKitId="3dd3499c-9813-4e5f-b4fa-4eda8bfde104" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8" data-magicpath-id="10" data-magicpath-path="ScorePage.tsx">
          <SortableContainer dndKitId="80d0503b-8bd1-415c-b705-e6262c887860" containerType="regular" prevTag="div" className="flex items-center justify-between mb-8" data-magicpath-id="11" data-magicpath-path="ScorePage.tsx">
            <SortableContainer dndKitId="31af70d8-414c-4778-8c4c-195f8b6adcff" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="12" data-magicpath-path="ScorePage.tsx">
              <SortableContainer dndKitId="a5cc9fcd-3737-45be-b14d-3243ff6227d2" containerType="regular" prevTag="div" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-id="13" data-magicpath-path="ScorePage.tsx">
                <BarChart3 className="w-5 h-5 text-blue-600" data-magicpath-id="14" data-magicpath-path="ScorePage.tsx" />
              </SortableContainer>
              <SortableContainer dndKitId="469e6791-8c7c-4aad-9660-d253d4c954d6" containerType="regular" prevTag="div" data-magicpath-id="15" data-magicpath-path="ScorePage.tsx">
                <h1 className="text-3xl font-bold text-slate-800" data-magicpath-id="16" data-magicpath-path="ScorePage.tsx">
                  <span data-magicpath-id="17" data-magicpath-path="ScorePage.tsx">Score Responses</span>
                </h1>
                <p className="text-slate-600" data-magicpath-id="18" data-magicpath-path="ScorePage.tsx">
                  <span data-magicpath-id="19" data-magicpath-path="ScorePage.tsx">{currentRFIRFQ.id} - {currentRFIRFQ.title}</span>
                </p>
              </SortableContainer>
            </SortableContainer>

            {vendorScores.length > 0 && <SortableContainer dndKitId="577cad72-15be-4c13-a4c3-b0a6a5078166" containerType="regular" prevTag="button" onClick={handleCompareAll} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2" data-magicpath-id="20" data-magicpath-path="ScorePage.tsx">
                <TrendingUp className="w-5 h-5" data-magicpath-id="21" data-magicpath-path="ScorePage.tsx" />
                <span data-magicpath-id="22" data-magicpath-path="ScorePage.tsx">Compare All</span>
              </SortableContainer>}
          </SortableContainer>

          <SortableContainer dndKitId="3fa99d69-7aca-40f9-9445-909bf2e0f6b2" containerType="collection" prevTag="div" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8" data-magicpath-id="23" data-magicpath-path="ScorePage.tsx">
            {dynamicMockVendorData.map(vendor => {
            const scoredVendor = vendorScores.find(v => v.id === vendor.id);
            const isScored = !!scoredVendor;
            const isCurrentlyScoring = isScoring === vendor.id;
            return <div key={vendor.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="ScorePage.tsx">
                  <div className="flex items-center justify-between mb-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="ScorePage.tsx">
                    <h3 className="text-lg font-semibold text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="26" data-magicpath-path="ScorePage.tsx">
                      <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendorName:unknown" data-magicpath-id="27" data-magicpath-path="ScorePage.tsx">{vendor.vendorName}</span>
                    </h3>
                    {isScored && <div className="flex items-center space-x-1" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="ScorePage.tsx">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="29" data-magicpath-path="ScorePage.tsx" />
                        <span className="text-xl font-bold text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="ScorePage.tsx">{scoredVendor.score}</span>
                      </div>}
                  </div>

                  <div className="flex items-center space-x-2 mb-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="31" data-magicpath-path="ScorePage.tsx">
                    <FileText className="w-4 h-4 text-slate-500" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="32" data-magicpath-path="ScorePage.tsx" />
                    <span className="text-sm text-slate-600" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="documentName:unknown" data-magicpath-id="33" data-magicpath-path="ScorePage.tsx">{vendor.documentName}</span>
                  </div>

                  {isScored && <div className="space-y-3 mb-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="34" data-magicpath-path="ScorePage.tsx">
                      <div className="flex justify-between items-center" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="35" data-magicpath-path="ScorePage.tsx">
                        <span className="text-sm text-slate-600" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="36" data-magicpath-path="ScorePage.tsx">Technical</span>
                        <span className="text-sm font-medium text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="37" data-magicpath-path="ScorePage.tsx">{scoredVendor.technicalScore}/100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="38" data-magicpath-path="ScorePage.tsx">
                        <div className="bg-blue-600 h-2 rounded-full" style={{
                    width: `${scoredVendor.technicalScore}%`
                  }} data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="ScorePage.tsx"></div>
                      </div>

                      <div className="flex justify-between items-center" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="ScorePage.tsx">
                        <span className="text-sm text-slate-600" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="ScorePage.tsx">Commercial</span>
                        <span className="text-sm font-medium text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="ScorePage.tsx">{scoredVendor.commercialScore}/100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="ScorePage.tsx">
                        <div className="bg-green-600 h-2 rounded-full" style={{
                    width: `${scoredVendor.commercialScore}%`
                  }} data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="44" data-magicpath-path="ScorePage.tsx"></div>
                      </div>

                      <div className="flex justify-between items-center" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="45" data-magicpath-path="ScorePage.tsx">
                        <span className="text-sm text-slate-600" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="46" data-magicpath-path="ScorePage.tsx">Compliance</span>
                        <span className="text-sm font-medium text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="47" data-magicpath-path="ScorePage.tsx">{scoredVendor.complianceScore}/100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="48" data-magicpath-path="ScorePage.tsx">
                        <div className="bg-purple-600 h-2 rounded-full" style={{
                    width: `${scoredVendor.complianceScore}%`
                  }} data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="49" data-magicpath-path="ScorePage.tsx"></div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3 mt-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="50" data-magicpath-path="ScorePage.tsx">
                        <div className="flex items-center space-x-2 mb-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="51" data-magicpath-path="ScorePage.tsx">
                          <Brain className="w-4 h-4 text-blue-600" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="52" data-magicpath-path="ScorePage.tsx" />
                          <span className="text-sm font-medium text-blue-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="53" data-magicpath-path="ScorePage.tsx">AI Recommendation</span>
                        </div>
                        <p className="text-sm text-blue-700" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="54" data-magicpath-path="ScorePage.tsx">
                          <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="55" data-magicpath-path="ScorePage.tsx">{scoredVendor.aiRecommendation}</span>
                        </p>
                      </div>
                    </div>}

                  <button onClick={() => handleScoreVendor(vendor.id)} disabled={isCurrentlyScoring || isScored} className={`
                      w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2
                      ${isScored ? 'bg-green-100 text-green-800 cursor-not-allowed' : isCurrentlyScoring ? 'bg-blue-100 text-blue-800 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}
                    `} data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="56" data-magicpath-path="ScorePage.tsx">
                    {isCurrentlyScoring ? <div className="flex items-center space-x-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="57" data-magicpath-path="ScorePage.tsx">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="58" data-magicpath-path="ScorePage.tsx"></div>
                        <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="59" data-magicpath-path="ScorePage.tsx">Scoring...</span>
                      </div> : isScored ? <div className="flex items-center space-x-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="60" data-magicpath-path="ScorePage.tsx">
                        <CheckCircle className="w-4 h-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="61" data-magicpath-path="ScorePage.tsx" />
                        <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="62" data-magicpath-path="ScorePage.tsx">Scored</span>
                      </div> : <div className="flex items-center space-x-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="63" data-magicpath-path="ScorePage.tsx">
                        <Brain className="w-4 h-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="64" data-magicpath-path="ScorePage.tsx" />
                        <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="65" data-magicpath-path="ScorePage.tsx">Score with AI</span>
                      </div>}
                  </button>
                </div>;
          })}
          </SortableContainer>

          {showComparison && vendorScores.length > 0 && <SortableContainer dndKitId="945b79aa-0eed-4262-ad4d-015dca95ae89" containerType="regular" prevTag="div" className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200" data-magicpath-id="66" data-magicpath-path="ScorePage.tsx">
              <SortableContainer dndKitId="1f18cf44-b722-4120-bda8-d1de870792ad" containerType="regular" prevTag="div" className="flex items-center space-x-3 mb-6" data-magicpath-id="67" data-magicpath-path="ScorePage.tsx">
                <SortableContainer dndKitId="8a3a8876-cd63-445c-9519-a9d653f9f87e" containerType="regular" prevTag="div" className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center" data-magicpath-id="68" data-magicpath-path="ScorePage.tsx">
                  <TrendingUp className="w-5 h-5 text-green-600" data-magicpath-id="69" data-magicpath-path="ScorePage.tsx" />
                </SortableContainer>
                <h2 className="text-2xl font-bold text-slate-800" data-magicpath-id="70" data-magicpath-path="ScorePage.tsx">
                  <span data-magicpath-id="71" data-magicpath-path="ScorePage.tsx">AI Comparison & Recommendation</span>
                </h2>
              </SortableContainer>

              <SortableContainer dndKitId="d73db49b-37f7-486b-82f0-81ba1b359576" containerType="regular" prevTag="div" className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-magicpath-id="72" data-magicpath-path="ScorePage.tsx">
                <SortableContainer dndKitId="56af001f-e35a-499f-9d1b-a6bf3af00d8f" containerType="regular" prevTag="div" data-magicpath-id="73" data-magicpath-path="ScorePage.tsx">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4" data-magicpath-id="74" data-magicpath-path="ScorePage.tsx">
                    <span data-magicpath-id="75" data-magicpath-path="ScorePage.tsx">Vendor Rankings</span>
                  </h3>
                  <SortableContainer dndKitId="81c5f5a7-17f2-40c5-b284-56ee84399a45" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="76" data-magicpath-path="ScorePage.tsx">
                    {vendorScores.sort((a, b) => b.score - a.score).map((vendor, index) => <div key={vendor.id} className="flex items-center justify-between p-3 bg-white rounded-lg" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="77" data-magicpath-path="ScorePage.tsx">
                          <div className="flex items-center space-x-3" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="78" data-magicpath-path="ScorePage.tsx">
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                              ${index === 0 ? 'bg-gold-100 text-gold-800' : index === 1 ? 'bg-silver-100 text-silver-800' : 'bg-bronze-100 text-bronze-800'}
                            `} data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="79" data-magicpath-path="ScorePage.tsx">
                              <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="80" data-magicpath-path="ScorePage.tsx">{index + 1}</span>
                            </div>
                            <span className="font-medium text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendorName:unknown" data-magicpath-id="81" data-magicpath-path="ScorePage.tsx">{vendor.vendorName}</span>
                          </div>
                          <div className="flex items-center space-x-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="82" data-magicpath-path="ScorePage.tsx">
                            <span className="text-lg font-bold text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="score:unknown" data-magicpath-id="83" data-magicpath-path="ScorePage.tsx">{vendor.score}</span>
                            <Star className="w-4 h-4 text-yellow-500 fill-current" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="84" data-magicpath-path="ScorePage.tsx" />
                          </div>
                        </div>)}
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="f14c4a4c-a222-48a8-98fd-b32d7e6edc0e" containerType="regular" prevTag="div" data-magicpath-id="85" data-magicpath-path="ScorePage.tsx">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4" data-magicpath-id="86" data-magicpath-path="ScorePage.tsx">
                    <span data-magicpath-id="87" data-magicpath-path="ScorePage.tsx">Recommended Vendor</span>
                  </h3>
                  {(() => {
                const recommended = getRecommendedVendor();
                if (!recommended) return null;
                return <SortableContainer dndKitId="eeb0d446-5e96-43b9-bfcd-d02d29a98e7c" containerType="regular" prevTag="div" className="bg-white rounded-lg p-6 border-2 border-green-300" data-magicpath-id="88" data-magicpath-path="ScorePage.tsx">
                        <SortableContainer dndKitId="fc4547a2-2ffc-45ca-ab0c-c5944f5582b0" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="89" data-magicpath-path="ScorePage.tsx">
                          <h4 className="text-xl font-bold text-slate-800" data-magicpath-id="90" data-magicpath-path="ScorePage.tsx">
                            <span data-magicpath-id="91" data-magicpath-path="ScorePage.tsx">{recommended.vendorName}</span>
                          </h4>
                          <SortableContainer dndKitId="b49b68f0-1e6a-45af-9b55-a3f108929c56" containerType="regular" prevTag="div" className="flex items-center space-x-1" data-magicpath-id="92" data-magicpath-path="ScorePage.tsx">
                            <Award className="w-5 h-5 text-green-600" data-magicpath-id="93" data-magicpath-path="ScorePage.tsx" />
                            <span className="text-xl font-bold text-green-600" data-magicpath-id="94" data-magicpath-path="ScorePage.tsx">{recommended.score}</span>
                          </SortableContainer>
                        </SortableContainer>
                        
                        <p className="text-slate-700 mb-4" data-magicpath-id="95" data-magicpath-path="ScorePage.tsx">
                          <span data-magicpath-id="96" data-magicpath-path="ScorePage.tsx">{recommended.aiRecommendation}</span>
                        </p>

                        <SortableContainer dndKitId="cb86e16b-3c8c-408d-bfc3-6bb005a5c86a" containerType="regular" prevTag="div" className="grid grid-cols-1 gap-4 mb-6" data-magicpath-id="97" data-magicpath-path="ScorePage.tsx">
                          <SortableContainer dndKitId="4b2e6fe2-985a-44b2-8799-6f4e132b0613" containerType="regular" prevTag="div" data-magicpath-id="98" data-magicpath-path="ScorePage.tsx">
                            <h5 className="font-medium text-green-800 mb-2" data-magicpath-id="99" data-magicpath-path="ScorePage.tsx">
                              <span data-magicpath-id="100" data-magicpath-path="ScorePage.tsx">Strengths</span>
                            </h5>
                            <ul className="space-y-1" data-magicpath-id="101" data-magicpath-path="ScorePage.tsx">
                              {recommended.strengths.map((strength, idx) => <li key={idx} className="text-sm text-slate-600 flex items-center space-x-2" data-magicpath-id="102" data-magicpath-path="ScorePage.tsx">
                                  <CheckCircle className="w-3 h-3 text-green-500" data-magicpath-id="103" data-magicpath-path="ScorePage.tsx" />
                                  <span data-magicpath-id="104" data-magicpath-path="ScorePage.tsx">{strength}</span>
                                </li>)}
                            </ul>
                          </SortableContainer>
                        </SortableContainer>

                        <SortableContainer dndKitId="fe6550cf-d3f6-433d-ae53-a7afaaa72e4c" containerType="regular" prevTag="div" className="flex space-x-3 mb-6" data-magicpath-id="105" data-magicpath-path="ScorePage.tsx">
                          <SortableContainer dndKitId="73e76b5c-d5c4-4a03-837d-be51e91a4117" containerType="regular" prevTag="button" onClick={() => setShowDetailedAnalysis(true)} className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2" data-magicpath-id="106" data-magicpath-path="ScorePage.tsx">
                            <Eye className="w-4 h-4" data-magicpath-id="107" data-magicpath-path="ScorePage.tsx" />
                            <span data-magicpath-id="108" data-magicpath-path="ScorePage.tsx">View Detailed Analysis</span>
                          </SortableContainer>
                        </SortableContainer>

                        <SortableContainer dndKitId="f8908baf-71d5-4cc6-8238-40da7b790d9f" containerType="regular" prevTag="button" onClick={() => handleSelectVendor(recommended.vendorName)} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2" data-magicpath-id="109" data-magicpath-path="ScorePage.tsx">
                          <Award className="w-5 h-5" data-magicpath-id="110" data-magicpath-path="ScorePage.tsx" />
                          <span data-magicpath-id="111" data-magicpath-path="ScorePage.tsx">Select This Vendor</span>
                        </SortableContainer>
                      </SortableContainer>;
              })()}
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}
        </SortableContainer>

        {/* Detailed Analysis Modal */}
        {showDetailedAnalysis && vendorScores.length > 0 && <SortableContainer dndKitId="4574067d-1698-4c53-9734-38a03971e3b2" containerType="regular" prevTag="div" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-magicpath-id="112" data-magicpath-path="ScorePage.tsx">
            <SortableContainer dndKitId="bfb7c4f6-c399-451e-9a0d-1317c653a425" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" data-magicpath-id="113" data-magicpath-path="ScorePage.tsx">
              <SortableContainer dndKitId="959e3c5b-f508-4a8d-b5f4-3ec8956a3fbc" containerType="regular" prevTag="div" className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between rounded-t-2xl" data-magicpath-id="114" data-magicpath-path="ScorePage.tsx">
                <SortableContainer dndKitId="f6359892-7e8c-4f34-8273-e4e9f0a9dd71" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="115" data-magicpath-path="ScorePage.tsx">
                  <SortableContainer dndKitId="b93bf942-9dd6-45a1-9745-c9919e223707" containerType="regular" prevTag="div" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-id="116" data-magicpath-path="ScorePage.tsx">
                    <Brain className="w-5 h-5 text-blue-600" data-magicpath-id="117" data-magicpath-path="ScorePage.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="45c022fc-4a71-4a7d-8155-f7be0a07ba56" containerType="regular" prevTag="div" data-magicpath-id="118" data-magicpath-path="ScorePage.tsx">
                    <h2 className="text-2xl font-bold text-slate-800" data-magicpath-id="119" data-magicpath-path="ScorePage.tsx">Detailed AI Analysis</h2>
                    <p className="text-slate-600" data-magicpath-id="120" data-magicpath-path="ScorePage.tsx">{currentRFIRFQ?.title}</p>
                  </SortableContainer>
                </SortableContainer>
                <SortableContainer dndKitId="c7566afc-e4f6-4625-bf57-73b94cf5a45f" containerType="regular" prevTag="button" onClick={() => setShowDetailedAnalysis(false)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors" data-magicpath-id="121" data-magicpath-path="ScorePage.tsx">
                  <X className="w-5 h-5 text-slate-600" data-magicpath-id="122" data-magicpath-path="ScorePage.tsx" />
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="59c5fdd7-27f7-4b83-9776-cf60e1e095de" containerType="regular" prevTag="div" className="p-6 space-y-8" data-magicpath-id="123" data-magicpath-path="ScorePage.tsx">
                {/* Executive Summary */}
                <SortableContainer dndKitId="2d57f6dd-c0b3-4a61-86a7-535c6c792d83" containerType="regular" prevTag="div" className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200" data-magicpath-id="124" data-magicpath-path="ScorePage.tsx">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2" data-magicpath-id="125" data-magicpath-path="ScorePage.tsx">
                    <Award className="w-5 h-5 text-blue-600" data-magicpath-id="126" data-magicpath-path="ScorePage.tsx" />
                    <span data-magicpath-id="127" data-magicpath-path="ScorePage.tsx">Executive Summary</span>
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-4" data-magicpath-id="128" data-magicpath-path="ScorePage.tsx">
                    Based on comprehensive AI analysis of all vendor proposals, we've evaluated {vendorScores.length} vendors across technical capabilities, commercial viability, and compliance requirements. Our recommendation prioritizes long-term value, risk mitigation, and strategic alignment with your organizational goals.
                  </p>
                  <SortableContainer dndKitId="8a3a86f5-4c06-45f3-a5bf-b4bce46e3418" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-3 gap-4" data-magicpath-id="129" data-magicpath-path="ScorePage.tsx">
                    <SortableContainer dndKitId="8d25f847-925c-4dfd-a609-75f4e67ebfd5" containerType="regular" prevTag="div" className="bg-white rounded-lg p-4 text-center" data-magicpath-id="130" data-magicpath-path="ScorePage.tsx">
                      <div className="text-2xl font-bold text-blue-600 mb-1" data-magicpath-id="131" data-magicpath-path="ScorePage.tsx">{vendorScores.length}</div>
                      <div className="text-sm text-slate-600" data-magicpath-id="132" data-magicpath-path="ScorePage.tsx">Vendors Analyzed</div>
                    </SortableContainer>
                    <SortableContainer dndKitId="0c662c92-6f80-4a74-92a6-7f46e97387c2" containerType="regular" prevTag="div" className="bg-white rounded-lg p-4 text-center" data-magicpath-id="133" data-magicpath-path="ScorePage.tsx">
                      <div className="text-2xl font-bold text-green-600 mb-1" data-magicpath-id="134" data-magicpath-path="ScorePage.tsx">{Math.round(vendorScores.reduce((sum, v) => sum + v.score, 0) / vendorScores.length)}</div>
                      <div className="text-sm text-slate-600" data-magicpath-id="135" data-magicpath-path="ScorePage.tsx">Average Score</div>
                    </SortableContainer>
                    <SortableContainer dndKitId="df3b4898-6a2d-49ff-8574-a4e3c8583ae0" containerType="regular" prevTag="div" className="bg-white rounded-lg p-4 text-center" data-magicpath-id="136" data-magicpath-path="ScorePage.tsx">
                      <div className="text-2xl font-bold text-purple-600 mb-1" data-magicpath-id="137" data-magicpath-path="ScorePage.tsx">95%</div>
                      <div className="text-sm text-slate-600" data-magicpath-id="138" data-magicpath-path="ScorePage.tsx">Confidence Level</div>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                {/* Detailed Vendor Comparison */}
                <SortableContainer dndKitId="afb2dfe7-20d2-4e3d-8bb9-4aaf86374c02" containerType="regular" prevTag="div" data-magicpath-id="139" data-magicpath-path="ScorePage.tsx">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2" data-magicpath-id="140" data-magicpath-path="ScorePage.tsx">
                    <TrendingUp className="w-5 h-5 text-green-600" data-magicpath-id="141" data-magicpath-path="ScorePage.tsx" />
                    <span data-magicpath-id="142" data-magicpath-path="ScorePage.tsx">Comprehensive Vendor Analysis</span>
                  </h3>
                  
                  <SortableContainer dndKitId="7e1837ce-3447-4d06-951c-9276bec4d3e7" containerType="collection" prevTag="div" className="space-y-6" data-magicpath-id="143" data-magicpath-path="ScorePage.tsx">
                    {vendorScores.sort((a, b) => b.score - a.score).map((vendor, index) => <div key={vendor.id} className={`rounded-xl p-6 border-2 ${index === 0 ? 'bg-green-50 border-green-300' : 'bg-slate-50 border-slate-200'}`} data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="144" data-magicpath-path="ScorePage.tsx">
                        <div className="flex items-center justify-between mb-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="145" data-magicpath-path="ScorePage.tsx">
                          <div className="flex items-center space-x-3" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="146" data-magicpath-path="ScorePage.tsx">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-green-600 text-white' : index === 1 ? 'bg-blue-600 text-white' : 'bg-slate-600 text-white'}`} data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="147" data-magicpath-path="ScorePage.tsx">
                              <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="148" data-magicpath-path="ScorePage.tsx">{index + 1}</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendorName:unknown" data-magicpath-id="149" data-magicpath-path="ScorePage.tsx">{vendor.vendorName}</h4>
                          </div>
                          <div className="flex items-center space-x-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="150" data-magicpath-path="ScorePage.tsx">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="151" data-magicpath-path="ScorePage.tsx" />
                            <span className="text-2xl font-bold text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="score:unknown" data-magicpath-id="152" data-magicpath-path="ScorePage.tsx">{vendor.score}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="153" data-magicpath-path="ScorePage.tsx">
                          {/* Technical Analysis */}
                          <div className="bg-white rounded-lg p-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="154" data-magicpath-path="ScorePage.tsx">
                            <div className="flex items-center space-x-2 mb-3" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="155" data-magicpath-path="ScorePage.tsx">
                              <Zap className="w-4 h-4 text-blue-600" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="156" data-magicpath-path="ScorePage.tsx" />
                              <h5 className="font-semibold text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="technicalScore:unknown" data-magicpath-id="157" data-magicpath-path="ScorePage.tsx">Technical ({vendor.technicalScore}/100)</h5>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 mb-3" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="158" data-magicpath-path="ScorePage.tsx">
                              <div className="bg-blue-600 h-2 rounded-full" style={{
                          width: `${vendor.technicalScore}%`
                        }} data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="159" data-magicpath-path="ScorePage.tsx"></div>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-1" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="160" data-magicpath-path="ScorePage.tsx">
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="161" data-magicpath-path="ScorePage.tsx">• Architecture scalability: Excellent</li>
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="162" data-magicpath-path="ScorePage.tsx">• Integration capabilities: Strong</li>
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="163" data-magicpath-path="ScorePage.tsx">• Performance benchmarks: Above average</li>
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="164" data-magicpath-path="ScorePage.tsx">• Innovation factor: High</li>
                            </ul>
                          </div>

                          {/* Commercial Analysis */}
                          <div className="bg-white rounded-lg p-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="165" data-magicpath-path="ScorePage.tsx">
                            <div className="flex items-center space-x-2 mb-3" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="166" data-magicpath-path="ScorePage.tsx">
                              <DollarSign className="w-4 h-4 text-green-600" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="167" data-magicpath-path="ScorePage.tsx" />
                              <h5 className="font-semibold text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="commercialScore:unknown" data-magicpath-id="168" data-magicpath-path="ScorePage.tsx">Commercial ({vendor.commercialScore}/100)</h5>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 mb-3" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="169" data-magicpath-path="ScorePage.tsx">
                              <div className="bg-green-600 h-2 rounded-full" style={{
                          width: `${vendor.commercialScore}%`
                        }} data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="170" data-magicpath-path="ScorePage.tsx"></div>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-1" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="171" data-magicpath-path="ScorePage.tsx">
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="172" data-magicpath-path="ScorePage.tsx">• Total cost of ownership: Competitive</li>
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="173" data-magicpath-path="ScorePage.tsx">• Payment terms: Favorable</li>
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="174" data-magicpath-path="ScorePage.tsx">• ROI projection: {85 + Math.floor(Math.random() * 15)}%</li>
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="175" data-magicpath-path="ScorePage.tsx">• Contract flexibility: Good</li>
                            </ul>
                          </div>

                          {/* Compliance Analysis */}
                          <div className="bg-white rounded-lg p-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="176" data-magicpath-path="ScorePage.tsx">
                            <div className="flex items-center space-x-2 mb-3" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="177" data-magicpath-path="ScorePage.tsx">
                              <Shield className="w-4 h-4 text-purple-600" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="178" data-magicpath-path="ScorePage.tsx" />
                              <h5 className="font-semibold text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="complianceScore:unknown" data-magicpath-id="179" data-magicpath-path="ScorePage.tsx">Compliance ({vendor.complianceScore}/100)</h5>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 mb-3" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="180" data-magicpath-path="ScorePage.tsx">
                              <div className="bg-purple-600 h-2 rounded-full" style={{
                          width: `${vendor.complianceScore}%`
                        }} data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="181" data-magicpath-path="ScorePage.tsx"></div>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-1" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="182" data-magicpath-path="ScorePage.tsx">
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="183" data-magicpath-path="ScorePage.tsx">• Regulatory compliance: Full</li>
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="184" data-magicpath-path="ScorePage.tsx">• Security certifications: ISO 27001</li>
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="185" data-magicpath-path="ScorePage.tsx">• Data protection: GDPR compliant</li>
                              <li data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="186" data-magicpath-path="ScorePage.tsx">• Audit readiness: Excellent</li>
                            </ul>
                          </div>
                        </div>

                        {/* Strengths and Weaknesses */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="187" data-magicpath-path="ScorePage.tsx">
                          <div className="bg-green-50 rounded-lg p-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="188" data-magicpath-path="ScorePage.tsx">
                            <h5 className="font-semibold text-green-800 mb-3 flex items-center space-x-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="189" data-magicpath-path="ScorePage.tsx">
                              <CheckCircle className="w-4 h-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="190" data-magicpath-path="ScorePage.tsx" />
                              <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="191" data-magicpath-path="ScorePage.tsx">Key Strengths</span>
                            </h5>
                            <ul className="space-y-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="192" data-magicpath-path="ScorePage.tsx">
                              {vendor.strengths.map((strength, idx) => <li key={idx} className="text-sm text-green-700 flex items-start space-x-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="193" data-magicpath-path="ScorePage.tsx">
                                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="194" data-magicpath-path="ScorePage.tsx" />
                                  <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="195" data-magicpath-path="ScorePage.tsx">{strength}</span>
                                </li>)}
                            </ul>
                          </div>

                          <div className="bg-orange-50 rounded-lg p-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="196" data-magicpath-path="ScorePage.tsx">
                            <h5 className="font-semibold text-orange-800 mb-3 flex items-center space-x-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="197" data-magicpath-path="ScorePage.tsx">
                              <AlertTriangle className="w-4 h-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="198" data-magicpath-path="ScorePage.tsx" />
                              <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="199" data-magicpath-path="ScorePage.tsx">Areas of Concern</span>
                            </h5>
                            <ul className="space-y-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="200" data-magicpath-path="ScorePage.tsx">
                              {vendor.weaknesses.map((weakness, idx) => <li key={idx} className="text-sm text-orange-700 flex items-start space-x-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="201" data-magicpath-path="ScorePage.tsx">
                                  <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="202" data-magicpath-path="ScorePage.tsx" />
                                  <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="203" data-magicpath-path="ScorePage.tsx">{weakness}</span>
                                </li>)}
                            </ul>
                          </div>
                        </div>

                        {/* AI Recommendation for this vendor */}
                        <div className="bg-blue-50 rounded-lg p-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="204" data-magicpath-path="ScorePage.tsx">
                          <h5 className="font-semibold text-blue-800 mb-2 flex items-center space-x-2" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="205" data-magicpath-path="ScorePage.tsx">
                            <Brain className="w-4 h-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="206" data-magicpath-path="ScorePage.tsx" />
                            <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="207" data-magicpath-path="ScorePage.tsx">AI Assessment</span>
                          </h5>
                          <p className="text-sm text-blue-700" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="aiRecommendation:unknown" data-magicpath-id="208" data-magicpath-path="ScorePage.tsx">{vendor.aiRecommendation}</p>
                        </div>
                      </div>)}
                  </SortableContainer>
                </SortableContainer>

                {/* Risk Assessment */}
                <SortableContainer dndKitId="12c59228-125f-4679-80ce-478d3215aa56" containerType="regular" prevTag="div" className="bg-slate-50 rounded-xl p-6" data-magicpath-id="209" data-magicpath-path="ScorePage.tsx">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2" data-magicpath-id="210" data-magicpath-path="ScorePage.tsx">
                    <Shield className="w-5 h-5 text-red-600" data-magicpath-id="211" data-magicpath-path="ScorePage.tsx" />
                    <span data-magicpath-id="212" data-magicpath-path="ScorePage.tsx">Risk Assessment & Mitigation</span>
                  </h3>
                  <SortableContainer dndKitId="64ca2331-2821-404a-b2fc-33f6e8a698f3" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 gap-6" data-magicpath-id="213" data-magicpath-path="ScorePage.tsx">
                    <SortableContainer dndKitId="b364f6dd-8fd5-4ea4-9c42-cbc642ef6a5a" containerType="regular" prevTag="div" data-magicpath-id="214" data-magicpath-path="ScorePage.tsx">
                      <h4 className="font-semibold text-slate-800 mb-3" data-magicpath-id="215" data-magicpath-path="ScorePage.tsx">Identified Risks</h4>
                      <SortableContainer dndKitId="3204edff-b722-4f8b-9359-67c29f9d5aab" containerType="regular" prevTag="ul" className="space-y-2" data-magicpath-id="216" data-magicpath-path="ScorePage.tsx">
                        <li className="flex items-start space-x-2 text-sm" data-magicpath-id="217" data-magicpath-path="ScorePage.tsx">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" data-magicpath-id="218" data-magicpath-path="ScorePage.tsx" />
                          <span className="text-slate-700" data-magicpath-id="219" data-magicpath-path="ScorePage.tsx">Vendor dependency concentration</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm" data-magicpath-id="220" data-magicpath-path="ScorePage.tsx">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" data-magicpath-id="221" data-magicpath-path="ScorePage.tsx" />
                          <span className="text-slate-700" data-magicpath-id="222" data-magicpath-path="ScorePage.tsx">Implementation timeline constraints</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm" data-magicpath-id="223" data-magicpath-path="ScorePage.tsx">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" data-magicpath-id="224" data-magicpath-path="ScorePage.tsx" />
                          <span className="text-slate-700" data-magicpath-id="225" data-magicpath-path="ScorePage.tsx">Budget variance potential</span>
                        </li>
                      </SortableContainer>
                    </SortableContainer>
                    <SortableContainer dndKitId="46c1c602-768c-4d21-bed9-066835fb6ac1" containerType="regular" prevTag="div" data-magicpath-id="226" data-magicpath-path="ScorePage.tsx">
                      <h4 className="font-semibold text-slate-800 mb-3" data-magicpath-id="227" data-magicpath-path="ScorePage.tsx">Mitigation Strategies</h4>
                      <SortableContainer dndKitId="5b9e3a8d-8dc4-4a9a-a805-3edaa42aaa34" containerType="regular" prevTag="ul" className="space-y-2" data-magicpath-id="228" data-magicpath-path="ScorePage.tsx">
                        <li className="flex items-start space-x-2 text-sm" data-magicpath-id="229" data-magicpath-path="ScorePage.tsx">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" data-magicpath-id="230" data-magicpath-path="ScorePage.tsx" />
                          <span className="text-slate-700" data-magicpath-id="231" data-magicpath-path="ScorePage.tsx">Establish clear SLAs and penalties</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm" data-magicpath-id="232" data-magicpath-path="ScorePage.tsx">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" data-magicpath-id="233" data-magicpath-path="ScorePage.tsx" />
                          <span className="text-slate-700" data-magicpath-id="234" data-magicpath-path="ScorePage.tsx">Implement phased delivery approach</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm" data-magicpath-id="235" data-magicpath-path="ScorePage.tsx">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" data-magicpath-id="236" data-magicpath-path="ScorePage.tsx" />
                          <span className="text-slate-700" data-magicpath-id="237" data-magicpath-path="ScorePage.tsx">Regular performance monitoring</span>
                        </li>
                      </SortableContainer>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                {/* Final Recommendation */}
                <SortableContainer dndKitId="cf8d3c75-60fe-40bf-9a3a-b0b5cfdbc1d0" containerType="regular" prevTag="div" className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200" data-magicpath-id="238" data-magicpath-path="ScorePage.tsx">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2" data-magicpath-id="239" data-magicpath-path="ScorePage.tsx">
                    <Award className="w-5 h-5 text-green-600" data-magicpath-id="240" data-magicpath-path="ScorePage.tsx" />
                    <span data-magicpath-id="241" data-magicpath-path="ScorePage.tsx">Final AI Recommendation</span>
                  </h3>
                  <SortableContainer dndKitId="fe414903-3ad1-46c5-a54d-272a01da9d96" containerType="regular" prevTag="div" className="bg-white rounded-lg p-6" data-magicpath-id="242" data-magicpath-path="ScorePage.tsx">
                    <p className="text-slate-700 leading-relaxed mb-4" data-magicpath-id="243" data-magicpath-path="ScorePage.tsx">
                      After thorough analysis of all proposals, <strong data-magicpath-id="244" data-magicpath-path="ScorePage.tsx">{getRecommendedVendor()?.vendorName}</strong> emerges as the optimal choice for this procurement. This recommendation is based on a holistic evaluation that considers not just the scoring metrics, but also strategic fit, implementation feasibility, and long-term partnership potential.
                    </p>
                    <SortableContainer dndKitId="0458aa6c-25d7-4559-bc04-ee9f39b3cb85" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 gap-4" data-magicpath-id="245" data-magicpath-path="ScorePage.tsx">
                      <SortableContainer dndKitId="53434561-59c3-4677-9435-f667aec3e2d5" containerType="regular" prevTag="div" data-magicpath-id="246" data-magicpath-path="ScorePage.tsx">
                        <h4 className="font-semibold text-slate-800 mb-2" data-magicpath-id="247" data-magicpath-path="ScorePage.tsx">Why This Vendor?</h4>
                        <SortableContainer dndKitId="a45653c0-87cb-42c9-9145-5bba4caf38c0" containerType="regular" prevTag="ul" className="text-sm text-slate-600 space-y-1" data-magicpath-id="248" data-magicpath-path="ScorePage.tsx">
                          <li data-magicpath-id="249" data-magicpath-path="ScorePage.tsx">• Highest overall score with balanced performance</li>
                          <li data-magicpath-id="250" data-magicpath-path="ScorePage.tsx">• Strong technical capabilities and innovation</li>
                          <li data-magicpath-id="251" data-magicpath-path="ScorePage.tsx">• Competitive commercial terms</li>
                          <li data-magicpath-id="252" data-magicpath-path="ScorePage.tsx">• Excellent compliance and security posture</li>
                        </SortableContainer>
                      </SortableContainer>
                      <SortableContainer dndKitId="d9805492-9257-4c68-bef1-c7ae9f521717" containerType="regular" prevTag="div" data-magicpath-id="253" data-magicpath-path="ScorePage.tsx">
                        <h4 className="font-semibold text-slate-800 mb-2" data-magicpath-id="254" data-magicpath-path="ScorePage.tsx">Next Steps</h4>
                        <SortableContainer dndKitId="3c2c375a-28b8-441a-ae13-9db266c34452" containerType="regular" prevTag="ul" className="text-sm text-slate-600 space-y-1" data-magicpath-id="255" data-magicpath-path="ScorePage.tsx">
                          <li data-magicpath-id="256" data-magicpath-path="ScorePage.tsx">• Conduct final due diligence review</li>
                          <li data-magicpath-id="257" data-magicpath-path="ScorePage.tsx">• Negotiate contract terms and SLAs</li>
                          <li data-magicpath-id="258" data-magicpath-path="ScorePage.tsx">• Plan implementation timeline</li>
                          <li data-magicpath-id="259" data-magicpath-path="ScorePage.tsx">• Establish governance framework</li>
                        </SortableContainer>
                      </SortableContainer>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>}
      </SortableContainer>
    </SortableContainer>;
};