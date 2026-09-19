(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.TDEETool = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  function calculate(bmr, activity) {
    const base = Number(bmr);
    if (!Number.isFinite(base) || base <= 0) throw new RangeError("INVALID_BMR");
    const factor = activityFactors[activity];
    if (!factor) throw new RangeError("INVALID_ACTIVITY");
    return Math.round(base * factor);
  }

  return { calculate, activityFactors };
});
