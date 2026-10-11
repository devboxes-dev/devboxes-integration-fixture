# Offline hypothetical MRR calculator

This C++17 command-line utility performs **hypothetical decision-preparation arithmetic only**. It uses no network or live data. It is not a price approval, campaign, or forecast. Currency codes are retained separately; no exchange rates are inferred.

## Build and test

Requires a C++17 compiler, Make, and Node.js (for the repository's existing JS tests). `make` builds `build/scenario`; `make test` runs C++ unit tests and existing JS tests. `make clean` removes build output.

## Usage

`build/scenario [run|compare|cohort|seek|breakeven|sensitivity|check] [monthly-price]`

All recognized commands currently provide the same transparent, simplified monthly payer calculation. The price is a hypothetical numeric amount in USD; default is 10. Example: `build/scenario run 10` reports 5,000 payers for USD 50,000 MRR and 500 replacements at 10% loss. This version does **not** implement scenario-file loading, output-format selection, cohort simulation, probability funnels, break-even analysis, goal seeking, or sensitivity analysis. It must not be mistaken for those analyses.

Five editable, clearly hypothetical example inputs are in `examples/`. See [docs/EXAMPLES.md](docs/EXAMPLES.md) for the arithmetic and limitations. Missing inputs are unavailable, never silently assumed to be zero. This calculator is deliberately not a forecast and does not authorize price changes or campaigns.
