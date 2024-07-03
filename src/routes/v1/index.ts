import {Router} from "express";
import CarsRoutes from "./cars";
const router = Router();

router.use("/cars", CarsRoutes);

export default router;