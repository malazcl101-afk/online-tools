(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.AgeTool = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const DAY = 24 * 60 * 60 * 1000;

  function parseIsoDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new RangeError("INVALID_DATE");
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) throw new RangeError("INVALID_DATE");
    return { year, month, day, time: date.getTime() };
  }

  function daysInMonth(year, month) { return new Date(Date.UTC(year, month, 0)).getUTCDate(); }
  function isLeapYear(year) { return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0); }

  function birthdayInYear(birth, year) {
    return Date.UTC(year, birth.month - 1, Math.min(birth.day, daysInMonth(year, birth.month)));
  }

  function calculate(birthDate, referenceDate) {
    const birth = parseIsoDate(birthDate);
    const reference = parseIsoDate(referenceDate);
    if (birth.time > reference.time) throw new RangeError("FUTURE_DATE");

    // For a 29 February birth date, this calculator treats 28 February as the
    // birthday in a non-leap year once that date has been reached.
    let birthDayForComparison = birth.day;
    if (birth.month === 2 && birth.day === 29 && !isLeapYear(reference.year) &&
        (reference.month > 2 || (reference.month === 2 && reference.day >= 28))) {
      birthDayForComparison = 28;
    }
    let years = reference.year - birth.year;
    let months = reference.month - birth.month;
    let days = reference.day - birthDayForComparison;
    if (days < 0) {
      months -= 1;
      const previousMonth = reference.month === 1 ? 12 : reference.month - 1;
      const previousYear = reference.month === 1 ? reference.year - 1 : reference.year;
      days += daysInMonth(previousYear, previousMonth);
    }
    if (months < 0) { years -= 1; months += 12; }

    let nextBirthday = birthdayInYear(birth, reference.year);
    if (nextBirthday < reference.time) nextBirthday = birthdayInYear(birth, reference.year + 1);
    const nextBirthdayDays = Math.round((nextBirthday - reference.time) / DAY);
    return { years, months, days, totalDays: Math.round((reference.time - birth.time) / DAY), nextBirthdayDays };
  }

  return { calculate, parseIsoDate };
});
