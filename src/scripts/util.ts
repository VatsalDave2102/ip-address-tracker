// function to update maps height as window size changes
function updateHeight() {
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

// function to debounce request
export function debounce(func: Function, delay: number) {
  let timeOutId: number;

  return function (...args: any[]) {
    clearTimeout(timeOutId);

    timeOutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// function to show spinner
export function showSpinner(btn: HTMLButtonElement) {
  btn.classList.add("loading");
}

// function to hide spinner
export function hideSpinner(btn: HTMLButtonElement) {
  btn.classList.remove("loading");
}
