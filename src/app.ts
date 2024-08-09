import "./config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "passport";
import sessionMiddleware from "./middlewares/sessionMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerDocs";
import CarsRoutes from "./routes/cars";
import authRoutes from "./routes/auth";
import accountsRouter from "./routes/accounts";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware";
const app = express();

// Security
app.use(cors());
app.use(helmet());
// Parsing
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Authentication
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
// Logging
app.use(morgan("dev"));

app.get("/me", (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).send(req.user);
    } else {
        return res.status(401).send("Not authorized");
    }
});

// Routes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Endpoints related to cars
 */
app.use("/cars", CarsRoutes);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User Authentication Routes
 */
app.use("/auth", authRoutes);

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: User Accounts Routes
 */
app.use("/accounts", accountsRouter);


app.use(errorHandlingMiddleware)

export default app;
