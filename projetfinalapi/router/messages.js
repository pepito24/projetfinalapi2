const router = require("express").Router();
const MessageModel = require("../db/schema/messageSchema");

/**
 * Chercher tous les messages d'un utilisateur
 */
router.get("/:id", async (req, res) => {
  try {
    const messages = await MessageModel.findMessages(req.params.id);
    res.send(JSON.stringify(messages));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Chercher tous les messages d'un utilisateur avec un autre utilisateur precis
 */
router.get("/", async (req, res) => {
  try {
    const message = await MessageModel.findSpecificPersonMessages(req.query);
    res.send(JSON.stringify(message));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Ajouter un message
 */
router.post("/", async (req, res) => {
  try {
    const message = await MessageModel.addMessage(req.body);
    res.send(JSON.stringify(message));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Modifier un message
 */
router.put("/:id", async (req, res) => {
  try {
    const message = await MessageModel.updateMessage(req.params.id, req.body);
    res.send(JSON.stringify(message));
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
