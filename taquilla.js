"use strict";

const booth = document.querySelector(".booth");
const button = document.querySelector("#open-booth");
const label = document.querySelector("#open-label");
const sales = document.querySelector("#sales");
const title = document.querySelector("#sales-title");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

function showPoints() {
  title.focus({ preventScroll: true });
  title.scrollIntoView({ block: "start", behavior: reducedMotion.matches ? "auto" : "smooth" });
}

function finishOpening() {
  booth.dataset.state = "open";
  sales.hidden = false;
  button.removeAttribute("aria-disabled");
  button.setAttribute("aria-expanded", "true");
  label.textContent = "Ver puntos de venta";
  showPoints();
}

button.addEventListener("click", () => {
  if (booth.dataset.state === "open") {
    showPoints();
    return;
  }
  if (booth.dataset.state === "opening") return;

  booth.dataset.state = "opening";
  button.setAttribute("aria-disabled", "true");
  label.textContent = "Abriendo taquilla";
  if (reducedMotion.matches) finishOpening();
  else window.setTimeout(finishOpening, 1380);
});

sales.hidden = true;
button.hidden = false;
