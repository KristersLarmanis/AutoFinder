const model = document.getElementById("model");
const carYear = document.getElementById("carYear");
const maxPrice = document.getElementById("maxPrice");
const minPrice = document.getElementById("minPrice");

document.getElementById("poga").addEventListener("click", getData);

async function getData() {
  console.log("Poga nospiesta!");
  const markValue = document.getElementById("mark").value.trim(); // trim() noņem tukšumus no sākuma un beigām
  if (markValue === "") {
    alert("Lūdzu, ievadiet mašīnas marku.");
    return; // Iziet no funkcijas, ja modelis nav ievadīts
  }
  const URL = "https://www.ss.com/lv/transport/cars/" + markValue + "/rss/";
  // Tagad varat izmantot URL turpmākai apstrādei

  try {
    console.log("Pieslēdzamies..." + URL);
    const response = await fetch(URL);
    const str = await response.text();
    const data = new window.DOMParser().parseFromString(str, "text/xml");
    const items = data.querySelectorAll("item");

    console.log(items);
    let html = "";
    // items.forEach(el => {
    //     const title = el.querySelector("title").textContent;
    //     const link = el.querySelector("link").textContent;
    //     const description = el.querySelector("description").textContent;
    //     const pubDate = el.querySelector("pubDate").textContent;
    //     html += `
    //         <div>
    //             <h2>${title}</h2>
    //             <p>${description}</p>
    //             <a href="${link}" target="_blank">Lasīt vairāk</a>
    //             <p>Publicēts: ${pubDate}</p>
    //         </div>
    //     `;
    // });
    document.getElementById("results").innerHTML = html;
  } catch (error) {
    console.error("Kļūda:", error);
  }
}
