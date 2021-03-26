const router = require("express").Router();
const EtudiantModel = require("../db/schema/etudiantSchema");
const paginateRequest = require("../paginateRequest");

/**
 * Chercher toutes les Etudiants
 */
router.get("/", async (req, res) => {
  try {
    const etudiants = await EtudiantModel.getEtudiants();
    res.send(JSON.stringify(etudiants));
  } catch (err) {
    res.send(err);
  }
});

/**
 * Chercher toutes les Etudiants, paginer la reponse et envoyer seulement une page à la fois
 */
router.get("/paginated", async (req, res) => {
  try {
    const response = await paginateRequest(
      await EtudiantModel.getEtudiants(),
      req.query
    );
    res.send(response);
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Chercher une etudiant précise
 */
router.get("/:id", async (req, res) => {
  try {
    const etudiant = await EtudiantModel.findEtudiant(req.params.id);
    res.send(JSON.stringify(etudiant));
  } catch (err) {
    res.send(err);
  }
});

/**
 * Ajouter une etudiant
 */
router.post("/", async (req, res) => {
  try {
    const etudiant = await EtudiantModel.addEtudiant(req.body);
    res.send(JSON.stringify(etudiant));
  } catch (err) {
    res.send(err);
  }
});

/**
 * Modifier une etudiant
 */
router.put("/:id", async (req, res) => {
  try {
    const etudiant = await EtudiantModel.updateEtudiant(
      req.params.id,
      req.body
    );
    res.send(JSON.stringify(etudiant));
  } catch (err) {
    res.send(err);
  }
});

/**
 * Supprimer une etudiant
 */
router.delete("/:id", async (req, res) => {
  try {
    const etudiant = await EtudiantModel.deleteEtudiant(req.params.id);
    res.send(JSON.stringify(etudiant));
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
