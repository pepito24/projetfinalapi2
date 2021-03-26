const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema({
  role: String,
  courriel: String,
  hash: String,
  actif: Boolean,
  verifie: Boolean,
  premiereConnexion: Boolean,
  entiteId: String,
  type: String,
});

utilisateurSchema.statics.getUtilisateurs = function () {
  return new Promise((resolve, reject) => {
    this.find({}, (err, docs) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(
        docs.map((doc) => {
          const d = doc.toObject();
          if (d.hash) {
            delete d.hash;
          }

          return d;
        })
      );
    });
  });
};

utilisateurSchema.statics.updateUtilisateur = function (id, body) {
  return new Promise((resolve, reject) => {
    this.findByIdAndUpdate(id, body, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc);
    });
  });
};

utilisateurSchema.statics.deleteUtilisateur = function (id) {
  return new Promise((resolve, reject) => {
    this.findByIdAndDelete(id, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc);
    });
  });
};

utilisateurSchema.statics.findUtilisateur = function (id) {
  return new Promise((resolve, reject) => {
    this.findById(id, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      const d = doc.toObject();
      if (d.hash) {
        delete d.hash;
      }

      resolve(d);
    });
  });
};

utilisateurSchema.statics.findUtilisateurByEmail = function (email) {
  return new Promise((resolve, reject) => {
    this.findOne({ courriel: email })
      .lean()
      .exec((err, doc) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(doc);
      });
  });
};

utilisateurSchema.statics.addUtilisateur = function (body) {
  return new Promise((resolve, reject) => {
    this.create(body, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc.toObject());
    });
  });
};

module.exports = mongoose.model("Utilsateur", utilisateurSchema);
