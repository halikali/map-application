let eventType = document.getElementById("event__type").value,
  eventName = document.getElementById("event__name");

const eventList = document.getElementById("event__list"),
  submitButton = document.getElementById("submit-button");

const eventsArr = [];

let newCoords;

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
        console.log(`mapEvents => `, mapEvents);
        const { lat, lng } = mapEvents.latlng;
        console.log(`lat,lng => `, lat, lng);
        L.marker([lat, lng]).addTo(map).bindPopup(`${lat}--${lng}`).openPopup();

        newCoords = { lat, lng };
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
    coords: newCoords,
  };

  eventsArr.push(eventObj);

  eventsArr.map((item) => {
    let div = document.createElement("DIV");
    div.classList.add("event__item");
    div.innerHTML = `<div class="event__item" > <p> ${item.eventName} </p> <p> ${item.eventType} </p> <p> ${item.coords.lat} - ${item.coords.lng} </p> </div>`;
    eventList.appendChild(div);
    console.log(`evenstArr`, eventsArr);
  });
});
