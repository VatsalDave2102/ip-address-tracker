import L from "leaflet";
import { IPDetails } from "../../types";

export function initializeMap() {
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
}

export function displayDetails(ipDetails: IPDetails) {
  const ipAddress = document.querySelector(".ip__info__address__h3");
  const location = document.querySelector(".ip__info__location__h3");
  const timezone = document.querySelector(".ip__info__timezone__h3");
  const isp = document.querySelector(".ip__info__isp__h3");

  ipAddress!.textContent = `${ipDetails.ip}`;
  if (ipDetails.location.country === "ZZ") {
    location!.textContent = `Unknown`;
    timezone!.textContent = `Unknown`;
    isp!.textContent = `Unknown`;
  } else {
    location!.textContent = `${ipDetails.location.city}, ${ipDetails.location.country} ${ipDetails.location.postalCode}`;
    timezone!.textContent = `GMT ${ipDetails.location.timezone}`;
    isp!.textContent = `${ipDetails.isp}`;
  }
}
