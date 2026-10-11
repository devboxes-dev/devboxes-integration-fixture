#include "money.hpp"
#include <cmath>
#include <iomanip>
#include <limits>
#include <sstream>
#include <stdexcept>
namespace scenario {
long long bankers_round(double value) {
    if (!std::isfinite(value)) throw std::invalid_argument("rounded amount must be finite");
    const long double extended = static_cast<long double>(value);
    const long double lower = std::floor(extended);
    const long double fraction = extended - lower;
    long double rounded = lower;
    if (fraction > 0.5L || (fraction == 0.5L && std::fmod(std::fabs(lower), 2.0L) != 0.0L)) rounded += 1.0L;
    if (rounded < static_cast<long double>(std::numeric_limits<long long>::min()) ||
        rounded > static_cast<long double>(std::numeric_limits<long long>::max())) {
        throw std::out_of_range("rounded amount exceeds four-decimal money range");
    }
    return static_cast<long long>(rounded);
}
Money parse_money(const std::string& text, const std::string& currency) {
    if (currency.size() != 3) throw std::invalid_argument("currency must be a three-letter ISO code");
    std::size_t used = 0;
    const double value = std::stod(text, &used);
    if (used != text.size() || !std::isfinite(value)) throw std::invalid_argument("invalid money amount");
    const long double scaled = static_cast<long double>(value) * 10000.0L;
    if (scaled < static_cast<long double>(std::numeric_limits<long long>::min()) - 1.0L ||
        scaled > static_cast<long double>(std::numeric_limits<long long>::max()) + 1.0L) {
        throw std::out_of_range("money amount exceeds four-decimal range");
    }
    return {bankers_round(static_cast<double>(scaled)), currency};
}
std::string format_money(Money value) {
    std::ostringstream out;
    out << value.currency << ' ' << std::fixed << std::setprecision(4) << (static_cast<double>(value.units) / 10000.0);
    return out.str();
}
long long payer_count(Money target, Money monthly_price) {
    if (target.currency != monthly_price.currency) throw std::invalid_argument("cannot calculate payers across currencies");
    if (target.units < 0) throw std::invalid_argument("target MRR cannot be negative");
    if (monthly_price.units <= 0) throw std::invalid_argument("monthly price must be positive");
    const long long quotient = target.units / monthly_price.units;
    const long long remainder = target.units % monthly_price.units;
    return quotient + (remainder == 0 ? 0 : 1);
}
}
