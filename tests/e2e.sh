#!/bin/sh
set -eu
for scenario in examples/*.ini; do
  for command in run cohort seek breakeven sensitivity check lint; do
    output=$(./scenario-calculator "$command" "$scenario")
    printf '%s' "$output" | grep -q 'HYPOTHETICAL / NOT A FORECAST'
  done
done
comparison=$(./scenario-calculator compare examples/usd-monthly.ini examples/usd-annual.ini --currency USD)
printf '%s' "$comparison" | grep -q 'USD monthly starter'
printf '%s' "$comparison" | grep -q 'USD annual illustration'
printf '%s' "$comparison" | grep -q 'target_payers=5000'
if ./scenario-calculator compare examples/usd-monthly.ini examples/eur-quarterly.ini >/dev/null 2>&1; then exit 1; fi
if ./scenario-calculator compare examples/usd-monthly.ini examples/usd-annual.ini --currency EUR >/dev/null 2>&1; then exit 1; fi
diff=$(./scenario-calculator diff examples/usd-monthly.ini examples/usd-annual.ini --currency USD)
printf '%s' "$diff" | grep -q 'price:'
printf '%s' "$diff" | grep -q 'output.monthly_replacements:'
if ./scenario-calculator diff examples/usd-monthly.ini >/dev/null 2>&1; then exit 1; fi
html=$(./scenario-calculator html examples/usd-monthly.ini)
printf '%s' "$html" | grep -q '<!doctype html>'
printf '%s' "$html" | grep -q 'HYPOTHETICAL / NOT A FORECAST'
if printf '%s' "$html" | grep -Eiq '<(script|link)[^>]+(src|href)='; then exit 1; fi
mc1=$(./scenario-calculator monte-carlo examples/usd-monthly.ini)
mc2=$(./scenario-calculator monte-carlo examples/usd-monthly.ini)
[ "$mc1" = "$mc2" ]
printf '%s' "$mc1" | grep -q '95th percentile'
printf '%s' "$mc1" | grep -q 'HYPOTHETICAL / NOT A FORECAST'
if ./scenario-calculator monte-carlo examples/missing-inputs.ini >/dev/null 2>&1; then exit 1; fi
lint=$(./scenario-calculator lint examples/usd-monthly.ini)
printf '%s' "$lint" | grep -q 'WARNING: scenario name does not explicitly identify synthetic/example data'
printf '%s' "$lint" | grep -q 'HYPOTHETICAL / NOT A FORECAST'
json_file=$(mktemp --suffix=.json)
trap 'rm -f "$json_file"' EXIT HUP INT TERM
cat > "$json_file" <<'JSON'
{"name":"JSON test","currency":"USD","target_mrr":50000,"price":10,"period":"monthly","expiry_loss":0.1,"first_open_to_activation":0,"activation_to_paid":0.1,"months":2,"start":"2026-01"}
JSON
zero=$(./scenario-calculator run "$json_file")
printf '%s' "$zero" | grep -q 'unavailable (conversion probability is missing or zero)'
printf '%s' "$zero" | grep -q 'Active payers for target MRR.*5000'
printf '%s\n' 'end-to-end subcommand checks passed'
