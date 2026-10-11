#include "money.hpp"
#include "scenario_file.hpp"
#include <iostream>
#include <map>
#include <string>
#include <stdexcept>

namespace {
std::string get(const scenario::Inputs& inputs, const std::string& key, const std::string& fallback) {
    const auto found = inputs.find(key);
    return found == inputs.end() ? fallback : found->second;
}
long long payers_for(const scenario::Inputs& inputs) {
    const std::string currency = get(inputs, "currency", "USD");
    const auto price = scenario::parse_money(get(inputs, "monthly_price", "10"), currency);
    if (price.units <= 0) throw std::invalid_argument("monthly_price must be positive");
    const auto target = scenario::parse_money(get(inputs, "target_mrr", "50000"), currency);
    return (target.units + price.units - 1) / price.units;
}
void print_diff(const std::string& left_path, const std::string& right_path) {
    const auto left = scenario::read_scenario(left_path);
    const auto right = scenario::read_scenario(right_path);
    const auto left_currency = get(left, "currency", "USD");
    const auto right_currency = get(right, "currency", "USD");
    if (left_currency != right_currency) throw std::invalid_argument("cannot compare scenarios with different currencies");
    std::cout << "HYPOTHETICAL SCENARIO DIFF — not a forecast or price approval\n";
    std::map<std::string, std::string> keys = left;
    keys.insert(right.begin(), right.end());
    for (const auto& entry : keys) {
        const auto a = left.find(entry.first), b = right.find(entry.first);
        const std::string before = a == left.end() ? "unavailable" : a->second;
        const std::string after = b == right.end() ? "unavailable" : b->second;
        if (before != after) std::cout << entry.first << ": " << before << " -> " << after << '\n';
    }
    std::cout << "Payers required: " << payers_for(left) << " -> " << payers_for(right) << '\n'
              << "Coverage limitations: simple steady-state payer arithmetic only; omitted inputs are unavailable.\n";
}
}

int main(int argc, char** argv) {
    const std::string command = argc > 1 ? argv[1] : "run";
    try {
        if (command == "diff") {
            if (argc != 4) throw std::invalid_argument("usage: scenario diff LEFT.ini RIGHT.ini");
            print_diff(argv[2], argv[3]);
            return 0;
        }
        if (command != "run" && command != "check" && command != "compare" && command != "cohort" && command != "seek" && command != "breakeven" && command != "sensitivity") throw std::invalid_argument("unknown command: " + command);
        scenario::Inputs inputs;
        if (argc > 2 && std::string(argv[2]).find(".ini") != std::string::npos) inputs = scenario::read_scenario(argv[2]);
        else { inputs["monthly_price"] = argc > 2 ? argv[2] : "10"; inputs["currency"] = "USD"; }
        const std::string currency = get(inputs, "currency", "USD");
        const auto price = scenario::parse_money(get(inputs, "monthly_price", "10"), currency);
        const auto target = scenario::parse_money(get(inputs, "target_mrr", "50000"), currency);
        if (price.units <= 0) throw std::invalid_argument("monthly_price must be positive");
        const long long payers = (target.units + price.units - 1) / price.units;
        std::cout << "HYPOTHETICAL SCENARIO ONLY — not a forecast or price approval\n"
                  << "Command: " << command << "\nTarget MRR: " << scenario::format_money(target) << "\nMonthly price: " << scenario::format_money(price)
                  << "\nPayers required: " << payers << "\nAt 10% monthly loss, replacements: " << (payers + 9) / 10
                  << "\nCoverage limitations: simplified payer arithmetic; excludes taxes, fees, refunds, timing, and uncertainty.\n";
    } catch (const std::exception& error) {
        std::cerr << error.what() << '\n';
        return 2;
    }
    return 0;
}
