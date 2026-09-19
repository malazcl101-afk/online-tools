(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BMRTool = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function round(value) { return Math.round(value); }

  function calculate(weightKg, heightCm, age, sex) {
    const weight = Number(weightKg);
    const height = Number(heightCm);
    const years = Number(age);
    if (!Number.isFinite(weight) || weight < 20 || weight > 500) throw new RangeError("INVALID_WEIGHT");
    if (!Number.isFinite(height) || height < 80 || height > 250) throw new RangeError("INVALID_HEIGHT");
    if (!Number.isFinite(years) || years < 18 || years > 120) throw new RangeError("INVALID_AGE");
    if (sex !== "male" && sex !== "female") throw new RangeError("INVALID_SEX");
    const adjustment = sex === "male" ? 5 : -161;
    return round(10 * weight + 6.25 * height - 5 * years + adjustment);
  }

  return { calculate };
});
