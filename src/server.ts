import http from "http";
import db from "./models/db";
import app from "./app";

const port = process.env.PORT || 8000;
const server = http.createServer(app);

db.sequelize
    .authenticate()
    .then(() => {
        console.log("Database successfully connected");
        server.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error in connecting to database: ", err);
        process.exit(1);
    });
