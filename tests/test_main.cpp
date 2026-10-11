#include "text.hpp"
#include "money.hpp"
#include "csv.hpp"
#include <cassert>
#include <iostream>
int main() {
    assert(scenario::trim("  hello\t") == "hello");
    assert((scenario::split("a,b", ',') == std::vector<std::string>{"a", "b"}));
    assert(scenario::replace_all("a-a", "a", "b") == "b-b");
    assert(scenario::format_money(scenario::parse_money("1.23445")) == "USD 1.2344");
    assert(scenario::format_money(scenario::parse_money("1.23455")) == "USD 1.2346");
    assert(scenario::parse_csv("a,\"b,c\"\n")[0][1] == "b,c");
    assert(scenario::parse_csv(scenario::write_csv({{"a", "b,c"}}))[0][1] == "b,c");
    std::cout << "C++ unit tests passed\n";
}
