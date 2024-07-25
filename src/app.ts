import "./config/loadEnv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "passport";
import sessionMiddleware from "./models/session";

import v1Router from "./routes/v1/index";
const app = express();

// Security
app.use(cors({ origin: "*" }));
app.use(helmet());

// Logging
app.use(morgan("dev"));
// Parsing
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());
// App
app.use("/api/v1", v1Router);

export default app;
