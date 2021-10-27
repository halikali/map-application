let eventType = document.getElementById("event__type").value,
  eventName = document.getElementById("event__name"),
  eventDate = document.getElementById("event__date"),
  eventTime = document.getElementById("event__time");

const eventList = document.getElementById("event__list"),
  submitButton = document.getElementById("submit-button");

const eventsArr = [];

let newCoords;
let enabled = true;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];
      const map = L.map("map").setView(coords, 13);
      console.log(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", (mapEvents) => {
        if (enabled) {
          console.log(`mapEvents => `, mapEvents);
          const { lat, lng } = mapEvents.latlng;
          console.log(`lat,lng => `, lat, lng);
          L.marker([lat, lng]).addTo(map).bindPopup(`${lat}--${lng}`).openPopup();
          newCoords = {
            lat,
            lng,
          };
          enabled = false
        }
      });
    },
    function () {
      alert("Tarayıcı konumunuzu algılayamadı.");
    }
  );
}

submitButton.addEventListener("click", () => {
  let eventObj = {
    eventName: eventName.value,
    eventType: eventType,
    eventDate: eventDate.value,
    eventTime: eventTime.value,
    coords: newCoords,
  };
  eventsArr.push(eventObj);
  console.log(eventTime);
  let html = "";

  eventsArr.map((item) => {
    html += `
    <div class="event__item">
      <p class="event__name">${item.eventName}</p>
      <p class="event__type"> ${item.eventType}</p>
      <p class="event__date">${item.eventDate}</p>
      <p class="event__time">${item.eventTime}</p>
    </div>`;
    eventList.innerHTML = html;
    enabled = true
  });
});
