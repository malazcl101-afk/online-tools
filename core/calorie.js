(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.CalorieTool = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function calculate(tdee, sex) {
    const maintenance = Number(tdee);
    if (!Number.isFinite(maintenance) || maintenance <= 0) throw new RangeError("INVALID_TDEE");
    if (sex !== "male" && sex !== "female") throw new RangeError("INVALID_SEX");

    // Conservative planning estimates. They are not personalised medical advice.
    const minimum = sex === "female" ? 1200 : 1500;
    const gentleLoss = Math.max(minimum, Math.round(maintenance - 250));
    const gradualLoss = Math.max(minimum, Math.round(maintenance - 500));
    const gentleGain = Math.round(maintenance + 250);

    return { maintenance, gentleLoss, gradualLoss, gentleGain, minimum };
  }

  return { calculate };
});
