const url = "http://localhost:";
const PORT = 3000;
const btn = document.querySelector(".btn");
const results_block = document.querySelector(".results");

btn.addEventListener("click", handleShowClick);

function handleShowClick(e) {
  console.log("click");
  e.preventDefault();
  fetch(`${url}${PORT}/getnotes`, {
    method: "GET",
  })
    .then(function (response) {
      console.log(response.ok);
      if (!response.ok) {
        console.log("error");
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      results_block.innerHTML = JSON.stringify(response);
    });
}
