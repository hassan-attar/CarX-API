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
import paymentRouter from "./routes/payments"
import tripsRouter from "./routes/trips";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware";
import bodyParser from "body-parser";
import {checkoutWebHook} from "./controllers/payments";
const app = express();

// Security
app.use(cors());
app.use(helmet());
// Parsing
app.post("/stripe/webhook", bodyParser.raw({type: 'application/json'}), checkoutWebHook)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Authentication
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
// Logging
app.use(morgan("dev"));
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

app.use("/payments", paymentRouter)

app.use("/trips", tripsRouter)

app.use(errorHandlingMiddleware)

export default app;
