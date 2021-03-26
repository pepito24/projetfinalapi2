const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
  titre: String,
  entreprise: String,
  secteurActivite: Array,
  ville: String,
  dateDebut: Date,
  dateFin: Date,
  description: String,
  nbHeuresSemaine: String,
  competences: Array,
  remunere: Boolean,
  emploiApresStage: Boolean,
  dateParution: Date,
  informationsSupplementaires: String,
  vedette: Boolean,
  actif: Boolean,
  verifie: Boolean,
  entityId: String,
  duree: String,
  salaire: String,
});

stageSchema.statics.getStages = function () {
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

stageSchema.statics.getStagesByEnterprise = function (enterpriseId) {
  return new Promise((resolve, reject) => {
    this.find({ entityId: enterpriseId }, (err, docs) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(docs);
    });
  });
};

stageSchema.statics.updateStage = function (id, body) {
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

stageSchema.statics.deleteStage = function (id) {
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

stageSchema.statics.findStage = function (id) {
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

stageSchema.statics.addStage = function (body) {
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

module.exports = mongoose.model("OffreStage", stageSchema);
