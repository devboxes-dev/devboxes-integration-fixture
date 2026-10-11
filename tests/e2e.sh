#!/bin/sh
set -eu
for scenario in examples/*.ini; do
  for command in run compare cohort seek breakeven sensitivity check; do
    output=$(./scenario-calculator "$command" "$scenario")
    printf '%s' "$output" | grep -q 'HYPOTHETICAL / NOT A FORECAST'
  done
done
printf '%s\n' 'end-to-end subcommand checks passed'
