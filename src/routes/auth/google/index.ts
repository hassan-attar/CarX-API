import { Router } from "express";
import passport from "passport";
import {googleStrategyMiddleware} from "../../../middlewares/passport";
import {googleCallback} from "../../../controllers/auth/google";
const router = Router();

passport.use(googleStrategyMiddleware);

router.get("/", passport.authenticate("google", { scope: ["openid", "profile", "email"] }));
router.get("/callback", googleCallback)
export default router;
