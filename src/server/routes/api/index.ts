import express from "express";
import blurbzRouter from './blurbz'

const router = express.Router();

router.use('/blurbz', blurbzRouter);

export default router;
