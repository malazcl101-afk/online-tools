(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BMITool = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function round(value, decimals) {
    const factor = 10 ** decimals;
    return Math.round((value + Number.EPSILON) * factor) / factor;
  }

  function calculateMetric(weightKg, heightCm) {
    const weight = Number(weightKg);
    const height = Number(heightCm);
    if (!Number.isFinite(weight) || weight < 20 || weight > 500) {
      throw new RangeError("INVALID_WEIGHT");
    }
    if (!Number.isFinite(height) || height < 80 || height > 250) {
      throw new RangeError("INVALID_HEIGHT");
    }
    const metres = height / 100;
    return round(weight / (metres * metres), 1);
  }

  function calculateImperial(weightLb, heightFt, heightIn) {
    const pounds = Number(weightLb);
    const inches = Number(heightFt) * 12 + Number(heightIn);
    if (!Number.isFinite(pounds) || pounds < 44 || pounds > 1102) {
      throw new RangeError("INVALID_WEIGHT");
    }
    if (!Number.isFinite(inches) || inches < 31.5 || inches > 98.5) {
      throw new RangeError("INVALID_HEIGHT");
    }
    return round((703 * pounds) / (inches * inches), 1);
  }

  function categoryKey(bmi) {
    if (bmi < 18.5) return "underweight";
    if (bmi < 25) return "healthy";
    if (bmi < 30) return "overweight";
    return "obesity";
  }

  function healthyWeightRange(heightCm) {
    const metres = Number(heightCm) / 100;
    if (!Number.isFinite(metres) || metres < 0.8 || metres > 2.5) {
      throw new RangeError("INVALID_HEIGHT");
    }
    return {
      min: round(18.5 * metres * metres, 1),
      max: round(24.9 * metres * metres, 1)
    };
  }

  return { calculateMetric, calculateImperial, categoryKey, healthyWeightRange };
});
