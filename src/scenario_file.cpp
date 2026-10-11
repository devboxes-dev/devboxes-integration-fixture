#include "scenario_file.hpp"
#include "text.hpp"
#include <fstream>
#include <stdexcept>
#include <cctype>
namespace scenario {
Inputs read_scenario(const std::string& path) {
    std::ifstream input(path);
    if (!input) throw std::runtime_error("cannot open scenario file: " + path);
    Inputs values;
    std::string line;
    std::size_t number = 0;
    while (std::getline(input, line)) {
        ++number;
        const auto clean = trim(line);
        if (clean.empty() || clean[0] == '#' || clean[0] == ';' || clean[0] == '[') continue;
        const auto equals = clean.find('=');
        if (equals == std::string::npos) throw std::runtime_error(path + ":" + std::to_string(number) + ": expected key=value");
        const auto key = trim(clean.substr(0, equals));
        const auto value = trim(clean.substr(equals + 1));
        if (key.empty() || !values.emplace(key, value).second) throw std::runtime_error(path + ":" + std::to_string(number) + ": empty or duplicate key");
    }
    return values;
}
void require_currency(const Inputs& inputs, const std::string& currency) {
    if (currency.size() != 3) throw std::invalid_argument("--currency must be a three-letter ISO code");
    for (unsigned char c : currency) if (!std::isupper(c)) throw std::invalid_argument("--currency must be an uppercase ISO code");
    const auto found = inputs.find("currency");
    const std::string scenario_currency = found == inputs.end() ? "USD" : found->second;
    if (scenario_currency != currency) throw std::invalid_argument("currency mismatch: scenario is " + scenario_currency + ", requested " + currency);
}
}
