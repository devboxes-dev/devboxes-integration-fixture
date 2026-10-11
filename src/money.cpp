#include "money.hpp"
#include <cmath>
#include <iomanip>
#include <sstream>
#include <stdexcept>
namespace scenario {
long long bankers_round(double value) {
    const double floor_value = std::floor(value), fraction = value - floor_value;
    if (fraction < 0.5) return static_cast<long long>(floor_value);
    if (fraction > 0.5) return static_cast<long long>(floor_value + 1);
    const auto lower = static_cast<long long>(floor_value);
    return lower % 2 == 0 ? lower : lower + 1;
}
Money parse_money(const std::string& text, const std::string& currency) {
    if (currency.size() != 3) throw std::invalid_argument("currency must be a three-letter ISO code");
    std::size_t used = 0;
    const double value = std::stod(text, &used);
    if (used != text.size() || !std::isfinite(value)) throw std::invalid_argument("invalid money amount");
    return {bankers_round(value * 10000.0), currency};
}
std::string format_money(Money value) {
    std::ostringstream out;
    out << value.currency << ' ' << std::fixed << std::setprecision(4) << (static_cast<double>(value.units) / 10000.0);
    return out.str();
}
}
