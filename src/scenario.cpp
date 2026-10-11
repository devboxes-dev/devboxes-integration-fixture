#include "scenario/scenario.hpp"
#include "scenario/month.hpp"
#include "scenario/string_utils.hpp"
#include <fstream>
#include <iomanip>
#include <sstream>
#include <stdexcept>
#include <cmath>
#include <regex>
namespace scenario {
Model load(const std::string& path){
 std::ifstream in(path);if(!in)throw std::runtime_error("cannot open scenario: "+path);
 std::string contents((std::istreambuf_iterator<char>(in)),{});
 const bool json=path.size()>=5&&path.substr(path.size()-5)==".json";
 std::istringstream input(contents);std::string line;
 if(json){
  // Convert the supported flat JSON object in memory; never create a bridge file.
  std::string converted;std::regex field("\\\"([^\\\"]+)\\\"\\s*:\\s*(\\\"([^\\\"]*)\\\"|[-+]?[0-9]*\\.?[0-9]+)");
  std::size_t matched=0;
  for(std::sregex_iterator i(contents.begin(),contents.end(),field),end;i!=end;++i){converted+=(*i)[1].str()+" = "+((*i)[3].matched?(*i)[3].str():(*i)[2].str())+"\n";++matched;}
  if(matched==0)throw std::runtime_error(path+": invalid or empty JSON scenario");
  input.clear();input.str(converted);
 }
 Model m;std::string section;int ln=0;
 while(std::getline(input,line)){++ln;line=trim(line);if(line.empty()||line[0]=='#'||line[0]==';')continue;if(line.front()=='['&&line.back()==']'){section=case_fold(line.substr(1,line.size()-2));continue;}auto p=line.find('=');if(p==std::string::npos)throw std::runtime_error(path+":"+std::to_string(ln)+": expected key=value");auto k=case_fold(trim(line.substr(0,p))),v=trim(line.substr(p+1));try{if(k=="name")m.name=v;else if(k=="currency")m.currency=v;else if(k=="period")m.period=case_fold(v);else if(k=="start")m.start=v;else if(k=="target_mrr")m.target=std::stod(v);else if(k=="price"){m.price=std::stod(v);m.has_price=true;}else if(k=="expiry_loss"){m.loss=std::stod(v);m.has_loss=true;}else if(k=="first_open_to_activation"){m.open_activation=std::stod(v);m.has_activation=true;}else if(k=="activation_to_paid")m.activation_paid=std::stod(v);else if(k=="months")m.months=std::stoi(v);else if(k=="monthly_cost"){m.cost=std::stod(v);m.has_cost=true;}}catch(...){throw std::runtime_error(path+":"+std::to_string(ln)+": invalid value for "+k);}}
 return m;
}
std::vector<std::string> validate(const Model&m){std::vector<std::string> e;if(m.currency.size()!=3)e.push_back("currency must be a three-letter ISO code");if(m.target<0)e.push_back("target_mrr must be nonnegative");if(m.has_price&&m.price<=0)e.push_back("price must be positive");if(m.has_loss&&(m.loss<0||m.loss>1))e.push_back("expiry_loss must be 0..1");if(m.has_activation&&(m.open_activation<0||m.open_activation>1||m.activation_paid<0||m.activation_paid>1))e.push_back("probabilities must be 0..1");if(m.months<1||m.months>120)e.push_back("months must be 1..120");if(m.period!="weekly"&&m.period!="monthly"&&m.period!="quarterly"&&m.period!="annual")e.push_back("period must be weekly, monthly, quarterly or annual");try{Month::parse(m.start);}catch(...){e.push_back("start must be YYYY-MM");}return e;}
std::string execute(const Model&m,const std::string&cmd,const std::string&fmt){auto errors=validate(m);if(!errors.empty()){std::string s="Invalid scenario:";for(auto&e:errors)s+="\n- "+e;return s;}double monthly=m.price*(m.period=="weekly"?52.0/12:m.period=="quarterly"?1.0/3:m.period=="annual"?1.0/12:1);long long payers=m.has_price?static_cast<long long>(std::ceil(m.target/monthly)):0;std::ostringstream o;auto row=[&](const std::string&a,const std::string&b){if(fmt=="csv")o<<a<<','<<b<<"\n";else if(fmt=="markdown")o<<"| "<<a<<" | "<<b<<" |\n";else o<<std::left<<std::setw(38)<<a<<b<<"\n";};o<<"HYPOTHETICAL / NOT A FORECAST — synthetic scenario only\n";if(cmd=="check"){o<<"Scenario valid: "<<m.name<<"\n";return o.str();}if(cmd=="run"||cmd=="compare"){row("Scenario",m.name);row("Currency",m.currency);row("Monthly-normalized price",m.has_price?m.currency+" "+std::to_string(monthly):"unavailable (price missing)");row("Active payers for target MRR",m.has_price?std::to_string(payers):"unavailable (price missing)");row("Target MRR",m.currency+" "+std::to_string(m.target));}
if(cmd=="cohort"||cmd=="run"||cmd=="compare"){o<<"\nCohort (active payers; each value HYPOTHETICAL)\n";double active=0;for(int i=0;i<m.months;++i){double add=payers/m.months;double lost=active*m.loss;active=active-lost+add;row(Month::parse(m.start).add(i).str(),std::to_string(static_cast<long long>(std::llround(active)))+" active; "+std::to_string(static_cast<long long>(std::llround(lost)))+" lost");}}
if(cmd=="seek"){double goal=payers;double n=goal;for(int i=1;i<m.months;++i)n=goal*std::pow(1-m.loss,i);row("Monthly new payers to reach target",m.has_price?std::to_string(static_cast<long long>(std::ceil(n))):"unavailable (price missing)");}
if(cmd=="breakeven"){row("Break-even active payers",m.has_cost&&m.has_price?std::to_string(static_cast<long long>(std::ceil(m.cost/monthly))):"unavailable (monthly_cost or price missing)");}
if(cmd=="sensitivity"){row("Expiry loss","Required replacement payers/month");for(double loss:{0.0,0.05,0.1,0.2})row(std::to_string(loss*100)+"%",m.has_price?std::to_string(static_cast<long long>(std::ceil(payers*loss))):"unavailable (price missing)");}
 if(cmd=="run"||cmd=="cohort"){row("Replacement workload",m.has_price&&m.has_loss?std::to_string(static_cast<long long>(std::ceil(payers*m.loss))):"unavailable (price or expiry_loss missing)");const bool conversion_known=m.has_activation&&m.open_activation>0&&m.activation_paid>0;row("First opens for paid users",conversion_known&&m.has_price?std::to_string(static_cast<long long>(std::ceil(payers/(m.open_activation*m.activation_paid)))):"unavailable (conversion probability is missing or zero)");}if(fmt=="json"){std::string raw=o.str();return "{\"label\":\"HYPOTHETICAL / NOT A FORECAST\",\"scenario\":\""+m.name+"\",\"command\":\""+cmd+"\",\"report\":\""+raw+"\"}\n";}return o.str();}
}
