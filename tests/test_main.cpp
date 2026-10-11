#include "text.hpp"
#include "money.hpp"
#include "csv.hpp"
#include "scenario_file.hpp"
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
    std::cout << "C++ unit tests passed\n";
}
