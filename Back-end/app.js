
const express = require('express');
const { calculatePace, calculatePaceFromTotalMinutes } = require('./paceCalculator');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());


app.get('/calculate-pace-time', (req, res) => {
    const { unitSystem, distance, minutesPace, secondsPace } = req.query;

    // Check for missing parameters
    if (!unitSystem || !distance || !minutesPace || !secondsPace) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    const result = calculatePace(unitSystem, Number(distance), Number(minutesPace), Number(secondsPace));
    return res.json(result);
});

app.get('/calculate-pace-total-minutes', (req, res) => {
    const { distance, unitSystem, hours,minutes,seconds } = req.query;

    try {
        const pace = calculatePaceFromTotalMinutes(Number(distance), unitSystem, Number(hours),Number(minutes),Number(seconds));
        res.json({ pace });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Service running at http://localhost:${port}`);
});