import express from "express";
import db from "../../db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import config from "../../config";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || typeof email !== "string" || email.length < 7 || email.length > 128) {
            res.status(400).json({ message: "Email is required and must be between 7 and 128 characters" });
            return;
        }

        if (!password || typeof password !== "string" || password.length < 10 || password.length > 200) {
            res.status(400).json({ message: "Password is required and must be between 10 and 200 characters" });
            return;
        }

        const newUser = { email, password };

        const salt = bcrypt.genSaltSync(14);

        const hash = bcrypt.hashSync(password, salt);

        newUser.password = hash;

        await db.users.register(newUser);
        res.status(201).json({ message: "Successfully registered!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Couldn't register your account at this time, please try again later" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || typeof email !== "string" || email.length < 7 || email.length > 128) {
            res.status(400).json({ message: "Email is required and must be between 7 and 128 characters" });
            return;
        }

        if (!password || typeof password !== "string" || password.length < 10 || password.length > 200) {
            res.status(400).json({ message: "Password is required and must be between 10 and 200 characters" });
            return;
        }

        const [user] = await db.users.find(email);

        if (!user) {
          res.status(401).json({ message: "Invalid email/password combo" });
          return;
        }

        const passwordsMatched = bcrypt.compareSync(password, user.password);

        if (!passwordsMatched) {
          res.status(401).json({ message: "Invalid email/password combo" });
          return;
        }

        const token = jwt.sign({ email, id: user.id }, config.jwt.secret, { expiresIn: config.jwt.expiration });

        res.json({ message: `Welcome, ${email}!`, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Couldn't login at this time, please try again later" });
    }
});

export default router;
