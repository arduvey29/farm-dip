/*
  SAMPLE REPORT. The structure mirrors a typical NABL lab report for ghee
  against FSSAI standards. Replace values and the batch list with real reports
  (link PDFs from /public/lab-reports/<batch>.pdf) before launch.
*/

export type LabParameter = {
  name: string;
  /** Plain-language explanation shown to shoppers. */
  what: string;
  limit: string;
  result: string;
};

export const labParameters: LabParameter[] = [
  { name: "Moisture", what: "Water left in the ghee. Too much makes it spoil faster.", limit: "Max 0.5%", result: "0.11%" },
  { name: "Free fatty acids (as oleic acid)", what: "A sign of freshness. Rises as ghee goes stale.", limit: "Max 3.0%", result: "0.38%" },
  { name: "Butyro-refractometer reading at 40°C", what: "How light bends through the ghee. Vegetable oils read differently from milk fat.", limit: "40.0 to 43.0", result: "41.4" },
  { name: "Reichert-Meissl value", what: "Measures fatty acids found almost only in milk fat. Low values suggest added oils.", limit: "Min 28", result: "30.4" },
  { name: "Polenske value", what: "Detects coconut and other lauric oils mixed into ghee.", limit: "1.0 to 2.0", result: "1.4" },
  { name: "Baudouin test", what: "Detects sesame oil, which vanaspati in India must contain.", limit: "Negative", result: "Negative" },
  { name: "Phytosterol acetate test", what: "Detects any vegetable fat. Plant sterols should be absent in pure ghee.", limit: "Negative", result: "Negative" },
  { name: "Unsaponifiable matter", what: "Material that is not fat, such as mineral oil.", limit: "Max 1.0%", result: "0.31%" },
  { name: "Added colour", what: "Synthetic colours sometimes added to make ghee look golden.", limit: "Absent", result: "Absent" },
];

export const sampleBatches = [
  { batch: "FD-BUF-2610-A", product: "Pure Desi Buffalo Ghee (500 ml)", packed: "2026-10-14", lab: "Independent NABL-accredited lab (placeholder)", status: "Passed" },
  { batch: "FD-BUF-2610-B", product: "Pure Desi Buffalo Ghee (1 L)", packed: "2026-10-09", lab: "Independent NABL-accredited lab (placeholder)", status: "Passed" },
  { batch: "FD-BUF-2609-C", product: "Pure Desi Buffalo Ghee (5 L)", packed: "2026-09-28", lab: "Independent NABL-accredited lab (placeholder)", status: "Passed" },
  { batch: "FD-BUF-2610-D", product: "Pure Desi Buffalo Ghee (Fresh Batch)", packed: "2026-10-16", lab: "Independent NABL-accredited lab (placeholder)", status: "Passed" },
];
