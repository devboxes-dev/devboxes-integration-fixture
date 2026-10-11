#pragma once
#include <string>
#include <vector>
namespace scenario { struct Model {std::string name="unnamed",currency="USD",period="monthly",start="2026-01";double target=50000,price=0,loss=0,open_activation=0,activation_paid=0,cost=0;int months=6;bool has_price=false,has_loss=false,has_activation=false,has_cost=false;};Model load(const std::string&);std::vector<std::string> validate(const Model&);std::string execute(const Model&,const std::string&,const std::string& format="text"); }
