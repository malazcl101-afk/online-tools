(async function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const t = await (await fetch("../../locales/fr-age.json")).json();
  const labels = {"app-title":"appTitle",intro:"intro","birth-label":"birthDate","reference-label":"referenceDate","reference-hint":"referenceHint",calculate:"calculate",reset:"reset","age-label":"ageLabel","days-label":"daysLabel","birthday-label":"birthdayLabel",method:"method",privacy:"privacy",disclaimer:"disclaimer"};
  Object.entries(labels).forEach(([id,key]) => { $(id).textContent = t[key]; });
  const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
  const n = (value) => Number(value).toLocaleString("fr-FR");
  function clear() { $("error").textContent = ""; $("result").classList.add("hidden"); }
  function resize() { setTimeout(() => parent.postMessage({type:"tool-resize",tool:"age",height:document.documentElement.scrollHeight},"*"),30); }
  $("age-form").addEventListener("submit", (event) => {
    event.preventDefault(); clear();
    try {
      const birth = $("birth-date").value;
      if (!birth) throw new Error("REQUIRED");
      const result = AgeTool.calculate(birth, $("reference-date").value || today());
      $("age-value").textContent = fill(t.ageText, result);
      $("days-value").textContent = fill(t.daysText, {value:n(result.totalDays)});
      $("birthday-value").textContent = result.nextBirthdayDays === 0 ? t.birthdayToday : fill(t.birthdayText, {value:n(result.nextBirthdayDays)});
      $("result").classList.remove("hidden"); $("result").focus({preventScroll:true});
    } catch (error) {
      const messages = {REQUIRED:t.required,INVALID_DATE:t.invalidDate,FUTURE_DATE:t.futureDate};
      $("error").textContent = messages[error.message] || t.invalidDate;
    }
    resize();
  });
  $("age-form").addEventListener("reset", () => setTimeout(() => { clear(); resize(); },0));
  new ResizeObserver(resize).observe(document.body); resize();
})();
