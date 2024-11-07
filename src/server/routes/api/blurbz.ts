import express from "express";
import db from "../../db";
import { CreatableBlurb } from "../../types";
import { tokenCheck } from "../../middlewares/tokenCheck";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const blurbz = await db.blurbz.getAll();
        res.json(blurbz);
    } catch (error) {
        res.status(500).json({ message: "Can't get all blurbz at this time", error });
        console.log(error);
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
        const [blurb] = await db.blurbz.getOne(id);

        if (blurb) {
            res.json(blurb);
        } else {
            res.status(404).json({ message: `No blurb with the id of ${id} was found` });
        }
    } catch (error) {
        res.status(500).json({ message: "Can't get that blurb at this time", error });
        console.log(error);
    }
});

router.post("/", tokenCheck, async (req, res) => {
    try {
        const { content } = req.body;
        const newBlurb: CreatableBlurb = { content, user_id: req.user!.id };

        const results = await db.blurbz.create(newBlurb);

        console.log(req.user)

        res.status(201).json({ message: "Successfully created blurb!", id: results.insertId });
    } catch (error) {
        res.status(500).json({ message: "Can't create a blurb at this time", error });
        console.log(error);
    }
});

router.put("/:id", tokenCheck, async (req, res) => {
    const id = Number(req.params.id);

    const { content } = req.body;

    try {
        await db.blurbz.update(content, id);
        res.json({ message: "Successfully updated blurb" });
    } catch (error) {
        res.status(500).json({ message: "Can't update that blurb at this time", error });
        console.log(error);
    }
});

router.delete("/:id", tokenCheck, async (req, res) => {
    const id = Number(req.params.id);

    try {
        await db.blurbz.destroy(id);
        res.json({ message: "Successfully deleted blurb" });
    } catch (error) {
        res.status(500).json({ message: "Can't delete that blurb at this time", error });
        console.log(error);
    }
});

export default router;
