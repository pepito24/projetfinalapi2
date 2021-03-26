const mongoose = require("mongoose");

const demandeSchema = new mongoose.Schema({
  titre: String,
  programmeSuivi: String,
  autresFormations: Array,
  competences: Array,
  descriptionPosteRecherche: String,
  ville: String,
  dateDebut: Date,
  dateFin: Date,
  nbHeuresSemaine: Number,
  type: String,
  duree: Number,
  remunere: Boolean,
  dateParution: Date,
  autresInformations: String,
  etudiant: String,
  actif: Boolean,
  verifie: Boolean,
});

demandeSchema.statics.getDemandes = function () {
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

demandeSchema.statics.updateDemande = function (id, body) {
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

demandeSchema.statics.deleteDemande = function (id) {
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

demandeSchema.statics.findDemande = function (id) {
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

demandeSchema.statics.addDemande = function (body) {
  return new Promise((resolve, reject) => {
    this.create(body, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc);
    });
  });
};

module.exports = mongoose.model("DemandeStage", demandeSchema);
