import { Router } from 'express';
import {getProfile} from "../../controllers/accounts";
import isAuthenticatedMiddleware from "../../middlewares/isAuthenticatedMiddleware";

const router = Router();
router.use(isAuthenticatedMiddleware)
router.get("/profile", getProfile)

export default router;