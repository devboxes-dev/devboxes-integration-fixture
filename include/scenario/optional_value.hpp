#pragma once
#include <string>
namespace scenario { template<class T> struct OptionalValue {bool available=false;T value{};static OptionalValue some(T v){return {true,v};}static OptionalValue missing(){return {};}std::string render()const{return available?std::to_string(value):"unavailable";}}; }
