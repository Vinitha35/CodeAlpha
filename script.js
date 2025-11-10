const display = document.getElementById("display");

function insert(num) {
  display.value += num;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  if (display.value !== "") {
    try {
      display.value = eval(display.value.replace("÷", "/").replace("×", "*"));
    } catch {
      display.value = "Error";
    }
  }
}

// Keyboard Support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if ("0123456789.+-*/%".includes(key)) insert(key);
  else if (key === "Enter") calculate();
  else if (key === "Backspace") deleteLast();
  else if (key === "Escape") clearDisplay();
});
