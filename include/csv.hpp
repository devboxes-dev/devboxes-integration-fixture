#pragma once
#include <string>
#include <vector>
namespace scenario {
using Csv = std::vector<std::vector<std::string>>;
Csv parse_csv(const std::string& text);
std::string write_csv(const Csv& rows);
}
