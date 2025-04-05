import { formatNumber } from "./helpers";

describe("formatNumber", () => {
  it("should add comma to plain numbers", () => {
    expect(formatNumber("1234567")).toBe("1,234,567");
  });

  it("should handle numbers with comma", () => {
    expect(formatNumber("1,234,567")).toBe("1,234,567");
  });
});
