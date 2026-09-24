(async function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const t = await (await fetch("../../locales/fr-ideal-weight.json")).json();
  const labels = {"app-title":"appTitle",intro:"intro","height-label":"height","weight-label":"weight",calculate:"calculate",reset:"reset","range-label":"rangeLabel","range-explanation":"rangeExplanation","reference-label":"referenceLabel","bmi-label":"bmiLabel",method:"method",privacy:"privacy",disclaimer:"disclaimer"};
  Object.entries(labels).forEach(([id,key]) => { $(id).textContent = t[key]; });
  const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
  const n = (number) => Number(number).toLocaleString("fr-FR", {minimumFractionDigits:1, maximumFractionDigits:1});
  function clear() { $("error").textContent = ""; $("result").classList.add("hidden"); $("current-card").classList.add("hidden"); }
  function resize() { setTimeout(() => parent.postMessage({type:"tool-resize",tool:"ideal-weight",height:document.documentElement.scrollHeight},"*"),30); }
  $("ideal-weight-form").addEventListener("submit", (event) => {
    event.preventDefault(); clear();
    try {
      const height = $("height").value;
      if (!height) throw new Error("REQUIRED");
      const result = IdealWeightTool.calculate(height, $("weight").value);
      $("range-value").textContent = fill(t.rangeText,{lower:n(result.lower),upper:n(result.upper)});
      $("reference-value").textContent = fill(t.referenceText,{value:n(result.reference)});
      if (result.bmi !== undefined) {
        $("bmi-value").textContent = fill(t.bmiText,{value:n(result.bmi),category:t[result.category]});
        let difference = t.withinRange;
        if (result.currentWeight < result.lower) difference = fill(t.belowRange,{value:n(result.difference)});
        if (result.currentWeight > result.upper) difference = fill(t.aboveRange,{value:n(result.difference)});
        $("difference").textContent = difference; $("current-card").classList.remove("hidden");
      }
      $("result").classList.remove("hidden"); $("result").focus({preventScroll:true});
    } catch (error) {
      const messages = {REQUIRED:t.required,INVALID_HEIGHT:t.invalidHeight,INVALID_WEIGHT:t.invalidWeight};
      $("error").textContent = messages[error.message] || t.required;
    }
    resize();
  });
  $("ideal-weight-form").addEventListener("reset", () => setTimeout(() => { clear(); resize(); },0));
  new ResizeObserver(resize).observe(document.body); resize();
})();
