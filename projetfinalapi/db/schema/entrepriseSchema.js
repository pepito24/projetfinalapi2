const mongoose = require("mongoose");

const entrepriseSchema = new mongoose.Schema({
  nom: String,
  nomPersonneContact: String,
  prenomPersonneContact: String,
  courrielPersonneContact: String,
  telephone: String,
  adresse: String,
  ville: String,
  codePostal: String,
  siteWeb: String,
  logo: String,
  description: String,
  secteurActivite: Array,
  actif: Boolean,
  verifie: Boolean,
});

entrepriseSchema.statics.getEntreprises = function () {
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

entrepriseSchema.statics.updateEntreprise = function (id, body) {
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

entrepriseSchema.statics.deleteEntreprise = function (id) {
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

entrepriseSchema.statics.findEntreprise = function (id) {
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

entrepriseSchema.statics.addEntreprise = function (body) {
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

module.exports = mongoose.model("Entreprise", entrepriseSchema);
