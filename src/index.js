// Getting electron and its current window
const electron = require('electron')
const BrowserWindow = electron.remote.getCurrentWindow()

// Get weather-js module
const Weather = require('weather-js')

// TODO: add a way of changing settings for degrees
// The default weather will be the weather in your location

function searchCity () {
    let searchBar = document.getElementById("searchBar");
    Weather.find({search: searchBar.value, degreeType: "C"}, (err, result) => {
        var weatherIn = document.getElementById("weatherIn");
        var weatherHeader = document.getElementById("weatherHeading")
        var weatherTemperature = document.getElementById("weatherTemperature");
        var weatherType = document.getElementById("weatherType");
        var weatherWind = document.getElementById("weatherWind");
        var weatherImage = document.getElementById("weatherImage");
        var weatherDate = document.getElementById("weatherDate");
        var weatherAlternative = document.getElementById("weatherAlternative");

        if (!result || !result[0]) {
            weatherIn.innerHTML = "Sorry, your request could not be performed. Please check that you have spelt the location correctly.";
            weatherHeader.innerHTML = "";
            weatherTemperature.innerHTML = "";
            weatherType.innerHTML = "";
            weatherWind.innerHTML = "";
            weatherImage.innerHTML = "";
            weatherDate.innerHTML = "";
            weatherAlternative.innerHTML = "";
            return;
        }
        
        let location = result[0].location;
        let current = result[0].current;

        weatherIn.innerHTML = "Weather in";
        weatherHeader.innerHTML = location.name;
        weatherTemperature.innerHTML = `Temperature: ${current.temperature}°C, ${Math.round((current.temperature * 9/5) + 32)}°F || Feels like: ${current.feelslike}°C, ${Math.round((current.feelslike * 9/5) + 32)}°F`;
        weatherType.innerHTML = `Weather: ${current.skytext}`;
        weatherWind.innerHTML = `Wind speed: ${current.winddisplay}`;
        weatherImage.innerHTML = `<img src="${current.imageUrl}" alt="Weather of ${current.temperature}"></img>`
        weatherDate.innerHTML = `Reading taken at ${current.observationtime} on ${current.shortday} ${current.date}`;
        weatherAlternative.innerHTML = `We found ${result.length-1} other results. 
            ${result.length > 1 ? "Did you want to see weather for <b>" + result[1].location.name + (result.length > 2 ? "</b> or <b>" + result[2].location.name : "") + "</b>?" : ""}`;
    });
}

// Windows Buttons Functionality 
function minimize() {
    BrowserWindow.minimize()
}

function zoom() {
    if (!BrowserWindow.isMaximized()) {
      BrowserWindow.maximize()
    } else {
      BrowserWindow.unmaximize()
   }
}

function close() {
    BrowserWindow.close()
}
