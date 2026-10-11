#pragma once
#include <string>
#include <vector>
namespace scenario { std::string trim(const std::string&); std::vector<std::string> split(const std::string&, char); std::string case_fold(const std::string&); std::string pad(const std::string&, std::size_t, bool right=true); }
