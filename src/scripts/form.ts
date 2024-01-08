import { trackAddress } from "../main";
import { displayDetails } from "./map";
import { validateIPAddress } from "./validation";
import { IPDetails } from "../../types";

// getting form element
const form = document.querySelector(".ip__form") as HTMLFormElement;

// variable to store location of ip address
let ipDetails: IPDetails;

if (form) {
  // attaching submit handler
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // condition to check validity of IP address
    if (validateIPAddress()) {
      const formData = new FormData(form);
      const ipAddress = formData.get("ip__address");

      // getting location
      try {
        ipDetails = (await trackAddress(ipAddress as string)) as IPDetails;
        displayDetails(ipDetails);
        localStorage.setItem("location", JSON.stringify(ipDetails));
      } catch (error) {
        console.error("Error fetching IP info", error);
      }
    }
  });
}
