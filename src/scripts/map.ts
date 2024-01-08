import L, { marker } from "leaflet";
import { IPDetails } from "../../types";

const ipAddress = document.querySelector(".ip__info__address__h3");
const location = document.querySelector(".ip__info__location__h3");
const timezone = document.querySelector(".ip__info__timezone__h3");
const isp = document.querySelector(".ip__info__isp__h3");

// creating map
let map = L.map("map", { zoomControl: false }).setView(
  [40.52006, -82.09737],
  13
);

// function to initialize map
export function initializeMap() {
  // check if there is already a location present from last search
  const ipDetails = JSON.parse(localStorage.getItem("location")!) as IPDetails;

  // if not, set default location
  if (!ipDetails) {
    map.setView([40.52006, -82.09737], 13);

    // adding marker on map
    let marker = L.marker([40.52006, -82.09737]).addTo(map).openPopup();

    // adding a popup
    marker.bindPopup("<b>Estimated Location</b>");

    ipAddress!.textContent = `8.8.8.8`;
    location!.textContent = `Glenmont, US 44628`;
    timezone!.textContent = `GMT -05:00`;
    isp!.textContent = `Google LLC`;
    updateMap();
  } else {
    // if present, then display those details
    displayDetails(ipDetails);
  }

  // adding attribution
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

//function to update the map using cordinates
function updateMap(lat?: number, lng?: number) {
  // set the map view
  map.setView([lat ? lat : 40.52006, lng ? lng : -82.09737], 13);

  // adding marker to map
  marker([lat ? lat : 40.52006, lng ? lng : -82.09737])
    .addTo(map)
    .openPopup()
    .bindPopup("<b>Estimated Location</b>");
}

export function displayDetails(ipDetails: IPDetails) {
  ipAddress!.textContent = `${ipDetails.ip}`;
  if (ipDetails.location.country === "ZZ") {
    location!.textContent = `Unknown`;
    timezone!.textContent = `Unknown`;
    isp!.textContent = `Unknown`;
    updateMap();
  } else {
    location!.textContent = `${ipDetails.location.city}, ${ipDetails.location.country} ${ipDetails.location.postalCode}`;
    timezone!.textContent = `GMT ${ipDetails.location.timezone}`;
    isp!.textContent = `${ipDetails.isp}`;
    updateMap(ipDetails.location.lat, ipDetails.location.lng);
  }
}
