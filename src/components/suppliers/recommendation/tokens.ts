export const ratingPalette = {
  5: { bg: 'bg-indigo-600', text: 'text-white', label: 'Very High' },
  4: { bg: 'bg-blue-600', text: 'text-white', label: 'High' },
  3: { bg: 'bg-amber-500', text: 'text-white', label: 'Medium' },
  2: { bg: 'bg-orange-500', text: 'text-white', label: 'Low' },
  1: { bg: 'bg-orange-400', text: 'text-white', label: 'Low' },
  0: { bg: 'bg-slate-300', text: 'text-slate-800', label: 'Nil' },
} as const;

export function segmentForPercent(pct: number): { name: string; color: string } {
  if (pct >= 0.8) return { name: 'Strategic', color: 'bg-indigo-600' };
  if (pct >= 0.65) return { name: 'Preferred', color: 'bg-blue-600' };
  if (pct >= 0.45) return { name: 'Tactical', color: 'bg-cyan-600' };
  return { name: 'Operational', color: 'bg-slate-500' };
}

