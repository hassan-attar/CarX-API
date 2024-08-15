import { Router } from 'express';
const router = Router();
import {createCheckoutSession, getPaymentById, getPayments, getSessionStatus} from "../../controllers/payments";
import isAuthenticatedMiddleware from "../../middlewares/isAuthenticatedMiddleware";



router.use(isAuthenticatedMiddleware)
router.post("/checkout-session", createCheckoutSession)
router.get('/session-status', getSessionStatus);
router.get('/history/:paymentId', getPaymentById);
router.get('/history/', getPayments);


export default router;