const router = require("express").Router();
const bcrypt = require("bcrypt");
const UtilisateurModel = require("../db/schema/utilisateurSchema");

/**
 * Chercher tous les utilisateurs
 */
router.get("/", async (req, res) => {
  try {
    const utilisateurs = await UtilisateurModel.getUtilisateurs();
    res.send(JSON.stringify(utilisateurs));
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
      await UtilisateurModel.getUtilisateurs(),
      req.query
    );
    res.send(response);
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Chercher un utilisateur précis
 */
router.get("/:id", async (req, res) => {
  try {
    const utilisateur = await UtilisateurModel.findUtilisateur(req.params.id);
    res.send(JSON.stringify(utilisateur));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Ajouter un utilisateur
 */
router.post("/", async (req, res) => {
  try {
    const utilisateur = await UtilisateurModel.addUtilisateur(req.body);
    res.send(JSON.stringify(utilisateur));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Créer un utilisateur avec un hash pour authentication future.
 */
router.post("/signup", async (req, res) => {
  try {
    if (req.body.password) {
      const saltrounds = 10;
      const password = req.body.password;
      delete req.body.password;

      bcrypt.hash(password, saltrounds, async (err, hash) => {
        if (err) {
          return err;
        }
        const body = { ...req.body, hash };
        const utilisateur = await UtilisateurModel.addUtilisateur(body);
        if (delete utilisateur.hash) {
          res.send(JSON.stringify(utilisateur));
        }
      });
    } else {
      req.status(404).send("Send password to be encrypted");
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Authentifier l'utilisateur en question.
 */
router.post("/login", async (req, res) => {
  try {
    const utilisateur = await UtilisateurModel.findUtilisateurByEmail(
      req.body.courriel
    );
    if (utilisateur.hash) {
      bcrypt.compare(req.body.password, utilisateur.hash, (err, same) => {
        if (err) {
          return err;
        }

        if (same) {
          if (delete utilisateur.hash) {
            res.send(JSON.stringify(utilisateur));
          }
        } else {
          res.status(404).send("Le mot de passe entré n'est pas le bon.");
        }
      });
    } else {
      res.status(404).send("Aucun utilisateur trouvé avec ce courriel");
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Modifier un utilisateur
 */
router.put("/:id", async (req, res) => {
  try {
    const utilisateur = await UtilisateurModel.updateUtilisateur(
      req.params.id,
      req.body
    );
    res.send(JSON.stringify(utilisateur));
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * Supprimer un utilisateur
 */
router.delete("/:id", async (req, res) => {
  try {
    const utilisateur = await UtilisateurModel.deleteUtilisateur(req.params.id);
    res.send(JSON.stringify(utilisateur));
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
