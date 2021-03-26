const router = require("express").Router();
const RegionModel = require("../db/schema/regionSchema");

/**
 * Chercher toutes les régions
 */
router.get("/", async (req, res) => {
  try {
    const regions = await RegionModel.getRegions();
    res.send(JSON.stringify(regions));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Chercher une région précise
 */
router.get("/:id", async (req, res) => {
  try {
    const region = await RegionModel.findRegion(req.params.id);
    res.send(JSON.stringify(region));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Ajouter une région
 */
router.post("/", async (req, res) => {
  try {
    const region = await RegionModel.addRegion(req.body);
    res.send(JSON.stringify(region));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Modifier une région
 */
router.put("/:id", async (req, res) => {
  try {
    const region = await RegionModel.updateRegion(req.params.id, req.body);
    res.send(JSON.stringify(region));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Supprimer une région
 */
router.delete("/:id", async (req, res) => {
  try {
    const region = await RegionModel.deleteRegion(req.params.id);
    res.send(JSON.stringify(region));
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
