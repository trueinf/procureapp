export type RatingLabel = 'Very High' | 'High' | 'Medium' | 'Low' | 'Nil';

export interface Category { id: string; name: string; weight: number }
export interface SubFactor { id: string; categoryId: string; label: string; weight: number }
export interface Supplier { id: string; name: string }
export interface Rating { supplierId: string; subFactorId: string; value: number }

export const ratingValueToLabel: Record<number, RatingLabel> = {
  5: 'Very High',
  4: 'High',
  3: 'Medium',
  2: 'Low',
  1: 'Low',
  0: 'Nil',
};

export const categories: Category[] = [
  { id: 'sourcing', name: 'Sourcing Difficulty', weight: 1 },
  { id: 'dependency', name: 'Dependency', weight: 1 },
  { id: 'spend', name: 'Spend', weight: 1 },
  { id: 'risk', name: 'Supply Risk', weight: 1 },
];

export const subFactors: SubFactor[] = [
  // Sourcing Difficulty
  { id: 'sd_replace_supplier', categoryId: 'sourcing', label: 'Difficulty to replace the supplier', weight: 1 },
  { id: 'sd_replace_product', categoryId: 'sourcing', label: 'Difficulty to replace the product/service', weight: 1 },
  { id: 'sd_switching_costs', categoryId: 'sourcing', label: 'Replacement / switching costs', weight: 1 },
  // Dependency
  { id: 'dep_length_continuity', categoryId: 'dependency', label: 'Length and continuity of relationship', weight: 1 },
  { id: 'dep_critical_capabilities', categoryId: 'dependency', label: 'Access to business-critical capabilities', weight: 1 },
  { id: 'dep_proprietary_ip', categoryId: 'dependency', label: 'Access to proprietary technologies / IP', weight: 1 },
  { id: 'dep_new_markets', categoryId: 'dependency', label: 'Importance for entering new markets/geographies', weight: 1 },
  // Spend
  { id: 'spend_level', categoryId: 'spend', label: 'Level of spend (last 12m + next 12m)', weight: 1 },
  { id: 'spend_reduction_ability', categoryId: 'spend', label: 'Ability to reduce current/future spend', weight: 1 },
  // Supply Risk
  { id: 'risk_revenue_impact', categoryId: 'risk', label: 'Impact on current & future revenues', weight: 1 },
  { id: 'risk_innovation_importance', categoryId: 'risk', label: 'Importance to products/innovation', weight: 1 },
  { id: 'risk_c_level', categoryId: 'risk', label: 'Level of C-level relationships', weight: 1 },
  { id: 'risk_fair_practices', categoryId: 'risk', label: 'Fair business practices / audit results', weight: 1 },
];

export const suppliers: Supplier[] = [
  { id: 's1', name: 'Supplier 1' },
  { id: 's2', name: 'Supplier 2' },
  { id: 's3', name: 'Supplier 3' },
  { id: 's4', name: 'Supplier 4' },
  { id: 's5', name: 'Supplier 5' },
];

// Demo, read-only ratings inspired by the provided table
const V = 5, H = 4, M = 3, L = 2, N = 0;

export const ratings: Rating[] = [
  // Supplier 1
  { supplierId: 's1', subFactorId: 'sd_replace_supplier', value: V },
  { supplierId: 's1', subFactorId: 'sd_replace_product', value: V },
  { supplierId: 's1', subFactorId: 'sd_switching_costs', value: V },
  { supplierId: 's1', subFactorId: 'dep_length_continuity', value: H },
  { supplierId: 's1', subFactorId: 'dep_critical_capabilities', value: V },
  { supplierId: 's1', subFactorId: 'dep_proprietary_ip', value: V },
  { supplierId: 's1', subFactorId: 'dep_new_markets', value: H },
  { supplierId: 's1', subFactorId: 'spend_level', value: H },
  { supplierId: 's1', subFactorId: 'spend_reduction_ability', value: H },
  { supplierId: 's1', subFactorId: 'risk_revenue_impact', value: V },
  { supplierId: 's1', subFactorId: 'risk_innovation_importance', value: H },
  { supplierId: 's1', subFactorId: 'risk_c_level', value: L },
  { supplierId: 's1', subFactorId: 'risk_fair_practices', value: H },
  // Supplier 2
  { supplierId: 's2', subFactorId: 'sd_replace_supplier', value: L },
  { supplierId: 's2', subFactorId: 'sd_replace_product', value: H },
  { supplierId: 's2', subFactorId: 'sd_switching_costs', value: H },
  { supplierId: 's2', subFactorId: 'dep_length_continuity', value: M },
  { supplierId: 's2', subFactorId: 'dep_critical_capabilities', value: L },
  { supplierId: 's2', subFactorId: 'dep_proprietary_ip', value: M },
  { supplierId: 's2', subFactorId: 'dep_new_markets', value: L },
  { supplierId: 's2', subFactorId: 'spend_level', value: L },
  { supplierId: 's2', subFactorId: 'spend_reduction_ability', value: V },
  { supplierId: 's2', subFactorId: 'risk_revenue_impact', value: V },
  { supplierId: 's2', subFactorId: 'risk_innovation_importance', value: L },
  { supplierId: 's2', subFactorId: 'risk_c_level', value: H },
  { supplierId: 's2', subFactorId: 'risk_fair_practices', value: M },
  // Supplier 3
  { supplierId: 's3', subFactorId: 'sd_replace_supplier', value: L },
  { supplierId: 's3', subFactorId: 'sd_replace_product', value: M },
  { supplierId: 's3', subFactorId: 'sd_switching_costs', value: L },
  { supplierId: 's3', subFactorId: 'dep_length_continuity', value: M },
  { supplierId: 's3', subFactorId: 'dep_critical_capabilities', value: L },
  { supplierId: 's3', subFactorId: 'dep_proprietary_ip', value: L },
  { supplierId: 's3', subFactorId: 'dep_new_markets', value: L },
  { supplierId: 's3', subFactorId: 'spend_level', value: M },
  { supplierId: 's3', subFactorId: 'spend_reduction_ability', value: M },
  { supplierId: 's3', subFactorId: 'risk_revenue_impact', value: L },
  { supplierId: 's3', subFactorId: 'risk_innovation_importance', value: L },
  { supplierId: 's3', subFactorId: 'risk_c_level', value: H },
  { supplierId: 's3', subFactorId: 'risk_fair_practices', value: H },
  // Supplier 4
  { supplierId: 's4', subFactorId: 'sd_replace_supplier', value: H },
  { supplierId: 's4', subFactorId: 'sd_replace_product', value: H },
  { supplierId: 's4', subFactorId: 'sd_switching_costs', value: L },
  { supplierId: 's4', subFactorId: 'dep_length_continuity', value: M },
  { supplierId: 's4', subFactorId: 'dep_critical_capabilities', value: M },
  { supplierId: 's4', subFactorId: 'dep_proprietary_ip', value: M },
  { supplierId: 's4', subFactorId: 'dep_new_markets', value: L },
  { supplierId: 's4', subFactorId: 'spend_level', value: H },
  { supplierId: 's4', subFactorId: 'spend_reduction_ability', value: L },
  { supplierId: 's4', subFactorId: 'risk_revenue_impact', value: L },
  { supplierId: 's4', subFactorId: 'risk_innovation_importance', value: L },
  { supplierId: 's4', subFactorId: 'risk_c_level', value: L },
  { supplierId: 's4', subFactorId: 'risk_fair_practices', value: H },
  // Supplier 5
  { supplierId: 's5', subFactorId: 'sd_replace_supplier', value: V },
  { supplierId: 's5', subFactorId: 'sd_replace_product', value: H },
  { supplierId: 's5', subFactorId: 'sd_switching_costs', value: M },
  { supplierId: 's5', subFactorId: 'dep_length_continuity', value: M },
  { supplierId: 's5', subFactorId: 'dep_critical_capabilities', value: H },
  { supplierId: 's5', subFactorId: 'dep_proprietary_ip', value: M },
  { supplierId: 's5', subFactorId: 'dep_new_markets', value: L },
  { supplierId: 's5', subFactorId: 'spend_level', value: V },
  { supplierId: 's5', subFactorId: 'spend_reduction_ability', value: M },
  { supplierId: 's5', subFactorId: 'risk_revenue_impact', value: M },
  { supplierId: 's5', subFactorId: 'risk_innovation_importance', value: L },
  { supplierId: 's5', subFactorId: 'risk_c_level', value: L },
  { supplierId: 's5', subFactorId: 'risk_fair_practices', value: H },
];

