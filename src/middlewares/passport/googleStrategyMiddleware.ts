import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import authConfig from "../../config/auth";
import authDb from "../../models/auth/db";
import {randomBytes} from "node:crypto";
import appDb from "../../models/application/db";

const googleStrategyMiddleware = new GoogleStrategy(
    {
        clientID: authConfig.GOOGLE_CLIENT_ID,
        clientSecret: authConfig.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/auth/google/callback",
        scope: ["openid", "email", "profile"],
    },
    async (_: string, __: string, profile: any, cb: any) => {
        try {
            const user = await authDb.User.findOne({
                where: {
                    email: profile._json.email || profile.emails[0].value,
                },
            });
            if (!user) {
                // create the account
                const newUser = await authDb.User.create({
                    email: profile._json.email || profile.emails[0].value,
                    hasEmailVerified:
                        profile._json.email_verified ||
                        profile.emails[0].verified,
                    passwordHash: randomBytes(24).toString("hex"),
                });
                await appDb.User.create({
                    userId: newUser.userId,
                    firstName: profile.name?.givenName,
                    lastName: profile.name?.familyName,
                    profileImage: profile._json.picture,
                })
                await authDb.Provider.create({
                    // connect userId to their googleAccount
                    providerName: "google",
                    userId: newUser.userId,
                    providerUserId: profile.id,
                });
            } else {
                await authDb.Provider.findOrCreate({
                    // connect userId to their googleAccount if not already connected
                    where: {
                        userId: user.userId,
                        providerUserId: profile.id,
                        providerName: "google",
                    },
                });
            }
            return cb(null, user);
        } catch (error) {
            return cb(error, null); // Handle errors
        }
    },
);

export default googleStrategyMiddleware;