(async function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const t = await (await fetch("../../locales/fr-bmr.json")).json();
  const labels = {"app-title":"appTitle", intro:"intro", "weight-label":"weight", "height-label":"height", "age-label":"age", "sex-label":"sex", male:"male", female:"female", calculate:"calculate", reset:"reset", "result-label":"resultLabel", "result-explanation":"explanation", formula:"formula", privacy:"privacy", disclaimer:"disclaimer"};
  Object.entries(labels).forEach(([id, key]) => { $(id).textContent = t[key]; });
  const fill = (s, values) => s.replace(/\{(\w+)\}/g, (_, key) => values[key]);
  function clear() { $("error").textContent = ""; $("result").classList.add("hidden"); }
  function notify() { setTimeout(() => parent.postMessage({type:"tool-resize", tool:"bmr", height:document.documentElement.scrollHeight}, "*"), 30); }
  $("bmr-form").addEventListener("submit", (event) => {
    event.preventDefault(); clear();
    try {
      if (!$("weight").value || !$("height").value || !$("age").value || !$("sex").value) throw new Error("REQUIRED");
      const bmr = BMRTool.calculate($("weight").value, $("height").value, $("age").value, $("sex").value);
      $("result-value").textContent = fill(t.resultText, {value:bmr.toLocaleString("fr-FR")});
      $("result").classList.remove("hidden"); $("result").focus({preventScroll:true});
    } catch (error) {
      const messages = {REQUIRED:t.required, INVALID_WEIGHT:t.invalidWeight, INVALID_HEIGHT:t.invalidHeight, INVALID_AGE:t.invalidAge, INVALID_SEX:t.required};
      $("error").textContent = messages[error.message] || t.required;
    }
    notify();
  });
  $("bmr-form").addEventListener("reset", () => setTimeout(() => { clear(); notify(); }, 0));
  new ResizeObserver(notify).observe(document.body); notify();
})();
