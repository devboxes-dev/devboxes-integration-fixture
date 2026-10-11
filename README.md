# Offline MRR scenario calculator

A C++17 **decision-preparation** tool. All included examples are synthetic. Every result is labelled **HYPOTHETICAL / NOT A FORECAST**; nothing here is approved pricing, live data, a campaign, or a forecast.

## Build and test

```sh
make
make test
./scenario-calculator --help
```

Requires a C++17 compiler and Make. No network access or runtime dependency is needed.

## Run

```sh
./scenario-calculator run examples/usd-monthly.ini
./scenario-calculator cohort examples/usd-monthly.ini
./scenario-calculator seek examples/usd-monthly.ini
./scenario-calculator breakeven examples/usd-monthly.ini
./scenario-calculator sensitivity examples/usd-monthly.ini
./scenario-calculator check examples/usd-monthly.ini
./scenario-calculator compare examples/usd-monthly.ini examples/eur-quarterly.ini
./scenario-calculator run examples/usd-monthly.ini --format markdown
```

Available commands are `run`, `compare`, `diff`, `html`, `monte-carlo`, `lint`, `cohort`, `seek`, `breakeven`, `sensitivity`, and `check`. Formats are `text`, `csv`, `markdown`, and `json`. Scenario inputs use INI sections/comments and keys shown in `examples/`. Price is in the declared ISO currency and period (`weekly`, `monthly`, `quarterly`, `annual`); currencies are never combined. Missing values render as unavailable. Edit examples to test assumptions; they are not evidence or recommendations.

For a $50,000 monthly target and $10 monthly price, the model computes 5,000 active payers. At 10% monthly expiry loss, maintaining 5,000 requires 500 replacements.

Compare and inspect scenario changes with `./scenario-calculator compare examples/a.ini examples/b.ini` and `./scenario-calculator diff examples/a.ini examples/b.ini`. Create a self-contained page with `./scenario-calculator html examples/usd-monthly.ini > report.html`; it has no external assets and repeats the hypothetical disclaimer.

`./scenario-calculator monte-carlo examples/usd-monthly.ini` samples configured `expiry_loss_min/max`, `activation_min/max`, and `paid_min/max` assumptions. Optional `iterations` (1–1,000,000) and `seed` make the run repeatable; output reports 5th, 50th, and 95th percentiles, and is strictly hypothetical.

The optional `--currency USD` flag checks the scenario currency; for `compare`/`diff`, both scenarios must use the same currency and match the requested code. The calculator never converts currencies.

Run `./scenario-calculator lint examples/usd-monthly.ini` to get heuristic warnings for names or values that could be mistaken for real data. A clean lint result is not proof that data is synthetic.
