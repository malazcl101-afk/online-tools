(async function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const response = await fetch("../../locales/fr.json");
  const t = await response.json();
  let unit = "metric";

  const labels = {
    "app-title":"appTitle", intro:"intro", "weight-kg-label":"weightKg",
    "height-cm-label":"heightCm", "weight-lb-label":"weightLb",
    "height-ft-label":"heightFt", "height-in-label":"heightIn",
    calculate:"calculate", reset:"reset", "your-bmi":"yourBmi",
    privacy:"privacy", disclaimer:"disclaimer"
  };
  Object.entries(labels).forEach(([id,key]) => { $(id).textContent = t[key]; });
  document.querySelectorAll(".tab").forEach((button) => {
    button.textContent = t[button.dataset.unit];
    button.addEventListener("click", () => setUnit(button.dataset.unit));
  });

  function format(template, values) {
    return template.replace(/\{(\w+)\}/g, (_, key) => values[key]);
  }
  function setUnit(next) {
    unit = next;
    $("metric-fields").classList.toggle("hidden", unit !== "metric");
    $("imperial-fields").classList.toggle("hidden", unit !== "imperial");
    document.querySelectorAll(".tab").forEach((button) => {
      const active = button.dataset.unit === unit;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    clearOutput();
    notifyHeight();
  }
  function clearOutput() {
    $("error").textContent = "";
    $("result").classList.add("hidden");
  }
  function showError(code) {
    $("error").textContent = code === "INVALID_WEIGHT" ? t.invalidWeight : code === "INVALID_HEIGHT" ? t.invalidHeight : t.required;
  }
  function metricHeightFromImperial() {
    return ((Number($("height-ft").value) * 12 + Number($("height-in").value)) * 2.54);
  }
  $("bmi-form").addEventListener("submit", (event) => {
    event.preventDefault(); clearOutput();
    try {
      let bmi, heightCm;
      if (unit === "metric") {
        if (!$("weight-kg").value || !$("height-cm").value) throw new Error("REQUIRED");
        heightCm = Number($("height-cm").value);
        bmi = BMITool.calculateMetric($("weight-kg").value, heightCm);
      } else {
        if (!$("weight-lb").value || !$("height-ft").value || $("height-in").value === "") throw new Error("REQUIRED");
        heightCm = metricHeightFromImperial();
        bmi = BMITool.calculateImperial($("weight-lb").value, $("height-ft").value, $("height-in").value);
      }
      const key = BMITool.categoryKey(bmi);
      const range = BMITool.healthyWeightRange(heightCm);
      $("bmi-value").textContent = bmi.toLocaleString("fr-FR", { minimumFractionDigits:1 });
      $("category").textContent = format(t.category, { category:t[key] });
      $("healthy-range").textContent = format(t.healthyRange, {
        min:range.min.toLocaleString("fr-FR"), max:range.max.toLocaleString("fr-FR")
      });
      $("result").classList.remove("hidden");
      $("result").focus({ preventScroll:true });
    } catch (error) { showError(error.message); }
    notifyHeight();
  });
  $("bmi-form").addEventListener("reset", () => setTimeout(clearOutput, 0));

  function notifyHeight() {
    setTimeout(() => parent.postMessage({ type:"tool-resize", tool:"bmi", height:document.documentElement.scrollHeight }, "*"), 30);
  }
  new ResizeObserver(notifyHeight).observe(document.body);
  notifyHeight();
})();
