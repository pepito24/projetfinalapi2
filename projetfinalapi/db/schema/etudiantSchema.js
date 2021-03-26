const mongoose = require("mongoose");

const etudiantSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  telephone: String,
  ville: String,
  codePostal: String,
  competences: Array,
  formations: Array,
  cv: String,
  verifie: Boolean,
});

etudiantSchema.statics.getEtudiants = function () {
  return new Promise((resolve, reject) => {
    this.find({}, (err, docs) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(docs);
    });
  });
};

etudiantSchema.statics.updateEtudiants = function (id, body) {
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

etudiantSchema.statics.deleteEtudiant = function (id) {
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

etudiantSchema.statics.findEtudiant = function (id) {
  return new Promise((resolve, reject) => {
    this.findById(id, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc);
    });
  });
};

etudiantSchema.statics.addEtudiant = function (body) {
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

module.exports = mongoose.model("Etudiant", etudiantSchema);
