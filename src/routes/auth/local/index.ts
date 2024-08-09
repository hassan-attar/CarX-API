import { Router } from "express";
import { login, logout, signup } from "../../../controllers/auth/local";
import passport from "passport";
import {localStrategyMiddleware} from "../../../middlewares/passport";
const router = Router();

passport.use(localStrategyMiddleware);

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

export default router;
