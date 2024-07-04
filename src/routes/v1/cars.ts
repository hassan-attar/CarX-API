import {Router} from "express";
import CarControllers from "../../controllers/cars"
const router = Router();


/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     operationId: getCars
 *     description: Retrieves all cars from the database.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of cars to return
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filter cars by color
 *     responses:
 *       200:
 *         description: A list of cars
 *     security:
 *       - apiKeyAuth: []
 *     deprecated: false
 */
router.get("/", CarControllers.getCars)
router.get("/:carId", CarControllers.getCarById)


export default router;