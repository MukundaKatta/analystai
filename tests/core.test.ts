import { describe, it, expect } from "vitest";
import { Analystai } from "../src/core.js";
describe("Analystai", () => {
  it("init", () => { expect(new Analystai().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Analystai(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Analystai(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
