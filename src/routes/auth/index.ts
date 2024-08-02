import { Router } from 'express';
import cors from 'cors';
import localStrategyRoutes from "./localStrategy";
import googleStrategyRoutes from "./googleStrategy";


const router = Router();
router.use(cors({
    origin: false, // Block all other origin
    credentials: true,
}))

router.use(localStrategyRoutes)
router.use("/google", googleStrategyRoutes)

export default router;