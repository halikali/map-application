const eventsArr = [];

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
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`Seçilen nokta burası => ${lat} ${lng}`)
          .openPopup();

        eventsArr.push({ lat, lng });
        console.log(eventsArr);
      });
    },
    function () {
      alert("could not get your position.");
    }
  );
}
