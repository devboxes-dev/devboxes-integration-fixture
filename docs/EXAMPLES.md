# Hypothetical examples

Every file in `examples/` is invented solely for decision preparation. These values are not market research, a forecast, a recommendation, or approval to set prices or run a campaign. Run a scenario with `build/scenario run examples/lean.ini`; compare two with `build/scenario diff examples/lean.ini examples/base.ini`.

At a hypothetical USD 10 monthly price, USD 50,000 MRR corresponds to 5,000 payers. At an illustrative 10% monthly loss, 500 replacements are needed just to hold that payer count. These are arithmetic identities, not acquisition forecasts. EUR is intentionally never converted or combined with USD.

The scenario diff command reports changed key/value inputs and the corresponding simple payer count, and refuses cross-currency comparisons. Generate one self-contained HTML report per scenario with `build/scenario report examples/lean.ini lean-report.html` (the file is generated locally and should not be committed). Reports repeat the hypothetical-only label and state coverage limitations. The calculator still does not model cohort timing, plan durations, probability funnels, acquisition workload, expiry, price optimization, or uncertainty. Missing operational inputs must be treated as unavailable, not as zero. Do not use these examples to make a price decision.
