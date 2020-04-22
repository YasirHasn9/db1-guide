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

router.get("/:id", async (req, res, next) => {});

router.post("/", async (req, res, next) => {});

router.put("/:id", async (req, res, next) => {});

router.delete("/:id", async (req, res, next) => {});

module.exports = router;
