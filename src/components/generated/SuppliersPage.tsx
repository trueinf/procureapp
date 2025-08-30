import React, { useMemo, useState } from 'react';
import { RFIRFQData } from './ProcureApp';
import { Users, Building2, Search, Mail, Phone, Package } from 'lucide-react';
import { RecommendationPage } from '../suppliers/recommendation/RecommendationPage';
import { HeatmapGrid } from '../suppliers/recommendation/HeatmapGrid';

interface SuppliersPageProps {
  rfirfqData: RFIRFQData[];
  view?: 'segmentation' | 'recommendation' | 'heatmap';
}

const SAMPLE_SUPPLIERS = [
  'AWS Enterprise',
  'Microsoft Azure',
  'Google Cloud Platform',
  'IBM Cloud',
  'Oracle Cloud',
  'CyberGuard Pro',
  'SecureNet Solutions',
  'DefenseFirst Technologies',
];

export const SuppliersPage: React.FC<SuppliersPageProps> = ({ rfirfqData, view = 'segmentation' }) => {
  const [query, setQuery] = useState('');

  const suppliers = useMemo(() => {
    const set = new Set<string>();
    for (const req of rfirfqData) {
      (req.vendors || []).forEach(v => v && set.add(v));
    }
    if (set.size === 0) SAMPLE_SUPPLIERS.forEach(v => set.add(v));
    return Array.from(set.values()).sort();
  }, [rfirfqData]);

  const supplierUsage = useMemo(() => {
    const count: Record<string, number> = {};
    for (const req of rfirfqData) {
      (req.vendors || []).forEach(v => {
        if (!v) return;
        count[v] = (count[v] || 0) + 1;
      });
    }
    return count;
  }, [rfirfqData]);

  const filtered = suppliers.filter(s => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Suppliers</h1>
                <p className="text-slate-600">Directory and analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-slate-50">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                className="bg-transparent outline-none text-sm"
                placeholder="Search suppliers"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Subnav removed: navigation handled by top menu dropdown */}

        {view === 'segmentation' && (
          <SupplierSegmentation />
        )}

        {view === 'recommendation' && (
          <RecommendationPage startTab="overview" />
        )}

        {view === 'heatmap' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-800">Supplier Heatmap</h2>
              <p className="text-slate-600 text-sm">Rating intensity by sub-factor and supplier (read-only)</p>
            </div>
            <HeatmapGrid />
          </div>
        )}

        {view !== 'segmentation' && view !== 'recommendation' && view !== 'heatmap' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(name => (
            <div key={name} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{name}</div>
                    <div className="text-xs text-slate-500">{supplierUsage[name] ? `${supplierUsage[name]} request${supplierUsage[name] > 1 ? 's' : ''}` : 'New supplier'}</div>
                  </div>
                </div>
                <div className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full border">Vendor</div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                <Building2 className="w-4 h-4" />
                <span>Category: {guessCategory(name)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                <Mail className="w-4 h-4" />
                <span>contact@{name.replace(/\s+/g, '').toLowerCase()}.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 000-0000</span>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
                <Package className="w-4 h-4" />
                <span>Invite to New RFQ</span>
              </button>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

function guessCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('cloud') || n.includes('aws') || n.includes('azure') || n.includes('gcp')) return 'IT Services';
  if (n.includes('cyber') || n.includes('secure')) return 'Security';
  return 'General';
}

// Card-based segmentation layout
const SupplierSegmentation: React.FC = () => {
  const card = (
    title: string,
    tag: string,
    headerClass: string,
    desc: string,
    items: string[]
  ) => (
    <div className="rounded-2xl border shadow-sm bg-white overflow-hidden">
      <div className={`px-5 py-3 ${headerClass}`}>
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-[11px] opacity-80">{tag}</div>
      </div>
      <div className="p-5">
        <div className="text-sm text-slate-700 mb-2">{desc}</div>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          {items.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Supplier Segmentation Framework</h2>
        <p className="text-slate-600 text-sm">Classify suppliers by strategic importance, risk, and spend profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {card(
          'Preferred',
          'High strategic importance',
          'bg-blue-700 text-white',
          'High dependency and spend; continuity is critical.',
          [
            'Supplier Risk Profiling (SRP) elements',
            'Sourcing Difficulty – High',
            'Dependency – High',
            'Spend (Past 12 months + Forecast next 12 months) – High',
            'Supply continuity Risk – High',
          ]
        )}

        {card(
          'Strategic',
          'Very high strategic importance',
          'bg-indigo-800 text-white',
          'Very high/high spend and risk; long‑term partners.',
          [
            'Supplier Risk Profiling (SRP) elements',
            'Sourcing Difficulty – Very High/ High',
            'Dependency – High',
            'Spend (Past 12 months + Forecast next 12 months) – Very High/ High',
            'Supply continuity Risk – Very High/ High',
          ]
        )}

        {card(
          'Transactional / Operational',
          'Low strategic importance',
          'bg-slate-100 text-slate-800',
          'Commoditized supply; easy to switch; lower risk.',
          [
            'Supplier Risk Profiling (SRP) elements',
            'Sourcing Difficulty – Nil / Commoditized',
            'Dependency – Low/ Nil',
            'Spend (Past 12 months + Forecast next 12 months) – Medium/ Low (easy to switch)',
            'Supply continuity Risk – Low/ Nil',
          ]
        )}

        {card(
          'Tactical',
          'Medium strategic importance',
          'bg-slate-200 text-slate-900',
          'Manageable risk; moderate spend and larger supplier pool.',
          [
            'Supplier Risk Profiling (SRP) elements',
            'Sourcing Difficulty – Medium / Large pool available',
            'Dependency – Low',
            'Spend (Past 12 months + Forecast next 12 months) – Medium/ Low (not easy to switch)',
            'Supply continuity Risk – Medium/ Low',
          ]
        )}
      </div>
    </div>
  );
};
