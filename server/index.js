const express = require("express");
const cors = require("cors");
const db = require("./models/index");
const PORT = process.env.APP_PORT || 3001;

var corsOptions = {
  origin: "http://localhost:3000",
};

const appRoute = require("./routes");

const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", appRoute);

app.listen(PORT, async (error) => {
  if (!error) {
    console.log("App is listening on port " + PORT);
    try {
      await db.sequelize.authenticate();
      console.log("Connected to database.");

      // await db.sequelize.sync({ force: true });
      // console.log("Database synced. DEV STAGE ONLY!");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  } else console.log("Unable to start the server", error);
});
