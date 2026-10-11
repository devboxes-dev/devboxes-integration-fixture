#include "csv.hpp"
#include <stdexcept>
namespace scenario {
Csv parse_csv(const std::string& text) {
    Csv rows; std::vector<std::string> row; std::string field; bool quoted = false;
    for (std::size_t i = 0; i < text.size(); ++i) {
        const char c = text[i];
        if (quoted) {
            if (c == '"' && i + 1 < text.size() && text[i + 1] == '"') { field += '"'; ++i; }
            else if (c == '"') quoted = false; else field += c;
        } else if (c == '"' && field.empty()) quoted = true;
        else if (c == ',') { row.push_back(field); field.clear(); }
        else if (c == '\n' || c == '\r') { if (c == '\r' && i + 1 < text.size() && text[i + 1] == '\n') ++i; row.push_back(field); rows.push_back(row); row.clear(); field.clear(); }
        else field += c;
    }
    if (quoted) throw std::invalid_argument("unterminated CSV quoted field");
    if (!field.empty() || !row.empty()) { row.push_back(field); rows.push_back(row); }
    return rows;
}
std::string write_csv(const Csv& rows) {
    std::string out;
    for (const auto& row : rows) { for (std::size_t i = 0; i < row.size(); ++i) { if (i) out += ','; out += '"'; for (char c : row[i]) { out += c; if (c == '"') out += '"'; } out += '"'; } out += '\n'; }
    return out;
}
}
