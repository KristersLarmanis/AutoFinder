document.getElementById("poga").addEventListener("click", getData);

async function getData() {
  console.log("Poga nospiesta!");
  const markValue = document.getElementById("mark").value.trim(); 
  if (markValue === "") {
    alert("Lūdzu, ievadiet mašīnas marku.");
    return; 
  }

  const model = document.getElementById("model").value.trim() || "";
  const carYear = document.getElementById("carYear").value.trim() || "";
  const maxPrice = document.getElementById("maxPrice").value.trim() || "";
  const minPrice = document.getElementById("minPrice").value.trim() || "";

  const response = await fetch(
    `http://localhost:3000/get-data?mark=${markValue}&model=${model}&year=${carYear}&maxPrice=${maxPrice}&minPrice=${minPrice}`
  );
  const data = await response.json();
  console.log(data);

  displayResults(data);
}

function displayResults(data) {
  const resultList = document.getElementById("carList");
  resultList.innerHTML = "";

  if (data.length === 0) {
    resultList.innerHTML = "<p>No results found.</p>";
    return;
  }

  data.forEach((car) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `
      <div class="card">
        <img src="${car.content.match(/src="([^"]+)"/)[1]}" class="card-img-top" alt="Car Image" style="max-width: 100px; max-height: 100px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${car.title}</h5>
          <p class="card-text">Model: ${car.content.match(/Modelis: <b>(.*?)<\/b>/)[1]}</p>
          <p class="card-text">Year: ${car.content.match(/Gads: <b>(.*?)<\/b>/)[1]}</p>
          <p class="card-text">Price: ${car.content.match(/Cena: <b>(.*?)<\/b>/)[1]}</p>
          <a href="${car.link}" class="btn btn-primary">See more</a>
        </div>
      </div>
    `;
    resultList.appendChild(listItem);
  });
}
