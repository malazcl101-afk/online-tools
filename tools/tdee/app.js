(async function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const t = await (await fetch("../../locales/fr-tdee.json")).json();
  const labels = {"app-title":"appTitle",intro:"intro","weight-label":"weight","height-label":"height","age-label":"age","sex-label":"sex",male:"male",female:"female","activity-label":"activity",sedentary:"sedentary",light:"light",moderate:"moderate",active:"active",veryActive:"veryActive",calculate:"calculate",reset:"reset","bmr-label":"bmrLabel","result-label":"resultLabel","result-explanation":"resultExplanation",formula:"formula",privacy:"privacy",disclaimer:"disclaimer"};
  Object.entries(labels).forEach(([id,key]) => { $(id).textContent = t[key]; });
  const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
  function clear() { $("error").textContent = ""; $("result").classList.add("hidden"); }
  function resize() { setTimeout(() => parent.postMessage({type:"tool-resize",tool:"tdee",height:document.documentElement.scrollHeight},"*"),30); }
  $("tdee-form").addEventListener("submit", (event) => {
    event.preventDefault(); clear();
    try {
      const required = ["weight","height","age","sex","activity"];
      if (required.some(id => !$(id).value)) throw new Error("REQUIRED");
      const bmr = BMRTool.calculate($("weight").value,$("height").value,$("age").value,$("sex").value);
      const tdee = TDEETool.calculate(bmr,$("activity").value);
      $("bmr-value").textContent = fill(t.bmrText,{value:bmr.toLocaleString("fr-FR")});
      $("result-value").textContent = fill(t.resultText,{value:tdee.toLocaleString("fr-FR")});
      $("result").classList.remove("hidden"); $("result").focus({preventScroll:true});
    } catch (error) {
      const messages = {REQUIRED:t.required,INVALID_WEIGHT:t.invalidWeight,INVALID_HEIGHT:t.invalidHeight,INVALID_AGE:t.invalidAge,INVALID_SEX:t.required,INVALID_ACTIVITY:t.required};
      $("error").textContent = messages[error.message] || t.required;
    }
    resize();
  });
  $("tdee-form").addEventListener("reset", () => setTimeout(() => { clear(); resize(); },0));
  new ResizeObserver(resize).observe(document.body); resize();
})();
