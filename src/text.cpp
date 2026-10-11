#include "text.hpp"
#include <algorithm>
#include <cctype>
namespace scenario {
std::string trim(const std::string& value) {
    auto first = std::find_if_not(value.begin(), value.end(), [](unsigned char c) { return std::isspace(c) != 0; });
    auto last = std::find_if_not(value.rbegin(), value.rend(), [](unsigned char c) { return std::isspace(c) != 0; }).base();
    return first >= last ? std::string{} : std::string(first, last);
}
std::vector<std::string> split(const std::string& value, char delimiter) {
    std::vector<std::string> out;
    std::size_t start = 0;
    for (;;) {
        const auto end = value.find(delimiter, start);
        out.push_back(value.substr(start, end == std::string::npos ? end : end - start));
        if (end == std::string::npos) return out;
        start = end + 1;
    }
}
std::string replace_all(std::string value, const std::string& from, const std::string& to) {
    if (from.empty()) return value;
    std::size_t at = 0;
    while ((at = value.find(from, at)) != std::string::npos) { value.replace(at, from.size(), to); at += to.size(); }
    return value;
}
}
