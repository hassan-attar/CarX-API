import session from "express-session";
const SequelizeStore = require("connect-session-sequelize")(session.Store);
import authDb from "../models/auth/db";

export default session({
    secret: "keyboard cat",
    store: new SequelizeStore({
        db: authDb.sequelize,
        table: "Session",
        expiration: 1000 * 60 * 60 * 24 * 30, // 30 days
        checkExpirationInterval: 1000 * 60 * 60, // every day,
        disableTouch: true,
        // @ts-ignore
        extendDefaultFields: (defaults, sessionData) => {
            return {
                data: defaults.data,
                expires: defaults.expires,
                userId: sessionData.passport.user,
            };
        },
    }),
    resave: false,
    saveUninitialized: false,
    name: "_sid",
    cookie: {
        sameSite: "strict",
        httpOnly: true,
        priority: "high",
        secure: false,
    },
});
