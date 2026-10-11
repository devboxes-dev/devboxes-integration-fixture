#include "money.hpp"
#include "scenario_file.hpp"
#include "html_report.hpp"
#include "monte_carlo.hpp"
#include "scenario_lint.hpp"
#include <fstream>
#include <iterator>
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
    return scenario::payer_count(target, price);
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
std::string currency_option(int argc, char** argv) {
    for (int i = 2; i < argc; ++i) {
        if (std::string(argv[i]) == "--currency") {
            if (i + 1 >= argc) throw std::invalid_argument("--currency requires an ISO currency code");
            return argv[i + 1];
        }
    }
    return {};
}
}

int main(int argc, char** argv) {
    const std::string command = argc > 1 ? argv[1] : "run";
    try {
        if (command == "diff") {
            if (argc != 4 && argc != 6) throw std::invalid_argument("usage: scenario diff LEFT.ini RIGHT.ini [--currency CODE]");
            if (argc == 6 && std::string(argv[4]) != "--currency") throw std::invalid_argument("expected --currency CODE");
            if (argc == 6) {
                const auto requested = std::string(argv[5]);
                scenario::require_currency(scenario::read_scenario(argv[2]), requested);
                scenario::require_currency(scenario::read_scenario(argv[3]), requested);
            }
            print_diff(argv[2], argv[3]);
            return 0;
        }
        if (command == "report") {
            if (argc < 3 || argc > 4) throw std::invalid_argument("usage: scenario report FILE.ini [OUTPUT.html]");
            const auto html = scenario::render_html_report(scenario::read_scenario(argv[2]));
            if (argc == 4) {
                std::ofstream output(argv[3]);
                if (!output) throw std::runtime_error("cannot write HTML report: " + std::string(argv[3]));
                output << html;
            } else std::cout << html;
            return 0;
        }
        if (command == "montecarlo") {
            if (argc < 3 || argc > 5) throw std::invalid_argument("usage: scenario montecarlo FILE.ini [ITERATIONS [SEED]]");
            const auto inputs = scenario::read_scenario(argv[2]);
            const auto iterations = argc > 3 ? static_cast<std::size_t>(std::stoull(argv[3])) : 10000U;
            const auto seed = argc > 4 ? std::stoull(argv[4]) : 42U;
            const auto result = scenario::simulate_ranges(inputs, iterations, seed);
            std::cout << "HYPOTHETICAL MONTE CARLO — not a forecast or price approval\n"
                      << "Seed: " << seed << "\nIterations: " << iterations << "\n"
                      << "Loss rate p10/p50/p90: " << result.loss_p10 << '/' << result.loss_p50 << '/' << result.loss_p90 << '\n'
                      << "Activation probability p10/p50/p90: " << result.activation_p10 << '/' << result.activation_p50 << '/' << result.activation_p90 << '\n'
                      << "Required activations p10/p50/p90: " << result.workload_p10 << '/' << result.workload_p50 << '/' << result.workload_p90 << '\n'
                      << "Coverage: independent uniform sampling of provided ranges; not empirical probability or forecast.\n";
            return 0;
        }
        if (command == "lint") {
            if (argc != 3) throw std::invalid_argument("usage: scenario lint FILE.ini");
            const auto inputs = scenario::read_scenario(argv[2]);
            std::ifstream file(argv[2]);
            const std::string text((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
            const auto warnings = scenario::lint_scenario_text(text);
            std::cout << "Hypothetical example lint (heuristic; warnings are not proof of real data): " << argv[2] << '\n';
            if (warnings.empty()) std::cout << "No heuristic warnings. This does not verify that values are hypothetical.\n";
            for (const auto& warning : warnings) std::cout << warning << '\n';
            (void)inputs;
            return warnings.empty() ? 0 : 1;
        }
        if (command != "run" && command != "check" && command != "compare" && command != "cohort" && command != "seek" && command != "breakeven" && command != "sensitivity") throw std::invalid_argument("unknown command: " + command);
        scenario::Inputs inputs;
        const auto requested_currency = currency_option(argc, argv);
        if (argc > 2 && std::string(argv[2]).find(".ini") != std::string::npos) inputs = scenario::read_scenario(argv[2]);
        else { inputs["monthly_price"] = argc > 2 ? argv[2] : "10"; inputs["currency"] = "USD"; }
        if (!requested_currency.empty()) scenario::require_currency(inputs, requested_currency);
        const std::string currency = get(inputs, "currency", "USD");
        const auto price = scenario::parse_money(get(inputs, "monthly_price", "10"), currency);
        const auto target = scenario::parse_money(get(inputs, "target_mrr", "50000"), currency);
        if (price.units <= 0) throw std::invalid_argument("monthly_price must be positive");
        const long long payers = scenario::payer_count(target, price);
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
