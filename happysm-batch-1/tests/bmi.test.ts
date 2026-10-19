import { describe, expect, it } from "vitest";
import { calculateAdultBmi } from "../lib/bmi";

describe("calculateAdultBmi", () => {
  it("calculates BMI and rounds to one decimal", () => {
    expect(calculateAdultBmi(70, 1.75).bmi).toBe(22.9);
  });
  it.each([
    [40, 1.6, "Underweight"],
    [47.36, 1.6, "Normal weight range"],
    [64, 1.6, "Overweight"],
    [80, 1.6, "Obesity class I"],
    [92, 1.6, "Obesity class II"],
    [103, 1.6, "Obesity class III"],
  ] as const)("classifies %s kg at %s m", (weight, height, expected) => {
    expect(calculateAdultBmi(weight, height).category).toBe(expected);
  });
  it("rejects zero and negative measurements", () => {
    expect(() => calculateAdultBmi(0, 1.7)).toThrow();
    expect(() => calculateAdultBmi(65, -1.7)).toThrow();
  });
  it("rejects non-numeric values", () => {
    expect(() => calculateAdultBmi(Number.NaN, 1.7)).toThrow();
  });
});
