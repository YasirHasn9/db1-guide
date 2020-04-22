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
    // const [message] = await db
    //   .select("*")
    //   .from("messages")
    //   .where({ id: req.params.id });
    // res.status(201).json(message);

    // const message = await db
    //   .first("*")
    //   .from("messages")
    //   .where({ id: req.params.id });
    // res.status(201).json(message);
    // first will return a plain object without putting inside an array

    const message = await db
      .first(["title", "contents"]) // if we want to only some key values form the object
      .from("messages")
      .where({ id: req.params.id });
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      title: req.body.title,
      contents: req.body.contents
    };
    // INSERT INTO "messages" ("title" , "contents") values (? , ?)
    const [newMessage] = await db("messages").insert(payload);
    const message = await db("messages")
      .where("id", newMessage)
      .first();

    res.json(message);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const payload = {
      title: req.body.title,
      contents: req.body.contents
    };
    let id = await db("messages")
      .where("id", req.params.id)
      .update(payload);

    const updateMessage = await db("messages")
      .where("id", id)
      .first();
    res.json(updateMessage);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await db("messages").where("id", req.params.id).del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
