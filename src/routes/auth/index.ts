import { Router } from 'express';
import localStrategyRoutes from "./local";
import googleStrategyRoutes from "./google";


const router = Router();

router.use(localStrategyRoutes)
router.use("/google", googleStrategyRoutes)

export default router;