import { Router } from 'express';
const router = Router();
import {getTrips, getTripById, cancelPendingTrip} from "../../controllers/trips";
import isAuthenticatedMiddleware from "../../middlewares/isAuthenticatedMiddleware";

router.use(isAuthenticatedMiddleware)
router.get("/", getTrips)
router.get("/:tripId", getTripById)
router.get("/:tripId/cancel", cancelPendingTrip)

export default router;