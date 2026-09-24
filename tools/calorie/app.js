(async function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const t = await (await fetch("../../locales/fr-calorie.json")).json();
  const labels = {"app-title":"appTitle",intro:"intro","weight-label":"weight","height-label":"height","age-label":"age","sex-label":"sex",male:"male",female:"female","activity-label":"activity",sedentary:"sedentary",light:"light",moderate:"moderate",active:"active",veryActive:"veryActive",calculate:"calculate",reset:"reset","bmr-label":"bmrLabel","maintenance-label":"maintenanceLabel","gentle-loss-label":"gentleLossLabel","gradual-loss-label":"gradualLossLabel","gentle-gain-label":"gentleGainLabel","goal-explanation":"goalExplanation",formula:"formula",privacy:"privacy",disclaimer:"disclaimer"};
  Object.entries(labels).forEach(([id, key]) => { $(id).textContent = t[key]; });
  const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
  const kcal = (number) => Number(number).toLocaleString("fr-FR");
  function clear() { $("error").textContent = ""; $("result").classList.add("hidden"); }
  function resize() { setTimeout(() => parent.postMessage({type:"tool-resize", tool:"calorie", height:document.documentElement.scrollHeight}, "*"), 30); }
  $("calorie-form").addEventListener("submit", (event) => {
    event.preventDefault(); clear();
    try {
      const required = ["weight", "height", "age", "sex", "activity"];
      if (required.some(id => !$(id).value)) throw new Error("REQUIRED");
      const sex = $("sex").value;
      const bmr = BMRTool.calculate($("weight").value, $("height").value, $("age").value, sex);
      const tdee = TDEETool.calculate(bmr, $("activity").value);
      const goals = CalorieTool.calculate(tdee, sex);
      $("bmr-value").textContent = fill(t.bmrText, {value:kcal(bmr)});
      $("maintenance-value").textContent = fill(t.maintenanceText, {value:kcal(goals.maintenance)});
      $("gentle-loss-value").textContent = fill(t.gentleLossText, {value:kcal(goals.gentleLoss)});
      $("gradual-loss-value").textContent = fill(t.gradualLossText, {value:kcal(goals.gradualLoss)});
      $("gentle-gain-value").textContent = fill(t.gentleGainText, {value:kcal(goals.gentleGain)});
      $("result").classList.remove("hidden"); $("result").focus({preventScroll:true});
    } catch (error) {
      const messages = {REQUIRED:t.required, INVALID_WEIGHT:t.invalidWeight, INVALID_HEIGHT:t.invalidHeight, INVALID_AGE:t.invalidAge, INVALID_SEX:t.required, INVALID_ACTIVITY:t.required, INVALID_TDEE:t.required};
      $("error").textContent = messages[error.message] || t.required;
    }
    resize();
  });
  $("calorie-form").addEventListener("reset", () => setTimeout(() => { clear(); resize(); }, 0));
  new ResizeObserver(resize).observe(document.body); resize();
})();
