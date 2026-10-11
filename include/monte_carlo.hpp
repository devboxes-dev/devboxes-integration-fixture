#pragma once
#include "scenario_file.hpp"
#include <cstddef>
#include <cstdint>
#include <vector>
namespace scenario {
struct MonteCarloSummary {
    double loss_p10, loss_p50, loss_p90;
    double activation_p10, activation_p50, activation_p90;
    double workload_p10, workload_p50, workload_p90;
};
MonteCarloSummary simulate_ranges(const Inputs& inputs, std::size_t iterations, std::uint64_t seed);
}
