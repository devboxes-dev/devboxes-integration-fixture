#pragma once
#include <string>
namespace scenario { struct Money {long long units;std::string currency;static Money parse(const std::string&,const std::string&);std::string str()const;Money operator+(const Money&)const;Money operator-(const Money&)const;}; }
