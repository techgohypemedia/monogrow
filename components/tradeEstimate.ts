export interface EstimateInput {
  kg: number; bagKg: number; rate: number; bagCost: number;
  inland: number; handling: number; freight: number;
  shipping: "sea" | "air"; insurance: number; duty: number;
  tax: number; other: number; retail: boolean;
}

// Illustrative planning arithmetic, not live prices or jurisdiction-specific tax rules.
export function calculateTradeEstimate(input: EstimateInput) {
  const safe = (n: number) => Number.isFinite(n) ? Math.max(0, n) : 0;
  const kg = safe(input.kg), mt = kg / 1000;
  const bags = Math.ceil(kg / Math.max(1, safe(input.bagKg)));
  const containers = Math.ceil(kg / 25000);
  const commodity = mt * safe(input.rate), packaging = bags * safe(input.bagCost);
  const inland = input.retail ? 0 : mt * safe(input.inland);
  const handling = input.retail ? 0 : mt * safe(input.handling);
  const exw = commodity + packaging, fob = exw + inland + handling;
  const freight = kg === 0 ? 0 : safe(input.freight) * (input.retail ? 1 : input.shipping === "sea" ? containers : kg);
  const cfr = fob + freight;
  const insurance = input.retail ? 0 : cfr * safe(input.insurance) / 100;
  const cif = cfr + insurance;
  const duty = input.retail ? 0 : cif * safe(input.duty) / 100;
  const tax = (cif + duty) * safe(input.tax) / 100;
  const other = kg ? safe(input.other) : 0;
  const total = cif + duty + tax + other;
  return { kg, mt, bags, containers, commodity, packaging, inland, handling, freight, insurance, exw, fob, cfr, cif, duty, tax, other, total, perKg: kg ? total / kg : 0, perMt: mt ? total / mt : 0 };
}
