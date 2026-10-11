#include "scenario_lint.hpp"
#include "text.hpp"
#include <cctype>
#include <regex>
namespace scenario {
std::vector<std::string> lint_scenario_text(const std::string& text) {
    const std::regex email(R"([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})");
    const std::regex url(R"((https?://|www\.)\S+)", std::regex::icase);
    std::vector<std::string> warnings;
    std::size_t line_no = 0, start = 0;
    while (start <= text.size()) {
        ++line_no;
        const auto end = text.find('\n', start);
        const auto line = trim(text.substr(start, end == std::string::npos ? end : end - start));
        const auto equal = line.find('=');
        if (!line.empty() && line[0] != '#' && line[0] != ';' && equal != std::string::npos) {
            const auto key = trim(line.substr(0, equal));
            const auto val = trim(line.substr(equal + 1));
            std::string reason;
            std::string lowered = val;
            for (char& c : lowered) c = static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
            if (std::regex_search(val, email)) reason = "contains an email-like value";
            else if (std::regex_search(val, url)) reason = "contains a URL-like value";
            else if (lowered.find("production") != std::string::npos || lowered.find("actual") != std::string::npos || lowered.find("live data") != std::string::npos) reason = "uses wording associated with live or actual data";
            else if ((key.find("price") != std::string::npos || key.find("mrr") != std::string::npos) && val.find_first_of("0123456789") != std::string::npos) {
                try { if (std::stod(val) > 1000000.0) reason = "numeric financial value is unusually large for an example"; } catch (...) {}
            }
            if (!reason.empty()) warnings.push_back("line " + std::to_string(line_no) + " (" + key + "): warning: " + reason + "; review whether the example is hypothetical");
        }
        if (end == std::string::npos) break;
        start = end + 1;
    }
    return warnings;
}
}
