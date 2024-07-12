import {Router} from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from "./swaggerDocs"
import CarsRoutes from "./cars";
const router = Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Endpoints related to cars
 */
router.use("/cars", CarsRoutes);

export default router;