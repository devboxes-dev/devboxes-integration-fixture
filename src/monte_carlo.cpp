#include "monte_carlo.hpp"
#include "money.hpp"
#include <algorithm>
#include <cmath>
#include <random>
#include <stdexcept>
#include <string>
namespace scenario {
namespace {
double required(const Inputs& inputs, const std::string& key) {
    const auto found = inputs.find(key);
    if (found == inputs.end()) throw std::invalid_argument("unavailable Monte Carlo input: " + key);
    std::size_t used = 0;
    const double result = std::stod(found->second, &used);
    if (used != found->second.size() || !std::isfinite(result) || result < 0 || result > 1) throw std::invalid_argument("invalid probability range input: " + key);
    return result;
}
double percentile(std::vector<double> values, double p) {
    std::sort(values.begin(), values.end());
    const double position = p * static_cast<double>(values.size() - 1);
    const auto low = static_cast<std::size_t>(position);
    const auto high = std::min(low + 1, values.size() - 1);
    return values[low] + (values[high] - values[low]) * (position - static_cast<double>(low));
}
}
MonteCarloSummary simulate_ranges(const Inputs& inputs, std::size_t iterations, std::uint64_t seed) {
    if (iterations == 0 || iterations > 10000000) throw std::invalid_argument("iterations must be between 1 and 10000000");
    const double loss_low = required(inputs, "loss_min"), loss_high = required(inputs, "loss_max");
    const double activation_low = required(inputs, "activation_min"), activation_high = required(inputs, "activation_max");
    if (loss_low > loss_high || activation_low > activation_high || activation_low == 0) throw std::invalid_argument("invalid loss or activation range");
    const double price = parse_money(inputs.count("monthly_price") ? inputs.at("monthly_price") : "10",
                                     inputs.count("currency") ? inputs.at("currency") : "USD").units;
    const double target = parse_money(inputs.count("target_mrr") ? inputs.at("target_mrr") : "50000",
                                      inputs.count("currency") ? inputs.at("currency") : "USD").units;
    if (price <= 0) throw std::invalid_argument("monthly_price must be positive");
    const double payers = std::ceil(target / price);
    std::mt19937_64 generator(seed);
    std::uniform_real_distribution<double> loss_distribution(loss_low, loss_high);
    std::uniform_real_distribution<double> activation_distribution(activation_low, activation_high);
    std::vector<double> losses, activations, workloads;
    losses.reserve(iterations); activations.reserve(iterations); workloads.reserve(iterations);
    for (std::size_t i = 0; i < iterations; ++i) {
        const double loss = loss_distribution(generator), activation = activation_distribution(generator);
        losses.push_back(loss); activations.push_back(activation);
        workloads.push_back(std::ceil(payers * loss) / activation);
    }
    return {percentile(losses, .10), percentile(losses, .50), percentile(losses, .90),
            percentile(activations, .10), percentile(activations, .50), percentile(activations, .90),
            percentile(workloads, .10), percentile(workloads, .50), percentile(workloads, .90)};
}
}
