import L from "leaflet";

// function to update maps height as window size changes
export function updateHeight() {
  // getting the total height of the window and body
  const totalHeight = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;

  //   get map element
  const mapContainer = document.getElementById("map");

  //   update map height
  const remainingHeight = totalHeight - bodyHeight;
  mapContainer?.style.setProperty("height", `${remainingHeight}px`);
}

updateHeight();
window.addEventListener("resize", updateHeight);

// creating map
let map = L.map("map", { zoomControl: false }).setView([51.505, -0.09], 13);

// adding marker on map
let marker = L.marker([51.5, -0.09]).addTo(map).openPopup();
// adding a popup
marker.bindPopup("<b>Accurate Location</b>");

// adding attribution
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
