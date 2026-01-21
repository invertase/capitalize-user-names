import { describe, it, expect } from "vitest";
import { capitalizeWord, buildFullName, capitalizeName } from "./index";

describe("capitalizeWord", () => {
  it("should capitalize a single lowercase word", () => {
    expect(capitalizeWord("jacob")).toBe("Jacob");
  });

  it("should capitalize a single uppercase word", () => {
    expect(capitalizeWord("JACOB")).toBe("Jacob");
  });

  it("should capitalize a mixed case word", () => {
    expect(capitalizeWord("jAcOb")).toBe("Jacob");
  });

  it("should handle title field correctly", () => {
    expect(capitalizeWord("mr")).toBe("Mr");
    expect(capitalizeWord("mrs")).toBe("Mrs");
    expect(capitalizeWord("dr")).toBe("Dr");
  });

  it("should handle empty string", () => {
    expect(capitalizeWord("")).toBe("");
  });

  it("should handle single character", () => {
    expect(capitalizeWord("a")).toBe("A");
  });
});

describe("buildFullName", () => {
  it("should combine title, firstName, and lastName", () => {
    expect(buildFullName("Mr", "Jacob", "Cable")).toBe("Mr Jacob Cable");
  });

  it("should handle missing title", () => {
    expect(buildFullName(undefined, "Jacob", "Cable")).toBe("Jacob Cable");
  });

  it("should handle missing firstName", () => {
    expect(buildFullName("Mr", undefined, "Cable")).toBe("Mr Cable");
  });

  it("should handle missing lastName", () => {
    expect(buildFullName("Mr", "Jacob", undefined)).toBe("Mr Jacob");
  });

  it("should handle only firstName", () => {
    expect(buildFullName(undefined, "Jacob", undefined)).toBe("Jacob");
  });

  it("should return empty string when all fields are missing", () => {
    expect(buildFullName(undefined, undefined, undefined)).toBe("");
  });
});

describe("capitalizeName", () => {
  it("should capitalize multiple words", () => {
    expect(capitalizeName("john doe")).toBe("John Doe");
  });

  it("should handle single word", () => {
    expect(capitalizeName("john")).toBe("John");
  });

  it("should handle already capitalized names", () => {
    expect(capitalizeName("John Doe")).toBe("John Doe");
  });
});

describe("integration: name field generation", () => {
  it("should correctly process and combine name fields", () => {
    const title = capitalizeWord("mr");
    const firstName = capitalizeWord("jacob");
    const lastName = capitalizeWord("cable");
    const fullName = buildFullName(title, firstName, lastName);

    expect(title).toBe("Mr");
    expect(firstName).toBe("Jacob");
    expect(lastName).toBe("Cable");
    expect(fullName).toBe("Mr Jacob Cable");
  });

  it("should handle already capitalized input", () => {
    const title = capitalizeWord("Mr");
    const firstName = capitalizeWord("Jacob");
    const lastName = capitalizeWord("Cable");
    const fullName = buildFullName(title, firstName, lastName);

    expect(title).toBe("Mr");
    expect(firstName).toBe("Jacob");
    expect(lastName).toBe("Cable");
    expect(fullName).toBe("Mr Jacob Cable");
  });
});
