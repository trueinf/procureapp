import { categories, subFactors, ratings, suppliers } from '../../../data/suppliers/recommendation';
import { segmentForPercent } from './tokens';

export type SupplierScore = {
  supplierId: string;
  supplierName: string;
  total: number;
  max: number;
  percent: number; // 0..1
  segment: { name: string; color: string };
  byCategory: Array<{ categoryId: string; name: string; value: number; max: number; avg0to5: number; percent: number }>;
  driversTop: Array<{ subFactorId: string; label: string; value: number }>;
  driversWeak: Array<{ subFactorId: string; label: string; value: number }>;
};

export function computeScores(): SupplierScore[] {
  const ratingMap = new Map<string, number>();
  ratings.forEach((r) => ratingMap.set(`${r.supplierId}:${r.subFactorId}`, r.value));

  const catWeights: Record<string, number> = Object.fromEntries(categories.map(c => [c.id, c.weight]));
  const catMaxWeighted = categories.reduce((sum, c) => sum + c.weight, 0);

  return suppliers.map((s) => {
    let total = 0;
    let max = 0;
    const byCategory: SupplierScore['byCategory'] = [];
    const subValues: Array<{ subFactorId: string; label: string; value: number }> = [];

    for (const cat of categories) {
      const subs = subFactors.filter(sf => sf.categoryId === cat.id);
      let catSum = 0;
      let catMax = 0;
      for (const sf of subs) {
        const val = ratingMap.get(`${s.id}:${sf.id}`) ?? 3; // default Medium
        const w = sf.weight;
        catSum += val * w;
        catMax += 5 * w;
        subValues.push({ subFactorId: sf.id, label: sf.label, value: val });
      }
      // apply category weight
      total += catSum * cat.weight;
      max += catMax * cat.weight;
      byCategory.push({
        categoryId: cat.id,
        name: cat.name,
        value: catSum,
        max: catMax,
        avg0to5: subs.length ? catSum / subs.length : 0,
        percent: catMax ? catSum / catMax : 0,
      });
    }

    const percent = max ? total / max : 0;
    const segment = segmentForPercent(percent);

    // drivers
    const sorted = [...subValues].sort((a, b) => b.value - a.value);
    const driversTop = sorted.slice(0, 3);
    const driversWeak = [...sorted].reverse().slice(0, 2);

    return {
      supplierId: s.id,
      supplierName: s.name,
      total,
      max,
      percent,
      segment,
      byCategory,
      driversTop,
      driversWeak,
    };
  }).sort((a, b) => b.percent - a.percent);
}

export function categoryRadarData(scores: SupplierScore) {
  return scores.byCategory.map((c) => ({ subject: c.name, A: Math.round((c.avg0to5 / 5) * 100) }));
}

