import { Router } from 'express';
const router = Router();
import {getTrips, getTripById} from "../../controllers/trips";
import isAuthenticatedMiddleware from "../../middlewares/isAuthenticatedMiddleware";

router.use(isAuthenticatedMiddleware)
router.get("/", getTrips)
router.get("/:tripId", getTripById)

export default router;