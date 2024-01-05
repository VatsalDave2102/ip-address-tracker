import { debounce } from "./util";

// getting input element for validation
const ipAddressInput = document.querySelector(
  ".ip__form__input"
) as HTMLInputElement;

// function to validate and display the error message
export function validateIPAddress() {
  const ipAddress = ipAddressInput.value.trim();

  //   for empty field
  if (ipAddress == "") {
    ipAddressInput.setCustomValidity("Enter an address");
    return false;
  }
  // checking whether the IP address is valid
  else if (isValidIPAddress(ipAddress)) {
    ipAddressInput.setCustomValidity("");
    return true;
  } else {
    ipAddressInput.setCustomValidity("Invalid IP address");
    return false;
  }
}

// function to validate IP address
function isValidIPAddress(address: string): boolean {
  const ipAddressRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

  return ipAddressRegex.test(address);
}

// creating a debounce version of validation
const debounceValidation = debounce(validateIPAddress, 1000);

// attaching validation to input field
ipAddressInput.addEventListener("input", debounceValidation);
