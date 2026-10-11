#pragma once
#include <string>
#include <vector>
namespace scenario {
std::string trim(const std::string& value);
std::vector<std::string> split(const std::string& value, char delimiter);
std::string replace_all(std::string value, const std::string& from, const std::string& to);
}
