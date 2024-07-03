import {Router} from "express";
import CarControllers from "../../controllers/cars"
const router = Router();

router.get("/", CarControllers.getCars)
router.get("/:carId", CarControllers.getCarById)


export default router;