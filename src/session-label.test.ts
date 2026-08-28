import { describe, expect, test } from "bun:test";
import { formatSessionLabel } from "./session-label";

describe("formatSessionLabel", () => {
  test("formats the native stable label with a title", () => {
    expect(formatSessionLabel("stable", "Clear signal")).toBe(
      "stable: Clear signal",
    );
  });

  test("trims and collapses title whitespace", () => {
    expect(formatSessionLabel("stable", "  Hello   world  ")).toBe(
      "stable: Hello world",
    );
  });

  test("rejects unsupported labels", () => {
    expect(() => formatSessionLabel("beta", "Clear signal")).toThrow();
  });

  test("rejects an empty normalized title", () => {
    expect(() => formatSessionLabel("stable", "   ")).toThrow();
  });
});
