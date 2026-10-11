#include "html_report.hpp"
#include "money.hpp"
#include "text.hpp"
#include <sstream>
namespace scenario {
namespace {
std::string escape_html(const std::string& value) {
    std::string out;
    for (char c : value) {
        if (c == '&') out += "&amp;";
        else if (c == '<') out += "&lt;";
        else if (c == '>') out += "&gt;";
        else if (c == '"') out += "&quot;";
        else if (c == '\'') out += "&#39;";
        else out += c;
    }
    return out;
}
std::string value(const Inputs& inputs, const std::string& key, const std::string& fallback) {
    const auto found = inputs.find(key);
    return found == inputs.end() ? fallback : found->second;
}
}
std::string render_html_report(const Inputs& inputs) {
    const auto currency = value(inputs, "currency", "USD");
    const auto price = parse_money(value(inputs, "monthly_price", "10"), currency);
    const auto target = parse_money(value(inputs, "target_mrr", "50000"), currency);
    const auto payers = (target.units + price.units - 1) / price.units;
    std::ostringstream out;
    out << "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Hypothetical scenario report</title>"
        << "<style>body{font:16px system-ui,sans-serif;max-width:52rem;margin:3rem auto;padding:0 1rem;color:#18212b}aside{background:#fff3cd;padding:1rem;border-left:5px solid #d39e00}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:.6rem;border-bottom:1px solid #ddd}footer{margin-top:2rem;color:#555}</style></head><body>"
        << "<h1>" << escape_html(value(inputs, "name", "Unnamed hypothetical scenario")) << "</h1>"
        << "<aside><strong>HYPOTHETICAL ONLY</strong> — decision preparation, not a forecast or price approval. No live data used.</aside>"
        << "<h2>Simple payer arithmetic</h2><table><tbody><tr><th>Currency</th><td>" << escape_html(currency)
        << "</td></tr><tr><th>Target MRR</th><td>" << format_money(target) << "</td></tr><tr><th>Monthly price</th><td>" << format_money(price)
        << "</td></tr><tr><th>Payers required</th><td>" << payers << "</td></tr></tbody></table><h2>Inputs</h2><table><tbody>";
    for (const auto& entry : inputs) out << "<tr><th>" << escape_html(entry.first) << "</th><td>" << escape_html(entry.second) << "</td></tr>";
    out << "</tbody></table><footer>Coverage limitations: steady-state payer arithmetic only. Unprovided inputs are unavailable; this page excludes cohort timing, conversion, fees, refunds, and uncertainty.</footer></body></html>\n";
    return out.str();
}
}
