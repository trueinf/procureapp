import React, { useEffect, useMemo, useState } from 'react';
import { RFIRFQData } from './ProcureApp';
import { Upload, Calendar, Users, FileText, Send, CheckCircle, Building2, User, Target, DollarSign, ClipboardCheck, Workflow, ChevronDown, Plus, X, Pencil, Check } from 'lucide-react';
interface InitiatePageProps {
  onCreateRFIRFQ: (data: Omit<RFIRFQData, 'id' | 'status' | 'createdDate'>) => void;
}

// @component: InitiatePage
export const InitiatePage = ({
  onCreateRFIRFQ
}: InitiatePageProps) => {
  const [formData, setFormData] = useState({
    // Basic Info
    documentType: 'RFQ' as 'RFI' | 'RFQ' | 'RFP',
    title: '',
    description: '',
    businessUnit: '',
    owner: '',
    
    // Suppliers
    supplierList: [] as string[],
    supplierEligibility: [] as string[],
    
    // Engagement Requirements
    serviceCategory: '',
    requiredSkills: [] as string[],
    teamSize: '',
    engagementDuration: { start: '', end: '' },
    workLocation: '',
    
    // Deliverables
    expectedOutputs: '',
    startDateMilestones: '',
    toolPreferences: [] as string[],
    
    // Commercial Terms
    pricingModel: '',
    budgetEstimate: '',
    paymentTerms: '',
    
    // Evaluation & Compliance
    scoringCriteria: [] as { criterion: string; weight: number }[],
    mandatoryQuestions: '',
    responseDeadline: '',
    bidValidity: '',
    ndaRequired: false,
    
    // Workflow
    approvers: [] as string[],
    internalNotes: '',
    
    // Legacy fields for compatibility
    vendorCount: 1,
    startDate: '',
    endDate: '',
    coverLetter: '',
    vendors: [] as string[],
    documents: [] as File[]
  });
  
  // success toast moved to parent (ProcureApp) for cross-tab visibility
  const [supplierInput, setSupplierInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [toolInput, setToolInput] = useState('');
  const [approverInput, setApproverInput] = useState('');
  const [criterionInput, setCriterionInput] = useState({ criterion: '', weight: 0 });
  const [criteriaError, setCriteriaError] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<{ criterion: string; weight: number }>({ criterion: '', weight: 0 });
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  // Helper functions for managing arrays
  const addSupplier = () => {
    if (supplierInput.trim() && !formData.supplierList.includes(supplierInput.trim())) {
      setFormData(prev => ({
        ...prev,
        supplierList: [...prev.supplierList, supplierInput.trim()]
      }));
      setSupplierInput('');
    }
  };

  const removeSupplier = (supplier: string) => {
    setFormData(prev => ({
      ...prev,
      supplierList: prev.supplierList.filter(s => s !== supplier)
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.requiredSkills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill)
    }));
  };

  const addTool = () => {
    if (toolInput.trim() && !formData.toolPreferences.includes(toolInput.trim())) {
      setFormData(prev => ({
        ...prev,
        toolPreferences: [...prev.toolPreferences, toolInput.trim()]
      }));
      setToolInput('');
    }
  };

  const removeTool = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      toolPreferences: prev.toolPreferences.filter(t => t !== tool)
    }));
  };

  const addApprover = () => {
    if (approverInput.trim() && !formData.approvers.includes(approverInput.trim())) {
      setFormData(prev => ({
        ...prev,
        approvers: [...prev.approvers, approverInput.trim()]
      }));
      setApproverInput('');
    }
  };

  const removeApprover = (approver: string) => {
    setFormData(prev => ({
      ...prev,
      approvers: prev.approvers.filter(a => a !== approver)
    }));
  };

  const addCriterion = () => {
    if (criterionInput.criterion.trim() && criterionInput.weight > 0) {
      setFormData(prev => ({
        ...prev,
        scoringCriteria: [...prev.scoringCriteria, criterionInput]
      }));
      setCriterionInput({ criterion: '', weight: 0 });
      setCriteriaError(null);
    }
  };

  const removeCriterion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      scoringCriteria: prev.scoringCriteria.filter((_, i) => i !== index)
    }));
    setCriteriaError(null);
  };

  const startEditCriterion = (index: number) => {
    setEditingIndex(index);
    setEditingValue(formData.scoringCriteria[index]);
  };

  const saveEditCriterion = () => {
    if (editingIndex === null) return;
    if (!editingValue.criterion.trim() || editingValue.weight <= 0) return;
    setFormData(prev => ({
      ...prev,
      scoringCriteria: prev.scoringCriteria.map((c, i) => (i === editingIndex ? editingValue : c))
    }));
    setEditingIndex(null);
    setCriteriaError(null);
  };

  const cancelEditCriterion = () => {
    setEditingIndex(null);
    setEditingValue({ criterion: '', weight: 0 });
  };

  const totalCriteriaWeight = useMemo(
    () => formData.scoringCriteria.reduce((sum, c) => sum + (Number(c.weight) || 0), 0),
    [formData.scoringCriteria]
  );

  const criteriaValid = formData.scoringCriteria.length === 0 || totalCriteriaWeight === 100;

  // Load ElevenLabs ConvAI widget script once
  useEffect(() => {
    const scriptId = 'elevenlabs-convai-embed';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      s.async = true;
      s.type = 'text/javascript';
      s.id = scriptId;
      document.body.appendChild(s);
    }
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!criteriaValid) {
      setCriteriaError('Total scoring weight must equal 100%.');
      return;
    }
    
    // Map new form data to legacy format for compatibility
    const legacyData = {
      type: formData.documentType as 'RFI' | 'RFQ',
      title: formData.title,
      vendorCount: formData.supplierList.length || 1,
      startDate: formData.engagementDuration.start,
      endDate: formData.engagementDuration.end,
      coverLetter: formData.description,
      vendors: formData.supplierList,
      documents: formData.documents,
      scoringCriteria: formData.scoringCriteria,
      businessUnit: formData.businessUnit,
      owner: formData.owner,
      supplierEligibility: formData.supplierEligibility,
      serviceCategory: formData.serviceCategory,
      requiredSkills: formData.requiredSkills,
      teamSize: formData.teamSize,
      workLocation: formData.workLocation,
      expectedOutputs: formData.expectedOutputs,
      startDateMilestones: formData.startDateMilestones,
      toolPreferences: formData.toolPreferences,
      pricingModel: formData.pricingModel,
      budgetEstimate: formData.budgetEstimate,
      paymentTerms: formData.paymentTerms,
      responseDeadline: formData.responseDeadline,
      bidValidity: formData.bidValidity,
      ndaRequired: formData.ndaRequired,
      approvers: formData.approvers,
      internalNotes: formData.internalNotes
    };
    
    onCreateRFIRFQ(legacyData);
    // Reset form
    setFormData({
      documentType: 'RFQ',
      title: '',
      description: '',
      businessUnit: '',
      owner: '',
      supplierList: [],
      supplierEligibility: [],
      serviceCategory: '',
      requiredSkills: [],
      teamSize: '',
      engagementDuration: { start: '', end: '' },
      workLocation: '',
      expectedOutputs: '',
      startDateMilestones: '',
      toolPreferences: [],
      pricingModel: '',
      budgetEstimate: '',
      paymentTerms: '',
      scoringCriteria: [],
      mandatoryQuestions: '',
      responseDeadline: '',
      bidValidity: '',
      ndaRequired: false,
      approvers: [],
      internalNotes: '',
      vendorCount: 1,
      startDate: '',
      endDate: '',
      coverLetter: '',
      vendors: [],
      documents: []
    });
  };

  // @return
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
              <span>Initiate New Request</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Basic Info Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Basic Information</h2>
              </div>
              
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Document Type</label>
                  <select 
                    value={formData.documentType} 
                    onChange={e => setFormData(prev => ({ ...prev, documentType: e.target.value as 'RFI' | 'RFQ' | 'RFP' }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="RFI">RFI - Request for Information</option>
                    <option value="RFQ">RFQ - Request for Quotation</option>
                    <option value="RFP">RFP - Request for Proposal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Business Unit / Department</label>
                  <input 
                    type="text" 
                    value={formData.businessUnit}
                    onChange={e => setFormData(prev => ({ ...prev, businessUnit: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="IT Department" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Title / Subject</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="IT Infrastructure Services RFQ" 
                    required 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Description / Scope</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Detailed description of the project scope and requirements..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Owner / Contact Person</label>
                  <input 
                    type="text" 
                    value={formData.owner}
                    onChange={e => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="John Smith" 
                  />
                </div>
              </div>
            </div>

            {/* Suppliers Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Suppliers</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Supplier List</label>
                  <div className="flex space-x-2 mb-3">
                    <input 
                      type="text" 
                      value={supplierInput}
                      onChange={e => setSupplierInput(e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Enter supplier name" 
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSupplier())}
                    />
                    <button type="button" onClick={addSupplier} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.supplierList.map(supplier => 
                      <span key={supplier} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        <span>{supplier}</span>
                        <button type="button" onClick={() => removeSupplier(supplier)} className="ml-2 text-blue-600 hover:text-blue-800">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Supplier Eligibility</label>
                  <div className="space-y-2">
                    {['Pre-approved vendors only', 'Open to new vendors', 'Certified vendors required', 'Local vendors preferred'].map(option => 
                      <label key={option} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={formData.supplierEligibility.includes(option)}
                          onChange={e => {
                            if (e.target.checked) {
                              setFormData(prev => ({ ...prev, supplierEligibility: [...prev.supplierEligibility, option] }));
                            } else {
                              setFormData(prev => ({ ...prev, supplierEligibility: prev.supplierEligibility.filter(item => item !== option) }));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" 
                        />
                        <span className="text-sm text-slate-700">{option}</span>
                </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Requirements Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Target className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Engagement Requirements</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Service Category</label>
                  <select 
                    value={formData.serviceCategory}
                    onChange={e => setFormData(prev => ({ ...prev, serviceCategory: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Construction">Construction</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Legal">Legal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Team Size / Mix</label>
                  <input 
                    type="text" 
                    value={formData.teamSize}
                    onChange={e => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="5-10 people, 2 seniors + 3 juniors" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Required Roles / Skills</label>
                  <div className="flex space-x-2 mb-3">
                    <input 
                      type="text" 
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Enter required skill" 
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <button type="button" onClick={addSkill} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requiredSkills.map(skill => 
                      <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                        <span>{skill}</span>
                        <button type="button" onClick={() => removeSkill(skill)} className="ml-2 text-green-600 hover:text-green-800">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Engagement Duration</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="date" 
                      value={formData.engagementDuration.start}
                      onChange={e => setFormData(prev => ({ ...prev, engagementDuration: { ...prev.engagementDuration, start: e.target.value } }))}
                      className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                    <input 
                      type="date" 
                      value={formData.engagementDuration.end}
                      onChange={e => setFormData(prev => ({ ...prev, engagementDuration: { ...prev.engagementDuration, end: e.target.value } }))}
                      className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                </div>
              </div>

              <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Work Location</label>
                  <select 
                    value={formData.workLocation}
                    onChange={e => setFormData(prev => ({ ...prev, workLocation: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select location</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Client site">Client site</option>
                </select>
                </div>
              </div>
            </div>

            {/* Deliverables Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Deliverables</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Expected Outputs</label>
                  <textarea 
                    value={formData.expectedOutputs}
                    onChange={e => setFormData(prev => ({ ...prev, expectedOutputs: e.target.value }))}
                    rows={4} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="List expected deliverables, reports, documentation..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Start Date & Milestones</label>
                  <textarea 
                    value={formData.startDateMilestones}
                    onChange={e => setFormData(prev => ({ ...prev, startDateMilestones: e.target.value }))}
                    rows={3} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Project timeline and key milestones..."
                  />
            </div>

            <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Tool/Tech Preferences</label>
                  <div className="flex space-x-2 mb-3">
                    <input 
                      type="text" 
                      value={toolInput}
                      onChange={e => setToolInput(e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Enter preferred tool or technology" 
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTool())}
                    />
                    <button type="button" onClick={addTool} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.toolPreferences.map(tool => 
                      <span key={tool} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                        <span>{tool}</span>
                        <button type="button" onClick={() => removeTool(tool)} className="ml-2 text-purple-600 hover:text-purple-800">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial Terms Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Commercial Terms</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Pricing Model</label>
                  <select 
                    value={formData.pricingModel}
                    onChange={e => setFormData(prev => ({ ...prev, pricingModel: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select pricing model</option>
                    <option value="Fixed Price">Fixed Price</option>
                    <option value="Time & Materials">Time & Materials</option>
                    <option value="Milestone Based">Milestone Based</option>
                    <option value="Retainer">Retainer</option>
                    <option value="Performance Based">Performance Based</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Budget Estimate</label>
                  <input 
                    type="text" 
                    value={formData.budgetEstimate}
                    onChange={e => setFormData(prev => ({ ...prev, budgetEstimate: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="$50,000 - $100,000" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Payment Terms</label>
                  <select 
                    value={formData.paymentTerms}
                    onChange={e => setFormData(prev => ({ ...prev, paymentTerms: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select payment terms</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 60">Net 60</option>
                    <option value="50% upfront, 50% completion">50% upfront, 50% completion</option>
                    <option value="Monthly invoicing">Monthly invoicing</option>
                    <option value="Milestone based">Milestone based</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Evaluation & Compliance Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <ClipboardCheck className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Evaluation & Compliance</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Scoring Criteria</label>
                  <div className="flex space-x-2 mb-3">
                    <input 
                      type="text" 
                      value={criterionInput.criterion}
                      onChange={e => setCriterionInput(prev => ({ ...prev, criterion: e.target.value }))}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Enter scoring criterion" 
                    />
                    <input 
                      type="number" 
                      value={criterionInput.weight}
                      onChange={e => setCriterionInput(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                      className="w-20 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="%" 
                      min="0" 
                      max="100"
                    />
                    <button type="button" onClick={addCriterion} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-600">Total Weight</span>
                      <span className={totalCriteriaWeight === 100 ? 'text-green-600 font-semibold' : totalCriteriaWeight > 100 ? 'text-red-600 font-semibold' : 'text-amber-600 font-semibold'}>
                        {totalCriteriaWeight}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-2 ${totalCriteriaWeight === 100 ? 'bg-green-500' : totalCriteriaWeight > 100 ? 'bg-red-500' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(totalCriteriaWeight, 100)}%` }}
                      />
                    </div>
                    {!criteriaValid && (
                      <div className="mt-2 text-xs text-red-600">Total must equal 100% to submit.</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {formData.scoringCriteria.map((criterion, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        {editingIndex === index ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={editingValue.criterion}
                              onChange={(e) => setEditingValue(v => ({ ...v, criterion: e.target.value }))}
                              className="flex-1 px-2 py-1 border rounded"
                            />
                            <input
                              type="number"
                              value={editingValue.weight}
                              onChange={(e) => setEditingValue(v => ({ ...v, weight: parseInt(e.target.value) || 0 }))}
                              className="w-20 px-2 py-1 border rounded"
                              min={0}
                              max={100}
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-slate-700">{criterion.criterion}</span>
                        )}
                        <div className="flex items-center space-x-2">
                          {editingIndex === index ? (
                            <>
                              <button type="button" onClick={saveEditCriterion} className="text-green-600 hover:text-green-800" title="Save">
                                <Check className="w-4 h-4" />
                              </button>
                              <button type="button" onClick={cancelEditCriterion} className="text-slate-500 hover:text-slate-700" title="Cancel">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="text-sm font-medium text-slate-600">{criterion.weight}%</span>
                              <button type="button" onClick={() => startEditCriterion(index)} className="text-blue-600 hover:text-blue-800" title="Edit">
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button type="button" onClick={() => removeCriterion(index)} className="text-red-600 hover:text-red-800" title="Remove">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Response Deadline</label>
                    <input 
                      type="date" 
                      value={formData.responseDeadline}
                      onChange={e => setFormData(prev => ({ ...prev, responseDeadline: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Bid Validity (days)</label>
                    <input 
                      type="number" 
                      value={formData.bidValidity}
                      onChange={e => setFormData(prev => ({ ...prev, bidValidity: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="30" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Mandatory Questions</label>
                  <textarea 
                    value={formData.mandatoryQuestions}
                    onChange={e => setFormData(prev => ({ ...prev, mandatoryQuestions: e.target.value }))}
                    rows={4} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="List mandatory questions that vendors must answer..."
                  />
              </div>

              <div>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={formData.ndaRequired}
                      onChange={e => setFormData(prev => ({ ...prev, ndaRequired: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" 
                    />
                    <span className="text-sm font-medium text-slate-700">NDA / Confidentiality Agreement Required</span>
                </label>
                </div>
              </div>
            </div>

            {/* Workflow Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Workflow className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Workflow</h2>
              </div>
              
              <div className="space-y-6">
            <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Approvers</label>
              <div className="flex space-x-2 mb-3">
                    <input 
                      type="text" 
                      value={approverInput}
                      onChange={e => setApproverInput(e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Enter approver name" 
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addApprover())}
                    />
                    <button type="button" onClick={addApprover} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                    {formData.approvers.map(approver => 
                      <span key={approver} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                        <span>{approver}</span>
                        <button type="button" onClick={() => removeApprover(approver)} className="ml-2 text-orange-600 hover:text-orange-800">
                          <X className="w-3 h-3" />
                    </button>
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Notes (Internal Only)</label>
                  <textarea 
                    value={formData.internalNotes}
                    onChange={e => setFormData(prev => ({ ...prev, internalNotes: e.target.value }))}
                    rows={4} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Internal notes and comments..."
                  />
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Upload className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Documents</h2>
              </div>
              
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-slate-500">PDF, DOC, DOCX up to 10MB</p>
                </label>
              </div>
              {formData.documents.length > 0 && 
                <div className="mt-4 space-y-2">
                  {formData.documents.map((file, index) => 
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span className="text-sm text-slate-700">{file.name}</span>
                      <span className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  )}
            </div>
              }
            </div>

            <button type="submit" disabled={!criteriaValid} className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${criteriaValid ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>
              <Send className="w-5 h-5" />
              <span>Send Request</span>
            </button>
          </form>

        </div>
      </div>
      {/* ElevenLabs voice bot */}
      <elevenlabs-convai agent-id="agent_7601k3xeyd7feyk8gx1ak2sc4egn"></elevenlabs-convai>
    </div>;
};
