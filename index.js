const input = document.getElementById("input");
const classInput = document.getElementById("class-input");
const button = document.getElementById("button");
const exampleBtn = document.getElementById("example-button");
const messageSpan = document.getElementById("message");
const dataPara = document.getElementById("data");

let url = "";
let classes = "";

const inputVal = input.addEventListener("change", function (e) {
  url = e.target.value;
});
const classVal = classInput.addEventListener("change", function (e) {
  classes = e.target.value;
});

button.addEventListener("click", function () {
  if (url && classes) {
    fetch("http://localhost:3000/get-scraped-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url, classes: classes }),
    })
      .then((response) => response.json())
      .then((data) => {
        messageSpan.innerText = data.message;
        dataPara.innerHTML = JSON.stringify(data.data);
      });
  }
});

exampleBtn.addEventListener("click", function () {
  let url =
    "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch";
  let classes = ".section-content";
  if (url && classes) {
    fetch("http://localhost:3000/get-scraped-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url, classes: classes }),
    })
      .then((response) => response.json())
      .then((data) => {
        messageSpan.innerText = data.message;
        dataPara.innerHTML = JSON.stringify(data.data);
      });
  }
});
