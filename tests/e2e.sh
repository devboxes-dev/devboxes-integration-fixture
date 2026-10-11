#!/bin/sh
set -eu
for scenario in examples/*.ini; do
  for command in run cohort seek breakeven sensitivity check; do
    output=$(./scenario-calculator "$command" "$scenario")
    printf '%s' "$output" | grep -q 'HYPOTHETICAL / NOT A FORECAST'
  done
done
comparison=$(./scenario-calculator compare examples/usd-monthly.ini examples/eur-quarterly.ini)
printf '%s' "$comparison" | grep -q 'USD monthly starter'
printf '%s' "$comparison" | grep -q 'EUR quarterly illustration'
printf '%s' "$comparison" | grep -q 'target_payers=5000'
if ./scenario-calculator compare examples/usd-monthly.ini >/dev/null 2>&1; then exit 1; fi
json_file=$(mktemp --suffix=.json)
trap 'rm -f "$json_file"' EXIT HUP INT TERM
cat > "$json_file" <<'JSON'
{"name":"JSON test","currency":"USD","target_mrr":50000,"price":10,"period":"monthly","expiry_loss":0.1,"first_open_to_activation":0,"activation_to_paid":0.1,"months":2,"start":"2026-01"}
JSON
zero=$(./scenario-calculator run "$json_file")
printf '%s' "$zero" | grep -q 'unavailable (conversion probability is missing or zero)'
printf '%s' "$zero" | grep -q 'Active payers for target MRR.*5000'
printf '%s\n' 'end-to-end subcommand checks passed'
