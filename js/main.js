const STORAGE_PREFIX = "lab14-resume-";

function saveEditableValue(key, value) {
  localStorage.setItem(STORAGE_PREFIX + key, value);
}

function getEditableValue(key) {
  return localStorage.getItem(STORAGE_PREFIX + key);
}

function highlightEdited(el) {
  el.classList.remove("edited-highlight");
  void el.offsetWidth;
  el.classList.add("edited-highlight");
}

function setupEditableFields() {
  const editables = document.querySelectorAll(".editable[data-key]");

  editables.forEach((el) => {
    const key = el.dataset.key;
    const savedValue = getEditableValue(key);
    if (savedValue !== null) {
      el.textContent = savedValue;
    }

    el.addEventListener("input", () => {
      saveEditableValue(key, el.textContent.trim());
      highlightEdited(el);
    });
  });
}

function addRipple(target, event) {
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const wave = document.createElement("span");
  wave.className = "ripple-wave";
  wave.style.width = size + "px";
  wave.style.height = size + "px";
  wave.style.left = x + "px";
  wave.style.top = y + "px";

  target.appendChild(wave);
  wave.addEventListener("animationend", () => wave.remove());
}

function setupRippleEffect() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest(".ripple, .editable");
    if (!target) return;

    const style = window.getComputedStyle(target);
    if (style.position === "static") {
      target.style.position = "relative";
    }
    target.style.overflow = "hidden";
    addRipple(target, event);
  });
}

function setupPdfDownload() {
  const downloadBtn = document.getElementById("downloadPdfBtn");
  downloadBtn.addEventListener("click", () => {
    window.print();
  });
}

function setupResetButton() {
  const resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", () => {
    const fields = document.querySelectorAll(".editable[data-key]");
    fields.forEach((el) => {
      localStorage.removeItem(STORAGE_PREFIX + el.dataset.key);
    });
    window.location.reload();
  });
}

function init() {
  setupEditableFields();
  setupRippleEffect();
  setupPdfDownload();
  setupResetButton();
}

init();
