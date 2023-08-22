const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const path = require('path');

const {
  getRosters,
  getMatchups,
  getPlayers,
  createPlayers,
  getTeams
} = require("./controllers/api/index");
const { updateDatabase } = require("./controllers/runUpdate");

const app = express();
const hbs = exphbs.create({});

app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("/", async (req, res) => {
  try {
    // const players = await getPlayers();
    // console.log(players);
    // createPlayers();
    // updateDatabase();
    // const matchups = await getMatchups()
    // console.log(matchups)
    const teams = await getTeams();
    res.render("table", { teams });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3001;
// { force: true } to drop and re-create tables on a sync
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server is listening on http://localhost:${PORT}`)
  );
});
