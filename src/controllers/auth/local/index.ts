import { Request, Response, NextFunction } from "express";
import { UniqueConstraintError } from "sequelize";
import authDb from "../../../models/auth/db";
import appDb from "../../../models/application/db";
import passport from "passport";
import { signupSchema, loginSchema } from "./schema";

export async function login(req: Request, res: Response, next: NextFunction) {
    // Check for the presence of username and password
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
        // @ts-ignore
        return res.status(422).json({ error: error.details });
    }

    // Authenticate using Passport
    // @ts-ignore
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ error: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({ success: true });
        });
    })(req, res, next);
}

export async function signup(req: Request, res: Response) {
    const { error, value: body } = signupSchema.validate(req.body, {
        abortEarly: false,
    });

    if (error) {
        // @ts-ignore
        return res.status(422).json({ error: error.details });
    }

    try {
        const user = await authDb.User.create({
            email: body.email,
            passwordHash: body.password,
        });
        await appDb.User.create({
            userId: user.userId,
            firstName: body.firstName
        })

        return res.status(201).json({ success: true });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
        }
        res.status(400).json({ success: false });
    }
}

export function logout(req: Request, res: Response, next: NextFunction) {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }

        // Redirect to the main page or another URL after auth destruction
        res.send("success"); // or any other URL you want to redirect to
    });
}
