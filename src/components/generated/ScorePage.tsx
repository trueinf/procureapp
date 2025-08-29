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
    mpid: "e3725fb2-b494-4899-8706-0974e97abc68"
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
    mpid: "66faded7-51f9-460e-af54-4d1fd4bcc3ee"
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
    mpid: "fb674bb7-7716-435a-a13c-101d30a0e78a"
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
    return <SortableContainer dndKitId="cad0a989-f91c-4029-b675-896737431e7b" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="0" data-magicpath-path="ScorePage.tsx">
        <SortableContainer dndKitId="e1b7ac3d-2246-4a76-89a5-6b55dd1855d7" containerType="regular" prevTag="div" className="max-w-4xl mx-auto" data-magicpath-id="1" data-magicpath-path="ScorePage.tsx">
          <SortableContainer dndKitId="3f8cef93-d590-46f3-8acb-15b8a10cf8e5" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8 text-center" data-magicpath-id="2" data-magicpath-path="ScorePage.tsx">
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
  return <SortableContainer dndKitId="b83f8572-7299-4c2d-bb7b-db08969092df" containerType="regular" prevTag="div" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" data-magicpath-id="8" data-magicpath-path="ScorePage.tsx">
      <SortableContainer dndKitId="55bd1827-5161-4cd3-a3ad-b252dc91829a" containerType="regular" prevTag="div" className="max-w-7xl mx-auto" data-magicpath-id="9" data-magicpath-path="ScorePage.tsx">
        <SortableContainer dndKitId="57474d6c-c3fd-4f88-a439-122526079ec5" containerType="regular" prevTag="div" className="bg-white rounded-2xl shadow-xl p-8" data-magicpath-id="10" data-magicpath-path="ScorePage.tsx">
          <SortableContainer dndKitId="5fbd9286-c066-4026-9adf-73227d06551d" containerType="regular" prevTag="div" className="flex items-center justify-between mb-8" data-magicpath-id="11" data-magicpath-path="ScorePage.tsx">
            <SortableContainer dndKitId="e1ebabd6-e646-45f6-85e7-03fa34133cfc" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="12" data-magicpath-path="ScorePage.tsx">
              <SortableContainer dndKitId="e02270b9-8f94-4652-a0bf-ed1ea796ed2d" containerType="regular" prevTag="div" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-magicpath-id="13" data-magicpath-path="ScorePage.tsx">
                <BarChart3 className="w-5 h-5 text-blue-600" data-magicpath-id="14" data-magicpath-path="ScorePage.tsx" />
              </SortableContainer>
              <SortableContainer dndKitId="eb0a341f-fe02-4b70-aff2-d596cb589de5" containerType="regular" prevTag="div" data-magicpath-id="15" data-magicpath-path="ScorePage.tsx">
                <h1 className="text-3xl font-bold text-slate-800" data-magicpath-id="16" data-magicpath-path="ScorePage.tsx">
                  <span data-magicpath-id="17" data-magicpath-path="ScorePage.tsx">Score Responses</span>
                </h1>
                <p className="text-slate-600" data-magicpath-id="18" data-magicpath-path="ScorePage.tsx">
                  <span data-magicpath-id="19" data-magicpath-path="ScorePage.tsx">{currentRFIRFQ.id} - {currentRFIRFQ.title}</span>
                </p>
              </SortableContainer>
            </SortableContainer>

            {vendorScores.length > 0 && <SortableContainer dndKitId="cade0bf8-86ff-47fc-bd6b-e2d6f117d2ed" containerType="regular" prevTag="button" onClick={handleCompareAll} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2" data-magicpath-id="20" data-magicpath-path="ScorePage.tsx">
                <TrendingUp className="w-5 h-5" data-magicpath-id="21" data-magicpath-path="ScorePage.tsx" />
                <span data-magicpath-id="22" data-magicpath-path="ScorePage.tsx">Compare All</span>
              </SortableContainer>}
          </SortableContainer>

          <SortableContainer dndKitId="589eba40-2c1d-423c-b4b5-084facebee26" containerType="collection" prevTag="div" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8" data-magicpath-id="23" data-magicpath-path="ScorePage.tsx">
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

          {showComparison && vendorScores.length > 0 && <SortableContainer dndKitId="f88f6b8f-9efd-4984-84f6-8e954fc8e095" containerType="regular" prevTag="div" className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200" data-magicpath-id="66" data-magicpath-path="ScorePage.tsx">
              <SortableContainer dndKitId="945d9a1d-9782-4683-98ad-7fcc06b73674" containerType="regular" prevTag="div" className="flex items-center space-x-3 mb-6" data-magicpath-id="67" data-magicpath-path="ScorePage.tsx">
                <SortableContainer dndKitId="38cfd664-d706-4f22-90bb-ba3d5368a27e" containerType="regular" prevTag="div" className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center" data-magicpath-id="68" data-magicpath-path="ScorePage.tsx">
                  <TrendingUp className="w-5 h-5 text-green-600" data-magicpath-id="69" data-magicpath-path="ScorePage.tsx" />
                </SortableContainer>
                <h2 className="text-2xl font-bold text-slate-800" data-magicpath-id="70" data-magicpath-path="ScorePage.tsx">
                  <span data-magicpath-id="71" data-magicpath-path="ScorePage.tsx">AI Comparison & Recommendation</span>
                </h2>
              </SortableContainer>

              <SortableContainer dndKitId="239c7807-db6c-45bd-87bb-86bd40d3feab" containerType="regular" prevTag="div" className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-magicpath-id="72" data-magicpath-path="ScorePage.tsx">
                <SortableContainer dndKitId="2ce0ef68-4c75-415b-8c92-ebee3c15fc33" containerType="regular" prevTag="div" data-magicpath-id="73" data-magicpath-path="ScorePage.tsx">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4" data-magicpath-id="74" data-magicpath-path="ScorePage.tsx">
                    <span data-magicpath-id="75" data-magicpath-path="ScorePage.tsx">Vendor Rankings</span>
                  </h3>
                  <SortableContainer dndKitId="868033f9-28a1-4251-a29b-e35e56c22411" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="76" data-magicpath-path="ScorePage.tsx">
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

                <SortableContainer dndKitId="04462721-adc9-48e6-be70-ddc4c18e89f8" containerType="regular" prevTag="div" data-magicpath-id="85" data-magicpath-path="ScorePage.tsx">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4" data-magicpath-id="86" data-magicpath-path="ScorePage.tsx">
                    <span data-magicpath-id="87" data-magicpath-path="ScorePage.tsx">Recommended Vendor</span>
                  </h3>
                  {(() => {
                const recommended = getRecommendedVendor();
                if (!recommended) return null;
                return <SortableContainer dndKitId="1ee05ee3-02b4-4f79-9667-ea57ddfb369e" containerType="regular" prevTag="div" className="bg-white rounded-lg p-6 border-2 border-green-300" data-magicpath-id="88" data-magicpath-path="ScorePage.tsx">
                        <SortableContainer dndKitId="35f7631c-caea-4fbe-b1a8-5dfa27142b74" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="89" data-magicpath-path="ScorePage.tsx">
                          <h4 className="text-xl font-bold text-slate-800" data-magicpath-id="90" data-magicpath-path="ScorePage.tsx">
                            <span data-magicpath-id="91" data-magicpath-path="ScorePage.tsx">{recommended.vendorName}</span>
                          </h4>
                          <SortableContainer dndKitId="53a11e92-8ca8-4998-a49b-882b4ca5f489" containerType="regular" prevTag="div" className="flex items-center space-x-1" data-magicpath-id="92" data-magicpath-path="ScorePage.tsx">
                            <Award className="w-5 h-5 text-green-600" data-magicpath-id="93" data-magicpath-path="ScorePage.tsx" />
                            <span className="text-xl font-bold text-green-600" data-magicpath-id="94" data-magicpath-path="ScorePage.tsx">{recommended.score}</span>
                          </SortableContainer>
                        </SortableContainer>
                        
                        <p className="text-slate-700 mb-4" data-magicpath-id="95" data-magicpath-path="ScorePage.tsx">
                          <span data-magicpath-id="96" data-magicpath-path="ScorePage.tsx">{recommended.aiRecommendation}</span>
                        </p>

                        <SortableContainer dndKitId="869ed36a-121e-45b4-ae11-87ebf6eae086" containerType="regular" prevTag="div" className="grid grid-cols-1 gap-4 mb-6" data-magicpath-id="97" data-magicpath-path="ScorePage.tsx">
                          <SortableContainer dndKitId="46ce919d-1d78-42cd-9181-4c6532e18e48" containerType="regular" prevTag="div" data-magicpath-id="98" data-magicpath-path="ScorePage.tsx">
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

                        <SortableContainer dndKitId="0eb04018-14a7-4222-a54d-37e335828f40" containerType="regular" prevTag="button" onClick={() => handleSelectVendor(recommended.vendorName)} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2" data-magicpath-id="105" data-magicpath-path="ScorePage.tsx">
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