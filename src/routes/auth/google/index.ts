import { Router } from "express";
import { randomBytes } from "node:crypto";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import authConfig from "../../../config/auth";
import crypto from "node:crypto";
import authDb from "../../../models/auth/db";
const router = Router();

passport.use(
    new GoogleStrategy(
        {
            clientID: authConfig.GOOGLE_CLIENT_ID,
            clientSecret: authConfig.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/google/callback",
            scope: ["openid", "email", "profile"],
        },
        async (_: string, __: string, profile: any, cb: any) => {
            console.log(_);
            console.log(__);
            console.log(profile);
            try {
                const user = await authDb.User.findOne({
                    where: {
                        email: profile._json.email || profile.emails[0].value,
                    },
                });
                if (!user) {
                    // create the account
                    const newUser = await authDb.User.create({
                        firstName: profile.name?.givenName,
                        lastName: profile.name?.familyName,
                        profileImage: profile._json.picture,
                        email: profile._json.email || profile.emails[0].value,
                        hasEmailVerified:
                            profile._json.email_verified ||
                            profile.emails[0].verified,
                        passwordHash: randomBytes(24).toString("hex"),
                    });
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
    ),
);

router.get(
    "/",
    passport.authenticate("google", { scope: ["openid", "profile", "email"] }),
);

router.get("/callback", (req, res, next) => {
    const nonce = crypto.randomBytes(16).toString("base64");
    res.setHeader(
        "Content-Security-Policy",
        `script-src 'self' 'nonce-${nonce}'`,
    );

    passport.authenticate("google", { session: true }, (err, user, _) => {
        if (err) {
            return res.send(`
                <html>
                <head>
                    <title>OAuth Callback</title>
                </head>
                <body>
                    <script nonce="${nonce}">
                        window.opener.postMessage({ type: 'authResult', isAuthenticated: false, message: 'Server Error' }, '*');
                        window.close();
                    </script>
                </body>
                </html>
            `);
        }
        if (!user) {
            return res.send(`
                <html>
                <head>
                    <title>OAuth Callback</title>
                </head>
                <body>
                    <script nonce="${nonce}">
                        window.opener.postMessage({ type: 'authResult', isAuthenticated: false, message: 'Failed to login, Please try again!' }, '*');
                        window.close();
                    </script>
                </body>
                </html>
            `);
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.send(`
                    <html>
                    <head>
                        <title>OAuth Callback</title>
                    </head>
                    <body>
                        <script nonce="${nonce}">
                            window.opener.postMessage({ type: 'authResult', isAuthenticated: false, message: 'Failed to login, Please try again!' }, '*');
                            window.close();
                        </script>
                    </body>
                    </html>
                `);
            }
            return res.send(`
                <html>
                <head>
                    <title>OAuth Callback</title>
                </head>
                <body>
                    <script nonce="${nonce}">
                        window.opener.postMessage({ type: 'authResult', isAuthenticated: true }, '*');
                        window.close();
                    </script>
                </body>
                </html>
            `);
        });
    })(req, res, next);
});

export default router;
