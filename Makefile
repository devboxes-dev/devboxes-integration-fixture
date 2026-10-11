CXX ?= c++
CXXFLAGS ?= -std=c++17 -Wall -Wextra -Werror -pedantic -Iinclude
SOURCES := $(wildcard src/*.cpp)
.PHONY: all test clean
all: scenario-calculator
scenario-calculator: $(SOURCES)
	$(CXX) $(CXXFLAGS) $(SOURCES) -o $@
test: scenario-calculator tests/unit
	./tests/unit
	sh tests/e2e.sh

tests/unit: tests/unit.cpp src/string_utils.cpp src/csv.cpp src/month.cpp src/money.cpp src/probability.cpp
	$(CXX) $(CXXFLAGS) $^ -o $@
clean:
	rm -f scenario-calculator tests/unit
