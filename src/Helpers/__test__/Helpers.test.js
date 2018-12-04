import {
  formatCurrency,
  filterOptions,
  reduceOptions,
  fastest,
  cheapest,
  distance,
  makeGraph,
  makeResult,
  shortestPath,
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

  describe("#fastest", () => {
    it("formats duration in minutes", () => {
      const duration = {
        duration: {h: "02h", m: "15m"}
      };

      expect(fastest(duration)).toBe(135);
    });

    it("does not format empty duration", () => {
      const duration = {
        duration: {h: null, m: null}
      };

      expect(fastest(duration)).toBe(0);
    });
  });

  describe("#cheapest", () => {
    it("does apply discount and formats cost", () => {
      const cost = {
        cost: 100,
        discount: 15
      };

      expect(cheapest(cost)).toBe(85);
    });

    it("does not apply discount for no discount", () => {
      const cost = {
        cost: 100,
        discount: 0
      };

      expect(cheapest(cost)).toBe(100);
    });
  });

  describe("#makeGraph", () => {
    it("generates a graph for given dataset", () => {
      const data = [
        {departure: "A", arrival: "B", cost: 100},
        {departure: "B", arrival: "C", cost: 200},
        {departure: "C", arrival: "A", cost: 200},
        {departure: "A", arrival: "C", cost: 200},
      ];

      const graph = {
        A: {
          B: {index: 0, weight: 100},
          C: {index: 3, weight: 200},
        },
        B: {
          C: {index: 1, weight: 200}
        },
        C: {
          A: {index: 2, weight: 200},
        }
      };

      expect(makeGraph(data, cheapest)).toEqual(graph);
    });

    it("does not generate a graph for empty dataset", () => {
      const data = [];
      const graph = {};

      expect(makeGraph(data, cheapest)).toEqual(graph);
    });
  });

  describe("#distance", () => {
    it("finds a smallest key", () => {
      const weights = {A: 10, B: 3, C: 7, D: 17};
      const searched = {};

      expect(distance(weights, searched)).toBe("B");
    });

    it("finds a smallest key excluding already searched", () => {
      const weights = {A: 10, B: 3, C: 7, D: 17};
      const searched = {B: true};

      expect(distance(weights, searched)).toBe("C");
    });
  });

  describe("#makeResult", () => {
    it("returns deals for path and calculates total cost and duration", () => {
      const path = {B: 0, C: 3};
      const end = "C";
      const data = [
        {departure: "A", arrival: "B", cost: 100, duration: {h: "05", m: "15m"}},
        {departure: "B", arrival: "C", cost: 200, duration: {h: "02", m: "0m"}},
        {departure: "C", arrival: "A", cost: 200, duration: {h: "01", m: "15m"}},
        {departure: "A", arrival: "C", cost: 200, duration: {h: "03", m: "15m"}},
      ];
      const result = {
        items: [
          {departure: "A", arrival: "C", cost: 200, duration: {h: "03", m: "15m"}},
        ],
        cost: 200,
        duration: {h: 3, m: 15}
      };

      expect(makeResult(data, path, end)).toEqual(result);
    });

    it("returns an empty result for invalid data", () => {
      const path = {};
      const end = "C";
      const data = [];
      const result = {
        items: [],
        cost: 0,
        duration: {h: 0, m: 0}
      };

      expect(makeResult(data, path, end)).toEqual(result);
    });
  });

  describe("#shortestPath", () => {
    it("finds a shortest path between two nodes", () => {
      const path = {path: {B: 0, C: 3}, total: 200};
      const graph = {
        A: {
          B: {index: 0, weight: 100},
          C: {index: 3, weight: 200},
        },
        B: {
          C: {index: 1, weight: 200}
        },
        C: {
          A: {index: 2, weight: 200},
        }
      };

      expect(shortestPath(graph, "A", "C")).toEqual(path);
    });
  });
});
