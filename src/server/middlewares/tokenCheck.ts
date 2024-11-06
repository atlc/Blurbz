import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { Payload } from '../types';

export const tokenCheck: express.RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: "No auth header" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const user = jwt.verify(token, config.jwt.secret) as Payload;

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid credentials, please try logging in again", error });
      console.log(error);
    }
}