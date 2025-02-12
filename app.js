//// APP METEO 

let apiKey = "8ca16b4b9256470f70e938b61db98f2a";
let x = document.getElementById("demo");
let weatherDiv = document.getElementById("weather");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    x.innerHTML = "Latitude: " + lat + "<br>Longitude: " + lng;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        displayWeather(data);
        x.innerHTML += `<br>Lieu: ${data.name}, ${data.sys.country}`;
    })
    .catch(err => console.log(err));
}

function getWeatherByCity() {
    let city = document.getElementById("cityInput").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        displayWeather(data);
        x.innerHTML = `Lieu: ${data.name}, ${data.sys.country}`;
    })
    .catch(err => {
        console.log(err);
        x.innerHTML = "Ville non trouvée.";
    });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "L'utilisateur a refusé la demande de géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Les informations de localisation sont indisponibles.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "La demande de localisation a expiré.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "Une erreur inconnue est survenue.";
            break;
    }
}

function displayWeather(data) {
    let weather = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Température: ${data.main.temp}°C</p>
        <p>Météo: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Icone météo">
    `;
    weatherDiv.innerHTML = weather;
}

// OBJECTIFS :

// 1) Vous allez faire une première version de l'app ou l'on peut se géolocaliser en cliquant sur un bouton 
// 2) Afin de se géolocaliser vous allez utiliser la fonction geolocate (https://www.w3schools.com/html/html5_geolocation.asp)
// 3) Quand on clique sur le bouton vous devez récupérer latitude et longitude de votre position et inclure ces infos 
// dans le lien de la requete
// 4) On va vouloir afficher une image du temps qu'il fait via des icones prévues (https://openweathermap.org/weather-conditions)
// 5) On voudra afficher également l atempérature en degrés, la ville et le pays

// ETAPES A SUIVRE : 

// Coder les éléments HTML (le bouton geolocate, les div - ou autre - destinés à recevoir les infos depuis le JS)
// Dans le JS on récupère ces éléments (querySelector tout ca), on écoute le bouton Geolocate qui lors du click
// viendra déclencher la fonction de geolocalisation (cf le lien plus haut) et la requete API avec les bonnes lat et lng
// Enfin vous afficherez les éléments pertinents que vous recevez de l'API dans le HTML (depuis le JS)
// Pourquoi pas styliser le tout eà la fin
