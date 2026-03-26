//// APP METEO 

let x = document.getElementById("demo");
let weatherDiv = document.getElementById("weather");

async function fetchWeather(query) {
    const response = await fetch(`/api/weather?${query}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Erreur météo.");
    }

    return data;
}

function formatWeatherDescription(description) {
    if (!description) {
        return "Conditions indisponibles";
    }

    return description.charAt(0).toUpperCase() + description.slice(1);
}

function getLocation() {
    if (navigator.geolocation) {
        x.innerHTML = "Localisation en cours...";
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    x.innerHTML = "Coordonnées détectées. Récupération de la météo locale...";
    const query = new URLSearchParams({ lat, lon }).toString();

    fetchWeather(query)
    .then(data => {
        console.log(data);
        displayWeather(data);
        x.innerHTML = `Position détectée: ${data.name}, ${data.sys.country}`;
    })
    .catch(err => {
        console.log(err);
        x.innerHTML = "Impossible de récupérer la météo locale.";
    });
}

function getWeatherByCity() {
    let city = document.getElementById("cityInput").value;

    if (!city.trim()) {
        x.innerHTML = "Saisissez d'abord le nom d'une ville.";
        return;
    }

    x.innerHTML = "Analyse météo en cours...";
    const query = new URLSearchParams({ city: city.trim() }).toString();

    fetchWeather(query)
    .then(data => {
        console.log(data);
        displayWeather(data);
        x.innerHTML = `Lieu: ${data.name}, ${data.sys.country}`;
    })
    .catch(err => {
        console.log(err);
        x.innerHTML = err.message === "city not found" ? "Ville non trouvée." : "Impossible de récupérer la météo.";
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
    const description = formatWeatherDescription(data.weather[0].description);
    let weather = `
        <article class="weather-card">
            <div class="weather-head">
                <div class="weather-location">
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <p>Vision météo actuelle</p>
                </div>
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Icône météo">
            </div>

            <div class="weather-overview">
                <div class="temperature">${Math.round(data.main.temp)}°</div>
                <div>
                    <p class="weather-summary">${description}</p>
                    <p>Ressenti ${Math.round(data.main.feels_like)}°C</p>
                </div>
            </div>

            <div class="weather-meta">
                <div class="weather-meta-card">
                    <span>Humidité</span>
                    <strong>${data.main.humidity}%</strong>
                </div>
                <div class="weather-meta-card">
                    <span>Vent</span>
                    <strong>${Math.round(data.wind.speed)} m/s</strong>
                </div>
                <div class="weather-meta-card">
                    <span>Pression</span>
                    <strong>${data.main.pressure} hPa</strong>
                </div>
            </div>
        </article>
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
