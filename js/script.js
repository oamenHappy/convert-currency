"use strict";

// -------------- const names--------------------

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getBtn = document.querySelector(".container button");
const exIcon = document.querySelector(".reverse");
const amountEl = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");
const API_KEY = "844acb690d3b0e979cf92fcb";

[fromCurrency, toCurrency].forEach((select, i) => {
  for (let curcode in country_list) {
    const selected =
      (i === 0 && curcode === "USD") || (i === 1 && curcode === "GBP")
        ? "selected"
        : "";

    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${curcode}" ${selected}>${curcode}</option>`
    );
  }

  select.addEventListener("change", () => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${country_list[
      code
    ].toLowerCase()}.png`;
  });
});

async function getExchangeRate() {
  const amountValue = amountEl.value;
  exRateTxt.textContent = "Please Wait.................";

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`
    );
    const result = await response.json();
    const exRate = result.conversion_rates[toCurrency.value];
    const totalExRate = amountValue * exRate.toFixed(2);
    exRateTxt.textContent = `${amountValue} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
  } catch (error) {
    exRateTxt.textContent = "Something Went Wrong";
  }
}

window.addEventListener("DOMContentLoaded", getExchangeRate);
getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

exIcon.addEventListener("click", () => {
  [fromCurrency.value, toCurrency.value] = [
    toCurrency.value,
    fromCurrency.value,
  ];
  [fromCurrency, toCurrency];

  [fromCurrency, toCurrency].forEach((select) => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${country_list[
      code
    ].toLowerCase()}.png`;
  });
  getExchangeRate();
});

amountEl.addEventListener("keyup", () => {
  getExchangeRate();
});
