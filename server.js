const express = require('express');
const sequelize = require("./config/connection");

const app = express();

const { getRosters, getMatchups } = require('./controllers/api/sleeper');

app.get('/', async (req, res) => {
    try {
        const rosters = await getMatchups(5);
        console.log(rosters);
        res.send('Hello World');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3001;
// { force: true } to drop and re-create tables on a sync
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
  });