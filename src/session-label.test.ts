import { describe, expect, test } from "bun:test";
import { formatSessionLabel } from "./session-label";

describe("formatSessionLabel", () => {
  test("formats the stable label with a title", () => {
    expect(formatSessionLabel("stable", "Clear signal")).toBe(
      "stable: Clear signal",
    );
  });

  test("formats the native label with a title", () => {
    expect(formatSessionLabel("native", "Clear signal")).toBe(
      "native: Clear signal",
    );
  });

  test("trims and collapses title whitespace", () => {
    expect(formatSessionLabel("stable", "  Hello   world  ")).toBe(
      "stable: Hello world",
    );
    expect(formatSessionLabel("native", "  Hello   world  ")).toBe(
      "native: Hello world",
    );
  });

  test("rejects unsupported labels", () => {
    expect(() => formatSessionLabel("beta", "Clear signal")).toThrow();
  });

  test("rejects an empty normalized title", () => {
    expect(() => formatSessionLabel("stable", "   ")).toThrow();
    expect(() => formatSessionLabel("native", "   ")).toThrow();
  });
});
