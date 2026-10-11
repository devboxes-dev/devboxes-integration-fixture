#include "scenario/probability.hpp"
#include <stdexcept>
namespace scenario {Probability::Probability(double x):value(x){if(x<0||x>1)throw std::invalid_argument("probability must be between 0 and 1");}}
