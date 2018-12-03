import {
  formatCurrency,
  filterOptions,
  reduceOptions,
  fastest,
  cheapest,
} from '../';

describe("Helpers", () => {
  describe("#formatCurrency", () => {
    it("formats a currency with deeaults", () => {
      expect(formatCurrency(100)).toBe("$100")
    });

    it("formats a currency with custom settings", () => {
      expect(formatCurrency(100, "EUR")).toBe("100€")
      expect(formatCurrency(100, "USD")).toBe("$100")
    });
  });

  describe("#Options", () => {
    it("filters options to avoid duplicates", () => {
      expect([1,2,1,3,4].filter(filterOptions)).toEqual([1, 2, 3, 4]);
      expect([1,2,3,4].filter(filterOptions)).toEqual([1, 2, 3, 4]);
    });

    it("converts data to select options by departure and arrival", () => {
      const options = [
        {departure: "A", arrival: "B", cost: 100},
        {departure: "B", arrival: "C", cost: 200},
        {departure: "C", arrival: "A", cost: 200},
        {departure: "A", arrival: "C", cost: 200},
      ];

      expect(options.reduce(reduceOptions, []))
        .toEqual(["A","B","B","C","C","A","A","C"]);
    });
  });

  describe("#Graph", () => {
    it("formats duration in minutes", () => {
      const duration = {
        duration: {h: "02h", m: "15m"}
      };

      expect(fastest(duration)).toBe(135);
    });

    it("uses the discount and formats cost", () => {
      const cost = {
        cost: 100,
        discount: 15
      };

      expect(cheapest(cost)).toBe(85);
    });
  });
});
