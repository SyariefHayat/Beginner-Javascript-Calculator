// SELEKSI DOM
const hamMenu = document.querySelector(".hamburger-menu");
const ul = document.querySelector("ul");
const overlay = document.querySelector(".overlay");
const display1 = document.querySelector(".display-1");
const display2 = document.querySelector(".display-2");
const numbersEl = document.querySelectorAll(".number");
const operatorsEl = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clearEntityEl = document.querySelector(".clearEntity");
const clearAllEl = document.querySelector(".clearAll");
const history = document.querySelector(".history");
const clearHistory = document.querySelector(".clear-history");
const dHistory = document.querySelector(".div-history");
const dValue = document.querySelector(".div-value");

// KETIKA HAMBURGER MENU DI KLIK
hamMenu.addEventListener("click", () => {
  ul.classList.remove("hidden");
  ul.classList.toggle("show");
  overlay.style.display = "block";

  if (ul.classList != "show") {
    ul.classList.add("hidden");
    overlay.style.display = "none";
  }

  document.addEventListener('click', (event) => {
    const isClickInsideSidebar = ul.contains(event.target);
    const isClickOnHamburger = hamMenu.contains(event.target);

    if (!isClickInsideSidebar && !isClickOnHamburger) {
      ul.classList.remove("show");
      ul.classList.add("hidden");
      overlay.style.display = "none";
    }
  });
});

// VARIABEL AWAL
let display1Num = "";
let display2Num = "";
let result = null;
let finalValue = null;
let lastOperation = "";
let haveDot = false;

// KETIKA TOMBOL NUMBER DI TEKAN
numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    } else if (!display1Num) {
      display1.innerText = "";
    }

    display2Num += e.target.innerText;
    display2.innerText = display2Num;
  });
});

// KETIKA TOMBOL OPERATOR DI TEKAN
operatorsEl.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (!display1Num && !display2Num && result) {
      display2Num = result;
    } else if (!display2Num) {
      return;
    }

    haveDot = false;
    const operationName = e.target.innerText;

    if (display1Num && display2Num && lastOperation) {
      mathOperation();
      console.log(display2Num);
    } else {
      result = parseFloat(display2Num);
    }

    clearVar(operationName);
    lastOperation = operationName;
  });
});

// FUNGSI MENAMPILKAN TEKS DI DISPLAY 2
function clearVar(name = "") {
  display1Num += `${display2Num} ${name} `;
  display1.innerText = display1Num;
  display2.innerText = display2Num;
  display2Num = "";
};

// FUNGSI OPERASI MATEMATIK
function mathOperation() {
  if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(display2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(display2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(display2Num);
  } else if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(display2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(display2Num);
  }
};

// KETIKA TOMBOL SAMADENGAN DI KLIK
equal.addEventListener("click", (e) => {
  if (!display1Num || !display2Num) return;

  haveDot = false;
  mathOperation();
  clearVar("=");
  display2.innerText = result;
  finalValue = result;
  allHistory();
  display2Num = "";
  display1Num = "";
});

// FUNGSI MEMBUAT ELEMENT BARU DI ELEMENT HISTORY 
function allHistory() {
  const divHistory = document.createElement("div");
  divHistory.classList = "div-history active";
  divHistory.innerText = display1Num;

  const divValue = document.createElement("div");
  divValue.classList = "div-value active";
  divValue.innerText = finalValue;
  history.prepend(divValue);
  history.prepend(divHistory);

  clearHistory.style.display = "block";
};

// KETIKA TOMBOL C DI KLIK 
clearAllEl.addEventListener("click", (e) => {
  display1.innerText = "";
  display2.innerHTML = "0";
  display1Num = "";
  display2Num = "";
  result = "";
});

// KETIKA TOMBOL CE DI KLIK
clearEntityEl.addEventListener("click", (e) => {
  display2.innerText = "";
  display2Num = "";
});

// KETIKA TOMBOL CLEAR DI KLIK
clearHistory.addEventListener("click", (e) => {
  while (history.firstChild) {
    history.removeChild(history.firstChild);
  }

  clearHistory.style.display = "none";
});

// FITUR UNTUK BISA MASUKKAN INPUT DENGAN keyboard
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "%" || e.key === "/") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});

function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
};

function clickOperation(key) {
  operatorsEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
};

function clickEqual() {
  equal.click();
};
