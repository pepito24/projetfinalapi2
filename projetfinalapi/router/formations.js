const router = require("express").Router();
const FormationModel = require("../db/schema/formationSchema");

/**
 * Chercher toutes les Formations d'activités
 */
router.get("/", async (req, res) => {
  try {
    const formations = await FormationModel.getFormations();
    res.send(JSON.stringify(formations));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Chercher un Formation d'activités précis
 */
router.get("/:id", async (req, res) => {
  try {
    const formation = await FormationModel.findFormation(req.params.id);
    res.send(JSON.stringify(formation));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Ajouter un Formation d'activités
 */
router.post("/", async (req, res) => {
  try {
    const formation = await FormationModel.addFormation(req.body);
    res.send(JSON.stringify(formation));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Modifier un Formation d'activités
 */
router.put("/:id", async (req, res) => {
  try {
    const formation = await FormationModel.updateFormation(
      req.params.id,
      req.body
    );
    res.send(JSON.stringify(formation));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Supprimer un Formation d'activités
 */
router.delete("/:id", async (req, res) => {
  try {
    const formation = await FormationModel.deleteFormation(req.params.id);
    res.send(JSON.stringify(formation));
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
