#include "scenario/money.hpp"
#include <cmath>
#include <iomanip>
#include <sstream>
#include <stdexcept>
namespace scenario {Money Money::parse(const std::string&s,const std::string&c){if(c.size()!=3)throw std::invalid_argument("currency must be ISO 4217 code");std::size_t n=0;long double v=std::stold(s,&n);if(n!=s.size())throw std::invalid_argument("invalid amount");return {static_cast<long long>(std::nearbyint(v*10000.0L)),c};}std::string Money::str()const{std::ostringstream o;o<<currency<<" "<<std::fixed<<std::setprecision(4)<<static_cast<double>(units)/10000;return o.str();}Money Money::operator+(const Money& x)const{if(currency!=x.currency)throw std::domain_error("currency mismatch");return {units+x.units,currency};}Money Money::operator-(const Money& x)const{if(currency!=x.currency)throw std::domain_error("currency mismatch");return {units-x.units,currency};}}
