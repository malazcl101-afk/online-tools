(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.IdealWeightTool = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const BMI_LOW = 18.5;
  const BMI_HIGH = 24.9;
  const BMI_REFERENCE = 22;

  function roundOne(value) { return Math.round(value * 10) / 10; }

  function category(bmi) {
    if (bmi < BMI_LOW) return "underweight";
    if (bmi < 25) return "healthy";
    if (bmi < 30) return "overweight";
    return "obesity";
  }

  function calculate(heightCm, currentWeightKg) {
    const height = Number(heightCm);
    if (!Number.isFinite(height) || height < 80 || height > 250) throw new RangeError("INVALID_HEIGHT");
    const metres = height / 100;
    const square = metres * metres;
    const result = {
      lower: roundOne(BMI_LOW * square),
      upper: roundOne(BMI_HIGH * square),
      reference: roundOne(BMI_REFERENCE * square)
    };

    if (currentWeightKg !== "" && currentWeightKg !== undefined && currentWeightKg !== null) {
      const currentWeight = Number(currentWeightKg);
      if (!Number.isFinite(currentWeight) || currentWeight < 20 || currentWeight > 500) throw new RangeError("INVALID_WEIGHT");
      const bmi = roundOne(currentWeight / square);
      result.currentWeight = currentWeight;
      result.bmi = bmi;
      result.category = category(bmi);
      if (currentWeight < result.lower) result.difference = roundOne(result.lower - currentWeight);
      else if (currentWeight > result.upper) result.difference = roundOne(currentWeight - result.upper);
      else result.difference = 0;
    }
    return result;
  }

  return { calculate, BMI_LOW, BMI_HIGH, BMI_REFERENCE };
});
