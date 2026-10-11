#include "scenario/string_utils.hpp"
#include <cctype>
namespace scenario {
std::string trim(const std::string& s) { auto a=s.find_first_not_of(" \t\r\n"); if(a==std::string::npos)return {}; return s.substr(a,s.find_last_not_of(" \t\r\n")-a+1); }
std::vector<std::string> split(const std::string& s,char d){std::vector<std::string> r;std::string x;for(char c:s){if(c==d){r.push_back(x);x.clear();}else x+=c;}r.push_back(x);return r;}
std::string case_fold(const std::string& s){std::string r=s;for(char& c:r)c=static_cast<char>(std::tolower(static_cast<unsigned char>(c)));return r;}
std::string pad(const std::string& s,std::size_t n,bool right){if(s.size()>=n)return s;return right?s+std::string(n-s.size(),' '):std::string(n-s.size(),' ')+s;}
}
