import {Strategy as LocalStrategy} from "passport-local";
import authDb from "../../models/auth/db";

const localStrategyMiddleware = new LocalStrategy(
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
);

export default localStrategyMiddleware;