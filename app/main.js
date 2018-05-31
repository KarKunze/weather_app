let currentDate = new Date();
let dayNight = "day";
let dateElem = document.getElementById("date");
dateElem.innerHTML = currentDate.toDateString();

let weatherButton = document.getElementById('weatherButton');
//my apiId = "d710a4aa5b152e9b5fe7739a6ccca894"
let zipInput = document.getElementById('zipInput');

let output = document.getElementById('output');
let cityOutput = document.getElementById('cityOutput');
let tempK = document.getElementById('temperatureOutputK');
let tempF = document.getElementById('temperatureOutputF');
let tempC = document.getElementById('temperatureOutputC');
let condition = document.getElementById('condition');
let weatherImage = document.getElementById('weatherImage');

let error = document.getElementById("error");
let errorMessage = document.getElementById('weatherImage')

let apiRequest;
let appId = "d710a4aa5b152e9b5fe7739a6ccca894";


document.onreadystatechange = function() {
  if (document.readyState == "interactive") {
  weatherButton.onclick = getWeather;
  }
};

function getWeather() {
  //code that fetches API data and stores it in resuls
  let url = "http://api.openweathermap.org/data/2.5/weather?zip=<zipCode>&us&appid=<appId>";
  url = url.replace("<zipCode>", zipInput.value);
  url = url.replace("<appId>", appId);
  //code that fetches data from the API URL and stores it in results.
  apiRequest = new XMLHttpRequest();
  apiRequest.onload = catchResponse;
  apiRequest.onerror = httpRequestOnError;
  apiRequest.open('get', url, true);
  apiRequest.send();
}

function httpRequestOnError() {
	output.style.display = 'none';
	errorMessage.innerHTML = 'There was a problem reaching the weather API. Try again later.'
	error.style.display = 'block';
}

function catchResponse() {

  if (apiRequest.statusText === "OK") {

    let response = JSON.parse(apiRequest.responseText);

    error.style.display = "none";
    cityOutput.innerHTML = response.name;
    tempK.innerHTML = Math.round(response.main.temp) + " K";
    tempF.innerHTML = convertKtoF(response.main.temp) + "&degF";
    tempC.innerHTML = convertKtoC(response.main.temp) + "&degC";
    condition.innerHTML = response.weather[0].description;
    displayImage(convertKtoF(response.main.temp));
		output.style.display = 'block';

  }
    else {
        error.style.display = 'block';
        errorMessage.innerHTML = apiRequest.statusText;
        output.style.display = 'none';
    }
  }


function displayImage(tempF) {
  if (tempF > 85) {
    weatherImage.src = "images/beach-beautiful-bridge-449627.jpg";
  }
  else if (tempF > 65) {
    weatherImage.src = "images/autumn-bright-daylight-615348.jpg";
  }
  else if (tempF > 32) {
    weatherImage.src = "images/background-cave-clouds-949193.jpg";
  }
  else {
    weatherImage.src = "images/abstract-blur-bright-286198.jpg";
  }
}


function convertKtoF(kelvin) {
  let fahr = kelvin * (9/5) - 459.7;
  return Math.round(fahr);
}

function convertKtoC(kelvin) {
  let celsius = kelvin - 273.15;
  return Math.round(celsius);
}
