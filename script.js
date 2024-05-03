document.getElementById("poga").addEventListener("click", getData);

async function getData() {
  console.log("Poga nospiesta!");
  const markValue = document.getElementById("mark").value.trim(); // trim() noņem tukšumus no sākuma un beigām
  if (markValue === "") {
    alert("Lūdzu, ievadiet mašīnas marku.");
    return; // Iziet no funkcijas, ja modelis nav ievadīts
  }

  //fetch data from the localhost:3000 passing the markValue
  const model = document.getElementById("model").value.trim() || "";
  const carYear = document.getElementById("carYear").value.trim() || "";
  const maxPrice = document.getElementById("maxPrice").value.trim() || "";
  const minPrice = document.getElementById("minPrice").value.trim() || "";

  const response = await fetch(
    `http://localhost:3000/get-data?mark=${markValue}&model=${model}&year=${carYear}`
  );
  const data = await response.json();
  console.log(data);
}
