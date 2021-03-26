const mongoose = require("mongoose");
const slugify = require("slugify");

const formationSchema = new mongoose.Schema({
  nom: String,
  actif: Boolean,
  verifie: Boolean,
  slug: String,
});

formationSchema.pre("save", function (next) {
  const slug = slugify(this.nom, {
    locale: "fr",
    lower: true,
  });

  this.slug = slug;

  next();
});

formationSchema.statics.getFormations = function () {
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

formationSchema.statics.updateFormation = function (id, body) {
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

formationSchema.statics.deleteFormation = function (id) {
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

formationSchema.statics.findFormation = function (id) {
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

formationSchema.statics.addFormation = function (body) {
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

module.exports = mongoose.model("Formation", formationSchema);
