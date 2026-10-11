#include "scenario/month.hpp"
#include <cstdio>
#include <stdexcept>
namespace scenario {Month Month::parse(const std::string&s){if(s.size()!=7||s[4]!='-')throw std::invalid_argument("expected YYYY-MM");Month x{std::stoi(s.substr(0,4)),std::stoi(s.substr(5,2))};if(x.month<1||x.month>12)throw std::invalid_argument("invalid month");return x;} Month Month::add(int n)const{int k=year*12+month-1+n;return {k/12,k%12+1};}std::string Month::str()const{char b[8];std::snprintf(b,sizeof(b),"%04d-%02d",year,month);return b;}std::vector<Month> month_range(Month a,Month b){std::vector<Month> r;for(auto x=a;x<=b;x=x.add(1))r.push_back(x);return r;}}
