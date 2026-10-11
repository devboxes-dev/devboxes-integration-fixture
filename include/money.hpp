#pragma once
#include <optional>
#include <string>
namespace scenario {
struct Money { long long units = 0; std::string currency = "USD"; };
Money parse_money(const std::string& text, const std::string& currency = "USD");
std::string format_money(Money value);
long long bankers_round(double value);
long long payer_count(Money target, Money monthly_price);
}
