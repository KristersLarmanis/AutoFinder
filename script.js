const model = document.getElementById("model");
const carYear = document.getElementById("carYear");
const maxPrice = document.getElementById("maxPrice");
const minPrice = document.getElementById("minPrice");
document.getElementById("poga").addEventListener("click", function(){
const markValue = document.getElementById("mark").value.trim(); // trim() noņem tukšumus no sākuma un beigām
if (markValue === "") {
    alert("Lūdzu, ievadiet mašīnas marku.");
    return; // Iziet no funkcijas, ja modelis nav ievadīts
}
const URL = "https://www.ss.com/lv/transport/cars/" + markValue + "/rss/";
// Tagad varat izmantot URL turpmākai apstrādei
});