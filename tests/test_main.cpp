#include "text.hpp"
#include "money.hpp"
#include "csv.hpp"
#include "scenario_file.hpp"
#include "html_report.hpp"
#include "monte_carlo.hpp"
#include <cassert>
#include <iostream>
#include <stdexcept>
int main() {
    assert(scenario::trim("  hello\t") == "hello");
    assert((scenario::split("a,b", ',') == std::vector<std::string>{"a", "b"}));
    assert(scenario::replace_all("a-a", "a", "b") == "b-b");
    assert(scenario::format_money(scenario::parse_money("1.23445")) == "USD 1.2344");
    assert(scenario::format_money(scenario::parse_money("1.23455")) == "USD 1.2346");
    bool overflow_rejected = false;
    try { (void)scenario::parse_money("1000000000000000"); }
    catch (const std::out_of_range&) { overflow_rejected = true; }
    assert(overflow_rejected);
    overflow_rejected = false;
    try { (void)scenario::bankers_round(1e30); }
    catch (const std::out_of_range&) { overflow_rejected = true; }
    assert(overflow_rejected);
    assert(scenario::parse_csv("a,\"b,c\"\n")[0][1] == "b,c");
    assert(scenario::parse_csv(scenario::write_csv({{"a", "b,c"}}))[0][1] == "b,c");
    const auto scenario_inputs = scenario::read_scenario("examples/lean.ini");
    assert(scenario_inputs.at("monthly_price") == "10");
    assert(scenario_inputs.at("currency") == "USD");
    scenario::require_currency(scenario_inputs, "USD");
    bool currency_mismatch_rejected = false;
    try { scenario::require_currency(scenario_inputs, "EUR"); }
    catch (const std::invalid_argument&) { currency_mismatch_rejected = true; }
    assert(currency_mismatch_rejected);
    const auto html = scenario::render_html_report({{"name", "Hypothetical <test>"}, {"currency", "USD"}, {"monthly_price", "10"}});
    assert(html.find("HYPOTHETICAL ONLY") != std::string::npos);
    assert(html.find("Hypothetical &lt;test&gt;") != std::string::npos);
    assert(html.find("Payers required</th><td>5000") != std::string::npos);
    const scenario::Inputs ranges{{"monthly_price", "10"}, {"currency", "USD"}, {"loss_min", "0.05"},
                                  {"loss_max", "0.15"}, {"activation_min", "0.2"}, {"activation_max", "0.5"}};
    const auto simulation_a = scenario::simulate_ranges(ranges, 500, 1234);
    const auto simulation_b = scenario::simulate_ranges(ranges, 500, 1234);
    assert(simulation_a.workload_p50 == simulation_b.workload_p50);
    assert(simulation_a.workload_p10 <= simulation_a.workload_p50);
    bool unavailable_rejected = false;
    try { (void)scenario::simulate_ranges({{"loss_min", "0.1"}}, 10, 1); }
    catch (const std::invalid_argument&) { unavailable_rejected = true; }
    assert(unavailable_rejected);
    std::cout << "C++ unit tests passed\n";
}
