import http from "http";
import appDb from "./models/application/db";
import authDb from "./models/auth/db";
import api from "./app";
import express from "express";
import path from "node:path";

const port = process.env.PORT || 8000;
const app = express();
app.use("/api/v1", api);
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});
// Create HTTPS server with credentials
const server = http.createServer(app);

Promise.all([authDb, appDb].map((db) => db.sequelize.authenticate()))
    .then(() => {
        console.log("Both Databases successfully connected");
        server.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error in connecting to databases: ", err);
        process.exit(1);
    });
