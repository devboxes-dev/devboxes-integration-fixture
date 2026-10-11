# Example outputs

Every listed value is **HYPOTHETICAL / NOT A FORECAST**. All scenarios are editable synthetic illustrations; none represents approved pricing, live data, or a real scoreboard.

## examples/eur-quarterly.ini

### `run`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Scenario                              EUR quarterly illustration
Currency                              EUR
Monthly-normalized price              EUR 30.000000
Active payers for target MRR          1500
Target MRR                            EUR 45000.000000

Cohort (active payers; each value HYPOTHETICAL)
2026-01                               250 active; 0 lost
2026-02                               470 active; 30 lost
2026-03                               664 active; 56 lost
2026-04                               834 active; 80 lost
2026-05                               984 active; 100 lost
2026-06                               1116 active; 118 lost
Replacement workload                  180
First opens for paid users            104167
```

### `cohort`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only

Cohort (active payers; each value HYPOTHETICAL)
2026-01                               250 active; 0 lost
2026-02                               470 active; 30 lost
2026-03                               664 active; 56 lost
2026-04                               834 active; 80 lost
2026-05                               984 active; 100 lost
2026-06                               1116 active; 118 lost
Replacement workload                  180
First opens for paid users            104167
```

### `seek`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Monthly new payers to reach target    337
```

### `breakeven`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Break-even active payers              467
```

### `sensitivity`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Expiry loss                           Required replacement payers/month
0.000000%                             0
5.000000%                             75
10.000000%                            150
20.000000%                            300
```

### `check`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Scenario valid: EUR quarterly illustration
```

### `lint`

```text
HYPOTHETICAL / NOT A FORECAST — example-value lint
No heuristic warnings. This does not verify that inputs are synthetic.
```

### `compare`

```text
HYPOTHETICAL / NOT A FORECAST — scenario comparison
EUR quarterly illustration     currency=EUR monthly_price=EUR 30.000000 target_payers=1500 replacements=180
EUR quarterly illustration     currency=EUR monthly_price=EUR 30.000000 target_payers=1500 replacements=180
```

### `monte-carlo`

Unavailable until synthetic expiry-loss, activation, and paid-probability ranges are configured.

### `html`

Run `./scenario-calculator html examples/eur-quarterly.ini > report.html` to generate the self-contained HTML report for this scenario.

## examples/gbp-weekly.ini

### `run`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Scenario                              GBP weekly illustration
Currency                              GBP
Monthly-normalized price              GBP 21.666667
Active payers for target MRR          1385
Target MRR                            GBP 30000.000000

Cohort (active payers; each value HYPOTHETICAL)
2026-01                               230 active; 0 lost
2026-02                               426 active; 35 lost
2026-03                               592 active; 64 lost
2026-04                               733 active; 89 lost
2026-05                               853 active; 110 lost
2026-06                               955 active; 128 lost
Replacement workload                  208
First opens for paid users            92334
```

### `cohort`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only

Cohort (active payers; each value HYPOTHETICAL)
2026-01                               230 active; 0 lost
2026-02                               426 active; 35 lost
2026-03                               592 active; 64 lost
2026-04                               733 active; 89 lost
2026-05                               853 active; 110 lost
2026-06                               955 active; 128 lost
Replacement workload                  208
First opens for paid users            92334
```

### `seek`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Monthly new payers to reach target    334
```

### `breakeven`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Break-even active payers              416
```

### `sensitivity`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Expiry loss                           Required replacement payers/month
0.000000%                             0
5.000000%                             70
10.000000%                            139
20.000000%                            277
```

### `check`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Scenario valid: GBP weekly illustration
```

### `lint`

```text
HYPOTHETICAL / NOT A FORECAST — example-value lint
No heuristic warnings. This does not verify that inputs are synthetic.
```

### `compare`

```text
HYPOTHETICAL / NOT A FORECAST — scenario comparison
GBP weekly illustration        currency=GBP monthly_price=GBP 21.666667 target_payers=1385 replacements=208
GBP weekly illustration        currency=GBP monthly_price=GBP 21.666667 target_payers=1385 replacements=208
```

### `monte-carlo`

Unavailable until synthetic expiry-loss, activation, and paid-probability ranges are configured.

### `html`

Run `./scenario-calculator html examples/gbp-weekly.ini > report.html` to generate the self-contained HTML report for this scenario.

## examples/missing-inputs.ini

### `run`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Scenario                              Missing-input demonstration
Currency                              USD
Monthly-normalized price              unavailable (price missing)
Active payers for target MRR          unavailable (price missing)
Target MRR                            USD 50000.000000

Cohort (active payers; each value HYPOTHETICAL)
2026-01                               0 active; 0 lost
2026-02                               0 active; 0 lost
2026-03                               0 active; 0 lost
Replacement workload                  unavailable (price or expiry_loss missing)
First opens for paid users            unavailable (conversion probability is missing or zero)
```

### `cohort`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only

Cohort (active payers; each value HYPOTHETICAL)
2026-01                               0 active; 0 lost
2026-02                               0 active; 0 lost
2026-03                               0 active; 0 lost
Replacement workload                  unavailable (price or expiry_loss missing)
First opens for paid users            unavailable (conversion probability is missing or zero)
```

### `seek`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Monthly new payers to reach target    unavailable (price or expiry_loss missing)
```

### `breakeven`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Break-even active payers              unavailable (monthly_cost or price missing)
```

### `sensitivity`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Expiry loss                           Required replacement payers/month
0.000000%                             unavailable (price missing)
5.000000%                             unavailable (price missing)
10.000000%                            unavailable (price missing)
20.000000%                            unavailable (price missing)
```

### `check`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Scenario valid: Missing-input demonstration
```

### `lint`

```text
HYPOTHETICAL / NOT A FORECAST — example-value lint
No heuristic warnings. This does not verify that inputs are synthetic.
```

### `compare`

```text
HYPOTHETICAL / NOT A FORECAST — scenario comparison
Missing-input demonstration    currency=USD monthly_price=unavailable target_payers=unavailable replacements=unavailable
Missing-input demonstration    currency=USD monthly_price=unavailable target_payers=unavailable replacements=unavailable
```

### `monte-carlo`

Unavailable until synthetic expiry-loss, activation, and paid-probability ranges are configured.

### `html`

Run `./scenario-calculator html examples/missing-inputs.ini > report.html` to generate the self-contained HTML report for this scenario.

## examples/usd-annual.ini

### `run`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Scenario                              USD annual illustration
Currency                              USD
Monthly-normalized price              USD 10.000000
Active payers for target MRR          5000
Target MRR                            USD 50000.000000

Cohort (active payers; each value HYPOTHETICAL)
2026-01                               833 active; 0 lost
2026-02                               1599 active; 67 lost
2026-03                               2304 active; 128 lost
2026-04                               2953 active; 184 lost
2026-05                               3550 active; 236 lost
2026-06                               4099 active; 284 lost
Replacement workload                  400
First opens for paid users            166667
```

### `cohort`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only

Cohort (active payers; each value HYPOTHETICAL)
2026-01                               833 active; 0 lost
2026-02                               1599 active; 67 lost
2026-03                               2304 active; 128 lost
2026-04                               2953 active; 184 lost
2026-05                               3550 active; 236 lost
2026-06                               4099 active; 284 lost
Replacement workload                  400
First opens for paid users            166667
```

### `seek`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Monthly new payers to reach target    1017
```

### `breakeven`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Break-even active payers              1800
```

### `sensitivity`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Expiry loss                           Required replacement payers/month
0.000000%                             0
5.000000%                             250
10.000000%                            500
20.000000%                            1000
```

### `check`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Scenario valid: USD annual illustration
```

### `lint`

```text
HYPOTHETICAL / NOT A FORECAST — example-value lint
No heuristic warnings. This does not verify that inputs are synthetic.
```

### `compare`

```text
HYPOTHETICAL / NOT A FORECAST — scenario comparison
USD annual illustration        currency=USD monthly_price=USD 10.000000 target_payers=5000 replacements=400
USD monthly starter            currency=USD monthly_price=USD 10.000000 target_payers=5000 replacements=500
```

### `monte-carlo`

Unavailable until synthetic expiry-loss, activation, and paid-probability ranges are configured.

### `html`

Run `./scenario-calculator html examples/usd-annual.ini > report.html` to generate the self-contained HTML report for this scenario.

## examples/usd-monthly.ini

### `run`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Scenario                              USD monthly starter
Currency                              USD
Monthly-normalized price              USD 10.000000
Active payers for target MRR          5000
Target MRR                            USD 50000.000000

Cohort (active payers; each value HYPOTHETICAL)
2026-01                               833 active; 0 lost
2026-02                               1583 active; 83 lost
2026-03                               2257 active; 158 lost
2026-04                               2865 active; 226 lost
2026-05                               3411 active; 286 lost
2026-06                               3903 active; 341 lost
Replacement workload                  500
First opens for paid users            250000
```

### `cohort`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only

Cohort (active payers; each value HYPOTHETICAL)
2026-01                               833 active; 0 lost
2026-02                               1583 active; 83 lost
2026-03                               2257 active; 158 lost
2026-04                               2865 active; 226 lost
2026-05                               3411 active; 286 lost
2026-06                               3903 active; 341 lost
Replacement workload                  500
First opens for paid users            250000
```

### `seek`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Monthly new payers to reach target    1068
```

### `breakeven`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Break-even active payers              1200
```

### `sensitivity`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Expiry loss                           Required replacement payers/month
0.000000%                             0
5.000000%                             250
10.000000%                            500
20.000000%                            1000
```

### `check`

```text
HYPOTHETICAL / NOT A FORECAST — synthetic scenario only
Scenario valid: USD monthly starter
```

### `lint`

```text
HYPOTHETICAL / NOT A FORECAST — example-value lint
WARNING: scenario name does not explicitly identify synthetic/example data
```

### `compare`

```text
HYPOTHETICAL / NOT A FORECAST — scenario comparison
USD monthly starter            currency=USD monthly_price=USD 10.000000 target_payers=5000 replacements=500
USD annual illustration        currency=USD monthly_price=USD 10.000000 target_payers=5000 replacements=400
```

### `monte-carlo`

```text
HYPOTHETICAL / NOT A FORECAST — Monte Carlo assumption sampling
seed=17 iterations=2000
5th percentile replacements=278; first opens=187076
50th percentile replacements=503; first opens=255173
95th percentile replacements=720; first opens=350521
```

### `html`

Run `./scenario-calculator html examples/usd-monthly.ini > report.html` to generate the self-contained HTML report for this scenario.

## Difference example

```text
HYPOTHETICAL / NOT A FORECAST — scenario differences
price: USD monthly starter=10.000000; USD annual illustration=120.000000
period: USD monthly starter=monthly; USD annual illustration=annual
expiry_loss: USD monthly starter=0.100000; USD annual illustration=0.080000
first_open_to_activation: USD monthly starter=0.200000; USD annual illustration=0.250000
activation_to_paid: USD monthly starter=0.100000; USD annual illustration=0.120000
output.monthly_replacements: USD monthly starter=500; USD annual illustration=400
```

The `--currency CODE` option validates inputs, and compare/diff refuse to mix currencies. Monte Carlo samples only the configured synthetic ranges and uses a reproducible seed. Lint heuristics may warn but cannot prove inputs are synthetic.

## Corrected recurring-acquisition seek

For the USD 10/month example (5,000 target active payers, 10% monthly expiry loss, six months), `seek` accounts for every monthly acquisition cohort and returns 1,068 new payers per month, rather than treating all required acquisition as a single starting cohort.
