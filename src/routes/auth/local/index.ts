import { Router } from "express";
import { login, logout, signup } from "../../../controllers/auth/localStrategy";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import authDb from "../../../models/auth/db";
const router = Router();

passport.use(
    new LocalStrategy(
        {
            passwordField: "password",
            usernameField: "email",
        },
        async (email: string, password: string, done) => {
            try {
                const user = await authDb.User.findOne({ where: { email } });
                if (
                    !user ||
                    !(await authDb.User.validatePassword(
                        password,
                        user.passwordHash,
                    ))
                ) {
                    return done(null, false, {
                        message: "Incorrect email or password",
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        },
    ),
);

// Serialize user into the auth
passport.serializeUser((user: any, done) => {
    done(null, user.userId);
});

// Deserialize user from the auth
passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await authDb.User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

export default router;
