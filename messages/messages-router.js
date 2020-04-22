const express = require("express");
const db = require("../data/config");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const messages = await db.select("*").from("messages");
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        messages: "Not found"
      });
    }
    const message = await db
      .select("*")
      .from("messages")
      .where({ id: req.params.id });
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {});

router.delete("/:id", async (req, res, next) => {});

module.exports = router;
