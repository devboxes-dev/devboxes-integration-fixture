#pragma once
#include <string>
#include <vector>
namespace scenario { struct Month {int year,month; static Month parse(const std::string&); Month add(int) const; std::string str() const; bool operator<=(const Month& x)const{return year<x.year||(year==x.year&&month<=x.month);} bool operator==(const Month& x)const{return year==x.year&&month==x.month;} }; std::vector<Month> month_range(Month,Month); }
