const express = require('express');
const request = require('request');
const app = express();
const port = 8005;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/weather', (req, res) => {
    const city = req.query.city;

    const options = {
        method: 'GET',
        url: `https://open-weather13.p.rapidapi.com/city/${city}`,
        headers: {
            'X-RapidAPI-Key': '7a47b8fdaamsh5d84252afbe4495p1ba9cejsnb46b4d4d99dd',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
        },
    };

    request(options, (error, apiRes, body) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (apiRes.statusCode === 200) {
            const weatherData = JSON.parse(body);

            const temperature = weatherData.temperature;
            const weatherDescription = weatherData.weatherDescription;

            res.json({
                temperature: temperature,
                description: weatherDescription,
            });
        } else {
            res.status(apiRes.statusCode).json({ error: 'API request failed' });
        }
    });
});

app.listen(port, () => {
    console.log(`Weather app listening on port ${port}`);
});
