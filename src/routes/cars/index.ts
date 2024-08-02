import { Router } from "express";
import CarControllers from "../../controllers/cars";
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   carId:
 *                     type: string
 *                   hostId:
 *                     type: string
 *                   make:
 *                     type: string
 *                   model:
 *                     type: string
 *                   transmission:
 *                     type: string
 *                     enum:
 *                       - auto
 *                       - manual
 *                   year:
 *                     type: integer
 *                   type:
 *                     type: string
 *                     enum:
 *                       - sedan
 *                       - suv
 *                       - truck
 *                       - van
 *                   distance_included_km:
 *                     type: integer
 *                   extra_distance_charge:
 *                     type: number
 *                     format: float
 *                   price:
 *                     type: number
 *                     format: float
 *                   fuel_type:
 *                     type: string
 *                     enum:
 *                       - gasoline
 *                       - hybrid
 *                       - electric
 *                   header_img_url:
 *                     type: string
 *                   gallery_url:
 *                     type: array
 *                     items:
 *                       type: string
 *                   location:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       coordinates:
 *                         type: array
 *                         items:
 *                           type: number
 *                   address:
 *                     type: string
 *                   postal_code:
 *                     type: string
 *                   city:
 *                     type: string
 *                   region:
 *                     type: string
 *                   country:
 *                     type: string
 *                   avg_rating:
 *                     type: number
 *                     format: float
 *                   trip_count:
 *                     type: integer
 *                   min_rent_days:
 *                     type: integer
 *                   max_rent_days:
 *                     type: integer
 *                   Plate_number:
 *                     type: string
 *       404:
 *         description: No cars found
 *     security:
 *       - apiKeyAuth: []
 *     deprecated: false
 */
router.get("/", CarControllers.getCars);
/**
 * @swagger
 * /cars/{carId}:
 *   get:
 *     summary: Get a cars by ID
 *     tags: [Cars]
 *     operationId: getCarById
 *     description: Retrieves a cars by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cars to retrieve
 *     responses:
 *       200:
 *         description: A cars object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 carId:
 *                   type: string
 *                 hostId:
 *                   type: string
 *                 make:
 *                   type: string
 *                 model:
 *                   type: string
 *                 transmission:
 *                   type: string
 *                   enum:
 *                     - auto
 *                     - manual
 *                 year:
 *                   type: integer
 *                 type:
 *                   type: string
 *                   enum:
 *                     - sedan
 *                     - suv
 *                     - truck
 *                     - van
 *                 distance_included_km:
 *                   type: integer
 *                 extra_distance_charge:
 *                   type: number
 *                   format: float
 *                 price:
 *                   type: number
 *                   format: float
 *                 fuel_type:
 *                   type: string
 *                   enum:
 *                     - gasoline
 *                     - hybrid
 *                     - electric
 *                 header_img_url:
 *                   type: string
 *                 gallery_url:
 *                   type: array
 *                   items:
 *                     type: string
 *                 location:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: number
 *                 address:
 *                   type: string
 *                 postal_code:
 *                   type: string
 *                 city:
 *                   type: string
 *                 region:
 *                   type: string
 *                 country:
 *                   type: string
 *                 avg_rating:
 *                   type: number
 *                   format: float
 *                 trip_count:
 *                   type: integer
 *                 min_rent_days:
 *                   type: integer
 *                 max_rent_days:
 *                   type: integer
 *                 Plate_number:
 *                   type: string
 *                 host:
 *                   type: object
 *                   properties:
 *                     hostId:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     profileImage:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Car not found
 *     security:
 *       - apiKeyAuth: []
 *     deprecated: false
 */
router.get("/:carId", CarControllers.getCarById);

export default router;
