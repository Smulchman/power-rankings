const express = require('express');

const app = express();

const { getRosters } = require('./controllers/api/sleeper');

app.get('/', async (req, res) => {
    try {
        const rosters = await getRosters();
        console.log(rosters);
        res.send('Hello World');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});