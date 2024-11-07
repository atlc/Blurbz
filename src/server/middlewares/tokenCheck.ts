import { RequestHandler } from "express";
import passport from "passport";
import { Payload } from "../types";

export const tokenCheck: RequestHandler = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err: Error, user: Payload, info: Error) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: `An unexpected server error occurred - ${err.message}` });
            return;
        }

        if (info) {
            res.status(401).json({ message: `An error occurred (${info.message}). Please try logging in again` });
            return;
        }

        if (!user) {
            res.status(401).json({ message: "Could not validate user, please try logging in again" });
            return;
        }

        req.user = user;
        next();
    })(req, res, next);
};
