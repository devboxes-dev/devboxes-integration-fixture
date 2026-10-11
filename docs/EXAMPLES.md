# Example outputs

All examples and outputs are **HYPOTHETICAL / NOT A FORECAST**. Inputs are synthetic, editable illustrations, not approved pricing, live data, or forecasts.

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

### `compare`

```text
HYPOTHETICAL / NOT A FORECAST — scenario comparison
EUR quarterly illustration     currency=EUR monthly_price=EUR 30.000000 target_payers=1500 replacements=180
EUR quarterly illustration     currency=EUR monthly_price=EUR 30.000000 target_payers=1500 replacements=180
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
Monthly new payers to reach target    792
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

### `compare`

```text
HYPOTHETICAL / NOT A FORECAST — scenario comparison
GBP weekly illustration        currency=GBP monthly_price=GBP 21.666667 target_payers=1385 replacements=208
EUR quarterly illustration     currency=EUR monthly_price=EUR 30.000000 target_payers=1500 replacements=180
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
Monthly new payers to reach target    615
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

### `compare`

```text
HYPOTHETICAL / NOT A FORECAST — scenario comparison
Missing-input demonstration    currency=USD monthly_price=unavailable target_payers=unavailable replacements=unavailable
EUR quarterly illustration     currency=EUR monthly_price=EUR 30.000000 target_payers=1500 replacements=180
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
Monthly new payers to reach target    unavailable (price missing)
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

### `compare`

```text
HYPOTHETICAL / NOT A FORECAST — scenario comparison
USD annual illustration        currency=USD monthly_price=USD 10.000000 target_payers=5000 replacements=400
EUR quarterly illustration     currency=EUR monthly_price=EUR 30.000000 target_payers=1500 replacements=180
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
Monthly new payers to reach target    3296
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

### `compare`

```text
HYPOTHETICAL / NOT A FORECAST — scenario comparison
USD monthly starter            currency=USD monthly_price=USD 10.000000 target_payers=5000 replacements=500
EUR quarterly illustration     currency=EUR monthly_price=EUR 30.000000 target_payers=1500 replacements=180
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
Monthly new payers to reach target    2953
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

