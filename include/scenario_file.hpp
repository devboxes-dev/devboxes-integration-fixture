#pragma once
#include <map>
#include <string>
namespace scenario {
using Inputs = std::map<std::string, std::string>;
Inputs read_scenario(const std::string& path);
void require_currency(const Inputs& inputs, const std::string& currency);
}
