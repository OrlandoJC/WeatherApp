'use strict';

(function () {
  var location = $('#location'),
      weaterState = $('#weater-state'),
      weater = $('#weater'),
      iconState = $('#icon-state'),
      icon = $('#icon'),
      URL = "https://fcc-weather-api.glitch.me/api/current?",
      colors = ["purple", "yellow", "blue"];

  if (navigator.geolocation) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    alert('Geolocation is not supported in your browser');
  }

  function getWeather(latitude, longitude) {
    var newUrl = '' + URL + latitude + '&' + longitude;

    fetch(newUrl).then(function (response) {
      return response.json();
    }).then(function (response) {

      insert(response.name, response.sys.country, response.weather[0].description, response.main.temp);

      createImage(response.weather[0].icon);
    });
  }

  function insert(name, loc, description, temp) {
    location.text(name + ", " + loc);
    weaterState.text(description);
    weater.text(temp + "°C");
  }

  function createImage(image) {
    var element = document.createElement("IMG");
    element.setAttribute('src', image + '.png');
    document.getElementById('icon').appendChild(element);
  }
})();