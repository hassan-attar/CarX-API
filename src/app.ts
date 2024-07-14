import Express from "express";
import morgan from "morgan";
require("dotenv").config();
import cors from "cors";
import helmet from "helmet";
import v1Router from "./routes/v1/index";
const app = Express();

// Security
app.use(cors({ origin: "*" }));
app.use(helmet());

// Logging
app.use(morgan("common"));
app.use(Express.json());

// App
app.use("/api/v1", v1Router);

export default app;
