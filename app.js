const btn = document.getElementById("btn");
const country_container = document.getElementById("country-container");
const map = document.getElementById("map");
//http://api.positionstack.com/v1/forward
//? access_key = 2ab6cd83e9b5066b6d2a7dc9f96b888c
//& query = 1600 Pennsylvania Ave NW, Washington DC

//2ab6cd83e9b5066b6d2a7dc9f96b888c

function geo() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      map.innerHTML = `<iframe
      src="https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed"
      width="100%"
      height="100%"
      frameborder="0"
      style="border:0"
      allowfullscreen
    ></iframe>`;
      getLocation(lat, long);
    });
  }
}
const getLocation = async (lat, long) => {
  try {
    const response = await fetch(
      `http://api.positionstack.com/v1/reverse?access_key=d72c6b9912f63eb9912d54fefcf89c7d&query=${lat},${long}`
    );
    const data = await response.json();
    const country = data.data[0];
    country_container.innerHTML = `<div class="content">
    <h2>Continent</h2>
    <p>${country.continent}</p>
  </div>
  <div class="region">
    <h2>Region</h2>
    <p>${country.region}</p>
  </div>
  <div class="street">
    <h2>Street</h2>
    <p>${country.street}</p>
  </div>
  <div class="region">
    <h2>Region</h2>
    <p>Region</p>
  </div>
  <div class="Address">
    <h2>Address</h2>
    <p>${country.label}</p>
  </div>`;
  } catch (error) {}
};
btn.addEventListener("click", geo);
