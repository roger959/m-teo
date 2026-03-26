require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPENWEATHER_API_KEY;

app.use(express.static(__dirname));

app.get('/api/weather', async (req, res) => {
    if (!apiKey) {
        return res.status(500).json({ message: 'Clé API manquante dans le fichier .env.' });
    }

    const { city, lat, lon } = req.query;
    const params = new URLSearchParams({ appid: apiKey, units: 'metric', lang: 'fr' });

    if (city) {
        params.set('q', city);
    } else if (lat && lon) {
        params.set('lat', lat);
        params.set('lon', lon);
    } else {
        return res.status(400).json({ message: 'Paramètres météo manquants.' });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ message: data.message || 'Erreur OpenWeatherMap.' });
        }

        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Impossible de contacter le service météo.' });
    }
});

app.listen(port, () => {
    console.log(`Weather Report disponible sur http://localhost:${port}`);
});