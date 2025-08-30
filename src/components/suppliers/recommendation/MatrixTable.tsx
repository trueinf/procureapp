import React from 'react';
import { categories, subFactors, suppliers, ratingValueToLabel } from '../../../data/suppliers/recommendation';
import { ratings } from '../../../data/suppliers/recommendation';
import { ratingPalette, segmentForPercent } from './tokens';

export const MatrixTable: React.FC<{ scores: Array<{ supplierId: string; total: number; max: number }> }>
  = ({ scores }) => {
  const scoreMap = new Map(scores.map(s => [s.supplierId, s] as const));
  const ratingMap = new Map<string, number>();
  ratings.forEach(r => ratingMap.set(`${r.supplierId}:${r.subFactorId}`, r.value));

  return (
    <div className="overflow-auto border rounded-xl">
      <table className="min-w-[800px] w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left px-4 py-3 font-semibold text-slate-700 w-64">SRP element category</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-700">SRP sub factors</th>
            {suppliers.map(s => (
              <th key={s.id} className="px-3 py-3 font-semibold text-slate-700 text-center">{s.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <React.Fragment key={cat.id}>
              {subFactors.filter(sf => sf.categoryId === cat.id).map((sf, idx, arr) => (
                <tr key={sf.id} className="border-t">
                  {idx === 0 && (
                    <td className="align-top px-4 py-3 font-semibold text-slate-800" rowSpan={arr.length}>{cat.name}</td>
                  )}
                  <td className="px-4 py-3 text-slate-700">{sf.label}</td>
                  {suppliers.map(s => {
                    const val = ratingMap.get(`${s.id}:${sf.id}`) ?? 3;
                    const palette = ratingPalette[val as 0|1|2|3|4|5];
                    const label = ratingValueToLabel[val] || '—';
                    return (
                      <td key={s.id} className="px-3 py-2 text-center">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${palette.bg} ${palette.text}`}>{label}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-slate-50 border-t">
            <td className="px-4 py-3 font-semibold text-slate-800">Totals</td>
            <td></td>
            {suppliers.map(s => {
              const sc = scoreMap.get(s.id)!;
              const pct = sc.max ? sc.total / sc.max : 0;
              const seg = segmentForPercent(pct);
              return (
                <td key={s.id} className="px-3 py-2 text-center">
                  <div className="inline-flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-slate-200 text-slate-800 text-xs">{Math.round(pct*100)}%</span>
                    <span className={`px-2 py-1 rounded text-white text-xs ${seg.color}`}>{seg.name}</span>
                  </div>
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

