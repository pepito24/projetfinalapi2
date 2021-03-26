const router = require("express").Router();
const EntrepriseModel = require("../db/schema/entrepriseSchema");
const paginateRequest = require("../paginateRequest");

/**
 * Chercher toutes les entreprises
 */
router.get("/", async (req, res) => {
  try {
    const entreprises = await EntrepriseModel.getEntreprises();
    res.send(JSON.stringify(entreprises));
  } catch (err) {
    res.send(err);
  }
});

/**
 * Chercher toutes les entreprises, paginer la reponse et envoyer seulement une page à la fois
 */
router.get("/paginated", async (req, res) => {
  try {
    const response = await paginateRequest(
      await EntrepriseModel.getEntreprises(),
      req.query
    );
    res.send(response);
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Chercher une entreprise précise
 */
router.get("/:id", async (req, res) => {
  try {
    const entreprise = await EntrepriseModel.findEntreprise(req.params.id);
    res.send(JSON.stringify(entreprise));
  } catch (err) {
    res.send(err);
  }
});

/**
 * Ajouter une entreprise
 */
router.post("/", async (req, res) => {
  try {
    const entreprise = await EntrepriseModel.addEntreprise(req.body);
    res.send(JSON.stringify(entreprise));
  } catch (err) {
    res.send(err);
  }
});

/**
 * Modifier une entreprise
 */
router.put("/:id", async (req, res) => {
  try {
    const entreprise = await EntrepriseModel.updateEntreprise(
      req.params.id,
      req.body
    );
    res.send(JSON.stringify(entreprise));
  } catch (err) {
    res.send(err);
  }
});

/**
 * Supprimer une entreprise
 */
router.delete("/:id", async (req, res) => {
  try {
    const entreprise = await EntrepriseModel.deleteEntreprise(req.params.id);
    res.send(JSON.stringify(entreprise));
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
