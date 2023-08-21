import "./style.css";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  showSpinner();

  const data = new FormData(form);

  const response = await fetch("http://localhost:8080/dreamer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
    mode: "cors",
  });

  if (response.ok) {
    const { image } = await response.json();

    const result = document.querySelector("#result");
    result.innerHTML = `<img src="${image}" width="512" />`;
  } else {
    const err = await response.text();
    alert(err);
    console.error(err);
  }

  hideSpinner();
});

function showSpinner() {
  const btn = document.querySelector("button");
  btn.disabled = true;
  btn.innerHTML = `<div class="spinner">🧠</div>`;
}

function hideSpinner() {
  const btn = document.querySelector("button");
  btn.disabled = false;
  btn.innerHTML = `Search`;
}
