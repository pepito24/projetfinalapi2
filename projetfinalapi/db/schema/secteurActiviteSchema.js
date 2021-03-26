const mongoose = require("mongoose");
const slugify = require("slugify");

const secteurSchema = new mongoose.Schema({
  nom: String,
  actif: Boolean,
  verifie: Boolean,
  slug: String,
});

secteurSchema.pre("save", function (next) {
  const slug = slugify(this.nom, {
    locale: "fr",
    lower: true,
  });

  this.slug = slug;

  next();
});

secteurSchema.statics.getSecteurs = function () {
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

secteurSchema.statics.updateSecteur = function (id, body) {
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

secteurSchema.statics.deleteSecteur = function (id) {
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

secteurSchema.statics.findSecteur = function (id) {
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

secteurSchema.statics.addSecteur = function (body) {
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

module.exports = mongoose.model("Secteur", secteurSchema);
