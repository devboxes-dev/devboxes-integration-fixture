#pragma once
#include <string>
#include <vector>
namespace scenario { using Csv=std::vector<std::vector<std::string>>; Csv read_csv(const std::string&); std::string write_csv(const Csv&); }
