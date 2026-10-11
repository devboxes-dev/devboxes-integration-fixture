CXX ?= c++
CXXFLAGS ?= -std=c++17 -Wall -Wextra -Wpedantic -Werror -O2
CPPFLAGS ?= -Iinclude
BUILD := build
SOURCES := $(wildcard src/*.cpp)
OBJECTS := $(patsubst src/%.cpp,$(BUILD)/%.o,$(SOURCES))

.PHONY: all test clean examples
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
	@if command -v node >/dev/null 2>&1; then node --test; else echo "Node.js unavailable; skipping existing JavaScript tests"; fi

examples: $(BUILD)/scenario
	@for file in examples/*.ini; do echo "== $$file =="; $(BUILD)/scenario run 10 || exit $$?; done

clean:
	rm -rf $(BUILD)
