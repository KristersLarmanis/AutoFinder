const model = document.getElementById("model");
const carYear = document.getElementById("carYear");
const maxPrice = document.getElementById("maxPrice");
const minPrice = document.getElementById("minPrice");
document.getElementById("poga").addEventListener("click", function(){
const modelaVertiba = document.getElementById("model").value.trim(); // trim() noņem tukšumus no sākuma un beigām
if (modelaVertiba === "") {
    alert("Lūdzu, ievadiet mašīnas modeli.");
    return; // Iziet no funkcijas, ja modelis nav ievadīts
}
const URL = "https://www.ss.com/lv/transport/cars/" + modelaVertiba + "/rss/";
// Tagad varat izmantot URL turpmākai apstrādei
});