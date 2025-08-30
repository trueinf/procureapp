import React from 'react';
import { categories, subFactors, suppliers } from '../../../data/suppliers/recommendation';
import { ratings } from '../../../data/suppliers/recommendation';
import { ratingPalette } from './tokens';

export const HeatmapGrid: React.FC = () => {
  const ratingMap = new Map<string, number>();
  ratings.forEach(r => ratingMap.set(`${r.supplierId}:${r.subFactorId}`, r.value));

  return (
    <div className="overflow-auto border rounded-xl">
      <div className="min-w-[800px]">
        <div className="grid" style={{ gridTemplateColumns: `260px 1fr repeat(${suppliers.length}, 140px)` }}>
          <div className="px-4 py-3 font-semibold bg-slate-100">SRP element category</div>
          <div className="px-4 py-3 font-semibold bg-slate-100">SRP sub factors</div>
          {suppliers.map(s => <div key={s.id} className="px-2 py-3 font-semibold text-center bg-slate-100">{s.name}</div>)}

          {categories.map(cat => (
            <React.Fragment key={cat.id}>
              {subFactors.filter(sf => sf.categoryId === cat.id).map((sf, idx, arr) => (
                <React.Fragment key={sf.id}>
                  {idx === 0 && <div className="px-4 py-3 font-semibold border-t" style={{ gridRow: `span ${arr.length}` }}>{cat.name}</div>}
                  <div className="px-4 py-3 border-t">{sf.label}</div>
                  {suppliers.map(s => {
                    const val = ratingMap.get(`${s.id}:${sf.id}`) ?? 3;
                    const palette = ratingPalette[val as 0|1|2|3|4|5];
                    return (
                      <div
                        key={s.id}
                        className={`m-2 rounded-md h-8 border ${palette.bg} ${palette.text} text-[13px] font-semibold flex items-center justify-center`}
                      >
                        {val}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
