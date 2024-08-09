import googleStrategyMiddleware from "./googleStrategyMiddleware";
import localStrategyMiddleware from "./localStrategyMiddleware";
import passport from "passport";
import authDb from "../../models/auth/db";

// Serialize user
passport.serializeUser((user: any, done) => {
    done(null, user.userId);
});

// Deserialize user
passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await authDb.User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export {
    googleStrategyMiddleware,
    localStrategyMiddleware
}