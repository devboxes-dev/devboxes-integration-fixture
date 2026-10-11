#pragma once
#include <string>
#include <vector>
namespace scenario { struct Model {std::string name="unnamed",currency="USD",period="monthly",start="2026-01";double target=50000,price=0,loss=0,open_activation=0,activation_paid=0,cost=0,expiry_low=0,expiry_high=0,activation_low=0,activation_high=0,paid_low=0,paid_high=0;int months=6,iterations=10000;unsigned seed=42;bool has_price=false,has_loss=false,has_activation=false,has_cost=false,has_expiry_range=false,has_activation_range=false,has_paid_range=false;};Model load(const std::string&);std::vector<std::string> validate(const Model&);std::string execute(const Model&,const std::string&,const std::string& format="text"); }
