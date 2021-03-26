const router = require("express").Router();
const SecteurModel = require("../db/schema/secteurActiviteSchema");

/**
 * Chercher toutes les secteurs d'activités
 */
router.get("/", async (req, res) => {
  try {
    const secteurs = await SecteurModel.getSecteurs();
    res.send(JSON.stringify(secteurs));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Chercher un secteur d'activités précis
 */
router.get("/:id", async (req, res) => {
  try {
    const secteur = await SecteurModel.findSecteur(req.params.id);
    res.send(JSON.stringify(secteur));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Ajouter un secteur d'activités
 */
router.post("/", async (req, res) => {
  try {
    const secteur = await SecteurModel.addSecteur(req.body);
    res.send(JSON.stringify(secteur));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Modifier un secteur d'activités
 */
router.put("/:id", async (req, res) => {
  try {
    const secteur = await SecteurModel.updateSecteur(req.params.id, req.body);
    res.send(JSON.stringify(secteur));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Supprimer un secteur d'activités
 */
router.delete("/:id", async (req, res) => {
  try {
    const secteur = await SecteurModel.deleteSecteur(req.params.id);
    res.send(JSON.stringify(secteur));
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
