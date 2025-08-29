import React, { useState } from 'react';
import { RFIRFQData } from './ProcureApp';
import { BarChart3, FileText, Star, TrendingUp, Award, Brain, CheckCircle, Eye, X, AlertTriangle, DollarSign, Shield, Zap } from 'lucide-react';
interface ScorePageProps {
  selectedRFIRFQ: string | null;
  rfirfqData: RFIRFQData[];
  onAwardVendor: (vendorName: string) => void;
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
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-600 mb-2">
              <span>No RFI/RFQ Selected</span>
            </h2>
            <p className="text-slate-500">
              <span>Please select an RFI/RFQ from the View page to start scoring vendor responses.</span>
            </p>
          </div>
        </div>
      </div>;
  }

  // @return
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  <span>Score Responses</span>
                </h1>
                <p className="text-slate-600">
                  <span>{currentRFIRFQ.id} - {currentRFIRFQ.title}</span>
                </p>
              </div>
            </div>

            {vendorScores.length > 0 && <button onClick={handleCompareAll} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Compare All</span>
              </button>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {dynamicMockVendorData.map(vendor => {
            const scoredVendor = vendorScores.find(v => v.id === vendor.id);
            const isScored = !!scoredVendor;
            const isCurrentlyScoring = isScoring === vendor.id;
            return <div key={vendor.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">
                      <span>{vendor.vendorName}</span>
                    </h3>
                    {isScored && <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-xl font-bold text-slate-800">{scoredVendor.score}</span>
                      </div>}
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{vendor.documentName}</span>
                  </div>

                  {isScored && <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Technical</span>
                        <span className="text-sm font-medium text-slate-800">{scoredVendor.technicalScore}/100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{
                    width: `${scoredVendor.technicalScore}%`
                  }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Commercial</span>
                        <span className="text-sm font-medium text-slate-800">{scoredVendor.commercialScore}/100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{
                    width: `${scoredVendor.commercialScore}%`
                  }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Compliance</span>
                        <span className="text-sm font-medium text-slate-800">{scoredVendor.complianceScore}/100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{
                    width: `${scoredVendor.complianceScore}%`
                  }}></div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3 mt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">AI Recommendation</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          <span>{scoredVendor.aiRecommendation}</span>
                        </p>
                      </div>
                    </div>}

                  <button onClick={() => handleScoreVendor(vendor.id)} disabled={isCurrentlyScoring || isScored} className={`
                      w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2
                      ${isScored ? 'bg-green-100 text-green-800 cursor-not-allowed' : isCurrentlyScoring ? 'bg-blue-100 text-blue-800 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}
                    `}>
                    {isCurrentlyScoring ? <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Scoring...</span>
                      </div> : isScored ? <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Scored</span>
                      </div> : <div className="flex items-center space-x-2">
                        <Brain className="w-4 h-4" />
                        <span>Score with AI</span>
                      </div>}
                  </button>
                </div>;
          })}
          </div>

          {showComparison && vendorScores.length > 0 && <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  <span>AI Comparison & Recommendation</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    <span>Vendor Rankings</span>
                  </h3>
                  <div className="space-y-3">
                    {vendorScores.sort((a, b) => b.score - a.score).map((vendor, index) => <div key={vendor.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                              ${index === 0 ? 'bg-gold-100 text-gold-800' : index === 1 ? 'bg-silver-100 text-silver-800' : 'bg-bronze-100 text-bronze-800'}
                            `}>
                              <span>{index + 1}</span>
                            </div>
                            <span className="font-medium text-slate-800">{vendor.vendorName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-slate-800">{vendor.score}</span>
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          </div>
                        </div>)}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    <span>Recommended Vendor</span>
                  </h3>
                  {(() => {
                const recommended = getRecommendedVendor();
                if (!recommended) return null;
                return <div className="bg-white rounded-lg p-6 border-2 border-green-300">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-bold text-slate-800">
                            <span>{recommended.vendorName}</span>
                          </h4>
                          <div className="flex items-center space-x-1">
                            <Award className="w-5 h-5 text-green-600" />
                            <span className="text-xl font-bold text-green-600">{recommended.score}</span>
                          </div>
                        </div>
                        
                        <p className="text-slate-700 mb-4">
                          <span>{recommended.aiRecommendation}</span>
                        </p>

                        <div className="grid grid-cols-1 gap-4 mb-6">
                          <div>
                            <h5 className="font-medium text-green-800 mb-2">
                              <span>Strengths</span>
                            </h5>
                            <ul className="space-y-1">
                              {recommended.strengths.map((strength, idx) => <li key={idx} className="text-sm text-slate-600 flex items-center space-x-2">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  <span>{strength}</span>
                                </li>)}
                            </ul>
                          </div>
                        </div>

                        <div className="flex space-x-3 mb-6">
                          <button onClick={() => setShowDetailedAnalysis(true)} className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                            <Eye className="w-4 h-4" />
                            <span>View Detailed Analysis</span>
                          </button>
                        </div>

                        <button onClick={() => handleSelectVendor(recommended.vendorName)} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                          <Award className="w-5 h-5" />
                          <span>Select This Vendor</span>
                        </button>
                      </div>;
              })()}
                </div>
              </div>
            </div>}
        </div>

        {/* Detailed Analysis Modal */}
        {showDetailedAnalysis && vendorScores.length > 0 && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Detailed AI Analysis</h2>
                    <p className="text-slate-600">{currentRFIRFQ?.title}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetailedAnalysis(false)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Executive Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span>Executive Summary</span>
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Based on comprehensive AI analysis of all vendor proposals, we've evaluated {vendorScores.length} vendors across technical capabilities, commercial viability, and compliance requirements. Our recommendation prioritizes long-term value, risk mitigation, and strategic alignment with your organizational goals.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{vendorScores.length}</div>
                      <div className="text-sm text-slate-600">Vendors Analyzed</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{Math.round(vendorScores.reduce((sum, v) => sum + v.score, 0) / vendorScores.length)}</div>
                      <div className="text-sm text-slate-600">Average Score</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
                      <div className="text-sm text-slate-600">Confidence Level</div>
                    </div>
                  </div>
                </div>

                {/* Detailed Vendor Comparison */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Comprehensive Vendor Analysis</span>
                  </h3>
                  
                  <div className="space-y-6">
                    {vendorScores.sort((a, b) => b.score - a.score).map((vendor, index) => <div key={vendor.id} className={`rounded-xl p-6 border-2 ${index === 0 ? 'bg-green-50 border-green-300' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-green-600 text-white' : index === 1 ? 'bg-blue-600 text-white' : 'bg-slate-600 text-white'}`}>
                              <span>{index + 1}</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800">{vendor.vendorName}</h4>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="text-2xl font-bold text-slate-800">{vendor.score}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                          {/* Technical Analysis */}
                          <div className="bg-white rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-3">
                              <Zap className="w-4 h-4 text-blue-600" />
                              <h5 className="font-semibold text-slate-800">Technical ({vendor.technicalScore}/100)</h5>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                              <div className="bg-blue-600 h-2 rounded-full" style={{
                          width: `${vendor.technicalScore}%`
                        }}></div>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-1">
                              <li>• Architecture scalability: Excellent</li>
                              <li>• Integration capabilities: Strong</li>
                              <li>• Performance benchmarks: Above average</li>
                              <li>• Innovation factor: High</li>
                            </ul>
                          </div>

                          {/* Commercial Analysis */}
                          <div className="bg-white rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-3">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <h5 className="font-semibold text-slate-800">Commercial ({vendor.commercialScore}/100)</h5>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                              <div className="bg-green-600 h-2 rounded-full" style={{
                          width: `${vendor.commercialScore}%`
                        }}></div>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-1">
                              <li>• Total cost of ownership: Competitive</li>
                              <li>• Payment terms: Favorable</li>
                              <li>• ROI projection: {85 + Math.floor(Math.random() * 15)}%</li>
                              <li>• Contract flexibility: Good</li>
                            </ul>
                          </div>

                          {/* Compliance Analysis */}
                          <div className="bg-white rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-3">
                              <Shield className="w-4 h-4 text-purple-600" />
                              <h5 className="font-semibold text-slate-800">Compliance ({vendor.complianceScore}/100)</h5>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                              <div className="bg-purple-600 h-2 rounded-full" style={{
                          width: `${vendor.complianceScore}%`
                        }}></div>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-1">
                              <li>• Regulatory compliance: Full</li>
                              <li>• Security certifications: ISO 27001</li>
                              <li>• Data protection: GDPR compliant</li>
                              <li>• Audit readiness: Excellent</li>
                            </ul>
                          </div>
                        </div>

                        {/* Strengths and Weaknesses */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                          <div className="bg-green-50 rounded-lg p-4">
                            <h5 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>Key Strengths</span>
                            </h5>
                            <ul className="space-y-2">
                              {vendor.strengths.map((strength, idx) => <li key={idx} className="text-sm text-green-700 flex items-start space-x-2">
                                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{strength}</span>
                                </li>)}
                            </ul>
                          </div>

                          <div className="bg-orange-50 rounded-lg p-4">
                            <h5 className="font-semibold text-orange-800 mb-3 flex items-center space-x-2">
                              <AlertTriangle className="w-4 h-4" />
                              <span>Areas of Concern</span>
                            </h5>
                            <ul className="space-y-2">
                              {vendor.weaknesses.map((weakness, idx) => <li key={idx} className="text-sm text-orange-700 flex items-start space-x-2">
                                  <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                                  <span>{weakness}</span>
                                </li>)}
                            </ul>
                          </div>
                        </div>

                        {/* AI Recommendation for this vendor */}
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-800 mb-2 flex items-center space-x-2">
                            <Brain className="w-4 h-4" />
                            <span>AI Assessment</span>
                          </h5>
                          <p className="text-sm text-blue-700">{vendor.aiRecommendation}</p>
                        </div>
                      </div>)}
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    <span>Risk Assessment & Mitigation</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">Identified Risks</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">Vendor dependency concentration</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">Implementation timeline constraints</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">Budget variance potential</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">Mitigation Strategies</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">Establish clear SLAs and penalties</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">Implement phased delivery approach</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">Regular performance monitoring</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Final Recommendation */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span>Final AI Recommendation</span>
                  </h3>
                  <div className="bg-white rounded-lg p-6">
                    <p className="text-slate-700 leading-relaxed mb-4">
                      After thorough analysis of all proposals, <strong>{getRecommendedVendor()?.vendorName}</strong> emerges as the optimal choice for this procurement. This recommendation is based on a holistic evaluation that considers not just the scoring metrics, but also strategic fit, implementation feasibility, and long-term partnership potential.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Why This Vendor?</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• Highest overall score with balanced performance</li>
                          <li>• Strong technical capabilities and innovation</li>
                          <li>• Competitive commercial terms</li>
                          <li>• Excellent compliance and security posture</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Next Steps</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• Conduct final due diligence review</li>
                          <li>• Negotiate contract terms and SLAs</li>
                          <li>• Plan implementation timeline</li>
                          <li>• Establish governance framework</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};