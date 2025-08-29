import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { RFIRFQData } from './ProcureApp';
import { BarChart3, FileText, Star, TrendingUp, Award, Brain, CheckCircle } from 'lucide-react';
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
  const mockVendorData: VendorScore[] = [{
    id: '1',
    vendorName: 'TechCorp Solutions',
    score: 0,
    technicalScore: 85,
    commercialScore: 78,
    complianceScore: 92,
    documentName: 'TechCorp_Proposal_2024.pdf',
    aiRecommendation: 'Strong technical capabilities with excellent compliance record. Pricing is competitive.',
    strengths: ['Advanced technical expertise', 'Strong compliance history', 'Proven track record'],
    weaknesses: ['Higher pricing than competitors', 'Limited local presence'],
    mpid: "8ae5cdfe-a6bc-4c0e-be57-5d4a8ab97e3f"
  }, {
    id: '2',
    vendorName: 'Digital Innovations',
    score: 0,
    technicalScore: 92,
    commercialScore: 85,
    complianceScore: 88,
    documentName: 'Digital_Quote_Final.pdf',
    aiRecommendation: 'Excellent technical solution with innovative approach. Best overall value proposition.',
    strengths: ['Innovative solutions', 'Competitive pricing', 'Strong technical team'],
    weaknesses: ['Newer company', 'Limited enterprise experience'],
    mpid: "c4e76d50-7558-402b-9ec1-4dac5d6bd982"
  }, {
    id: '3',
    vendorName: 'CloudTech Partners',
    score: 0,
    technicalScore: 80,
    commercialScore: 90,
    complianceScore: 85,
    documentName: 'CloudTech_Response.pdf',
    aiRecommendation: 'Cost-effective solution with good technical approach. Reliable delivery partner.',
    strengths: ['Most competitive pricing', 'Fast implementation', 'Good support model'],
    weaknesses: ['Basic technical approach', 'Limited customization options'],
    mpid: "bd56ba8f-4ffe-413e-95d8-3027cde21143"
  }];
  const currentRFIRFQ = selectedRFIRFQ ? rfirfqData.find(item => item.id === selectedRFIRFQ) : null;
  const handleScoreVendor = async (vendorId: string) => {
    setIsScoring(vendorId);
    setTimeout(() => {
      const vendor = mockVendorData.find(v => v.id === vendorId);
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
    return <SortableContainer dndKitId="68db3690-4102-4dbd-88d9-0c666fb65839" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="0" data-magicpath-path="ScorePage.tsx">
        <SortableContainer dndKitId="1385333b-34c1-43bf-8883-19394ab8f552" containerType="regular" prevTag="div" className="max-w-4xl mx-auto" data-magicpath-id="1" data-magicpath-path="ScorePage.tsx">
          <SortableContainer dndKitId="1544cfeb-dfbf-4dee-9a59-b49fdfe9c7b6" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8 text-center" data-magicpath-id="2" data-magicpath-path="ScorePage.tsx">
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
  return <SortableContainer dndKitId="d310535d-4bf5-49c7-aec4-f5b815504c39" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="8" data-magicpath-path="ScorePage.tsx">
      <SortableContainer dndKitId="ccd0d4bd-b8bb-4e10-9913-15c18c2f297e" containerType="regular" prevTag="div" className="max-w-7xl mx-auto" data-magicpath-id="9" data-magicpath-path="ScorePage.tsx">
        <SortableContainer dndKitId="82382b35-828a-4487-9662-b0c195b5bb5e" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8" data-magicpath-id="10" data-magicpath-path="ScorePage.tsx">
          <SortableContainer dndKitId="7e339f89-1cc2-47cc-a63a-6a31ac5b3862" containerType="regular" prevTag="div" className="flex items-center justify-between mb-8" data-magicpath-id="11" data-magicpath-path="ScorePage.tsx">
            <SortableContainer dndKitId="ae253912-08ef-4232-877a-ea2a2e1cddf0" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="12" data-magicpath-path="ScorePage.tsx">
              <SortableContainer dndKitId="235ec28d-c250-41b2-b06a-6b5de5dd1a12" containerType="regular" prevTag="div" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-id="13" data-magicpath-path="ScorePage.tsx">
                <BarChart3 className="w-5 h-5 text-blue-600" data-magicpath-id="14" data-magicpath-path="ScorePage.tsx" />
              </SortableContainer>
              <SortableContainer dndKitId="95abe9e7-3008-47d1-99d9-d90dcdf3ffdf" containerType="regular" prevTag="div" data-magicpath-id="15" data-magicpath-path="ScorePage.tsx">
                <h1 className="text-3xl font-bold text-slate-800" data-magicpath-id="16" data-magicpath-path="ScorePage.tsx">
                  <span data-magicpath-id="17" data-magicpath-path="ScorePage.tsx">Score Responses</span>
                </h1>
                <p className="text-slate-600" data-magicpath-id="18" data-magicpath-path="ScorePage.tsx">
                  <span data-magicpath-id="19" data-magicpath-path="ScorePage.tsx">{currentRFIRFQ.id} - {currentRFIRFQ.title}</span>
                </p>
              </SortableContainer>
            </SortableContainer>

            {vendorScores.length > 0 && <SortableContainer dndKitId="9d7e73dd-358a-47c0-87e5-2cb7cb40405c" containerType="regular" prevTag="button" onClick={handleCompareAll} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2" data-magicpath-id="20" data-magicpath-path="ScorePage.tsx">
                <TrendingUp className="w-5 h-5" data-magicpath-id="21" data-magicpath-path="ScorePage.tsx" />
                <span data-magicpath-id="22" data-magicpath-path="ScorePage.tsx">Compare All</span>
              </SortableContainer>}
          </SortableContainer>

          <SortableContainer dndKitId="1253efc7-b47e-435a-a5da-10ef74a19330" containerType="collection" prevTag="div" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8" data-magicpath-id="23" data-magicpath-path="ScorePage.tsx">
            {mockVendorData.map(vendor => {
            const scoredVendor = vendorScores.find(v => v.id === vendor.id);
            const isScored = !!scoredVendor;
            const isCurrentlyScoring = isScoring === vendor.id;
            return <div key={vendor.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="ScorePage.tsx">
                  <div className="flex items-center justify-between mb-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="ScorePage.tsx">
                    <h3 className="text-lg font-semibold text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="26" data-magicpath-path="ScorePage.tsx">
                      <span data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="vendorName:string" data-magicpath-id="27" data-magicpath-path="ScorePage.tsx">{vendor.vendorName}</span>
                    </h3>
                    {isScored && <div className="flex items-center space-x-1" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="ScorePage.tsx">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="29" data-magicpath-path="ScorePage.tsx" />
                        <span className="text-xl font-bold text-slate-800" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="ScorePage.tsx">{scoredVendor.score}</span>
                      </div>}
                  </div>

                  <div className="flex items-center space-x-2 mb-4" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="31" data-magicpath-path="ScorePage.tsx">
                    <FileText className="w-4 h-4 text-slate-500" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-id="32" data-magicpath-path="ScorePage.tsx" />
                    <span className="text-sm text-slate-600" data-magicpath-uuid={(vendor as any)["mpid"] ?? "unsafe"} data-magicpath-field="documentName:string" data-magicpath-id="33" data-magicpath-path="ScorePage.tsx">{vendor.documentName}</span>
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

          {showComparison && vendorScores.length > 0 && <SortableContainer dndKitId="67abd454-dcca-4a85-836f-6861e460b0a3" containerType="regular" prevTag="div" className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200" data-magicpath-id="66" data-magicpath-path="ScorePage.tsx">
              <SortableContainer dndKitId="13e55d86-432f-45f2-b1fc-66153e573f4c" containerType="regular" prevTag="div" className="flex items-center space-x-3 mb-6" data-magicpath-id="67" data-magicpath-path="ScorePage.tsx">
                <SortableContainer dndKitId="469489c4-ee18-42fd-aace-7131af9048fc" containerType="regular" prevTag="div" className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center" data-magicpath-id="68" data-magicpath-path="ScorePage.tsx">
                  <TrendingUp className="w-5 h-5 text-green-600" data-magicpath-id="69" data-magicpath-path="ScorePage.tsx" />
                </SortableContainer>
                <h2 className="text-2xl font-bold text-slate-800" data-magicpath-id="70" data-magicpath-path="ScorePage.tsx">
                  <span data-magicpath-id="71" data-magicpath-path="ScorePage.tsx">AI Comparison & Recommendation</span>
                </h2>
              </SortableContainer>

              <SortableContainer dndKitId="3e019069-e772-46e7-aacd-7e1339735611" containerType="regular" prevTag="div" className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-magicpath-id="72" data-magicpath-path="ScorePage.tsx">
                <SortableContainer dndKitId="e5a3d649-eeb1-4470-8c87-aa96cc046517" containerType="regular" prevTag="div" data-magicpath-id="73" data-magicpath-path="ScorePage.tsx">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4" data-magicpath-id="74" data-magicpath-path="ScorePage.tsx">
                    <span data-magicpath-id="75" data-magicpath-path="ScorePage.tsx">Vendor Rankings</span>
                  </h3>
                  <SortableContainer dndKitId="01a10247-c0c4-4bfd-b5bf-87098733944b" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="76" data-magicpath-path="ScorePage.tsx">
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

                <SortableContainer dndKitId="e32da54e-e43b-40df-82a7-de8ff4f8a060" containerType="regular" prevTag="div" data-magicpath-id="85" data-magicpath-path="ScorePage.tsx">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4" data-magicpath-id="86" data-magicpath-path="ScorePage.tsx">
                    <span data-magicpath-id="87" data-magicpath-path="ScorePage.tsx">Recommended Vendor</span>
                  </h3>
                  {(() => {
                const recommended = getRecommendedVendor();
                if (!recommended) return null;
                return <SortableContainer dndKitId="21973e20-dba3-456f-9906-5dc73bb66d01" containerType="regular" prevTag="div" className="bg-white rounded-lg p-6 border-2 border-green-300" data-magicpath-id="88" data-magicpath-path="ScorePage.tsx">
                        <SortableContainer dndKitId="6b84bce0-214e-4842-acee-1bfea709902c" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="89" data-magicpath-path="ScorePage.tsx">
                          <h4 className="text-xl font-bold text-slate-800" data-magicpath-id="90" data-magicpath-path="ScorePage.tsx">
                            <span data-magicpath-id="91" data-magicpath-path="ScorePage.tsx">{recommended.vendorName}</span>
                          </h4>
                          <SortableContainer dndKitId="16078338-d015-4ca8-8b0a-5edb01b2ac07" containerType="regular" prevTag="div" className="flex items-center space-x-1" data-magicpath-id="92" data-magicpath-path="ScorePage.tsx">
                            <Award className="w-5 h-5 text-green-600" data-magicpath-id="93" data-magicpath-path="ScorePage.tsx" />
                            <span className="text-xl font-bold text-green-600" data-magicpath-id="94" data-magicpath-path="ScorePage.tsx">{recommended.score}</span>
                          </SortableContainer>
                        </SortableContainer>
                        
                        <p className="text-slate-700 mb-4" data-magicpath-id="95" data-magicpath-path="ScorePage.tsx">
                          <span data-magicpath-id="96" data-magicpath-path="ScorePage.tsx">{recommended.aiRecommendation}</span>
                        </p>

                        <SortableContainer dndKitId="891ba0a9-5a1d-411e-9bca-6a4df00fe9dd" containerType="regular" prevTag="div" className="grid grid-cols-1 gap-4 mb-6" data-magicpath-id="97" data-magicpath-path="ScorePage.tsx">
                          <SortableContainer dndKitId="d64acc2f-eb33-4320-b829-dd6a5305634c" containerType="regular" prevTag="div" data-magicpath-id="98" data-magicpath-path="ScorePage.tsx">
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

                        <SortableContainer dndKitId="e1331a2e-471b-4b57-8a08-41da84226cbc" containerType="regular" prevTag="button" onClick={() => handleSelectVendor(recommended.vendorName)} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2" data-magicpath-id="105" data-magicpath-path="ScorePage.tsx">
                          <Award className="w-5 h-5" data-magicpath-id="106" data-magicpath-path="ScorePage.tsx" />
                          <span data-magicpath-id="107" data-magicpath-path="ScorePage.tsx">Select This Vendor</span>
                        </SortableContainer>
                      </SortableContainer>;
              })()}
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};