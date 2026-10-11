CXX ?= c++
CXXFLAGS ?= -std=c++17 -Wall -Wextra -Wpedantic -Werror -O2
CPPFLAGS ?= -Iinclude
BUILD := build
SOURCES := $(wildcard src/*.cpp)
OBJECTS := $(patsubst src/%.cpp,$(BUILD)/%.o,$(SOURCES))

.PHONY: all test clean
all: $(BUILD)/scenario

$(BUILD):
	mkdir -p $@

$(BUILD)/%.o: src/%.cpp | $(BUILD)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) -c $< -o $@

$(BUILD)/scenario: $(OBJECTS)
	$(CXX) $(CXXFLAGS) $^ -o $@

$(BUILD)/tests: $(filter-out $(BUILD)/main.o,$(OBJECTS)) $(BUILD)/tests.o
	$(CXX) $(CXXFLAGS) $^ -o $@

$(BUILD)/tests.o: tests/test_main.cpp | $(BUILD)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) -c $< -o $@

test: $(BUILD)/scenario $(BUILD)/tests
	$(BUILD)/tests
	node --test

clean:
	rm -rf $(BUILD)
