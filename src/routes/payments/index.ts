import { Router } from 'express';
const router = Router();
import {createCheckoutSession, getSessionStatus, checkoutWebHook} from "../../controllers/payments";

router.post("/checkout-session", createCheckoutSession)

router.get('/session-status', getSessionStatus);

router.post('/webhook', checkoutWebHook);

export default router;