#include "text.hpp"
#include <cassert>
#include <iostream>
int main() {
    assert(scenario::trim("  hello\t") == "hello");
    assert((scenario::split("a,b", ',') == std::vector<std::string>{"a", "b"}));
    assert(scenario::replace_all("a-a", "a", "b") == "b-b");
    std::cout << "C++ unit tests passed\n";
}
