import {RequestHandler} from "express";
import crypto from "node:crypto";
import passport from "passport";

export const googleCallback: RequestHandler = (req, res, next) => {
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
};
