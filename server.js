const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");

const {
  getRosters,
  getMatchups,
  getPlayers,
  createPlayers,
  getTeams
} = require("./controllers/api/index");
const { updateDatabase } = require("./controllers/runUpdate");

const app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", async (req, res) => {
  try {
    // const players = await getPlayers();
    // console.log(players);
    // createPlayers();
    // updateDatabase();
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
