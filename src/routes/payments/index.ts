import { Router } from 'express';
const router = Router();
import {
  createCheckoutSession,
  getCheckout,
  getPaymentById,
  getPayments,
  getSessionStatus
} from "../../controllers/payments";
import isAuthenticatedMiddleware from "../../middlewares/isAuthenticatedMiddleware";



router.use(isAuthenticatedMiddleware)
router.post("/checkout-session", createCheckoutSession)
router.get("/checkout-session", getCheckout)
router.get('/session-status', getSessionStatus);
router.get('/:paymentId', getPaymentById);
router.get('/', getPayments);


export default router;