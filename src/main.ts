import "./scss/style.scss";
import "./scripts/util.ts";
import "./scripts/map.ts";
import "./scripts/form.ts";
import "./scripts/validation.ts";
import { initializeMap } from "./scripts/map.ts";
import { hideSpinner, showSpinner } from "./scripts/util.ts";

// getting submit button
const submitButton = document.querySelector(
  ".ip__form__button"
) as HTMLButtonElement;

initializeMap();

// function to fetch details of IP address
export async function trackAddress(ip: string) {
  // show spinner while requesting
  showSpinner(submitButton);
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        import.meta.env.VITE_IPIFY_API_KEY
      }&ipAddress=${ip}`
    );

    const ipInfo = await response.json();
    return ipInfo;
  } catch (error) {
    // TODO : handle request error
    console.log(error);
  } finally {
    hideSpinner(submitButton);
  }
}
