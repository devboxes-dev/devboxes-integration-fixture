#include "money.hpp"
#include <iostream>
#include <string>
int main(int argc, char** argv) {
    const std::string command = argc > 1 ? argv[1] : "run";
    const long long target = 500000000LL; // $50,000 in four-decimal units
    const auto price = scenario::parse_money(argc > 2 ? argv[2] : "10.00");
    if (price.units <= 0) { std::cerr << "price must be positive\n"; return 2; }
    if (command != "run" && command != "check" && command != "compare" && command != "cohort" && command != "seek" && command != "breakeven" && command != "sensitivity") {
        std::cerr << "unknown command: " << command << '\n'; return 2;
    }
    const long long payers = (target + price.units - 1) / price.units;
    std::cout << "HYPOTHETICAL SCENARIO ONLY — not a forecast or price approval\n"
              << "Command: " << command << "\nTarget MRR: USD 50000.0000\nMonthly price: " << scenario::format_money(price)
              << "\nPayers required: " << payers << "\nAt 10% monthly loss, replacements: " << (payers + 9) / 10
              << "\nCoverage limitations: simplified payer arithmetic; excludes taxes, fees, refunds, timing, and uncertainty.\n";
    return 0;
}
