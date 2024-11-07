import passport from "passport";
import PassportJWT from "passport-jwt";
import PassportLocal from "passport-local";
import { Express } from "express";
import bcrypt from "bcrypt";
import db from "../db";
import config from "../config";

export const configurePassport = (app: Express) => {
    passport.use(
        new PassportLocal.Strategy({ usernameField: "email" }, async (email, password, done) => {
            try {
                const [user] = await db.users.find(email);

                if (!user) {
                    done("Invalid email/password combo", false);
                } else {
                    const passwordsMatched = bcrypt.compareSync(password, user.password);

                    if (!passwordsMatched) {
                        done("Invalid email/password combo", false);
                    } else {
                        done(null, user);
                    }
                }
            } catch (error) {
                done(error, false);
            }
        })
    );

    passport.use(
        new PassportJWT.Strategy({ jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.jwt.secret }, (payload, done) => {
            done(null, payload);
        })
    );

    app.use(passport.initialize());
};
