const router = require("express").Router();
const DemandeStageModel = require("../db/schema/demandeSchema");
const paginateRequest = require("../paginateRequest");

/**
 * Chercher toutes les offres de stages
 */
router.get("/", async (req, res) => {
  try {
    const demandes = await DemandeStageModel.getDemandes();
    res.send(JSON.stringify(demandes));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Chercher toutes les offres de stages, paginer la reponse et envoyer seulement une page à la fois
 */
router.get("/paginated", async (req, res) => {
  try {
    const response = await paginateRequest(
      await DemandeStageModel.getDemandes(),
      req.query
    );
    console.log(response);
    res.send(response);
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Chercher une demande de stage précise
 */
router.get("/:id", async (req, res) => {
  try {
    const demande = await DemandeStageModel.findDemande(req.params.id);
    res.send(JSON.stringify(demande));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Ajouter une demande de stage
 */
router.post("/", async (req, res) => {
  try {
    const demande = await DemandeStageModel.addDemande(req.body);
    res.send(JSON.stringify(demande));
  } catch (err) {
    res.send(404, err);
  }
});

/**
 * Modifier une demande de stage
 */
router.put("/:id", async (req, res) => {
  try {
    const demande = await DemandeStageModel.updateDemande(
      req.params.id,
      req.body
    );
    res.send(JSON.stringify(demande));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Supprimer une demande de stage
 */
router.delete("/:id", async (req, res) => {
  try {
    const demande = await DemandeStageModel.deleteDemande(req.params.id);
    res.send(JSON.stringify(demande));
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
