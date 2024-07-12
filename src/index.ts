import Express from "express";
import morgan from "morgan";
require("dotenv").config();
import cors from "cors";
import v1Router from "./routes/v1/index";
const app = Express();
import db from "./models/db";

app.use(cors({ origin: "*" }));
app.use(morgan("common"));
app.use(Express.json());

// Health check endpoint
app.get("/health", (_, res) => {
    res.status(200).send("OK");
});

app.use("/api/v1", v1Router);

const port = process.env.PORT || 8000;

db.sequelize
    .authenticate()
    .then(() => {
        console.log("Database successfully connected");
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to Database", err);
    });
