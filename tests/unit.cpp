#include "scenario/string_utils.hpp"
#include "scenario/csv.hpp"
#include "scenario/month.hpp"
#include "scenario/money.hpp"
#include "scenario/probability.hpp"
#include "scenario/optional_value.hpp"
#include <cassert>
#include <stdexcept>
int main(){using namespace scenario;assert(trim(" x ")=="x");assert(case_fold("AbC")=="abc");assert(pad("x",3)=="x  ");auto csv=read_csv("a,\"b,c\"\n\"x\ny\",z");assert(csv.size()==2&&csv[0][1]=="b,c"&&csv[1][0]=="x\ny");assert(read_csv(write_csv(csv))[1][0]=="x\ny");assert(Month::parse("2025-12").add(1).str()=="2026-01");assert(month_range(Month::parse("2026-01"),Month::parse("2026-03")).size()==3);assert(Money::parse("1.23455","USD").units==12346);try{(void)(Money::parse("1","USD") + Money::parse("1","EUR"));assert(false);}catch(const std::domain_error&){}try{Probability p(1.1);(void)p;assert(false);}catch(const std::invalid_argument&){}OptionalValue<double> missing;assert(missing.render()=="unavailable");}
